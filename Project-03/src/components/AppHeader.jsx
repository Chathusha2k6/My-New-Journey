import React from 'react';
import friendImg from '../../Image/6210881885706064011.jpg';

const AppHeader = () => {
  return (
      <header id="home" className="relative pt-8 pb-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Glassmorphic Navigation Bar */}
        <nav className="w-full flex items-center justify-between px-8 py-6 mb-20 border-b border-white/5 bg-white/5 backdrop-blur-xl rounded-b-[2rem] shadow-xl">
          <div className="text-2xl font-black tracking-[0.2em] text-white">BRITNEY</div>
          <ul className="flex gap-8 md:gap-12 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase text-slate-300">
            <li><a href="#home" className="hover:text-white hover:-translate-y-0.5 inline-block transition-transform duration-300">Home</a></li>
            <li><a href="#wishes" className="hover:text-white hover:-translate-y-0.5 inline-block transition-transform duration-300">Wishes</a></li>
          </ul>
        </nav>
        
        {/* Hero Section (2-Column Grid Intact) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center justify-between w-full relative z-10">
          
          {/* Left: Typography */}
          <div className="text-center lg:text-left z-20 w-full bg-white/5 border border-white/10 backdrop-blur-md p-10 lg:p-14 rounded-[3rem] shadow-2xl">
            <h1 className="text-5xl sm:text-7xl lg:text-[5rem] font-black mb-8 tracking-tighter leading-[1.1] text-white drop-shadow-lg">
              Happy 24th,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Britney.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-[1.8] font-medium mb-12">
              You've always been like a true older sister to me. Thank you for the guidance, the endless support, and the countless laughs. Here's to an incredible year ahead, filled with success and great memories!
            </p>
            <a href="#wishes" className="inline-block px-10 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 hover:bg-white/20 text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs transition duration-300 shadow-xl">
              Read Messages
            </a>
          </div>

          {/* Right: Glassmorphism Framed Image */}
          <div className="w-full relative z-20 mx-auto px-4 lg:px-0 flex justify-center lg:justify-end">
            {/* Subtle Glassmorphism Card Effect Behind */}
            <div className="absolute inset-0 bg-violet-500/10 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)] transform rotate-3 scale-105"></div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white/5 backdrop-blur-2xl shadow-2xl border-2 border-white/20 p-2 max-w-[400px]">
              <img 
                src={friendImg} 
                alt="Portrait" 
                className="w-full h-auto aspect-[4/5] object-cover rounded-[2rem] hover:scale-[1.03] transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]" 
              />
            </div>
          </div>
          
        </div>
      </header>
  );
};

export default AppHeader;
