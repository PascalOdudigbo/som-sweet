import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedUserId = await verifyToken(token);
    const { product, variation, quantity, customText, userId } = await req.json();

    if (!decodedUserId || decodedUserId.toString() !== userId.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: product.id,
        variationId: variation?.id || null,
        customText: customText || null,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          variationId: variation?.id || null,
          quantity,
          customText: customText || null,
        },
      });
    }

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
            variation: true,
          },
        },
      },
    });

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}