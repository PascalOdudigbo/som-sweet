"use client"
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {FormInput, Search} from '@/components'
import { CategoryType } from '@/utils/allModelTypes'
import { IconContext } from 'react-icons'
import { BsImageFill } from "react-icons/bs"
import Image from 'next/image'
import { imagePlaceholder } from '@/assets'
import { uploadImageToCloudinary } from '@/utils/cloudinary'
import "./_add.scss"
import { handleImageFileChangeCategory } from '@/utils/addCategory'

interface AddCategoryProps {
    setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>
}

function AddCategory({ setCategories }: AddCategoryProps) {
    const [category, setCategory] = useState<Partial<CategoryType>>({
        id: 0,
        name: "",
        image: imagePlaceholder,
        imagePublicId: "",
    })
    const [selectedImageFile, setSelectedImageFile] = useState<File | null | undefined>(null)

    const router = useRouter()
    const uploadImageRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedImageFile) {
            const uploadedImage = await uploadImageToCloudinary(selectedImageFile)
            if (uploadedImage) {
                const newCategory = {
                    ...category,
                    image: uploadedImage.url,
                    imagePublicId: uploadedImage.publicId,
                }
                // API call to create category
                const response = await fetch('/api/admin/categories', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCategory),
                })
                if (response.ok) {
                    const createdCategory = await response.json()
                    setCategories(prev => [...prev, createdCategory])
                    router.push('/admin/categories')
                } else {
                    console.error('Failed to create category')
                }
            }
        }
    }

    return (
        <div className='add_category_wrapper'>
            <header className='add_category_header flex_row_center'>
                <h2 className='section_title add_category_header_title'>Add Category</h2>
                <Link href={"/admin/categories"} className='add_product_link border_button_void'>BACK</Link>
            </header>
            <div className="search_wrapper">
                <Search />
            </div>
            <form className='add_category_form' onSubmit={handleSubmit}>
                <div className='add_category_content flex_column_center'>
                    <section className='image_section flex_column_justify_center'>
                        <Image
                            className="category_image"
                            src={category?.image ?? imagePlaceholder}
                            alt={category?.name || 'Category image'}
                            width={200}
                            height={200}
                        />

                        <input
                            style={{ display: "none" }}
                            type="file"
                            ref={uploadImageRef}
                            onChange={(e) => {handleImageFileChangeCategory(e, setSelectedImageFile, category, setCategory)}}
                            accept="image/*"
                        />
                        <button
                            className="upload_image_btn border_button_void"
                            onClick={(e) => {
                                e.preventDefault()
                                uploadImageRef.current?.click()
                            }}
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
                            inputValue={category?.name ?? ""}
                            required={true}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => { setCategory({ ...category, name: e.target.value }) }}
                        />
                    </section>
                </div>

                <div className='submit_button_section flex_column_justify_center'>
                    <button type="submit" className='custom_button add_category_form_button'>SAVE</button>
                </div>
            </form>
        </div>
    )
}

export default AddCategory