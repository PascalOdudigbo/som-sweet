// /api/discounts/

import { NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET() {
  try {
    const discounts = await db.discount.findMany({
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
    return NextResponse.json(discounts);
  } catch (error) {
    console.error('Failed to fetch discounts:', error);
    return NextResponse.json({ error: 'Failed to fetch discounts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const discount = await db.discount.create({
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
    console.error('Failed to create discount:', error);
    return NextResponse.json({ error: 'Failed to create discount' }, { status: 500 });
  }
}
