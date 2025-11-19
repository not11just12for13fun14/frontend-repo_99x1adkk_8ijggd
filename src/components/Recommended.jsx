import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Recommended({ userId }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      if (!userId) return
      setLoading(true)
      try {
        const res = await fetch(`${API}/leagues/recommended?user_id=${encodeURIComponent(userId)}`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [userId])

  if (!userId) return null

  return (
    <div className="mt-10">
      <h2 className="mb-3 text-xl font-semibold">Recommended for you</h2>
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-white/10 p-6 text-center text-slate-300">No recommendations yet. Update your profile to get better matches.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((l) => (
            <div key={l.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
              <div className="mb-2 text-sm text-slate-400">{l.sport} • {l.location}</div>
              <div className="text-lg font-semibold text-white">{l.name}</div>
              {l.description && <p className="mt-1 line-clamp-3 text-sm text-slate-300">{l.description}</p>}
              <div className="mt-3 text-xs text-slate-400">Skill: {l.skill_level || 'Any'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
