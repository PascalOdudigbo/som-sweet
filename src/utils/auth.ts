import jwt from 'jsonwebtoken';

export async function verifyToken(token: string): Promise<number | null> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    return decoded.userId;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}