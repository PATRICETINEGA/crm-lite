import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@crm.app' },
    update: {},
    create: { email: 'demo@crm.app', name: 'Demo', password, role: 'user' },
  })

  const contact = await prisma.contact.upsert({
    where: { id: 'seed-contact' },
    update: {},
    create: { id: 'seed-contact', name: 'Jane Doe', email: 'jane@example.com', company: 'Acme', ownerId: user.id },
  })

  await prisma.deal.upsert({
    where: { id: 'seed-deal' },
    update: {},
    create: { id: 'seed-deal', title: 'Website Project', value: 5000, stage: 'proposal', contactId: contact.id, ownerId: user.id },
  })

  console.log('Seed done')
}

main().finally(() => prisma.$disconnect())
