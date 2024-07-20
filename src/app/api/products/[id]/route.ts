import { NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await db.product.findUnique({
      where: { id: parseInt(params.id) },
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
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product', message: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const product = await db.product.update({
      where: { id: parseInt(params.id) },
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
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product', message: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.product.delete({
      where: { id: parseInt(params.id) }
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product', message: (error as Error).message }, { status: 500 });
  }
}