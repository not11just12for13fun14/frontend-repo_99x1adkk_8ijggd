import Spline from '@splinetool/react-spline'

const Hero = ({ onOpenAuth }) => {
  return (
    <section className="relative h-[75vh] w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Tf9WOIaWs6LOezG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlay for readability (allow pointer through to 3D) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end p-6 text-center sm:p-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">LeagueHub</h1>
        <p className="mb-6 max-w-2xl text-sm text-slate-200 sm:text-base">
          Discover, join, and manage community sports leagues with AI-powered matchmaking and real-time chat.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <button onClick={() => onOpenAuth('signup')} className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500">
            Get Started
          </button>
          <button onClick={() => onOpenAuth('login')} className="inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-slate-100 backdrop-blur transition hover:bg-white/20">
            I already have an account
          </button>
        </div>
        <div className="mt-6 text-xs text-slate-300/70">AI recommendations • League discovery • Chat • Payments</div>
      </div>
    </section>
  )
}

export default Hero
