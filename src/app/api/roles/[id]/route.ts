// app/api/roles/[id]/route.ts

import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const role = await db.role.findUnique({ where: { id: parseInt(params.id) } });
    if (role) {
      return NextResponse.json(role);
    } else {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to fetch role:', error);
    return NextResponse.json({ error: 'Failed to fetch role' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const updatedRole = await db.role.update({
      where: { id: parseInt(params.id) },
      data,
    });
    return NextResponse.json(updatedRole);
  } catch (error) {
    console.error('Failed to update role:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.role.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Failed to delete role:', error);
    return NextResponse.json({ error: 'Failed to delete role' }, { status: 500 });
  }
}