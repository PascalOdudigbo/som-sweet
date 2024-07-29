// /api/admin/dashboard/staff
import { NextResponse } from 'next/server';
import { getStaffStats } from '@/utils/adminDashboard';

export async function GET() {
  try {
    const staffData = await getStaffStats();
    return NextResponse.json(staffData);
  } catch (error) {
    console.error('Failed to fetch staff statistics:', error);
    return NextResponse.json({ error: 'Failed to fetch staff statistics' }, { status: 500 });
  }
}