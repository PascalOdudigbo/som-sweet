// app/api/discounts/[id]/products

import { NextResponse } from 'next/server';
import db from '../../../../../db/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const products = await db.discountProduct.findMany({
      where: { discountId: parseInt(params.id) },
      include: { product: true }
    });
    return NextResponse.json(products.map(dp => dp.product));
  } catch (error) {
    console.error('Failed to fetch products for discount:', error);
    return NextResponse.json({ error: 'Failed to fetch products for discount' }, { status: 500 });
  }
}