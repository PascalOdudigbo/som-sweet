// /api/admin/dashboard/salesOverview
import { NextResponse } from 'next/server';
import { getSalesOverview } from '@/utils/adminDashboard';

export async function GET() {
  try {
    const salesOverview = await getSalesOverview();
    return NextResponse.json(salesOverview);
  } catch (error) {
    console.error('Failed to fetch sales overview data:', error);
    return NextResponse.json({ error: 'Failed to fetch sales overview data' }, { status: 500 });
  }
}