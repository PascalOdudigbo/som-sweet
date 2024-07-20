// app/api/discounts/[id]/products/[productId]

import { NextResponse } from 'next/server';
import db from '@/db/db';

export async function POST(request: Request, { params }: { params: { id: string, productId: string } }) {
  try {
    await db.discountProduct.create({
      data: {
        discountId: parseInt(params.id),
        productId: parseInt(params.productId)
      }
    });
    return NextResponse.json({ message: 'Product added to discount successfully' });
  } catch (error) {
    console.error('Failed to add product to discount:', error);
    return NextResponse.json({ error: 'Failed to add product to discount' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string, productId: string } }) {
  try {
    await db.discountProduct.delete({
      where: {
        discountId_productId: {
          discountId: parseInt(params.id),
          productId: parseInt(params.productId)
        }
      }
    });
    return NextResponse.json({ message: 'Product removed from discount successfully' });
  } catch (error) {
    console.error('Failed to remove product from discount:', error);
    return NextResponse.json({ error: 'Failed to remove product from discount' }, { status: 500 });
  }
}