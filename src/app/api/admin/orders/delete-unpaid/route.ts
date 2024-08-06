// /api/admin/orders/delete-unpaid/
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';

export async function DELETE(req: NextRequest) {
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

    const deletedOrders = await prisma.order.deleteMany({
      where: {
        OR: [
          { status: 'Pending' },
          {
            AND: [
              { status: 'Processing' },
              { payment: { status: 'unpaid' } },
            ],
          },
        ],
      },
    });

    return NextResponse.json({ message: `Deleted ${deletedOrders.count} unpaid and pending orders` });
  } catch (error) {
    console.error('Failed to delete unpaid and pending orders:', error);
    return NextResponse.json({ error: 'Failed to delete unpaid and pending orders' }, { status: 500 });
  }
}
