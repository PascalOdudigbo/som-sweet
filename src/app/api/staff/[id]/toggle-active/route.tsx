// app/api/staff/[id]/toggle-active
import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const staff = await db.user.findUnique({ where: { id: parseInt(params.id) } });
    if (!staff) {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }

    const updatedStaff = await db.user.update({
      where: { id: parseInt(params.id) },
      data: { active: !staff.active },
      include: { role: true },
    });
    return NextResponse.json(updatedStaff);
  } catch (error) {
    console.error('Failed to toggle staff active status:', error);
    return NextResponse.json({ error: 'Failed to toggle staff active status', message: (error as Error).message }, { status: 500 });
  }
}