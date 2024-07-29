// /api/refunds/
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    // Verifying if request included the user data token
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Authenticating the token and geting user ID
    const decodedUserId = await verifyToken(token);
    const { orderId, amount, reason } = await req.json();
    // GEtting the order from the DB
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true },
    });
    // Ensuring that the order belongs to the user
    if (!order || order.userId !== decodedUserId) {
      return NextResponse.json({ error: 'Order not found or unauthorized' }, { status: 404 });
    }
    
    // Create refund request in database
    const refund = await prisma.refund.create({
      data: {
        orderId,
        amount,
        reason,
        status: 'Pending',
      },
    });

    return NextResponse.json(refund);
  } catch (error) {
    console.error('Failed to create refund request:', error);
    return NextResponse.json({ error: 'Failed to create refund request' }, { status: 500 });
  }
}