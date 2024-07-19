import { NextResponse } from 'next/server'
import db from '@/db/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const category = await db.category.findUnique({
      where: { id: parseInt(params.id) },
      include: { products: true }
    })
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    return NextResponse.json(category)
  } catch (error) {
    console.error('Failed to fetch category:', error)
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const category = await db.category.update({
      where: { id: parseInt(params.id) },
      data: {
        name: data.name,
        image: data.image,
        imagePublicId: data.imagePublicId,
        // updatedAt will be handled automatically by Prisma
      },
      include: { products: true }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.error('Failed to update category:', error)
    return NextResponse.json({ error: 'Failed to update category', message: (error as Error).message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.category.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Failed to delete category:', error)
    return NextResponse.json({ error: 'Failed to delete category', message: (error as Error).message }, { status: 500 })
  }
}