import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
export default async function Dash() {
  const s = await getSession()
  if (!s) redirect('/login')
  const uid = (s.user as any).id
  const contacts = await prisma.contact.findMany({ where: { ownerId: uid } })
  const deals = await prisma.deal.findMany({ where: { ownerId: uid } })
  const total = deals.reduce((a: number, d: any) => a + d.value, 0)
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">CRM Lite</h1>
        <Link href="/api/auth/signout" className="text-sm text-red-600">Sign out</Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow"><p className="text-sm text-gray-500">Contacts</p><p className="text-2xl font-bold">{contacts.length}</p></div>
        <div className="bg-white p-4 rounded shadow"><p className="text-sm text-gray-500">Deals</p><p className="text-2xl font-bold">{deals.length}</p></div>
        <div className="bg-white p-4 rounded shadow"><p className="text-sm text-gray-500">Pipeline</p><p className="text-2xl font-bold">${total.toLocaleString()}</p></div>
      </div>
      <div className="bg-white rounded shadow">
        <div className="p-4 border-b font-semibold">Deals</div>
        {deals.map((d: any) => <div key={d.id} className="p-4 border-b text-sm flex justify-between"><span>{d.title} · {d.stage}</span><span>${d.value}</span></div>)}
      </div>
    </div>
  )
}
