import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center justify-center py-20 mt-10 bg-white/5 backdrop-blur-xl border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center w-full px-6">
        <h2 className="text-4xl font-black mb-6 tracking-tight text-white drop-shadow-md">BRITNEY 24</h2>
        <p className="text-slate-400 font-bold tracking-[0.2em] text-xs uppercase mb-12">Crafted with care by your friend.</p>
        
        <div className="w-full flex items-center justify-center pt-8 mt-4 border-t border-white/10 max-w-sm">
           <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">&copy; {new Date().getFullYear()} — March 28th Celebration</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
