import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AuthModal({ open, mode = 'login', onClose, onAuthed }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const endpoint = mode === 'signup' ? '/auth/register' : '/auth/login'
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Authentication failed')
      const token = data.access_token
      localStorage.setItem('lh_token', token)
      onAuthed && onAuthed({ token })
      onClose && onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-semibold">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</div>
          <button className="rounded bg-white/10 px-2 py-1 text-xs" onClick={onClose}>Close</button>
        </div>
        <form className="space-y-3" onSubmit={submit}>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600" placeholder="Email" type="email" required />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600" placeholder="Password" type="password" required />
          {!!error && <div className="text-sm text-red-400">{error}</div>}
          <button disabled={loading} className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium disabled:opacity-50">{loading ? 'Please wait...' : (mode === 'signup' ? 'Sign up' : 'Login')}</button>
          <div className="text-center text-xs text-slate-400">By continuing you agree to our Terms</div>
        </form>
      </div>
    </div>
  )
}
