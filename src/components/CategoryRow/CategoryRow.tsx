'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { IconContext } from 'react-icons'
import { SlOptions } from 'react-icons/sl'
import Link from 'next/link'
import { CategoryType } from '@/utils/allModelTypes'
import "./_categoryRow.scss"
import { showToast } from '@/utils/toast'
import { deleteCloudinaryImage } from '@/utils/cloudinary'

interface CategoryRowProps {
  index: number;
  category: CategoryType
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

function CategoryRow({index, category, setCategories }: CategoryRowProps) {
  const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")
  
  const iconStyles = useMemo(() => ({
    options: { size: '30px', className: "dropdown_icon" },
  }), []);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`/api/categories/${category.id}`, {
          method: 'DELETE',
        });
        console.log(response)
        if (response.ok) {
          const deletedImage = await deleteCloudinaryImage(category.imagePublicId)
          if (deletedImage){
            window.scrollTo(0,0)
            setCategories(prevCategories => prevCategories.filter(c => c.id !== category.id))
            showToast("error", "Category deleted!")
          }
        } else {
          console.error('Failed to delete category');
          window.scrollTo(0,0)
          showToast("error", "Failed to delete category!")
        }
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <tr className="row_wrapper">
      <td className="row_cell">
        <Image className='categoryImage' src={category.image} alt={category.name} width={200} height={200} priority={index < 3} quality={80}/>
      </td>
      <td className="row_cell">{category.name}</td>
      <td className="row_cell">{category?.products?.length || 0}</td>
      <td className="row_cell">{new Date(category.createdAt).toLocaleDateString()}</td>
      <td className="row_cell">{new Date(category.updatedAt).toLocaleDateString()}</td>
      <td className="row_cell">
        <div className="dropdown">
          <IconContext.Provider value={iconStyles.options}>
            <SlOptions onClick={() => setDropdownDisplay(prev => prev === "block" ? "none" : "block")} />
          </IconContext.Provider>
          <div className="dropdown_content" style={{ display: dropdownDisplay }}>
            <Link href={`/admin/categories/edit/${category.id}`} className="dropdown_item">EDIT</Link>
            <button className="delete_btn" onClick={handleDelete}>DELETE</button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default CategoryRow