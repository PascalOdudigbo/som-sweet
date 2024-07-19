"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Checkbox, Dropdown, FormInput, TextArea } from '@/components'
import { IconContext } from 'react-icons'
import { BsImageFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { ProductType, CategoryType } from '@/utils/allModelTypes'
import { uploadImageToCloudinary } from '@/utils/cloudinary'
import { createProduct, addProductImage } from '@/utils/productsManagement'
import { getAllCategories } from '@/utils/categoryManagement'
import { showToast } from '@/utils/toast'
import './_add.scss'

function AddProduct() {
  const [product, setProduct] = useState<Partial<ProductType>>({
    name: '',
    description: '',
    basePrice: 0,
    categoryId: 0,
    active: true,
  })
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | number>("");
  const router = useRouter()
  const uploadImagesRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        showToast('error', 'Failed to load categories. Please refresh the page.')
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    window.scrollTo(0, 0)

    try {
      const createdProduct = await createProduct(product as Omit<ProductType, 'id' | 'createdAt' | 'updatedAt' | 'variations' | 'images' | 'reviews' | 'orderItems' | 'discounts' | 'wishlistedBy'>)

      for (const imageFile of imageFiles) {
        const uploadedImage = await uploadImageToCloudinary(imageFile)
        if (uploadedImage) {
          await addProductImage(createdProduct.id, uploadedImage.url, uploadedImage.publicId)
        }
      }

      showToast('success', `${createdProduct.name} product added successfully!`)
      router.push('/admin/products')
    } catch (error) {
      console.error('Failed to add product:', error)
      showToast('error', 'Failed to add product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files))
    }
  }

  const removeImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index))
  }

  return (
    <div className='add_product_wrapper'>
      <header className='add_product_header flex_row_center'>
        <h2 className='section_title add_product_header_title'>Add Product</h2>
        <Link href="/admin/products" className='back_link border_button_void'>BACK</Link>
      </header>

      <form className='add_product_form' onSubmit={handleSubmit}>
        <div className='add_product_content flex_column_center'>
          <section className='image_section flex_column_justify_center'>
            <div className="product_images_container">
              {imageFiles.map((file, index) => (
                <div key={index} className="image_container">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Product image ${index + 1}`}
                    width={100}
                    height={100}
                  />
                  <button onClick={() => removeImage(index)} className="remove_image_btn">
                    <IconContext.Provider value={{ className: "remove_image_icon" }}>
                      <AiFillDelete />
                    </IconContext.Provider>
                  </button>
                </div>
              ))}
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              ref={uploadImagesRef}
              onChange={handleImageChange}
              multiple
              accept="image/*"
            />
            <button
              className="upload_image_btn border_button_void"
              onClick={(e) => {
                e.preventDefault()
                uploadImagesRef.current?.click()
              }}
            >
              <div className="icon_and_text_container flex_row_center">
                <IconContext.Provider value={{ className: "upload_image_icon" }}>
                  <BsImageFill />
                </IconContext.Provider>
                <p className="button_text p__inter">UPLOAD IMAGE(S)</p>
              </div>
            </button>
            <p className="image_type_text">PNG & JPG ACCEPTED</p>
          </section>

          <section className='form_inputs_section'>
            <FormInput
              label='Name'
              inputType='text'
              inputValue={product.name || ''}
              required={true}
              readonly={false}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setProduct({ ...product, name: e.target.value })}
            />
            <TextArea
              label='Description'
              inputValue={product.description || ''}
              required={false}
              onChangeFunction={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProduct({ ...product, description: e.target.value })}
              rows={5}
              cols={45}
            />
            <FormInput
              label='Base Price'
              inputType='number'
              inputValue={product.basePrice?.toString() || ''}
              required={true}
              readonly={false}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setProduct({ ...product, basePrice: parseFloat(e.target.value) })}
            />
            <Dropdown
              label='Category'
              items={categories?.map(category => category.name) || []}
              buttonText={selectedCategory.toLocaleString() || "Select a category"}
              clickFunction={(item: string | number) => {
                const selectedCategoryObject = categories?.find(cat => cat.name === item);
                if (selectedCategoryObject) {
                  setProduct(prev => ({ ...prev, categoryId: selectedCategoryObject.id }));
                }
                setSelectedCategory(item);
              }}
              required={true}
            />

          </section>
        </div>

        <div className='submit_button_section flex_column_justify_center'>
          <button type="submit" className='custom_button add_product_form_button' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'SAVE'}
          </button>

          <Checkbox
            label='Active'
            isChecked={product.active}
            onChange={(e) => setProduct({ ...product, active: e.target.checked })}
          />


        </div>
      </form>
    </div>
  )
}

export default AddProduct