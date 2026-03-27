import React, { useState } from 'react';
import './index.css';
import AppHeader from './components/AppHeader';
import MessageSection from './components/MessageSection';
import Footer from './components/Footer';
import LandingScreen from './components/LandingScreen';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* Background Ambience consistent through entire app */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {!hasEntered && <LandingScreen onEnter={() => setHasEntered(true)} />}
      
      <div className={`transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 h-screen overflow-hidden'}`}>
        <AppHeader />
        <main className="relative z-10 w-full mb-12">
          <MessageSection />
        </main>
        <Footer />
      </div>

    </div>
  );
}

export default App;
