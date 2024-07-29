// /api/staff/route.ts
import db from '@/db/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  try {
    const staff = await db.user.findMany({
      where: { role: { name: { not: 'Customer' } } },
      include: { role: true },
    });
    return NextResponse.json(staff);
  } catch (error) {
    console.error('Failed to fetch staff:', error);
    return NextResponse.json({ error: 'Failed to fetch staff', message: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const staffData = await request.json();
    const hashedPassword = await bcrypt.hash(staffData.password, 10);
    const modifiedStaffData = {...staffData, password: hashedPassword}
    
    const newStaff = await db.user.create({
      data: modifiedStaffData,
      include: { role: true },
    });
    return NextResponse.json(newStaff, { status: 201 });
  } catch (error) {
    console.error('Failed to create staff member:', error);
    return NextResponse.json({ error: 'Failed to create staff member', message: (error as Error).message }, { status: 500 });
  }
}