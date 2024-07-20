import { ProductType, ProductImageType, ProductVariationType } from "./allModelTypes";

export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch products: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    throw error;
  }
}

export async function getProductById(id: number): Promise<ProductType> {
  try {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch product: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getProductById:', error);
    throw error;
  }
}

export async function getProductsByCategory(categoryId: number): Promise<ProductType[]> {
  try {
    const response = await fetch(`/api/products/category/${categoryId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch products by category: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    throw error;
  }
}

export async function createProduct(product: Omit<ProductType, 'id' | 'createdAt' | 'updatedAt' | 'variations' | 'images' | 'reviews' | 'orderItems' | 'discounts' | 'wishlistedBy'>): Promise<ProductType> {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create product: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error;
  }
}

export async function updateProduct(id: number, product: Partial<Omit<ProductType, 'id' | 'createdAt' | 'updatedAt' | 'variations' | 'images' | 'reviews' | 'orderItems' | 'discounts' | 'wishlistedBy'>>): Promise<ProductType> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update product: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in updateProduct:', error);
    throw error;
  }
}

export async function deactivateProduct(id: number): Promise<ProductType> {
  return updateProduct(id, { active: false });
}

export async function deleteOrDeactivateProduct(id: number): Promise<{ action: 'deleted' | 'deactivated', product: ProductType }> {
  const response = await fetch(`/api/products/${id}/delete-or-deactivate`, {
    method: 'POST',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to process product');
  }
  return response.json();
}

export async function addProductImage(productId: number, imageUrl: string, imagePublicId: string): Promise<ProductImageType> {
  try {
    const response = await fetch(`/api/products/${productId}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, imagePublicId }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to add product image: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in addProductImage:', error);
    throw error;
  }
}

export async function removeProductImage(productId: number, imageId: number): Promise<void> {
  try {
    const response = await fetch(`/api/products/${productId}/images/${imageId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
      throw new Error(`Failed to remove product image: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error('Error in removeProductImage:', error);
    throw error;
  }
}

export function searchProducts(searchTerm: string, products: ProductType[]): ProductType[] {
  if (searchTerm === "") {
    return products;
  } else {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}