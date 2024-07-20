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
import { uploadImageToCloudinary, deleteCloudinaryImage } from '@/utils/cloudinary'
import { getProductById, updateProduct, addProductImage, removeProductImage } from '@/utils/productsManagement'
import { getAllCategories } from '@/utils/categoryManagement'
import { showToast } from '@/utils/toast'
import './_edit.scss'
import Variations from '@/app/admin/variations/page'

function EditProduct({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductType | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | number>("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const uploadImagesRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        const [fetchedProduct, fetchedCategories] = await Promise.all([
          getProductById(parseInt(params.id)),
          getAllCategories()
        ])
        setProduct(fetchedProduct)
        setCategories(fetchedCategories)
        setSelectedCategory(fetchedProduct.category?.name || "")
      } catch (error) {
        console.error('Failed to fetch product or categories:', error)
        showToast('error', 'Failed to load product data. Please try again.')
      }
    }

    fetchProductAndCategories()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    setIsLoading(true)
    window.scrollTo(0, 0)

    try {
      const updatedProduct = await updateProduct(product.id, product)

      // Handle new image uploads
      for (const imageFile of imageFiles) {
        const uploadedImage = await uploadImageToCloudinary(imageFile)
        if (uploadedImage) {
          await addProductImage(updatedProduct.id, uploadedImage.url, uploadedImage.publicId)
        }
      }

      showToast('success', `${updatedProduct.name} updated successfully!`)
      router.push('/admin/products')
    } catch (error) {
      console.error('Failed to update product:', error)
      showToast('error', 'Failed to update product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files))
    }
  }

  const removeImage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageId: number, imagePublicId: string) => {
    e.preventDefault();
    
    if (!product) return
    console.log(product)
    console.log(imagePublicId)
    try {
      await removeProductImage(product.id, imageId)
      const imageDeleted = await deleteCloudinaryImage(imagePublicId)
      if (imageDeleted){
        setProduct({
            ...product,
            images: product?.images?.filter(img => img.id !== imageId)
          })
          showToast('success', 'Image removed successfully')
      }
    } catch (error) {
      console.error('Failed to remove image:', error)
      showToast('error', 'Failed to remove image. Please try again.')
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <div className='edit_product_wrapper'>
      <header className='edit_product_header flex_row_center'>
        <h2 className='section_title edit_product_header_title'>Edit Product</h2>
        <Link href="/admin/products" className='back_link border_button_void'>BACK</Link>
      </header>

      <form className='edit_product_form' onSubmit={handleSubmit}>
        <div className='edit_product_content flex_column_center'>
          <section className='image_section flex_column_justify_center'>
            <div className="product_images_container">
              {product?.images?.map((image, index) => (
                <div key={index} className="image_container">
                  <Image
                    src={image.imageUrl}
                    alt={`Product image ${index + 1}`}
                    width={100}
                    height={100}
                    priority={true}
                  />
                  <button onClick={(e) => removeImage(e, image.id, image.imagePublicId)} className="remove_image_btn">
                    <IconContext.Provider value={{ className: "remove_image_icon" }}>
                      <AiFillDelete />
                    </IconContext.Provider>
                  </button>
                </div>
              ))}
              {imageFiles.map((file, index) => (
                <div key={`new-${index}`} className="image_container">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`New product image ${index + 1}`}
                    width={100}
                    height={100}
                  />
                  <button onClick={() => setImageFiles(imageFiles.filter((_, i) => i !== index))} className="remove_image_btn">
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
              inputValue={product.name}
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
              inputValue={product.basePrice.toString()}
              required={true}
              readonly={false}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setProduct({ ...product, basePrice: parseFloat(e.target.value) })}
            />
            <Dropdown
              label='Category'
              items={categories.map(category => category.name)}
              buttonText={selectedCategory.toString() || "Select a category"}
              clickFunction={(item: string | number) => {
                const selectedCategoryObject = categories.find(cat => cat.name === item);
                if (selectedCategoryObject) {
                  setProduct({ ...product, categoryId: selectedCategoryObject.id });
                }
                setSelectedCategory(item);
              }}
              required={true}
            />
          </section>
        </div>

        <div className='submit_button_section flex_column_justify_center'>
          <button type="submit" className='custom_button edit_product_form_button' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'SAVE CHANGES'}
          </button>

          <Checkbox
            label="ACTIVE"
            isChecked={product.active}
            onChange={(e) => setProduct({ ...product, active: e.target.checked })}
          />
        </div>
      </form>

      <Variations productId={product?.id ?? 0}/>

      
    </div>
  )
}

export default EditProduct