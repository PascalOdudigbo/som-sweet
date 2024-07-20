'use client'
import React, { useState, useMemo } from 'react'
import { IconContext } from 'react-icons'
import { SlOptions } from 'react-icons/sl'
import Link from 'next/link'
import { ProductVariationType } from '@/utils/allModelTypes'
import { deleteProductVariation } from '@/utils/productVariationManagement'
import { showToast } from '@/utils/toast'
import "./_variation_row.scss"

interface VariationRowProps {
  variation: ProductVariationType
  setVariations: React.Dispatch<React.SetStateAction<ProductVariationType[]>>;
  productId: number;
}

function VariationRow({ variation, setVariations, productId }: VariationRowProps) {
  const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")
  
  const iconStyles = useMemo(() => ({
    options: { size: '30px', className: "dropdown_icon" },
  }), []);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this variation?')) {
      try {
        await deleteProductVariation(productId, variation.id);
        setVariations(prevVariations => prevVariations.filter(v => v.id !== variation.id));
        showToast('success', 'Variation deleted successfully');
      } catch (error) {
        console.error('Error deleting variation:', error);
        showToast('error', 'Failed to delete variation');
      }
    }
  };

  return (
    <tr className="row_wrapper">
      <td className="row_cell">{variation.name}</td>
      <td className="row_cell">£{variation.price.toFixed(2)}</td>
      <td className="row_cell">{new Date(variation.createdAt).toLocaleDateString()}</td>
      <td className="row_cell">{new Date(variation.updatedAt).toLocaleDateString()}</td>
      <td className="row_cell">
        <div className="dropdown">
          <IconContext.Provider value={iconStyles.options}>
            <SlOptions onClick={() => setDropdownDisplay(prev => prev === "block" ? "none" : "block")} />
          </IconContext.Provider>
          <div className="dropdown_content" style={{ display: dropdownDisplay }}>
            <Link href={`/admin/products/${productId}/variations/edit/${variation.id}`} className="dropdown_item">EDIT</Link>
            <button className="delete_btn" onClick={handleDelete}>DELETE</button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default VariationRow