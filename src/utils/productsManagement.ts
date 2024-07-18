import { ProductImageType, ProductType, ProductVariationType } from "./allModelTypes";

export async function getAllProducts(): Promise<ProductType[]> {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function getProductById(id: number): Promise<ProductType> {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

// Get products by category
export async function getProductsByCategory(categoryId: number): Promise<ProductType[]> {
  const response = await fetch(`/api/products/category/${categoryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  return response.json();
}


export async function createProduct(product: Omit<ProductType, 'id' | 'images' | 'variations' | 'reviews' | 'orderItems' | 'discounts'>): Promise<ProductType> {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return response.json();
}

export async function updateProduct(id: number, product: Partial<ProductType>): Promise<ProductType> {
  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
}

export async function deactivateProduct(id: number): Promise<ProductType> {
  return updateProduct(id, { active: false });
}

export async function addProductImage(productId: number, imageUrl: string, imagePublicId: string): Promise<ProductImageType> {
  const response = await fetch(`/api/products/${productId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl, imagePublicId }),
  });
  if (!response.ok) {
    throw new Error('Failed to add product image');
  }
  return response.json();
}

export async function removeProductImage(productId: number, imageId: number): Promise<void> {
  const response = await fetch(`/api/products/${productId}/images/${imageId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to remove product image');
  }
}

export async function addProductVariation(productId: number, variation: Omit<ProductVariationType, 'id' | 'productId'>): Promise<ProductVariationType> {
  const response = await fetch(`/api/products/${productId}/variations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(variation),
  });
  if (!response.ok) {
    throw new Error('Failed to add product variation');
  }
  return response.json();
}

export async function updateProductVariation(productId: number, variationId: number, variation: Partial<ProductVariationType>): Promise<ProductVariationType> {
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

export async function removeProductVariation(productId: number, variationId: number): Promise<void> {
  const response = await fetch(`/api/products/${productId}/variations/${variationId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to remove product variation');
  }
}

export function handleImageFileChange(
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedImageFile: React.Dispatch<React.SetStateAction<File | null>>
) {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedImageFile(file);
  }
}

export async function uploadImageToCloudinary(file: File): Promise<{ url: string; publicId: string } | null> {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!);
  data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);
  data.append('folder', 'sum_sweet_products');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: data }
    );
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    const result = await response.json();
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

export async function deleteCloudinaryImage(publicId: string): Promise<boolean> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = generateSignature(timestamp, publicId, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!);

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  try {
    const response = await fetch(url, { method: 'POST', body: formData });
    return response.ok;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return false;
  }
}

function generateSignature(timestamp: string, publicId: string, apiSecret: string): string {
  const crypto = require('crypto');
  const toSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  return crypto.createHash('sha1').update(toSign).digest('hex');
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