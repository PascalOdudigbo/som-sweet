// app/api/categories/
import { NextResponse } from 'next/server'
import db from '@/db/db'

export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: { products: true }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const category = await db.category.create({
      data: {
        name: data.name,
        image: data.image,
        imagePublicId: data.imagePublicId,
        // createdAt and updatedAt will be handled automatically by Prisma
      },
      include: { products: true }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.error('Failed to create category:', error)
    return NextResponse.json({ error: 'Failed to create category', message: (error as Error).message }, { status: 500 })
  }
}