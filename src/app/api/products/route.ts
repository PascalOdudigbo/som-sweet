// app/api/products
import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        images: true,
        variations: true,
        reviews: true,
        orderItems: true,
        discounts: true,
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const product = await db.product.create({
      data: {
        ...data,
        images: { create: data.images },
        variations: { create: data.variations },
      },
      include: {
        images: true,
        variations: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}