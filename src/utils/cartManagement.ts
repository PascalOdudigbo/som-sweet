import { ProductType, ProductVariationType, CartType } from './allModelTypes';
import { showToast } from './toast';

export async function getCart(userId: number): Promise<CartType | null> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`/api/cart/${userId}`, { 
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 0 }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    showToast('error', 'Failed to fetch cart');
    return null;
  }
}

export async function addToCart(
  product: ProductType,
  variation: ProductVariationType | null,
  quantity: number,
  customText: string,
  userId: number
): Promise<CartType | null> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ product, variation, quantity, customText, userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add item to cart');
    }
    
    const updatedCart: CartType = await response.json();
    return updatedCart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error; // Re-throw the error to be handled by the component
  }
}

export function calculateTotal(cart: CartType): number {
  return cart.items.reduce((total, item) => {
    const price = item.variation ? item.variation.price : item.product.basePrice;
    return total + item.quantity * price;
  }, 0);
}