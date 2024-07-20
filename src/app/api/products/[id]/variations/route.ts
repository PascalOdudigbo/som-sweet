// app/api/products/[productId]/variations

import { NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = parseInt(params.id);
    const variations = await db.productVariation.findMany({
      where: { productId },
    });
    return NextResponse.json(variations);
  } catch (error) {
    console.error('Failed to fetch product variations:', error);
    return NextResponse.json({ error: 'Failed to fetch product variations' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = parseInt(params.id);
    const data = await request.json();
    const variation = await db.productVariation.create({
      data: { ...data, productId },
    });
    return NextResponse.json(variation);
  } catch (error) {
    console.error('Failed to create product variation:', error);
    return NextResponse.json({ error: 'Failed to create product variation' }, { status: 500 });
  }
}

