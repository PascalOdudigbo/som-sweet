// app/api/products/[id]/images/route.ts
import db from '@/db/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { imageUrl, imagePublicId } = await request.json();
    const image = await db.productImage.create({
      data: {
        productId: parseInt(params.id),
        imageUrl,
        imagePublicId,
      }
    });
    return NextResponse.json(image);
  } catch (error) {
    console.error('Failed to add product image:', error);
    return NextResponse.json({ error: 'Failed to add product image' }, { status: 500 });
  }
}

// app/api/products/[productId]/images/[imageId]/route.ts
export async function DELETE(request: Request, { params }: { params: { productId: string, imageId: string } }) {
  try {
    await db.productImage.delete({
      where: {
        id: parseInt(params.imageId),
        productId: parseInt(params.productId),
      }
    });
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Failed to remove product image:', error);
    return NextResponse.json({ error: 'Failed to remove product image' }, { status: 500 });
  }
}