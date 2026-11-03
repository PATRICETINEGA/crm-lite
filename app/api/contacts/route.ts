import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { name, email, company } = body
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 })

  const contact = await prisma.contact.create({
    data: { name, email, company, ownerId: (session.user as any).id },
  })
  return NextResponse.json(contact)
}
