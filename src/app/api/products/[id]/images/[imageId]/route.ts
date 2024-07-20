import db from "@/db/db";
import { NextResponse } from "next/server";

// app/api/products/[Id]/images/[Id]/route.ts
export async function DELETE(request: Request, { params }: { params: { id: string, imageId: string } }) {
  try {
    await db.productImage.delete({
      where: {
        id: parseInt(params.imageId),
        productId: parseInt(params.id),
      }
    });
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Failed to remove product image:', error);
    return NextResponse.json({ error: 'Failed to remove product image' }, { status: 500 });
  }
}