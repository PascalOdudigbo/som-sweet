// app/api/staff/[id]/role
import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { roleId } = await request.json();
    const updatedStaff = await db.user.update({
      where: { id: parseInt(params.id) },
      data: { roleId: parseInt(roleId) },
      include: { role: true },
    });
    return NextResponse.json(updatedStaff);
  } catch (error) {
    console.error('Failed to assign role:', error);
    return NextResponse.json({ error: 'Failed to assign role', message: (error as Error).message }, { status: 500 });
  }
}