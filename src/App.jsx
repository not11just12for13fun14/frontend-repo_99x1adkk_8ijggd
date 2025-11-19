import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Discovery from './components/Discovery'
import AuthModal from './components/AuthModal'
import Recommended from './components/Recommended'
import Profile from './components/Profile'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const t = localStorage.getItem('lh_token')
    if (t) {
      setToken(t)
      fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${t}` } })
        .then(r => r.ok ? r.json() : null)
        .then(u => setUser(u))
        .catch(() => {})
    }
  }, [])

  const openAuth = (mode) => { setAuthMode(mode); setAuthOpen(true) }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-semibold">LeagueHub</div>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="hidden sm:inline">{user.email}</span>
                <a href="/test" className="hidden rounded-full bg-white/10 px-4 py-2 text-sm sm:inline">Status</a>
                <button onClick={() => { localStorage.removeItem('lh_token'); setUser(null); setToken(null) }} className="rounded-full bg-white/10 px-4 py-2 text-sm">Logout</button>
              </div>
            ) : (
              <>
                <a href="/test" className="hidden rounded-full bg-white/10 px-4 py-2 text-sm sm:inline">Status</a>
                <button onClick={() => openAuth('login')} className="rounded-full bg-white/10 px-4 py-2 text-sm">Login</button>
                <button onClick={() => openAuth('signup')} className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white">Sign up</button>
              </>
            )}
          </div>
        </div>

        <Hero onOpenAuth={(m) => openAuth(m)} />

        <h2 className="mt-10 text-xl font-semibold">Trending leagues</h2>
        <Discovery />

        {user && (
          <>
            <Recommended userId={user.id} />
            <Profile user={user} token={token} />
          </>
        )}
      </div>

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onAuthed={({ token }) => {
          setToken(token)
          fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.ok ? r.json() : null)
            .then(u => setUser(u))
        }}
      />
    </div>
  )
}

export default App
