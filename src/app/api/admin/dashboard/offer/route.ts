// /api/adminDashboard/offer
import { NextResponse } from 'next/server';
import { getOfferStats } from '@/utils/pages/adminDashboard/adminDashboard';

export async function GET() {
  try {
    const offerData = await getOfferStats();
    return NextResponse.json(offerData);
  } catch (error) {
    console.error('Failed to fetch offers statistics:', error);
    return NextResponse.json({ error: 'Failed to fetch offers statistics' }, { status: 500 });
  }
}
