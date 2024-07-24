import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedUserId = await verifyToken(token);
    const orderData = await req.json();

    if (!decodedUserId || decodedUserId.toString() !== orderData.userId.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const newOrder = await prisma.order.create({
      data: {
        ...orderData,
        orderItems: {
          create: orderData.orderItems
        }
      },
      include: { orderItems: true }
    });

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}