'use client'
import { ProductImageType, ProductType, ProductVariationType } from '@/utils/allModelTypes'
import { testBusiness, testProducts } from '@/utils/allTestData'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './_product.scss'
import Image from 'next/image'
import { paymentsBg, minusIcon, addIcon } from '@/assets'
import { CustomRating, Loading, MinimizableLayout, NavChildFooterLayout, Recommendations, TextArea } from '@/components'
import { useParams, useRouter } from 'next/navigation'
import { getProductById } from '@/utils/productsManagement'
import { showToast } from '@/utils/toast'
import { addToCart } from '@/utils/cartManagement'
import { useAuth } from '@/hooks/useAuth'

// Defining the product image props type
interface ProductImageProps {
  image: ProductImageType;
  isActive: boolean;
  productName: string;
  onClick: (url: string) => void;
}

// Defining the product image sub-component
const ProductImage: React.FC<ProductImageProps> = ({ image, isActive, productName, onClick }) => {
  const handleClick = useCallback(() => onClick(image?.imageUrl?.toString()), [image.imageUrl, onClick]);

  // Conditional classes for the images
  const imageClass = useMemo(() => {
    return isActive ? 'product_image active_border' : 'product_image';
  }, [isActive]);

  return (
    <Image
      key={image.id}
      className={imageClass}
      src={image?.imageUrl?.toString()}
      alt={productName}
      onClick={handleClick}
      height={200}
      width={200}
    />
  );
};

// Defining the product variation sub-component
const ProductVariation: React.FC<{ variation: ProductVariationType, isActive: boolean, setTargetVariation: React.Dispatch<React.SetStateAction<ProductVariationType | undefined>> }> = ({ variation, isActive, setTargetVariation }) => {
  // Conditional classes for the product variations
  const variationClass = useMemo(() => {
    return isActive ? 'variant active_button' : 'variant';
  }, [isActive]);

  return <button className={variationClass} onClick={() => { setTargetVariation(variation) }}>{variation.name}</button>
};

// Defining the quantity component 
const ProductQuantity: React.FC<{ quantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>> }> = ({ quantity, setQuantity }) => {
  return (
    <section className='quantity_container flex_column'>
      <p className='top_text_section_title'>Quantity</p>
      <div className='text_and_buttons_wrapper flex_row_center'>
        <input className='quantity_input' type='text' value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} />
        <Image className="quantity_button increase" src={addIcon} alt='increase' title='increase' onClick={() => { setQuantity(prev => prev + 1) }} />
        <Image className="quantity_button decrease" src={minusIcon} alt='decrease' title='decrease' onClick={() => {
          setQuantity(prev =>
            prev !== 1 ? prev - 1 : prev
          )
        }} />
      </div>
    </section>
  );

}

function Product() {
  // The useParams hook to get the product id from the route path
  const params = useParams();
  // Defining state variables to handle dynamic
  const [product, setProduct] = useState<ProductType | null>(null);
  const [businessRefundPolicy, setBusinessRefundPolicy] = useState<string>('');
  const [targetImage, setTargetImage] = useState<string>("");
  const [rating, setRating] = useState<number | null>(4.45)
  const [targetVariation, setTargetVariation] = useState<ProductVariationType | undefined>();
  const [quantity, setQuantity] = useState<number>(1)
  const [customText, setCustomText] = useState<string>("")
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);


  // Defining the router variable function
  const router = useRouter();
  // getting the user data and loading status
  const { user, loading, loadUserFromToken } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(parseInt(params?.id.toString()))
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setTargetImage(fetchedProduct?.images?.[0]?.imageUrl.toString() ?? "");
          setTargetVariation(fetchedProduct.variations?.[0]);
          setBusinessRefundPolicy(testBusiness.refundsPolicy || '');
        } else {
          showToast("error", "Product not found")
          router.back();
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
        showToast("error", "Failed to fetch product")
        router.back();
      }
    }
    fetchProduct()
  }, [params.id, router])

  const displayPrice = useMemo(() => {
    const price = targetVariation?.price ?? product?.basePrice;
    return (parseFloat(price?.toString() ?? "0"))?.toFixed(2);
  }, [targetVariation, product?.basePrice]);

  const handleAddToCart = async () => {
    if (loading) {
      showToast("info", "Please wait...");
      return;
    }

    if (!user) {
      showToast("error", "Please login to add items to cart");
      router.push('/signin');
      return;
    }

    if (!product) {
      showToast("error", "Product not found");
      return;
    }

    setIsAddingToCart(true);
    try {
      const updatedCart = await addToCart(product, targetVariation || null, quantity, customText, user?.id);
      if (updatedCart) {
        showToast("success", "Product added to cart successfully");
        loadUserFromToken();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", "Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product) {
    return <Loading />
  }



  return (
    <NavChildFooterLayout>
      <main className='product_container page_container flex_column_center'>
        <section className='images_and_data_container flex_row center'>
          <section className='product_images_container flex_column_center'>
            <Image className='product_target_image' src={targetImage} alt={product?.description ?? product?.name} title={product?.name} height={200} width={200} />
            <section className='product_images_container flex_row_center'>
              {
                //mapping through the product images
                product?.images && product?.images?.map(image =>
                  <ProductImage
                    key={image.id}
                    image={image}
                    isActive={image.imageUrl === targetImage}
                    productName={product?.name}
                    onClick={setTargetImage}
                  />
                )
              }
            </section>
            <Image className='stripe_assurance_image' src={paymentsBg} alt='Powered by Stripe' />
          </section>

          <section className='product_data_container flex_column'>
            <p className='product_name'>{product?.name}</p>
            <CustomRating rating={rating} />
            <p className='product_price'>£{displayPrice}</p>

            <section className='variants_container'>
              {/* looping through the product variations */}
              {
                product?.variations?.map(variation =>
                  <ProductVariation
                    key={variation.id}
                    variation={variation}
                    isActive={targetVariation?.id === variation.id}
                    setTargetVariation={setTargetVariation}
                  />
                )
              }
            </section>

            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
            <TextArea
              label='Custom Text or Instructions'
              inputValue={customText}
              required={false}
              rows={5}
              cols={45}
              onChangeFunction={(e) => { setCustomText(e.target.value) }}
            />

            <button
              className='add_to_cart_button border_button'
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </button>

            <section className='minimizable_sections_container'>
              <MinimizableLayout title='Product details' isActiveInit={true}>
                <pre className='preformatted_text'>{product?.description}</pre>
              </MinimizableLayout>


              <MinimizableLayout isActiveInit={false} title='Reviews'>
              {/* place then reviews component here */}
                <>
                </>
              </MinimizableLayout>



              <MinimizableLayout isActiveInit={false} title='Refund policy'>
                <pre className='preformatted_text'>{businessRefundPolicy}</pre>
              </MinimizableLayout>
            </section>




          </section>
        </section>

        <Recommendations product={product} />


      </main>
    </NavChildFooterLayout>

  )
}

export default Product
