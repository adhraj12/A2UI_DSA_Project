'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      router.push(`/dashboard?topic=${encodeURIComponent(topic.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-gray-900 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] rounded-full bg-[radial-gradient(circle,rgba(215,200,255,0.4)_0%,rgba(240,245,255,0.4)_50%,rgba(255,255,255,0)_100%)] opacity-80 pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(180,220,255,0.3)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(255,200,240,0.3)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />

      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-3">
          {/* Logo icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-200">
            N
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">NeuroPlay AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">How it works</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">For Educators</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
        </nav>
        <button 
          onClick={() => router.push('/dashboard')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center flex-1 justify-center max-w-4xl mx-auto w-full px-6 relative z-10 -mt-10">
        
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-center leading-[1.1] mb-6 text-gray-900">
          Your ideas. <br />
          <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
            AI builds your learning.
          </span>
        </h1>
        
        <p className="text-xl text-gray-500 text-center max-w-2xl mb-12">
          Describe any project or topic you want to learn. <br className="hidden md:block"/>
          NeuroPlay AI will create a personalized, interactive journey for you.
        </p>

        {/* Input Bar */}
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-2 pl-6 flex items-center gap-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus-within:border-indigo-200"
        >
          <div className="flex-1 flex flex-col justify-center">
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What do you want to learn or build?"
              className="w-full bg-transparent border-none outline-none text-lg text-gray-900 placeholder:text-gray-400 font-medium py-2"
            />
            {/* Example text visible only when input is empty */}
            {!topic && (
              <span className="text-xs text-gray-400 pointer-events-none absolute bottom-3">
                Example: Build a <span className="text-indigo-500">cryptocurrency tracker</span>
              </span>
            )}
          </div>
          <button 
            type="submit"
            className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>

        {/* Suggestions */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-gray-400">Try some ideas</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: '</>', text: 'Build a REST API' },
              { icon: '⑂', text: 'Learn Data Structures' },
              { icon: 'ılı', text: 'Create an ML Model' },
              { icon: '⎈', text: 'Explore Neuroscience' }
            ].map((pill, i) => (
              <button 
                key={i}
                onClick={() => router.push(`/dashboard?topic=${encodeURIComponent(pill.text)}`)}
                className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-sm transition-all"
              >
                <span className="text-gray-400">{pill.icon}</span>
                {pill.text}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer / Trust Badges */}
      <footer className="py-12 mt-auto w-full flex flex-col items-center justify-center relative z-10">
        <p className="text-sm text-gray-400 font-medium mb-6">Trusted by learners and educators worldwide</p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale">
          {/* Simple text placeholders for logos as per standard practice when actual SVGs aren't provided */}
          <span className="font-bold text-xl">Google</span>
          <span className="font-bold text-xl">Microsoft</span>
          <span className="font-bold text-xl font-serif">Stanford</span>
          <span className="font-bold text-xl tracking-tighter">MIT</span>
        </div>
      </footer>
    </div>
  );
}
