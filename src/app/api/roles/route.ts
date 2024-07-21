// app/api/roles/route.ts

import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const roles = await db.role.findMany();
    return NextResponse.json(roles);
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newRole = await db.role.create({ data });
    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.error('Failed to create role:', error);
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 });
  }
}