'use client'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import "./_recommendations.scss"
import { Product } from '@/components';
import { ProductType } from '@/utils/allModelTypes';
import { getRecommendedProducts } from '@/utils/productsManagement';
import { showToast } from '@/utils/toast';

interface RecommendationsType {
    product: ProductType;
}

const filterDescriptions = [
    "Here are some similar treats for you to consider, based on price range.",
    "Here are some similar treats for you to consider, based on category and price range.",
    "Here are some similar treats for you to consider, based on category."
];

function Recommendations({ product }: RecommendationsType) {
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [filterIndex, setFilterIndex] = useState<number>(0);
    const [viewAllActive, setViewAllActive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchRecommendations = useCallback(async () => {
        setIsLoading(true);
        try {
            const recommendations = await getRecommendedProducts(product.id);
            setFilteredProducts(recommendations);
            // Randomly select a filter description
            setFilterIndex(Math.floor(Math.random() * filterDescriptions.length));
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
            showToast('error', 'Failed to load recommendations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [product.id]);

    useEffect(() => {
        fetchRecommendations();
    }, [fetchRecommendations]);

    if (isLoading) {
        return <div>Loading recommendations...</div>;
    }

    return (
        <main className='recommendations_main_container page_container flex_column_center'>
            <p className='recommendations_page_title'>RECOMMENDED TREATS</p>
            <p className='recommendations_page_text'>{filterDescriptions[filterIndex]}</p>

            <section className='products_container'>
                {filteredProducts.slice(0, viewAllActive ? undefined : 4).map(product => (
                    <Product
                        key={product.id}
                        product={product}
                    />
                ))}
            </section>
            {
                (!viewAllActive && filteredProducts.length > 4) && 
                <button 
                    className='view_all_button border_button' 
                    onClick={() => setViewAllActive(true)}
                >
                    VIEW ALL TREATS
                </button>
            }
        </main>
    )
}

export default Recommendations;