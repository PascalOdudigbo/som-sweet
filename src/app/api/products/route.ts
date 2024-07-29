// /api/products
import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
        variations: true,
        images: true,
        reviews: true,
        orderItems: true,
        discounts: {
          include: {
            discount: true
          }
        },
        wishlistedBy: true,
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products', message: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        categoryId: data.categoryId,
        active: data.active,
      },
      include: {
        category: true,
        variations: true,
        images: true,
        reviews: true,
        orderItems: true,
        discounts: {
          include: {
            discount: true
          }
        },
        wishlistedBy: true,
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product', message: (error as Error).message }, { status: 500 });
  }
}