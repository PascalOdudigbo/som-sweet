'use client'
import React, { useEffect, useState } from 'react'
import { VariationRow, Search } from '@/components'
import Link from 'next/link'
import { ProductVariationType } from '@/utils/allModelTypes';
import "./_variations.scss"
import { showToast } from '@/utils/toast'
import { getProductVariations } from '@/utils/productVariationManagement';

function Variations({ productId }: { productId: number }) {
    const [variations, setVariations] = useState<ProductVariationType[]>([]);
    const [filteredVariations, setFilteredVariations] = useState<ProductVariationType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchVariations() {
            try {
                setIsLoading(true);
                const fetchedVariations = await getProductVariations(productId);
                setVariations(fetchedVariations);
                setFilteredVariations(fetchedVariations);
            } catch (error) {
                console.error('Failed to fetch variations:', error);
                showToast('error', 'Failed to load variations. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchVariations();
    }, [productId]);

    useEffect(() => {
        const filtered = variations.filter(variation => 
            variation.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVariations(filtered);
    }, [searchTerm, variations]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main className='variations_wrapper'>
            <section className='add_variation_link_wrapper flex_row_center'>
                <h2 className='section_title'>Variations</h2>
                <Link href={`/admin/products/${productId}/variations/add`} className='add_variation_link border_button_void'>ADD</Link>
            </section>
            <div className="search_wrapper">
                <Search onSearch={handleSearch}/>
            </div>

            <table className="variations_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className="p__inter table_header">NAME</th>
                        <th className="p__inter table_header">PRICE</th>
                        <th className="p__inter table_header">CREATED AT</th>
                        <th className="p__inter table_header">UPDATED AT</th>
                        <th className="p__inter table_header">ACTION</th>
                    </tr>
                </thead>

                <tbody className='table_body'>
                    {filteredVariations.map((variation) => (
                        <VariationRow
                            key={variation.id}
                            variation={variation}
                            setVariations={setVariations}
                            productId={productId}
                        />
                    ))}
                </tbody>
            </table>

            {filteredVariations.length < 1 && <h3 className="p__inter no_variations_text">NO VARIATIONS FOUND</h3>}
        </main>
    )
}

export default Variations