import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const Discovery = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await fetch(`${API}/leagues`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    fetchLeagues()
  }, [])

  if (loading) {
    return (
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-36 animate-pulse rounded-xl bg-white/5" />
        ))}
      </div>
    )
  }

  if (!items.length) {
    return <div className="mt-10 rounded-xl border border-white/10 p-6 text-center text-slate-300">No leagues yet. Organizers can create leagues after signing in.</div>
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((l) => (
        <div key={l.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <div className="mb-2 text-sm text-slate-400">{l.sport} • {l.location}</div>
          <div className="text-lg font-semibold text-white">{l.name}</div>
          {l.description && <p className="mt-1 line-clamp-3 text-sm text-slate-300">{l.description}</p>}
          <div className="mt-3 text-xs text-slate-400">Skill: {l.skill_level || 'Any'} • Cost: {l.cost ? `$${l.cost}` : 'Free/Varies'}</div>
        </div>
      ))}
    </div>
  )
}

export default Discovery
