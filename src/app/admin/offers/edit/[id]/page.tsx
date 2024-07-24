"use client"
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormInput, Loading } from '@/components'
import { DiscountType } from '@/utils/allModelTypes'
import { IconContext } from 'react-icons'
import { BsImageFill } from "react-icons/bs"
import Image from 'next/image'
import { imagePlaceholder } from '@/assets'
import { deleteCloudinaryImage, uploadImageToCloudinary } from '@/utils/cloudinary'
import "./_edit_offer.scss"
import { getDiscountById, updateDiscount, handleImageFileChangeEditDiscount } from '@/utils/discountManagement'
import { showToast } from '@/utils/toast'
import OfferProducts from '../../products/page'

function EditOffer({ params }: { params: { id: string } }) {
    const [discount, setDiscount] = useState<DiscountType | null>(null)
    const [selectedImageFile, setSelectedImageFile] = useState<File | null | undefined>(null)

    const router = useRouter()
    const uploadImageRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                const fetchedDiscount = await getDiscountById(parseInt(params.id))
                if (fetchedDiscount) {
                    setDiscount(fetchedDiscount)
                } else {
                    showToast("error", "Offer not found")
                    router.push('/admin/offers')
                }
            } catch (error) {
                console.error('Failed to fetch offer:', error)
                showToast("error", "Failed to fetch offer")
                router.push('/admin/offers')
            }
        }
        fetchDiscount()
    }, [params.id, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!discount) return
      
        try {
          let updatedDiscount: Partial<DiscountType> = { ...discount }
          if (selectedImageFile) {
            const uploadedImage = await uploadImageToCloudinary(selectedImageFile)
            if (uploadedImage) {
              if (discount.imagePublicId) {
                await deleteCloudinaryImage(discount.imagePublicId)
              }
              updatedDiscount = {
                ...updatedDiscount,
                imageUrl: uploadedImage.url,
                imagePublicId: uploadedImage.publicId,
              }
            }
          }
      
          console.log('Updating discount with data:', updatedDiscount);
          const updatedDiscountResponse = await updateDiscount(discount.id, updatedDiscount)
          console.log('Update response:', updatedDiscountResponse);
          window.scroll(0, 0)
          showToast("success", `${updatedDiscountResponse.name} offer updated successfully`)
          router.push('/admin/offers')
          
        } catch (error) {
            console.error('Failed to update offer:', error);
            window.scroll(0, 0);
            if (error instanceof Error) {
              showToast("error", error.message);
            } else {
              showToast("error", "An unknown error occurred while updating the offer");
            }
          }
      }

    if (!discount) return <Loading/>

    return (
        <div className='edit_offer_wrapper'>
            <header className='edit_offer_header flex_row_center'>
                <h2 className='section_title edit_offer_header_title'>Edit Offer</h2>
                <Link href={`/admin/offers/edit/${discount.id}`} className='edit_offer_link border_button_void'>BACK</Link>
            </header>

            <form className='edit_offer_form' onSubmit={handleSubmit}>
                <div className='edit_offer_content flex_column_center'>
                    <section className='image_section flex_column_justify_center'>
                        <Image
                            className="offer_image"
                            src={discount.imageUrl || imagePlaceholder}
                            alt={discount.name || 'Offer image'}
                            width={200}
                            height={200}
                            priority={true}
                        />
                        <input
                            style={{ display: "none" }}
                            type="file"
                            ref={uploadImageRef}
                            onChange={(e) => handleImageFileChangeEditDiscount(e, setSelectedImageFile, discount, setDiscount)}
                            accept="image/*"
                        />
                        <button
                            className="upload_image_btn border_button_void"
                            type="button"
                            onClick={() => uploadImageRef.current?.click()}
                        >
                            <div className="icon_and_text_container flex_row_center">
                                <IconContext.Provider value={{ className: "upload_image_icon" }}>
                                    <BsImageFill />
                                </IconContext.Provider>
                                <p className="button_text p__inter">UPLOAD IMAGE</p>
                            </div>
                        </button>
                        <p className="image_type_text">PNG & JPG ACCEPTED</p>
                    </section>

                    <section className='form_inputs_section'>
                        <FormInput
                            label='Name'
                            inputType='text'
                            inputValue={discount.name}
                            required={true}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount({ ...discount, name: e.target.value })}
                        />
                        <FormInput
                            label='Description'
                            inputType='text'
                            inputValue={discount.description || ''}
                            required={false}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount({ ...discount, description: e.target.value })}
                        />
                        <FormInput
                            label='Discount Percent'
                            inputType='number'
                            inputValue={discount.discountPercent.toString()}
                            required={true}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount({ ...discount, discountPercent: parseFloat(e.target.value) })}
                        />
                        <FormInput
                            label='Valid From'
                            inputType='datetime-local'
                            inputValue={new Date(discount.validFrom).toISOString().slice(0, 16)}
                            required={true}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount({ ...discount, validFrom: new Date(e.target.value) })}
                        />
                        <FormInput
                            label='Valid Until'
                            inputType='datetime-local'
                            inputValue={new Date(discount.validUntil).toISOString().slice(0, 16)}
                            required={true}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount({ ...discount, validUntil: new Date(e.target.value) })}
                        />
                    </section>
                </div>

                <div className='submit_button_section flex_column_justify_center'>
                    <button type="submit" className='custom_button edit_offer_form_button'>UPDATE</button>
                </div>
            </form>

            <OfferProducts discountId={discount.id}/>
        </div>
    )
}

export default EditOffer