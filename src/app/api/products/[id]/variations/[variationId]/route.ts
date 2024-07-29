// /api/products/[id]/variations/[variationId]/

import { NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET(request: Request, { params }: { params: { id: string, variationId: string } }) {
  try {
    const productId = parseInt(params.id);
    const variationId = parseInt(params.variationId);
    const variation = await db.productVariation.findUnique({
      where: { id: variationId, productId },
    });
    if (!variation) {
      return NextResponse.json({ error: 'Product variation not found' }, { status: 404 });
    }
    return NextResponse.json(variation);
  } catch (error) {
    console.error('Failed to fetch product variation:', error);
    return NextResponse.json({ error: 'Failed to fetch product variation' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string, variationId: string } }) {
  try {
    const productId = parseInt(params.id);
    const variationId = parseInt(params.variationId);
    const data = await request.json();
    const variation = await db.productVariation.update({
      where: { id: variationId, productId },
      data,
    });
    return NextResponse.json(variation);
  } catch (error) {
    console.error('Failed to update product variation:', error);
    return NextResponse.json({ error: 'Failed to update product variation' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string, variationId: string } }) {
  try {
    const productId = parseInt(params.id);
    const variationId = parseInt(params.variationId);
    await db.productVariation.delete({
      where: { id: variationId, productId },
    });
    return NextResponse.json({ message: 'Product variation deleted successfully' });
  } catch (error) {
    console.error('Failed to delete product variation:', error);
    return NextResponse.json({ error: 'Failed to delete product variation' }, { status: 500 });
  }
}