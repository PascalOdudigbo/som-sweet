"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { DiscountType } from '@/utils/allModelTypes'
import { getAllDiscounts, deleteDiscount, searchDiscounts } from '@/utils/discountManagement'
import { showToast } from '@/utils/toast'
import "./_offers.scss"
import { Loading, OfferRow, Search } from '@/components'

function Offers() {
    const [discounts, setDiscounts] = useState<DiscountType[]>([])
    const [filteredDiscounts, setFilteredDiscounts] = useState<DiscountType[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchDiscounts()
    }, [])

    useEffect(() => {
        const filtered = discounts.filter(discount =>
            discount.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredDiscounts(filtered)
    }, [searchTerm, discounts])

    const fetchDiscounts = async () => {
        setIsLoading(true)
        try {
            const fetchedDiscounts = await getAllDiscounts()
            setDiscounts(fetchedDiscounts)
            setFilteredDiscounts(fetchedDiscounts)
        } catch (error) {
            console.error('Failed to fetch discounts:', error)
            showToast('error', 'Failed to fetch discounts')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const filtered = searchDiscounts(searchTerm, discounts);
        setFilteredDiscounts(filtered);
    }, [searchTerm, discounts]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };


    if (isLoading) {
        return <Loading/>;
    }

    return (
        <main className='discounts_wrapper'>
            <header className='discounts_header flex_row_center'>
                <h2 className='section_title discounts_header_title'>Offers</h2>
                <Link href={"/admin/offers/add"} className='add_discount_link border_button_void'>ADD</Link>
            </header>

            <div className="search_wrapper">
                <Search onSearch={handleSearch}/>
            </div>

            {filteredDiscounts.length > 0 ? (
                <table className="discounts_table">
                    <thead>
                        <tr className="table_headers_wrapper">
                            <th className="p__inter table_header">IMAGE</th>
                            <th className="p__inter table_header">NAME</th>
                            <th className="p__inter table_header">DISCOUNT PERCENT</th>
                            <th className="p__inter table_header">VALID FROM</th>
                            <th className="p__inter table_header">VALID UNTIL</th>
                            <th className="p__inter table_header">PRODUCTS</th>
                            <th className="p__inter table_header">ACTION</th>
                        </tr>
                    </thead>

                    <tbody className='table_body'>
                        {filteredDiscounts.map((discount) => (
                            <OfferRow
                                key={discount.id}
                                discount={discount}
                                setDiscounts={setDiscounts}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <h3 className="p__inter no_discounts_text">NO DISCOUNTS FOUND</h3>
            )}
        </main>
    )
}

export default Offers