// /api/refunds/[refundId]/deny/

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';

export async function POST(req: NextRequest, { params }: { params: { refundId: string } }) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedUserId = await verifyToken(token);
    if (!decodedUserId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const refundId = parseInt(params.refundId);
    const refund = await prisma.refund.findUnique({
      where: { id: refundId },
    });

    if (!refund) {
      return NextResponse.json({ error: 'Refund not found' }, { status: 404 });
    }

    if (refund.status !== 'Pending') {
      return NextResponse.json({ error: 'Refund is not in a pending state' }, { status: 400 });
    }

    const updatedRefund = await prisma.refund.update({
      where: { id: refundId },
      data: {
        status: 'Denied',
        approvedBy: decodedUserId,
        approvedAt: new Date(),
      },
    });

    return NextResponse.json(updatedRefund);
  } catch (error) {
    console.error('Failed to deny refund:', error);
    return NextResponse.json({ error: 'Failed to deny refund' }, { status: 500 });
  }
}
