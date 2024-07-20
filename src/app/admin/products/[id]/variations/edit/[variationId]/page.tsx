"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormInput } from '@/components'
import { ProductVariationType } from '@/utils/allModelTypes'
import { getProductVariationById, updateProductVariation } from '@/utils/productVariationManagement'
import { showToast } from '@/utils/toast'
import './_edit_variation.scss'

function EditVariation({ params }: { params: { id: string, variationId: string } }) {
    const [variation, setVariation] = useState<ProductVariationType | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const fetchVariation = async () => {
            try {
                const fetchedVariation = await getProductVariationById(parseInt(params.id), parseInt(params.variationId))
                setVariation(fetchedVariation)
            } catch (error) {
                console.error('Failed to fetch variation:', error)
                showToast('error', 'Failed to load variation. Please try again.')
            }
        }

        fetchVariation()
    }, [params.id, params.variationId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!variation) return

        setIsLoading(true)
        window.scrollTo(0, 0)

        try {
            const updatedVariation = await updateProductVariation(
                parseInt(params.id),
                parseInt(params.variationId),
                { name: variation.name, price: variation.price }
            )
            showToast('success', `${updatedVariation.name} variation updated successfully!`)
            router.push(`/admin/products/edit/${params.id}`)
        } catch (error) {
            console.error('Failed to update variation:', error)
            showToast('error', 'Failed to update variation. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (!variation) {
        return <div>Loading...</div>
    }

    return (
        <div className='edit_variation_wrapper'>
            <header className='edit_variation_header flex_row_center'>
                <h2 className='section_title edit_variation_header_title'>Edit Variation</h2>
                <Link href={`/admin/products/edit/${params.id}`} className='back_link border_button_void'>BACK</Link>
            </header>

            <form className='edit_variation_form' onSubmit={handleSubmit}>
                <div className='edit_variation_content flex_column_center'>
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
                    <button type="submit" className='custom_button edit_variation_form_button' disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'UPDATE'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditVariation