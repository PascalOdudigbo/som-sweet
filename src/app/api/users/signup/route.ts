import { NextResponse } from 'next/server';
import db from '@/db/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the customer role
    const customerRole = await db.role.findUnique({ where: { name: 'Customer' } });
    if (!customerRole) {
      return NextResponse.json({ error: 'Customer role not found' }, { status: 500 });
    }
    console.log(customerRole)
    // Create new user
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        roleId: customerRole.id,
        active: true,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}