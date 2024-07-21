'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { IconContext } from 'react-icons'
import { SlOptions } from 'react-icons/sl'
import { CategoryType, ProductType } from '@/utils/allModelTypes'
import { showToast } from '@/utils/toast'
import "./_offer_products_row.scss"

interface OfferProductsRowProps {
  product: ProductType;
  categories: CategoryType[];
  onRemove: (productId: number) => void;
}

function OfferProductsRow({ product, categories, onRemove }: OfferProductsRowProps) {
  console.log(product)
  const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")
  
  const iconStyles = useMemo(() => ({
    options: { size: '30px', className: "dropdown_icon" },
  }), []);

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this product from the offer?')) {
      onRemove(product.id);
    }
  };

  const productCategory = useMemo(() => {
    return (categoryId: number): string => {
      const category = categories.find(category => category.id === categoryId);
      return category ? category.name : 'Uncategorized';
    };
  }, [categories]);
  

  return (
    <tr className="row_wrapper">
      <td className="row_cell">{product.name}</td>
      <td className="row_cell">{product.description && (product.description.length > 200 ? product.description.slice(0, 200) + "..." : product.description)}</td>
      <td className="row_cell">£{product.basePrice.toFixed(2)}</td>
      <td className="row_cell">{productCategory(product.categoryId) || 'Uncategorized'}</td>
      <td className="row_cell">
        <div className="dropdown">
          <IconContext.Provider value={iconStyles.options}>
            <SlOptions onClick={() => setDropdownDisplay(prev => prev === "block" ? "none" : "block")} />
          </IconContext.Provider>
          <div className="dropdown_content" style={{ display: dropdownDisplay }}>
            <button className="delete_btn" onClick={handleRemove}>REMOVE</button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default OfferProductsRow