import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedUserId = await verifyToken(token);
    if (!decodedUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedUserId },
      include: {
        role: true,
        addresses: true,
        orders: {
          include: {
            orderItems: {
              include: {
                product: true,
                variation: true,
              },
            },
            shippingAddress: true,
            payment: true,
          },
        },
        reviews: {
          include: {
            product: true,
          },
        },
        wishlist: true,
        cart: {
          include: {
            items: {
              include: {
                product: true,
                variation: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove sensitive information
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, roleId } = await req.json();

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        roleId,
        active: true,
      },
      include: {
        role: true,
      },
    });

    // Remove sensitive information
    const { password: _, ...newUserWithoutPassword } = newUser;

    return NextResponse.json(newUserWithoutPassword);
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}