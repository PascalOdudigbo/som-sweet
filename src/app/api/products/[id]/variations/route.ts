// app/api/products/[id]/variations/route.ts
import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const variation = await db.productVariation.create({
      data: {
        ...data,
        productId: parseInt(params.id),
      }
    });
    return NextResponse.json(variation);
  } catch (error) {
    console.error('Failed to add product variation:', error);
    return NextResponse.json({ error: 'Failed to add product variation' }, { status: 500 });
  }
}

// app/api/products/[productId]/variations/[variationId]/route.ts
export async function PUT(request: Request, { params }: { params: { productId: string, variationId: string } }) {
  try {
    const data = await request.json();
    const variation = await db.productVariation.update({
      where: {
        id: parseInt(params.variationId),
        productId: parseInt(params.productId),
      },
      data,
    });
    return NextResponse.json(variation);
  } catch (error) {
    console.error('Failed to update product variation:', error);
    return NextResponse.json({ error: 'Failed to update product variation' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { productId: string, variationId: string } }) {
  try {
    await db.productVariation.delete({
      where: {
        id: parseInt(params.variationId),
        productId: parseInt(params.productId),
      }
    });
    return NextResponse.json({ message: 'Variation deleted successfully' });
  } catch (error) {
    console.error('Failed to remove product variation:', error);
    return NextResponse.json({ error: 'Failed to remove product variation' }, { status: 500 });
  }
}