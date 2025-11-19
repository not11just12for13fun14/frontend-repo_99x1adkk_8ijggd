import { useState } from 'react'
import Hero from './components/Hero'
import Discovery from './components/Discovery'

function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const openAuth = (mode) => { setAuthMode(mode); setAuthOpen(true) }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-semibold">LeagueHub</div>
          <div className="flex items-center gap-3">
            <button onClick={() => openAuth('login')} className="rounded-full bg-white/10 px-4 py-2 text-sm">Login</button>
            <button onClick={() => openAuth('signup')} className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white">Sign up</button>
          </div>
        </div>

        <Hero onOpenAuth={(m) => openAuth(m)} />

        <h2 className="mt-10 text-xl font-semibold">Trending leagues</h2>
        <Discovery />
      </div>

      {/* Simple mock auth modal */}
      {authOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-lg font-semibold">{authMode === 'signup' ? 'Create your account' : 'Welcome back'}</div>
              <button className="rounded bg-white/10 px-2 py-1 text-xs" onClick={() => setAuthOpen(false)}>Close</button>
            </div>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input className="w-full rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600" placeholder="Email" type="email" required />
              <input className="w-full rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600" placeholder="Password" type="password" required />
              <button className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium">{authMode === 'signup' ? 'Sign up' : 'Login'}</button>
              <div className="text-center text-xs text-slate-400">By continuing you agree to our Terms</div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
