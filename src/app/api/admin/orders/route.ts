// /api/admin/orders/
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = await verifyToken(token);
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user || user.role.name !== 'Administrator') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: true,
            variation: true,
          },
        },
        shippingAddress: true,
        payment: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
    try {
      const token = req.headers.get('Authorization')?.split(' ')[1];
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const decodedUserId = await verifyToken(token);
      if (!decodedUserId) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
  
      // Check if the user is an admin
      const user = await prisma.user.findUnique({
        where: { id: decodedUserId },
        include: { role: true },
      });
  
      if (!user || user.role.name !== 'Administrator') {
        return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
      }
  
      const { orderId, status } = await req.json();
  
      const updatedOrder = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: { status },
        include: { 
          orderItems: {
            include: {
              product: true,
              variation: true,
            }
          },
          user: {
            select: {
              username: true,
              email: true,
            }
          },
          shippingAddress: true,
          payment: true,
        }
      });
  
      return NextResponse.json(updatedOrder);
    } catch (error) {
      console.error('Failed to update order status:', error);
      return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
    }
  }