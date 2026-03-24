const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #d4d4d8; border-radius: 4px; }
`;
document.head.appendChild(style);

const SVG = {
    dash: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>',
    wallet: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>',
    tx: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>',
    budget: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
    goal: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
};

const Components = {
    renderSidebar: (activeView = 'dashboard') => {
        const getCl = (v) => activeView === v 
            ? 'flex items-center px-4 py-3 text-xs font-bold text-gray-900 bg-white border border-gray-200 rounded-xl shadow-sm uppercase tracking-widest' 
            : 'flex items-center px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors rounded-xl border border-transparent hover:bg-gray-50';
        return `
        <div id="mobile-overlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 hidden md:hidden opacity-0 transition-opacity"></div>
        <aside id="sidebar-nav" class="w-64 h-screen fixed top-0 left-0 bg-white border-r border-gray-100 flex flex-col z-40 transform -translate-x-full md:translate-x-0 transition-transform duration-300">
            <div class="h-28 flex items-center px-8 border-b border-gray-100 shrink-0">
                <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl mr-3 shadow-lg">F</div>
                <a href="index.html" class="text-2xl font-black tracking-tighter text-gray-900">Finance.</a>
            </div>
            <nav class="flex-1 px-5 py-8 space-y-2 overflow-y-auto">
                <a href="#" onclick="window.switchView('dashboard'); return false;" class="${getCl('dashboard')}">${SVG.dash} Overview</a>
                <a href="#" onclick="window.switchView('wallets'); return false;" class="${getCl('wallets')}">${SVG.wallet} Wallets</a>
                <a href="#" onclick="window.switchView('transactions'); return false;" class="${getCl('transactions')}">${SVG.tx} Operations</a>
                <a href="#" onclick="window.switchView('budgets'); return false;" class="${getCl('budgets')}">${SVG.budget} Budgets</a>
                <a href="#" onclick="window.switchView('goals'); return false;" class="${getCl('goals')}">${SVG.goal} Targets</a>
            </nav>
            <div class="p-6 shrink-0 border-t border-gray-100">
                <div class="p-4 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
                    <div>
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Plan</p>
                        <p class="text-sm font-black text-gray-900">Corporate</p>
                    </div>
                </div>
            </div>
        </aside>`;
    },
    
    renderHeader: (userName = 'User', activeView = 'dashboard') => {
        const titles = { dashboard: 'Overview', wallets: 'Wallets & Cards', transactions: 'Operations', budgets: 'Capital Budgets', goals: 'Financial Targets' };
        return `
        <header class="h-24 md:h-28 flex items-center justify-between px-6 md:px-10 sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div class="flex items-center">
                <button id="menu-btn" class="md:hidden w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 shadow-sm mr-4 active:scale-95 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <h2 class="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase">${titles[activeView] || activeView}</h2>
            </div>
            <div class="flex items-center space-x-3 md:space-x-4">
                <button class="hidden md:flex w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all relative">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-black rounded-full border border-white"></span>
                </button>
                <div id="profile-btn" class="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-base font-bold cursor-pointer hover:scale-105 transition-transform shadow-lg">
                    ${userName.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>

        <!-- Right Side Panel (Reusable Slide) -->
        <div id="slide-panel" class="fixed top-0 right-0 h-screen w-full md:w-[400px] bg-white border-l border-gray-100 shadow-2xl transform translate-x-full transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) z-50 flex flex-col">
            <div class="h-24 md:h-28 px-6 md:px-8 flex items-center justify-between border-b border-gray-100 bg-gray-50/50 shrink-0">
                <h3 id="slide-panel-title" class="font-black text-lg text-gray-900 uppercase tracking-widest">Account</h3>
                <button id="close-slide-btn" class="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
            <div id="slide-panel-content" class="p-6 md:p-8 flex-1 overflow-y-auto w-full">
            </div>
        </div>
        <div id="slide-overlay" class="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 hidden opacity-0 transition-opacity duration-300"></div>`;
    }
};

window.renderLayout = (containerId, userName, activeView = 'dashboard') => {
    const container = document.getElementById(containerId);
    if(container) {
        document.body.className = "antialiased bg-[#fcfcfc] text-[#111]";
        
        container.innerHTML = `
            ${Components.renderSidebar(activeView)}
            <div class="flex-1 flex flex-col min-h-screen md:pl-64 w-full">
                ${Components.renderHeader(userName, activeView)}
                <main class="flex-1 p-6 md:p-10" id="main-content"></main>
            </div>`;
            
        // Mobile Sidebar Controls
        const menuBtn = document.getElementById('menu-btn');
        const sidebarNav = document.getElementById('sidebar-nav');
        const mobileOverlay = document.getElementById('mobile-overlay');
        
        menuBtn?.addEventListener('click', () => {
            sidebarNav.classList.remove('-translate-x-full');
            mobileOverlay.classList.remove('hidden');
            setTimeout(() => mobileOverlay.classList.remove('opacity-0'), 10);
        });
        
        const closeSidebar = () => {
            sidebarNav.classList.add('-translate-x-full');
            mobileOverlay.classList.add('opacity-0');
            setTimeout(() => mobileOverlay.classList.add('hidden'), 300);
        };
        mobileOverlay?.addEventListener('click', closeSidebar);
        
        // Window Switch wrapper to close sidebar when routing directly on mobile
        const oldSwitch = window.switchView;
        window.switchView = (v) => { closeSidebar(); if(oldSwitch) oldSwitch(v); };
        
        // Slide Panel Controls
        const slidePanel = document.getElementById('slide-panel');
        const overlay = document.getElementById('slide-overlay');
        const content = document.getElementById('slide-panel-content');
        const title = document.getElementById('slide-panel-title');
        
        window.openSlidePanel = (panelTitle, htmlContent) => {
            title.textContent = panelTitle;
            content.innerHTML = htmlContent;
            overlay.classList.remove('hidden');
            setTimeout(() => { overlay.classList.remove('opacity-0'); slidePanel.classList.remove('translate-x-full'); }, 20);
        };
        
        window.closeSlidePanel = () => {
            slidePanel.classList.add('translate-x-full');
            overlay.classList.add('opacity-0');
            setTimeout(() => { overlay.classList.add('hidden'); content.innerHTML = ''; }, 500);
        };
        
        document.getElementById('profile-btn')?.addEventListener('click', () => {
            window.openSlidePanel('My Account', `
                <div class="text-center mb-8">
                    <div class="w-24 h-24 rounded-2xl bg-gray-100 mx-auto flex items-center justify-center text-4xl font-black mb-4 border border-gray-200">${userName.charAt(0).toUpperCase()}</div>
                    <h2 class="text-xl font-black">${userName}</h2>
                    <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Verified Corporate User</p>
                </div>
                <div class="space-y-3">
                    <button class="w-full text-left px-5 py-4 border border-gray-200 rounded-xl text-sm font-bold hover:border-black transition-colors uppercase tracking-widest text-gray-600 hover:text-black">Profile Settings</button>
                    <button class="w-full text-left px-5 py-4 border border-gray-200 rounded-xl text-sm font-bold hover:border-black transition-colors uppercase tracking-widest text-gray-600 hover:text-black">Security</button>
                </div>
                <div class="mt-8 pt-8 border-t border-gray-100">
                    <button id="auth-logout-btn" class="w-full py-4 text-center bg-black text-white rounded-xl text-xs font-black hover:bg-gray-800 transition-colors uppercase tracking-widest">Sign Out</button>
                </div>
            `);
            setTimeout(() => {
                document.getElementById('auth-logout-btn')?.addEventListener('click', async () => {
                    if(window.FinanceApp) await window.FinanceApp.auth.signOut();
                    window.location.href = 'index.html';
                });
            }, 100);
        });
        
        document.getElementById('close-slide-btn')?.addEventListener('click', window.closeSlidePanel);
        overlay?.addEventListener('click', window.closeSlidePanel);
    }
}
