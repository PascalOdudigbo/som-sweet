'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { IconContext } from 'react-icons'
import { SlOptions } from 'react-icons/sl'
import { RxDotFilled } from 'react-icons/rx'
import Link from 'next/link'
import { ProductType } from '@/utils/allModelTypes'
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
    availability: { size: '30px' }
  }), []);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/admin/products/${product.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProducts(prevProducts => prevProducts.filter(p => p.id !== product.id));
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <tr className="row_wrapper">
      <td className="row_cell">
        <img className='productImage' src={product?.images ? product?.images[0].imageUrl : ''} alt={product?.name}/>
      </td>
      <td className="row_cell">{product.name}</td>
      <td className="row_cell">{product?.description && (product?.description?.length > 200 ? product.description?.slice(0, 200) + "..." : product?.description)}</td>
      <td className="row_cell">£{product.basePrice.toFixed(2)}</td>
      <td className="row_cell">
        {
          product?.active ?
            <div className='itemActiveIconAndText'>
              <IconContext.Provider value={iconStyles.availability}>
                <RxDotFilled style={iconStyles.active} />
              </IconContext.Provider>
              <p className='productActive'>Available</p>
            </div>
            :
            <div className='itemActiveIconAndText'>
              <IconContext.Provider value={iconStyles.availability}>
                <RxDotFilled style={iconStyles.notActive} />
              </IconContext.Provider>
              <p className='productActive'>Unavailable</p>
            </div>
        }
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