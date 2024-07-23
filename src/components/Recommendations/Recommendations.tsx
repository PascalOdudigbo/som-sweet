'use client'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import "./_recommendations.scss"
import { Loading, Product } from '@/components';
import { ProductType } from '@/utils/allModelTypes';
import { getAllProducts } from '@/utils/productsManagement';
import { showToast } from '@/utils/toast';

interface RecommendationsType {
    product: ProductType;
}

const filterDescriptions = [
    "Here are some similar treats for you to consider, these suggestions were filtered based on similarity in product price range.",
    "Here are some similar treats for you to consider, these suggestions were filtered based on similarity in product category and price range.",
    "Here are some similar treats for you to consider, these suggestions were filtered based on similarity in product category."
];

function Recommendations({ product }: RecommendationsType) {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [filterIndex, setFilterIndex] = useState<number>(0);
    const [viewAllActive, setViewAllActive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const filterFunctions = useMemo(() => [
        (products: ProductType[], targetProduct: ProductType) => products.filter(p =>
            (p.basePrice >= targetProduct.basePrice - 5 && p.basePrice <= targetProduct.basePrice + 5) && (targetProduct.id !== p.id)
        ),
        (products: ProductType[], targetProduct: ProductType) => products.filter(p =>
            (p.basePrice >= targetProduct.basePrice - 5 && p.basePrice <= targetProduct.basePrice + 5) &&
            (p.categoryId === targetProduct.categoryId) && (targetProduct.id !== p.id)
        ),
        (products: ProductType[], targetProduct: ProductType) => products.filter(p => 
            p.categoryId === targetProduct.categoryId && targetProduct.id !== p.id
        )
    ], []);

    const applyFilter = useCallback((index: number, products: ProductType[]): boolean => {
        const filteredResults = filterFunctions[index](products, product);
        if (filteredResults.length > 0) {
            setFilteredProducts(filteredResults);
            return true;
        }
        return false;
    }, [filterFunctions, product]);

    const tryFilter = useCallback((products: ProductType[], attempts: number = 0) => {
        if (attempts >= filterFunctions.length) {
            setFilteredProducts([]);
            setViewAllActive(true);
            return;
        }

        const newFilterIndex = Math.floor(Math.random() * filterFunctions.length);
        setFilterIndex(newFilterIndex);

        if (!applyFilter(newFilterIndex, products)) {
            tryFilter(products, attempts + 1);
        }
    }, [filterFunctions.length, applyFilter]);

    useEffect(() => {
        const fetchAndFilterProducts = async () => {
            setIsLoading(true);
            try {
                const fetchedProducts = await getAllProducts();
                if (fetchedProducts) {
                    setProducts(fetchedProducts);
                    tryFilter(fetchedProducts);
                } else {
                    showToast("error", "Products not found");
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
                showToast("error", "Failed to fetch products");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndFilterProducts();
    }, [tryFilter]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <main className='recommendations_main_container page_container flex_column_center'>
            <p className='recommendations_page_title'>RECOMMENDED TREATS</p>
            <p className='recommendations_page_text'>{filterDescriptions[filterIndex]}</p>

            <section className='products_container'>
                {filteredProducts.map(product => {
                    if (viewAllActive || filteredProducts.indexOf(product) <= 3) {
                        return <Product
                            key={product.id}
                            product={product}
                        />
                    }
                    return null;
                })}
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