"use client"
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormInput } from '@/components'
import { DiscountType } from '@/utils/allModelTypes'
import { IconContext } from 'react-icons'
import { BsImageFill } from "react-icons/bs"
import Image from 'next/image'
import { imagePlaceholder } from '@/assets'
import { uploadImageToCloudinary } from '@/utils/cloudinary'
import "./_add_offer.scss"
import { createDiscount } from '@/utils/discountManagement'
import { showToast } from '@/utils/toast'

function AddOffer() {
    const [discount, setDiscount] = useState<Omit<DiscountType, 'id' | 'products' | 'createdAt' | 'updatedAt'>>({
        name: "",
        description: "",
        discountPercent: 0,
        validFrom: new Date(),
        validUntil: new Date(),
        imageUrl: imagePlaceholder,
        imagePublicId: "",
    });
    
    const [selectedImageFile, setSelectedImageFile] = useState<File | null | undefined>(null)

    const router = useRouter()
    const uploadImageRef = useRef<HTMLInputElement>(null)

    const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImageFile(file);
            setDiscount(prevDiscount => ({
                ...prevDiscount,
                imageUrl: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            let newDiscount = { ...discount }
            if (selectedImageFile) {
                const uploadedImage = await uploadImageToCloudinary(selectedImageFile)
                if (uploadedImage) {
                    newDiscount = {
                        ...newDiscount,
                        imageUrl: uploadedImage.url,
                        imagePublicId: uploadedImage.publicId,
                    }
                }
            }
            const createdDiscount = await createDiscount(newDiscount)
            showToast("success", `${createdDiscount.name} discount created successfully`)
            router.push('/admin/offers')
        } catch (error) {
            console.error('Failed to create discount:', error)
            showToast("error", error instanceof Error ? error.message : 'An unknown error occurred')
        }
    }

    return (
        <div className='add_discount_wrapper'>
            <header className='add_discount_header flex_row_center'>
                <h2 className='section_title add_discount_header_title'>Add Offer</h2>
                <Link href={"/admin/offers"} className='add_discount_link border_button_void'>BACK</Link>
            </header>
            
            <form className='add_discount_form' onSubmit={handleSubmit}>
                <div className='add_discount_content flex_column_center'>
                    <section className='image_section flex_column_justify_center'>
                        <Image
                            className="discount_image"
                            src={discount.imageUrl ?? ""}
                            alt={discount.name || 'Discount image'}
                            width={200}
                            height={200}
                        />

                        <input
                            style={{ display: "none" }}
                            type="file"
                            ref={uploadImageRef}
                            onChange={handleImageFileChange}
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
                            inputValue={discount.validFrom.toISOString().slice(0, 16)}
                            required={true}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount({ ...discount, validFrom: new Date(e.target.value) })}
                        />
                        <FormInput
                            label='Valid Until'
                            inputType='datetime-local'
                            inputValue={discount.validUntil.toISOString().slice(0, 16)}
                            required={true}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount({ ...discount, validUntil: new Date(e.target.value) })}
                        />
                    </section>
                </div>

                <div className='submit_button_section flex_column_justify_center'>
                    <button type="submit" className='custom_button add_discount_form_button'>SAVE</button>
                </div>
            </form>
        </div>
    )
}

export default AddOffer