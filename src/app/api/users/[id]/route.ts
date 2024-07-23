import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';
import bcrypt from 'bcryptjs';

export async function PUT(req: NextRequest) {
    try {
      const token = req.headers.get('Authorization')?.split(' ')[1];
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const decodedUserId = await verifyToken(token);
      if (!decodedUserId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const { username, email, password, roleId, active } = await req.json();
  
      let updateData: any = { username, email, roleId, active };
  
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }
  
      const updatedUser = await prisma.user.update({
        where: { id: decodedUserId },
        data: updateData,
        select: {
          id: true,
          username: true,
          email: true,
          roleId: true,
          active: true,
          createdAt: true,
          updatedAt: true,
        },
      });
  
      return NextResponse.json(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
  }