import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { DiscountType } from '@/utils/allModelTypes'
import { imagePlaceholder } from '@/assets'
import { IconContext } from 'react-icons'
import { SlOptions } from 'react-icons/sl'
import { showToast } from '@/utils/toast'
import { deleteDiscount } from '@/utils/discountManagement'
import "./_offer_row.scss"

interface OfferRowProps {
  discount: DiscountType
  setDiscounts: React.Dispatch<React.SetStateAction<DiscountType[]>>
}

function OfferRow({ discount, setDiscounts }: OfferRowProps) {
  const [dropdownDisplay, setDropdownDisplay] = React.useState<string>("none")

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      try {
        await deleteDiscount(discount.id)
        setDiscounts(prevDiscounts => prevDiscounts.filter(d => d.id !== discount.id))
        showToast('success', 'Discount deleted successfully')
      } catch (error) {
        console.error('Failed to delete discount:', error)
        showToast('error', 'Failed to delete discount')
      }
    }
  }

  return (
    <tr className="row_wrapper">
      <td className="row_cell">
        <Image 
          className='discountImage' 
          src={discount.imageUrl || imagePlaceholder} 
          alt={discount.name} 
          width={50} 
          height={50}
          quality={80}
        />
      </td>
      <td className="row_cell">{discount.name}</td>
      <td className="row_cell">{discount.discountPercent}%</td>
      <td className="row_cell">{new Date(discount.validFrom).toLocaleDateString()}</td>
      <td className="row_cell">{new Date(discount.validUntil).toLocaleDateString()}</td>
      <td className="row_cell">{discount.products?.length || 0}</td>
      <td className="row_cell">
        <div className="dropdown">
          <IconContext.Provider value={{ className: "dropdown_icon" }}>
            <SlOptions onClick={() => setDropdownDisplay(prev => prev === "block" ? "none" : "block")} />
          </IconContext.Provider>
          <div className="dropdown_content" style={{ display: dropdownDisplay }}>
            <Link href={`/admin/offers/edit/${discount.id}`} className="dropdown_item">EDIT</Link>
            <button className="delete_btn" onClick={handleDelete}>DELETE</button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default OfferRow