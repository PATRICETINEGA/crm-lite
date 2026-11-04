'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddDealForm() {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [stage, setStage] = useState('lead')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, value, stage }),
    })
    setTitle('')
    setValue('')
    setStage('lead')
    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6 space-y-2">
      <h3 className="font-medium text-sm">Add Deal</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Deal title" className="w-full border p-2 rounded text-sm" required />
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" type="number" className="w-full border p-2 rounded text-sm" />
      <select value={stage} onChange={(e) => setStage(e.target.value)} className="w-full border p-2 rounded text-sm">
        <option value="lead">Lead</option>
        <option value="qualified">Qualified</option>
        <option value="proposal">Proposal</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
      </select>
      <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50">Add Deal</button>
    </form>
  )
}
