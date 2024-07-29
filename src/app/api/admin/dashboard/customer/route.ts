// app/api/admin/dashboard/customer/
import { NextResponse } from 'next/server';
import { getCustomerStats } from '@/utils/adminDashboard';

export async function GET() {
  try {
    const customerData = await getCustomerStats();
    return NextResponse.json(customerData);
  } catch (error) {
    console.error('Failed to fetch customer statistics:', error);
    return NextResponse.json({ error: 'Failed to fetch customer statistics' }, { status: 500 });
  }
}