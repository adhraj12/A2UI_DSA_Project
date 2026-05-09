export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen font-sans"
      style={{ background: '#0a0a1a', color: '#e0e0ff' }}>
      <main className="flex flex-col items-center gap-8 text-center p-8">
        <h1 className="text-5xl font-black tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #00f0ff, #ff00ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
          🧠 NeuroPlay AI
        </h1>
        <p className="text-lg max-w-md" style={{ color: '#7878a0' }}>
          Adaptive Gamified Learning with Generative UI
        </p>
        <div className="flex gap-4 mt-4">
          <a href="/dashboard"
            className="px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #ff00ea)',
              color: '#0a0a1a',
            }}>
            Enter Live Workspace
          </a>
          <a href="/test"
            className="px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all hover:scale-105 hover:bg-white/10"
            style={{
              border: '2px solid rgba(255, 0, 234, 0.5)',
              color: '#fff',
            }}>
            View Test Layout
          </a>
        </div>
      </main>
    </div>
  );
}
