import { ProductVariationType } from "./allModelTypes";

export async function getProductVariations(productId: number): Promise<ProductVariationType[]> {
    const response = await fetch(`/api/products/${productId}/variations`);
    if (!response.ok) {
      throw new Error('Failed to fetch product variations');
    }
    return response.json();
  }
  
  export async function getProductVariationById(productId: number, variationId: number): Promise<ProductVariationType> {
    const response = await fetch(`/api/products/${productId}/variations/${variationId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product variation');
    }
    return response.json();
  }
  
  export async function createProductVariation(productId: number, variation: Omit<ProductVariationType, 'id' | 'productId' | 'createdAt' | 'updatedAt'>): Promise<ProductVariationType> {
    const response = await fetch(`/api/products/${productId}/variations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variation),
    });
    if (!response.ok) {
      throw new Error('Failed to create product variation');
    }
    return response.json();
  }
  
  export async function updateProductVariation(productId: number, variationId: number, variation: Partial<Omit<ProductVariationType, 'id' | 'productId' | 'createdAt' | 'updatedAt'>>): Promise<ProductVariationType> {
    const response = await fetch(`/api/products/${productId}/variations/${variationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variation),
    });
    if (!response.ok) {
      throw new Error('Failed to update product variation');
    }
    return response.json();
  }
  
  export async function deleteProductVariation(productId: number, variationId: number): Promise<void> {
    const response = await fetch(`/api/products/${productId}/variations/${variationId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product variation');
    }
  }
  