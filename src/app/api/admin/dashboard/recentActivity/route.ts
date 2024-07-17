// api/admin-dashboard/recentActivity
import { NextResponse } from 'next/server';
import { getRecentActivity } from '@/utils/pages/adminDashboard/adminDashboard';

export async function GET() {
  try {
    const recentActivity = await getRecentActivity();
    return NextResponse.json(recentActivity);
  } catch (error) {
    console.error('Failed to fetch recent activity data:', error);
    return NextResponse.json({ error: 'Failed to fetch recent activity data' }, { status: 500 });
  }
}