
// app/api/discounts/[id]

import { NextResponse } from 'next/server';
import db from '@/db/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const discount = await db.discount.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
    if (!discount) {
      return NextResponse.json({ error: 'Discount not found' }, { status: 404 });
    }
    return NextResponse.json(discount);
  } catch (error) {
    console.error('Failed to fetch discount:', error);
    return NextResponse.json({ error: 'Failed to fetch discount' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    console.log('Received update data:', data);

    // Remove id, createdAt, and updatedAt from the data object
    const { id, createdAt, updatedAt, products, ...updateData } = data;

    // Ensure dates are properly formatted
    if (updateData.validFrom) {
      updateData.validFrom = new Date(updateData.validFrom);
    }
    if (updateData.validUntil) {
      updateData.validUntil = new Date(updateData.validUntil);
    }

    console.log('Sanitized update data:', updateData);

    const discount = await db.discount.update({
      where: { id: parseInt(params.id) },
      data: updateData,
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json(discount);
  } catch (error: unknown) {
    console.error('Failed to update discount:', error);

    let errorMessage = 'An unknown error occurred';
    let errorDetails = {};

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = { stack: error.stack };
    }

    if (error instanceof PrismaClientKnownRequestError) {
      errorDetails = {
        ...errorDetails,
        code: error.code,
        meta: error.meta,
      };
    }

    return NextResponse.json({
      error: 'Failed to update discount',
      message: errorMessage,
      details: errorDetails
    }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.discount.delete({
      where: { id: parseInt(params.id) }
    });
    return NextResponse.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    console.error('Failed to delete discount:', error);
    return NextResponse.json({ error: 'Failed to delete discount' }, { status: 500 });
  }
}
