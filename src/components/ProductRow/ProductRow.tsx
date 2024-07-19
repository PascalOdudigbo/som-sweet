'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { IconContext } from 'react-icons'
import { SlOptions } from 'react-icons/sl'
import { RxDotFilled } from 'react-icons/rx'
import Link from 'next/link'
import { ProductType } from '@/utils/allModelTypes'
import { deleteOrDeactivateProduct } from '@/utils/productsManagement'
import { showToast } from '@/utils/toast'
import "./_productRow.scss"

interface ProductRowProps {
  product: ProductType
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

function ProductRow({ product, setProducts }: ProductRowProps) {
  const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")
  
  const iconStyles = useMemo(() => ({
    active: { marginRight: "3px", marginLeft: "6px", color: "green" },
    notActive: { marginRight: "3px", marginLeft: "6px", color: "red" },
    options: { size: '30px', className: "dropdown_icon" },
    status: { size: '30px' }
  }), []);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const result = await deleteOrDeactivateProduct(product.id);
        if (result.action === 'deleted') {
          
          setProducts(prevProducts => prevProducts.filter(p => p.id !== product.id));
          showToast('success', 'Product deleted successfully');
        } else {
          setProducts(prevProducts => prevProducts.map(p => 
            p.id === product.id ? { ...p, active: false } : p
          ));
          showToast('info', 'Product has associations and has been deactivated');
        }
      } catch (error) {
        console.error('Error processing product:', error);
        showToast('error', 'Failed to process product');
      }
    }
  };


  return (
    <tr className="row_wrapper">
      <td className="row_cell">
        <Image 
          className='productImage' 
          src={product.images && product.images.length > 0 ? product.images[0].imageUrl : '/placeholder.jpg'} 
          alt={product.name}
          width={50}
          height={50}
        />
      </td>
      <td className="row_cell">{product.name}</td>
      <td className="row_cell">{product.description && (product.description.length > 200 ? product.description.slice(0, 200) + "..." : product.description)}</td>
      <td className="row_cell">£{product.basePrice.toFixed(2)}</td>
      <td className="row_cell">{product.category?.name || 'Uncategorized'}</td>
      <td className="row_cell">
        <div className='itemActiveIconAndText'>
          <IconContext.Provider value={iconStyles.status}>
            <RxDotFilled style={product.active ? iconStyles.active : iconStyles.notActive} />
          </IconContext.Provider>
          <p className='productActive'>{product.active ? 'Active' : 'Inactive'}</p>
        </div>
      </td>
      <td className="row_cell">
        <div className="dropdown">
          <IconContext.Provider value={iconStyles.options}>
            <SlOptions onClick={() => setDropdownDisplay(prev => prev === "block" ? "none" : "block")} />
          </IconContext.Provider>
          <div className="dropdown_content" style={{ display: dropdownDisplay }}>
            <Link href={`/admin/products/edit/${product.id}`} className="dropdown_item">EDIT</Link>
            <button className="delete_btn" onClick={handleDelete}>DELETE</button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default ProductRow