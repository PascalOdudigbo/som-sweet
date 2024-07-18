// app/api/products/[id]
import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await db.product.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        images: true,
        variations: true,
        reviews: true,
        orderItems: true,
        discounts: true,
      }
    });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const product = await db.product.update({
      where: { id: parseInt(params.id) },
      data,
      include: {
        images: true,
        variations: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // First, delete associated records
    await db.productImage.deleteMany({
      where: { productId: parseInt(params.id) },
    });
    await db.productVariation.deleteMany({
      where: { productId: parseInt(params.id) },
    });
    
    // Then delete the product
    await db.product.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}