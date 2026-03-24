document.addEventListener('DOMContentLoaded', async () => {
    const I = {
        card: '<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>',
        briefcase: '<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
        zap: '<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
    };
    
    // Monochrome Professional Mock Data
    window.AppState = {
        userName: 'Corporate User',
        stats: { income: 15450.00, expenses: 4320.50, balance: 41105.75 },
        transactions: [
            { title: 'Apple Inc.', amount: -1999.00, type: 'expense', date: new Date().toISOString(), icon: I.card },
            { title: 'Client Retainer', amount: 4500.00, type: 'income', date: new Date(Date.now() - 86400000).toISOString(), icon: I.briefcase },
            { title: 'AWS Cloud Services', amount: -340.30, type: 'expense', date: new Date(Date.now() - 172800000).toISOString(), icon: I.zap },
            { title: 'Corporate Software License', amount: -65.99, type: 'expense', date: new Date(Date.now() - 259200000).toISOString(), icon: I.card },
            { title: 'Uber Technologies', amount: -45.50, type: 'expense', date: new Date(Date.now() - 432000000).toISOString(), icon: I.card }
        ],
        wallets: [
            { name: 'Chase Corporate', balance: 14500, number: '**** 4521', type: 'Checking' },
            { name: 'Amex Platinum Business', balance: -2450.50, number: '**** 1009', type: 'Credit' },
            { name: 'Fidelity Reserves', balance: 29056.25, number: '**** 8820', type: 'Savings' }
        ],
        budgets: [
            { name: 'Operational Expenses', spent: 4500, amount: 6000 },
            { name: 'Software & Tools', spent: 1200, amount: 3000 },
            { name: 'Travel & Lodging', spent: 850, amount: 1500 }
        ],
        goals: [
            { name: 'Q3 Tax Reserve', current: 15000, target: 45000 },
            { name: 'Office Expansion Fund', current: 32000, target: 50000 }
        ],
        isDemoMode: true
    };

    if (window.FinanceApp) {
        try {
            const { data: { session } } = await window.FinanceApp.supabase.auth.getSession();
            if (session) {
                window.AppState.isDemoMode = false;
                window.AppState.userName = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
                const date = new Date();
                const stats = await window.FinanceApp.db.getMonthlyStats(date.getFullYear(), date.getMonth() + 1);
                if (stats) window.AppState.stats = stats;
            }
        } catch (e) { console.error(e); }
    }

    const Forms = {
        transaction: `
            <form id="addTxForm" class="space-y-6 mt-4 pb-10">
                <div><label class="text-[10px] font-black text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Amount ($)</label>
                <input id="tx-amt" required type="number" step="0.01" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-2xl md:text-3xl font-black outline-none focus:border-black focus:bg-white transition-all shadow-inner placeholder:text-gray-300" placeholder="0.00"></div>
                <div><label class="text-[10px] font-black text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Vendor / Entity</label>
                <input id="tx-name" required type="text" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-black outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300" placeholder="e.g. Amazon Web Services"></div>
                <div><label class="text-[10px] font-black text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Nature</label>
                <select id="tx-type" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-black outline-none focus:border-black focus:bg-white transition-all appearance-none">
                    <option value="expense">Corporate Expense</option>
                    <option value="income">Corporate Income</option>
                </select></div>
                <div class="pt-8 mt-8 border-t border-gray-100 pb-10">
                    <button type="submit" class="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 hover:-translate-y-1">Confirm Operation</button>
                </div>
            </form>
        `,
        wallet: `
            <form id="addWalletForm" class="space-y-6 mt-4 pb-10">
                <div><label class="text-[10px] font-black text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Institution</label>
                <input id="w-name" required type="text" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-black outline-none focus:border-black focus:bg-white transition-all" placeholder="e.g. JPMorgan Chase"></div>
                <div><label class="text-[10px] font-bold text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Card Digits</label>
                <input id="w-num" required type="text" maxlength="4" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-xl font-black outline-none focus:border-black focus:bg-white transition-all" placeholder="****"></div>
                <div><label class="text-[10px] font-bold text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Initial Capital ($)</label>
                <input id="w-bal" required type="number" step="0.01" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-xl font-black outline-none focus:border-black focus:bg-white transition-all" placeholder="0.00"></div>
                <div><label class="text-[10px] font-bold text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Type</label>
                <select id="w-type" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-black outline-none focus:border-black focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="Credit">Corporate Credit</option><option value="Checking">Checking Account</option><option value="Savings">Savings & Reserves</option>
                </select></div>
                <div class="pt-8 mt-8 border-t border-gray-100 pb-10">
                    <button type="submit" class="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 shadow-lg hover:-translate-y-1 transition-all">Link Institution</button>
                </div>
            </form>
        `,
        budget: `
            <form id="addBudgetForm" class="space-y-6 mt-4 pb-10">
                <div><label class="text-[10px] font-black text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Allocation Category</label>
                <input id="b-name" required type="text" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-black outline-none focus:border-black focus:bg-white transition-all" placeholder="e.g. Software Infrastructure"></div>
                <div><label class="text-[10px] font-black text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Fiscal Limit ($)</label>
                <input id="b-amt" required type="number" step="0.01" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-3xl font-black outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300" placeholder="0.00"></div>
                <div class="pt-8 mt-8 border-t border-gray-100 pb-10">
                    <button type="submit" class="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 shadow-lg hover:-translate-y-1 transition-all">Deploy Capital</button>
                </div>
            </form>
        `,
        goal: `
            <form id="addGoalForm" class="space-y-6 mt-4 pb-10">
                <div><label class="text-[10px] font-black text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Strategic Objective</label>
                <input id="g-name" required type="text" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-black outline-none focus:border-black focus:bg-white transition-all" placeholder="e.g. Acquisition Fund"></div>
                <div><label class="text-[10px] font-black text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Target Capital ($)</label>
                <input id="g-amt" required type="number" step="0.01" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-3xl font-black outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300" placeholder="0.00"></div>
                <div><label class="text-[10px] font-black text-gray-400 border border-gray-200 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">Initial Contribution ($)</label>
                <input id="g-cur" type="number" step="0.01" value="0" class="w-full p-4 md:p-5 bg-gray-50 border border-transparent rounded-2xl text-xl font-black outline-none focus:border-black focus:bg-white transition-all placeholder:text-gray-300"></div>
                <div class="pt-8 mt-8 border-t border-gray-100 pb-10">
                    <button type="submit" class="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 shadow-lg hover:-translate-y-1 transition-all">Set Objective</button>
                </div>
            </form>
        `
    };

    window.switchView = (viewName) => {
        if (!window.renderLayout) return; // Prevent loop if components.js is unloaded
        window.renderLayout('app-layout', window.AppState.userName, viewName);
        const main = document.getElementById('main-content');
        if (!main) return;
        main.className = "flex-1 w-full mx-auto px-6 py-8 md:px-10 md:py-12 animate-fade-in overflow-y-auto";
        
        if (viewName === 'dashboard') { main.innerHTML = renderDashboard(); initChart(); }
        else if (viewName === 'wallets') main.innerHTML = renderWallets();
        else if (viewName === 'transactions') main.innerHTML = renderTransactions();
        else if (viewName === 'budgets') main.innerHTML = renderBudgets();
        else if (viewName === 'goals') main.innerHTML = renderGoals();
        
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.onclick = (e) => {
                const action = e.currentTarget.getAttribute('data-action');
                if (action === 'transaction') {
                    window.openSlidePanel('New Record', Forms.transaction);
                    setTimeout(() => {
                        document.getElementById('addTxForm').onsubmit = (ev) => {
                            ev.preventDefault();
                            const amt = parseFloat(document.getElementById('tx-amt').value);
                            const t = document.getElementById('tx-type').value;
                            window.AppState.transactions.unshift({
                                title: document.getElementById('tx-name').value,
                                amount: t === 'expense' ? -Math.abs(amt) : Math.abs(amt),
                                type: t, date: new Date().toISOString(), icon: I.card
                            });
                            if(t === 'expense') window.AppState.stats.expenses += Math.abs(amt);
                            else window.AppState.stats.income += Math.abs(amt);
                            window.AppState.stats.balance += (t === 'expense' ? -Math.abs(amt) : Math.abs(amt));
                            window.switchView(viewName);
                            window.closeSlidePanel();
                        }
                    }, 50);
                }
                if (action === 'wallet') {
                    window.openSlidePanel('Add Institution', Forms.wallet);
                    setTimeout(() => {
                        document.getElementById('addWalletForm').onsubmit = (ev) => {
                            ev.preventDefault();
                            const numStr = document.getElementById('w-num').value;
                            window.AppState.wallets.push({
                                name: document.getElementById('w-name').value,
                                number: '**** ' + numStr.slice(-4),
                                type: document.getElementById('w-type').value,
                                balance: parseFloat(document.getElementById('w-bal').value)
                            });
                            window.switchView(viewName);
                            window.closeSlidePanel();
                        }
                    }, 50);
                }
                if (action === 'budget') {
                    window.openSlidePanel('Allocate Capital', Forms.budget);
                    setTimeout(() => {
                        document.getElementById('addBudgetForm').onsubmit = (ev) => {
                            ev.preventDefault();
                            window.AppState.budgets.push({
                                name: document.getElementById('b-name').value,
                                amount: parseFloat(document.getElementById('b-amt').value),
                                spent: 0
                            });
                            window.switchView(viewName);
                            window.closeSlidePanel();
                        }
                    }, 50);
                }
                if (action === 'goal') {
                    window.openSlidePanel('Strategic Target', Forms.goal);
                    setTimeout(() => {
                        document.getElementById('addGoalForm').onsubmit = (ev) => {
                            ev.preventDefault();
                            window.AppState.goals.push({
                                name: document.getElementById('g-name').value,
                                target: parseFloat(document.getElementById('g-amt').value),
                                current: parseFloat(document.getElementById('g-cur').value || 0)
                            });
                            window.switchView(viewName);
                            window.closeSlidePanel();
                        }
                    }, 50);
                }
            };
        });
    };
    if(window.renderLayout) window.switchView('dashboard');
});

function initChart() {
    const ctx = document.getElementById('cashflowChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Inflow',
                data: [400, 300, 500, 800, 600, 1200, 900],
                borderColor: '#111', backgroundColor: '#111',
                tension: 0.4, borderWidth: 3, pointRadius: 0
            }, {
                label: 'Outflow',
                data: [200, 150, 400, 300, 500, 450, 600],
                borderColor: '#a1a1aa', backgroundColor: '#a1a1aa',
                tension: 0.4, borderWidth: 3, pointRadius: 0, borderDash: [5, 5]
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false, grid: { display: false } }, x: { grid: { display: false, drawBorder: false } } } }
    });
}

function renderDashboard() {
    const { userName, stats, transactions, isDemoMode } = window.AppState;
    return `
        <div class="max-w-[1200px] w-full mx-auto space-y-6 md:space-y-10 min-w-0">
            <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-6">
                <div class="min-w-0">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.1] truncate">Welcome,<br/>${userName}.</h1>
                    ${isDemoMode ? '<span class="inline-block mt-3 md:mt-4 px-3 py-1 bg-gray-100 text-gray-900 border border-gray-200 text-[9px] md:text-[10px] font-black rounded-lg uppercase tracking-[0.2em] shadow-sm">Demo Mode Active</span>' : ''}
                </div>
                <button data-action="transaction" class="w-full md:w-auto px-6 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg transition-all md:hover:-translate-y-1 mt-2 md:mt-0">
                    Execute Record
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <!-- Balance Widget -->
                <div class="bg-white border border-gray-200 p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[12rem] md:min-h-[14rem]">
                    <p class="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Capital</p>
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mt-2 break-all md:break-words">$${stats.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
                    <div class="mt-6 md:mt-8 px-2 md:px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-600 text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase rounded-lg w-auto inline-block truncate">
                        +12.5% VS LAST PERIOD
                    </div>
                </div>
                
                <!-- Chart Widget -->
                <div class="bg-white border border-gray-200 p-5 md:p-8 rounded-3xl shadow-sm md:col-span-2 relative min-h-[12rem] md:min-h-[14rem] flex flex-col justify-between">
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between w-full relative z-10">
                        <p class="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Cashflow Index</p>
                        <div class="flex space-x-3 md:space-x-4">
                            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] text-gray-900 flex items-center"><span class="w-2 h-2 rounded-full bg-black mr-1 md:mr-2"></span>Inflow</span>
                            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 flex items-center"><span class="w-2 h-2 rounded-full bg-gray-400 mr-1 md:mr-2"></span>Outflow</span>
                        </div>
                    </div>
                    <div class="absolute inset-x-3 md:inset-x-6 bottom-3 md:bottom-6 top-16 md:top-20"><canvas id="cashflowChart"></canvas></div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div class="lg:col-span-2 bg-white border border-gray-200 p-5 md:p-8 rounded-3xl shadow-sm overflow-hidden min-w-0">
                    <div class="flex justify-between items-center mb-5 md:mb-8">
                        <h3 class="text-lg md:text-xl font-black text-gray-900 tracking-tight">Recent Activity</h3>
                        <a href="#" onclick="window.switchView('transactions'); return false;" class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors border border-gray-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-gray-50 flex-shrink-0 ml-2">View Registry</a>
                    </div>
                    <div class="space-y-2 md:space-y-3">
                        ${transactions.slice(0, 4).map(tx => `
                            <div class="flex items-center justify-between p-3 md:p-4 bg-gray-50/50 hover:bg-gray-100/100 rounded-2xl md:rounded-[1.25rem] transition-colors cursor-pointer border border-transparent shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                                <div class="flex items-center min-w-0 pr-2 w-full">
                                    <div class="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl flex items-center justify-center mr-3 bg-white border border-gray-200 text-gray-900 shadow-sm">
                                        ${tx.icon}
                                    </div>
                                    <div class="min-w-0 pr-2 flex-1">
                                        <p class="font-black text-gray-900 tracking-tight text-xs md:text-sm truncate">${tx.title}</p>
                                        <p class="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mt-0.5 md:mt-1 truncate">${new Date(tx.date).toLocaleDateString()}</p>
                                    </div>
                                    <span class="font-black tracking-tight text-sm md:text-lg flex-shrink-0 ml-1 ${tx.amount > 0 || tx.type === 'income' ? 'text-gray-900' : 'text-gray-500'}">
                                        ${tx.amount > 0 || tx.type === 'income' ? '+' : '-'}$${Math.abs(tx.amount).toLocaleString('en-US', {minimumFractionDigits: 2})}
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="flex flex-col gap-4 md:gap-6">
                    <div class="bg-gray-900 border border-gray-900 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col justify-center min-h-[10rem] relative overflow-hidden group">
                        <p class="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] relative z-10">Monthly Inflow</p>
                        <h2 class="text-3xl md:text-4xl font-black text-white mt-2 relative z-10 break-all md:break-words">$${stats.income.toLocaleString()}</h2>
                        <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-gray-800 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>
                    </div>
                    <div class="bg-white border border-gray-200 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col justify-center min-h-[10rem]">
                        <p class="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Monthly Outflow</p>
                        <h2 class="text-3xl md:text-4xl font-black text-gray-900 mt-2 break-all md:break-words">$${stats.expenses.toLocaleString()}</h2>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderWallets() {
    const { wallets } = window.AppState;
    return `
        <div class="max-w-[1200px] w-full mx-auto space-y-6 md:space-y-10 min-w-0">
            <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-6">
                <div class="min-w-0">
                     <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 drop-shadow-sm truncate">Accounts & Cards</h1>
                </div>
                <button data-action="wallet" class="w-full md:w-auto px-6 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg hover:shadow-xl transition-all md:hover:-translate-y-1 mt-2 md:mt-0">Add Institution</button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-6 md:mt-8">
                ${wallets.map(w => `
                    <div class="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-black transition-colors cursor-pointer min-w-0">
                        <div class="flex justify-between items-center mb-5 md:mb-8">
                            <div class="px-3 md:px-4 py-1.5 bg-gray-100 text-gray-900 text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-gray-200 truncate max-w-[70%]">${w.type}</div>
                            <svg class="w-6 h-6 md:w-8 md:h-8 text-gray-300 group-hover:text-black transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                        </div>
                        <h3 class="text-lg md:text-xl font-black text-gray-900 tracking-tight truncate">${w.name}</h3>
                        <p class="text-xs md:text-sm font-bold text-gray-400 mt-1 font-mono tracking-widest truncate">${w.number}</p>
                        <div class="mt-5 md:mt-8 pt-5 md:pt-6 border-t border-gray-100">
                            <p class="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Available Capital</p>
                            <p class="text-2xl md:text-3xl font-black text-gray-900 break-all md:break-words">$${w.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderTransactions() {
    const { transactions } = window.AppState;
    return `
        <div class="max-w-[1200px] w-full mx-auto space-y-6 md:space-y-8 min-w-0">
            <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-6 mb-6 md:mb-8">
                <div class="min-w-0">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 drop-shadow-sm truncate">Registry</h1>
                </div>
                <button data-action="transaction" class="w-full md:w-auto px-6 py-4 border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-sm transition-all md:hover:-translate-y-1 mt-2 md:mt-0">Export Data</button>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-[2rem] p-3 md:p-4 shadow-sm min-w-0">
                <div class="space-y-2">
                    ${transactions.map(tx => `
                        <div class="flex items-center justify-between p-3 md:p-5 bg-gray-50/50 hover:bg-gray-100/80 rounded-2xl md:rounded-[1.25rem] transition-colors border border-transparent cursor-pointer min-w-0">
                            <div class="flex items-center min-w-0 pr-2 w-full">
                                <div class="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-xl flex items-center justify-center mr-3 md:mr-5 bg-white border border-gray-200 text-gray-900 shadow-sm">
                                    ${tx.icon}
                                </div>
                                <div class="flex flex-col min-w-0 flex-1">
                                    <span class="font-black text-gray-900 tracking-tight text-xs md:text-base mb-0.5 md:mb-1 truncate">${tx.title}</span>
                                    <span class="text-[8px] md:text-[10px] font-bold text-gray-400 tracking-[0.1em] md:tracking-[0.15em] uppercase truncate">${new Date(tx.date).toLocaleDateString()} &bull; ${tx.type}</span>
                                </div>
                            </div>
                            <span class="font-black shrink-0 tracking-tight text-sm md:text-xl ml-2 ${tx.amount > 0 || tx.type === 'income' ? 'text-gray-900' : 'text-gray-400'}">
                                ${tx.amount > 0 || tx.type === 'income' ? '+' : '-'}$${Math.abs(tx.amount).toFixed(2)}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderBudgets() {
    return `
        <div class="max-w-[1200px] w-full mx-auto space-y-6 md:space-y-8 min-w-0">
            <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-6 mb-6 md:mb-8">
                <div class="min-w-0">
                     <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 truncate">Allocations</h1>
                </div>
                 <button data-action="budget" class="w-full md:w-auto px-6 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg hover:shadow-xl transition-all md:hover:-translate-y-1 mt-2 md:mt-0">Capital Allocation</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                ${window.AppState.budgets.map(b => {
                    const pct = Math.min((b.spent / b.amount) * 100, 100).toFixed(0);
                    return `
                    <div class="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm group hover:border-black transition-colors min-w-0">
                        <div class="flex justify-between items-start mb-6 md:mb-10 gap-2 md:gap-4">
                            <div class="min-w-0 flex-1">
                                <h3 class="font-black text-xl md:text-2xl text-gray-900 tracking-tight leading-none truncate">${b.name}</h3>
                                <p class="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2 truncate">${100 - pct}% Unutilized</p>
                            </div>
                            <p class="text-[9px] md:text-xs shrink-0 font-black text-gray-900 bg-gray-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-200 uppercase tracking-widest text-right mt-1 md:mt-0">
                                $${b.spent} <span class="text-gray-400 font-bold mx-0.5 md:mx-1">|</span> $${b.amount}
                            </p>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-3 md:h-4 overflow-hidden border border-gray-200 shadow-inner">
                            <div class="${pct >= 100 ? 'bg-red-500' : 'bg-black'} h-full rounded-full" style="width: ${pct}%"></div>
                        </div>
                    </div>`
                }).join('')}
            </div>
        </div>
    `;
}

function renderGoals() {
    return `
        <div class="max-w-[1200px] w-full mx-auto space-y-6 md:space-y-8 min-w-0">
            <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-6 mb-6 md:mb-8">
                 <div class="min-w-0">
                     <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 truncate">Strategic Targets</h1>
                 </div>
                 <button data-action="goal" class="w-full md:w-auto px-6 py-4 border-2 border-gray-900 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg transition-all md:hover:-translate-y-1 mt-2 md:mt-0">Define Target</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                 ${window.AppState.goals.map(g => {
                    const pct = Math.min((g.current / g.target) * 100, 100).toFixed(0);
                    return `
                    <div class="bg-white flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-black transition-colors min-w-0">
                        <div class="relative z-10 min-w-0 pr-12 md:pr-16">
                            <h3 class="font-black text-xl md:text-2xl text-gray-900 tracking-tight truncate">${g.name}</h3>
                            <div class="mt-4 md:mt-8">
                                <p class="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1 truncate">Accumulated Capital</p>
                                <p class="text-2xl md:text-4xl font-black text-gray-900 break-all md:break-words">$${g.current.toLocaleString()}<span class="block sm:inline text-sm md:text-lg text-gray-400 font-bold mt-1 sm:mt-0"> / $${g.target.toLocaleString()}</span></p>
                            </div>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2 mt-6 md:mt-10 overflow-hidden shadow-inner relative z-10 border border-gray-200">
                            <div class="bg-black h-full rounded-full" style="width: ${pct}%"></div>
                        </div>
                        <div class="absolute right-4 top-4 md:right-8 md:top-8 w-12 h-12 md:w-16 md:h-16 border-[3px] md:border-4 border-gray-100 rounded-full flex items-center justify-center p-2 group-hover:border-black transition-colors shrink-0 bg-white">
                            <span class="text-[9px] md:text-xs font-black tracking-tighter">${pct}%</span>
                        </div>
                    </div>`
                }).join('')}
            </div>
        </div>
    `;
}
