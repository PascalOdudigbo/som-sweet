"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormInput } from '@/components'
import { ProductVariationType } from '@/utils/allModelTypes'
import { createProductVariation } from '@/utils/productVariationManagement'
import { showToast } from '@/utils/toast'
import './_add_variation.scss'

function AddVariation({ params }: { params: { id: string } }) {
    const [variation, setVariation] = useState<Omit<ProductVariationType, 'id' | 'productId' | 'createdAt' | 'updatedAt'>>({
        name: '',
        price: 0,
    })
    
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        window.scrollTo(0, 0)

        try {
            const createdVariation = await createProductVariation(parseInt(params.id), variation)
            showToast('success', `${createdVariation.name} variation added successfully!`)
            router.push(`/admin/products/edit/${params.id}`)
        } catch (error) {
            console.error('Failed to add variation:', error)
            showToast('error', 'Failed to add variation. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='add_variation_wrapper'>
            <header className='add_variation_header flex_row_center'>
                <h2 className='section_title add_variation_header_title'>Add Variation</h2>
                <Link href={`/admin/products/${params.id}`} className='back_link border_button_void'>BACK</Link>
            </header>

            <form className='add_variation_form' onSubmit={handleSubmit}>
                <div className='add_variation_content flex_column_center'>
                    <section className='form_inputs_section'>
                        <FormInput
                            label='Name'
                            inputType='text'
                            inputValue={variation.name}
                            required={true}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setVariation({ ...variation, name: e.target.value })}
                        />
                        <FormInput
                            label='Price'
                            inputType='number'
                            inputValue={variation.price.toString()}
                            required={true}
                            readonly={false}
                            onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setVariation({ ...variation, price: parseFloat(e.target.value) })}
                        />
                    </section>
                </div>

                <div className='submit_button_section flex_column_justify_center'>
                    <button type="submit" className='custom_button add_variation_form_button' disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'SAVE'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddVariation