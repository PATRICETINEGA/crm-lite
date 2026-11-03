'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, company }),
    })
    setName('')
    setEmail('')
    setCompany('')
    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6 space-y-2">
      <h3 className="font-medium text-sm">Add Contact</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full border p-2 rounded text-sm" required />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full border p-2 rounded text-sm" />
      <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="w-full border p-2 rounded text-sm" />
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50">Add</button>
    </form>
  )
}
