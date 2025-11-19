import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Profile({ user, token }) {
  const [profile, setProfile] = useState({ sport: '', location: '', skill_level: '', age_group: '', gender: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const run = async () => {
      if (!user) return
      setLoading(true)
      setMsg('')
      try {
        const res = await fetch(`${API}/athletes/${user.id}`)
        if (res.ok) {
          const data = await res.json()
          setProfile({
            sport: data.sport || '',
            location: data.location || '',
            skill_level: data.skill_level || '',
            age_group: data.age_group || '',
            gender: data.gender || '',
          })
        }
      } catch (e) {}
      finally { setLoading(false) }
    }
    run()
  }, [user?.id])

  const save = async (e) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    setMsg('')
    try {
      const res = await fetch(`${API}/athletes/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile)
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || 'Failed to save')
      }
      setMsg('Saved')
    } catch (e) {
      setMsg(e.message)
    } finally { setSaving(false) }
  }

  return (
    <div className="mt-10 rounded-xl border border-white/10 bg-slate-900/60 p-5">
      <div className="mb-3 text-lg font-semibold">Your profile</div>
      {loading ? (
        <div className="h-24 animate-pulse rounded-lg bg-white/5" />
      ) : (
        <form onSubmit={save} className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col">
            <label className="mb-1 text-xs text-slate-400">Sport</label>
            <input className="rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600" value={profile.sport} onChange={(e)=>setProfile(p=>({...p, sport:e.target.value}))} placeholder="e.g., Soccer" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs text-slate-400">Location</label>
            <input className="rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600" value={profile.location} onChange={(e)=>setProfile(p=>({...p, location:e.target.value}))} placeholder="City, State" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs text-slate-400">Skill level</label>
            <select className="rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm" value={profile.skill_level} onChange={(e)=>setProfile(p=>({...p, skill_level:e.target.value}))}>
              <option value="">Any</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs text-slate-400">Age group</label>
            <input className="rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm" value={profile.age_group} onChange={(e)=>setProfile(p=>({...p, age_group:e.target.value}))} placeholder="e.g., adult, u18" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-xs text-slate-400">Gender</label>
            <input className="rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm" value={profile.gender} onChange={(e)=>setProfile(p=>({...p, gender:e.target.value}))} placeholder="any / coed / women / men" />
          </div>
          <div className="sm:col-span-2 mt-2 flex items-center gap-3">
            <button disabled={saving} className="rounded-md bg-blue-600 px-4 py-2 text-sm disabled:opacity-50">{saving ? 'Saving...' : 'Save profile'}</button>
            {!!msg && <span className="text-xs text-slate-300">{msg}</span>}
          </div>
        </form>
      )}
    </div>
  )
}
