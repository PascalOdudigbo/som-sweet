// /api/orders/
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; id: string } }
) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedUserId = await verifyToken(token);
    if (!decodedUserId || decodedUserId.toString() !== params.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(params.id),
        userId: parseInt(params.userId)
      },
      include: { orderItems: {
        include: {
          product: true,
          variation: true,
        }
      } }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to fetch order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string; id: string } }
) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedUserId = await verifyToken(token);
    if (!decodedUserId || decodedUserId.toString() !== params.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await req.json();

    const updatedOrder = await prisma.order.update({
      where: {
        id: parseInt(params.id),
        userId: parseInt(params.userId)
      },
      data: { status },
      include: { orderItems: true }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Failed to update order status:', error);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}