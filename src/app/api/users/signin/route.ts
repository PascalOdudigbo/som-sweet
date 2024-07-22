import { NextResponse } from 'next/server';
import db from '@/db/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if user exists
    const user = await db.user.findUnique({ 
      where: { email },
      include: { role: true }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check if user is active
    if (!user.active) {
      return NextResponse.json({ error: 'Account is inactive' }, { status: 403 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role.name },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // Remove sensitive information from user object
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token
    }, { status: 200 });

  } catch (error) {
    console.error('Sign in failed:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}