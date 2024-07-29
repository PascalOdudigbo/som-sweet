import { NextRequest, NextResponse } from 'next/server';
import { GET, POST } from '@/app/api/users/route';
import { verifyToken } from '@/utils/auth';
import prisma from '@/db/db';

jest.mock('@/utils/auth');
jest.mock('@/db/db', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));
jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: jest.fn(),
  },
}));

describe('User API Routes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('GET returns user data for authenticated user', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
    (verifyToken as jest.Mock).mockResolvedValueOnce(1);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockUser);

    const req = new NextRequest('http://localhost:4000/api/users', {
      headers: { Authorization: 'Bearer fake-token' },
    });

    await GET(req);

    expect(NextResponse.json).toHaveBeenCalledWith(expect.objectContaining(mockUser));
  });

  test('POST creates a new user', async () => {
    const mockUser = { id: 1, username: 'newuser', email: 'new@example.com' };
    (prisma.user.create as jest.Mock).mockResolvedValueOnce(mockUser);

    const req = new NextRequest('http://localhost:4000/api/users', {
      method: 'POST',
      body: JSON.stringify({ username: 'newuser', email: 'new@example.com', password: 'password123' }),
    });

    await POST(req);

    expect(NextResponse.json).toHaveBeenCalledWith(expect.objectContaining(mockUser));
  });
});