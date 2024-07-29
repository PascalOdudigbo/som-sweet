// /api/products/[id]/delete-or-deactivate
import { NextResponse } from 'next/server';
import db from '@/db/db';
import { deleteCloudinaryImage } from '@/utils/cloudinary';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const productId = parseInt(params.id);

  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        orderItems: true,
        reviews: true,
        discounts: true,
        wishlistedBy: true,
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const hasAssociations = 
      product.orderItems.length > 0 || 
      product.reviews.length > 0 || 
      product.discounts.length > 0 || 
      product.wishlistedBy.length > 0;

    if (hasAssociations) {
      const updatedProduct = await db.product.update({
        where: { id: productId },
        data: { active: false },
      });
      return NextResponse.json({ action: 'deactivated', product: updatedProduct });
    } else {
      // Delete images from Cloudinary
      if (product.images.length > 0) {
        await Promise.all(product.images.map(image => 
          deleteCloudinaryImage(image.imagePublicId)
        ));
      }

      // Delete product and its images from the database
      await db.productImage.deleteMany({ where: { productId } });
      const deletedProduct = await db.product.delete({
        where: { id: productId },
      });
      
      return NextResponse.json({ action: 'deleted', product: deletedProduct });
    }
  } catch (error) {
    console.error('Failed to process product:', error);
    return NextResponse.json({ error: 'Failed to process product' }, { status: 500 });
  }
}