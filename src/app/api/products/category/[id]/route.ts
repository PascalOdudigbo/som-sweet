// /api/products/category/[id]/
import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const products = await db.product.findMany({
      where: { categoryId: parseInt(params.id) },
      include: {
        category: true,
        variations: true,
        images: true,
        reviews: true,
        orderItems: true,
        discounts: true,
        wishlistedBy: true,
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    return NextResponse.json({ error: 'Failed to fetch products by category', message: (error as Error).message }, { status: 500 });
  }
}