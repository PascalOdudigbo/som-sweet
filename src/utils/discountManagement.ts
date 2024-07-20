// utils/discountsManagement.ts

import { DiscountType, ProductType } from './allModelTypes';

export async function getAllDiscounts(): Promise<DiscountType[]> {
  const response = await fetch('/api/discounts');
  if (!response.ok) {
    throw new Error('Failed to fetch discounts');
  }
  return response.json();
}

export async function getDiscountById(id: number): Promise<DiscountType> {
  const response = await fetch(`/api/discounts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch discount');
  }
  return response.json();
}

export async function createDiscount(discount: Omit<DiscountType, 'id' | 'createdAt' | 'updatedAt'>): Promise<DiscountType> {
  const response = await fetch('/api/discounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(discount),
  });
  if (!response.ok) {
    throw new Error('Failed to create discount');
  }
  return response.json();
}

export async function updateDiscount(id: number, discount: Partial<Omit<DiscountType, 'id' | 'createdAt' | 'updatedAt'>>): Promise<DiscountType> {
  const response = await fetch(`/api/discounts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(discount),
  });
  if (!response.ok) {
    throw new Error('Failed to update discount');
  }
  return response.json();
}

export async function deleteDiscount(id: number): Promise<void> {
  const response = await fetch(`/api/discounts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete discount');
  }
}

export async function addProductToDiscount(discountId: number, productId: number): Promise<void> {
  const response = await fetch(`/api/discounts/${discountId}/products/${productId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to add product to discount');
  }
}

export async function removeProductFromDiscount(discountId: number, productId: number): Promise<void> {
  const response = await fetch(`/api/discounts/${discountId}/products/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to remove product from discount');
  }
}

export async function getProductsForDiscount(discountId: number): Promise<ProductType[]> {
  const response = await fetch(`/api/discounts/${discountId}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products for discount');
  }
  return response.json();
}