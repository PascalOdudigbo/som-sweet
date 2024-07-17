// /api/adminDashboard/order
import { NextResponse } from 'next/server';
import { getOrderStats } from '@/utils/pages/adminDashboard/adminDashboard';

export async function GET() {
  try {
    const orderData = await getOrderStats();
    return NextResponse.json(orderData);
  } catch (error) {
    console.error('Failed to fetch order statistics:', error);
    return NextResponse.json({ error: 'Failed to fetch order statistics' }, { status: 500 });
  }
}