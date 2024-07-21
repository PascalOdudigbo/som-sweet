// app/api/staff/[id]
import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const staff = await db.user.findUnique({
      where: { id: parseInt(params.id) },
      include: { role: true },
    });
    if (staff) {
      return NextResponse.json(staff);
    } else {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to fetch staff member:', error);
    return NextResponse.json({ error: 'Failed to fetch staff member', message: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const staffData = await request.json();
    const updatedStaff = await db.user.update({
      where: { id: parseInt(params.id) },
      data: staffData,
      include: { role: true },
    });
    return NextResponse.json(updatedStaff);
  } catch (error) {
    console.error('Failed to update staff member:', error);
    return NextResponse.json({ error: 'Failed to update staff member', message: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.user.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error('Failed to delete staff member:', error);
    return NextResponse.json({ error: 'Failed to delete staff member', message: (error as Error).message }, { status: 500 });
  }
}