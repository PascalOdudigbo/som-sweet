"use client"
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormInput } from '@/components'
import { CategoryType } from '@/utils/allModelTypes'
import { IconContext } from 'react-icons'
import { BsImageFill } from "react-icons/bs"
import Image from 'next/image'
import { imagePlaceholder } from '@/assets'
import { deleteCloudinaryImage, uploadImageToCloudinary } from '@/utils/cloudinary'
import "./_edit.scss"
import { getCategoryById, updateCategory, handleImageFileChangeEditCategory } from '@/utils/categoryManagement'
import { showToast } from '@/utils/toast'

function EditCategory({ params }: { params: { id: string } }) {
    const [category, setCategory] = useState<CategoryType | null>(null)
    const [selectedImageFile, setSelectedImageFile] = useState<File | null | undefined>(null)

    const router = useRouter()
    const uploadImageRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const fetchedCategory = await getCategoryById(parseInt(params.id))
                if (fetchedCategory) {
                    setCategory(fetchedCategory)
                } else {
                    showToast("error", "Category not found")
                    router.push('/admin/categories')
                }
            } catch (error) {
                console.error('Failed to fetch category:', error)
                showToast("error", "Failed to fetch category")
                router.push('/admin/categories')
            }
        }
        fetchCategory()
    }, [params.id, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!category) return

        try {
            let updatedCategory: CategoryType = { ...category }
            if (selectedImageFile) {
                const uploadedImage = await uploadImageToCloudinary(selectedImageFile)
                if (uploadedImage) {
                    await deleteCloudinaryImage(category.imagePublicId)
                    updatedCategory = {
                        ...category,
                        image: uploadedImage.url,
                        imagePublicId: uploadedImage.publicId,
                    }
                }
            }

            const updatedCategoryResponse = await updateCategory(updatedCategory)
            window.scroll(0, 0)
            showToast("success", `${updatedCategoryResponse.name} category updated successfully`)
            router.push('/admin/categories')
        } catch (error) {
            console.error('Failed to update category:', error)
            window.scroll(0, 0)
            showToast("error", "Failed to update category")
        }
    }

    if (!category) return <div>Loading...</div>

    return (
        <div className='edit_category_wrapper'>
            <header className='edit_category_header flex_row_center'>
                <h2 className='section_title edit_category_header_title'>Edit Category</h2>
                <Link href={"/admin/categories"} className='edit_product_link border_button_void'>BACK</Link>
            </header>

            <form className='edit_category_form' onSubmit={handleSubmit}>
                <div className='edit_category_content flex_column_center'>
                    <section className='image_section flex_column_justify_center'>
                        <Image
                            className="category_image"
                            src={category.image || imagePlaceholder}
                            alt={category.name || 'Category image'}
                            width={200}
                            height={200}
                            priority={true}
                        />
                        <input
                            style={{ display: "none" }}
                            type="file"
                            ref={uploadImageRef}
                            onChange={(e) => handleImageFileChangeEditCategory(e, setSelectedImageFile, category, setCategory)}
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
                            inputValue={category.name}
                            required={true}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setCategory({ ...category, name: e.target.value })}
                        />
                    </section>
                </div>

                <div className='submit_button_section flex_column_justify_center'>
                    <button type="submit" className='custom_button edit_category_form_button'>UPDATE</button>
                </div>
            </form>
        </div>
    )
}

export default EditCategory