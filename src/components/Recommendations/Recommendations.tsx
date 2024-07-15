'use client'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import "./_recommendations.scss"
import { testProducts } from '@/app/utils/allTestData';
import { Product } from '@/components';
import { OrderType, ProductType } from '@/app/utils/allModelTypes';

// Defining the Recommendations component props type
interface RecommendationsType {
    product: ProductType;
    orders?: OrderType;
}
// An array of all the filter function descriptions
const filterDescriptions = [
    "Here are some similar treats for you to consider, these suggestions were filtered based on similarity in product price range.",
    "Here are some similar treats for you to consider, these suggestions were filtered based on similarity in product category and price range.",
    "Here are some similar treats for you to consider, these suggestions were filtered based on similarity in product category."
];

function Recommendations({ product }: RecommendationsType) {
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [filterIndex, setFilterIndex] = useState<number>(0);
    const [viewAllActive, setViewAllActive] = useState<boolean>(false);
    // An array of filter functions arranged based on the filter description
    const filterFunctions = useMemo(() => [
        (targetProduct: ProductType) => testProducts.filter(p =>
            (p.basePrice >= targetProduct.basePrice - 5 && p.basePrice <= targetProduct.basePrice + 5) && (targetProduct.id !== p.id)
        ),
        (targetProduct: ProductType) => testProducts.filter(p =>
            (p.basePrice >= targetProduct.basePrice - 5 && p.basePrice <= targetProduct.basePrice + 5) &&
            (p.category === targetProduct.category) && (targetProduct.id !== p.id)
        ),
        (targetProduct: ProductType) => testProducts.filter(p => p.category === targetProduct.category && targetProduct.id !== p.id)
    ], []);

    // A function to apply the filter on the products
    const applyFilter = useCallback((index: number): boolean => {
        const filteredResults = filterFunctions[index](product);
        if (filteredResults.length > 0) {
            setFilteredProducts(filteredResults);
            return true;
        }
        return false;
    }, [filterFunctions, product]);

    useEffect(() => {
        const tryFilter = (attempts: number = 0) => {
            if (attempts >= filterFunctions.length) {
                // If we've tried all filters and still got no results, set an empty array
                setFilteredProducts([]);
                setViewAllActive(true)
                return;
            }

            const newFilterIndex = Math.floor(Math.random() * filterFunctions.length);
            setFilterIndex(newFilterIndex);

            if (!applyFilter(newFilterIndex)) {
                // If the filter returned no results, try again with a different index
                tryFilter(attempts + 1);
            }
        };

        tryFilter();
    }, [applyFilter, filterFunctions.length]);

    return (
        <main className='recommendations_main_container page_container flex_column_center'>
            <p className='recommendations_page_title'>RECOMMENDED TREATS</p>
            <p className='recommendations_page_text'>{filterDescriptions[filterIndex]}</p>

            <section className='products_container'>
                {filteredProducts.map(product => {

                    if (viewAllActive === true) {
                        return <Product
                            key={product.id}
                            product={product}
                        />
                    }
                    else {
                        if (filteredProducts.indexOf(product) <= 3) {
                            return <Product
                                key={product.id}
                                product={product}/>
                        }

                    }
                })}
            </section>
            {
                (viewAllActive !== true && filteredProducts.length > 4) && <button className='view_all_button border_button' onClick={()=>{setViewAllActive(prev => !prev)}}>VIEW ALL TREATS</button>
            }
        </main>
    )
}

export default Recommendations;