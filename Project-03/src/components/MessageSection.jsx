import React from 'react';

const MessageSection = () => {
  return (
    <section id="wishes" className="py-24 px-6 lg:px-12 w-full relative z-10 max-w-7xl mx-auto">
      
      <div className="mb-24 w-full flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 drop-shadow-lg">A Few Words</h2>
        <div className="w-16 h-1 bg-violet-400 rounded-full mb-8 opacity-80"></div>
        <p className="text-violet-300 text-sm tracking-[0.2em] uppercase font-bold">From someone who looks up to you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center w-full">
        
        {/* iOS style Glass Card 1 */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 lg:p-12 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 flex flex-col justify-between w-full border border-white/10 shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400 mb-8 block opacity-80">01 / The Best Guide</span>
            <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Sister Figure</h3>
            <p className="text-slate-300 font-medium leading-[1.8] text-lg">
              Having you around is like having the older sister I always needed. You always know exactly what to say when I need advice, and for that, I'm genuinely grateful.
            </p>
          </div>
        </div>

        {/* iOS style Glass Card 2 */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] p-10 lg:p-12 transition-all duration-500 hover:-translate-y-2 hover:bg-white/20 flex flex-col justify-between w-full border border-white/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-8 block opacity-80">02 / Always Reliable</span>
            <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Supportive</h3>
            <p className="text-slate-200 font-medium leading-[1.8] text-lg">
              Whenever things get tough, I know I can count on your support and your incredibly calm approach to solving problems. You're a wonderful friend.
            </p>
          </div>
        </div>

        {/* iOS style Glass Card 3 */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 lg:p-12 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 flex flex-col justify-between w-full border border-white/10 shadow-xl relative overflow-hidden group">
           <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400 mb-8 block opacity-80">03 / A Bright Year</span>
            <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Success</h3>
            <p className="text-slate-300 font-medium leading-[1.8] text-lg">
              May your 24th year bring you immense success, continuous growth, and all the incredible things you deserve. Have a truly phenomenal birthday!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MessageSection;
