
// app/api/discounts/[id]

import { NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const discount = await db.discount.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
    if (!discount) {
      return NextResponse.json({ error: 'Discount not found' }, { status: 404 });
    }
    return NextResponse.json(discount);
  } catch (error) {
    console.error('Failed to fetch discount:', error);
    return NextResponse.json({ error: 'Failed to fetch discount' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const discount = await db.discount.update({
      where: { id: parseInt(params.id) },
      data,
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
    return NextResponse.json(discount);
  } catch (error) {
    console.error('Failed to update discount:', error);
    return NextResponse.json({ error: 'Failed to update discount' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.discount.delete({
      where: { id: parseInt(params.id) }
    });
    return NextResponse.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    console.error('Failed to delete discount:', error);
    return NextResponse.json({ error: 'Failed to delete discount' }, { status: 500 });
  }
}
