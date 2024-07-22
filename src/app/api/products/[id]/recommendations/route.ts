// In app/api/products/[id]/recommendations/route.ts

import { NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = parseInt(params.id);
    const product = await db.product.findUnique({ where: { id: productId }, include: { category: true } });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const recommendations = await db.product.findMany({
      where: {
        AND: [
          { id: { not: productId } },
          { 
            OR: [
              { categoryId: product.categoryId },
              { 
                basePrice: {
                  gte: product.basePrice - 5,
                  lte: product.basePrice + 5
                }
              }
            ]
          }
        ]
      },
      take: 10,
      include: {
        category: true,
        images: true,
        variations: true,
      }
    });

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Failed to fetch recommended products:', error);
    return NextResponse.json({ error: 'Failed to fetch recommended products' }, { status: 500 });
  }
}