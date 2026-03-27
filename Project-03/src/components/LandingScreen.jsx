import React, { useEffect, useState } from 'react';

const LandingScreen = ({ onEnter }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Automatically fade out completely after 3.5 seconds
    const timer1 = setTimeout(() => {
      setFadingOut(true);
    }, 3500);

    const timer2 = setTimeout(() => {
      onEnter();
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onEnter]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0f172a] transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] ${fadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}
    >
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full animate-pulse z-0 pointer-events-none"></div>
      
      <div className="text-center px-6 relative z-10 flex flex-col items-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 drop-shadow-2xl">
          Happy Birthday.
        </h1>
        <div className="w-24 h-1.5 bg-indigo-500 mt-8 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};

export default LandingScreen;
