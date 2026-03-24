// Supabase Configuration
const SUPABASE_URL = 'https://xtqppresnkapzawkjouo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBwcmVzbmthcHphd2tqb3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNjE3NDUsImV4cCI6MjA4OTkzNzc0NX0.RH9Ti-2pjSwpc0h0HuYd88ZwQ-HpF3VlM9g0509L6_s';

// Initialize Supabase client avoiding variable name collisions!
const supabaseClient = (window.supabase) ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth helpers
const auth = {
  async signUp(email, password, fullName) {
    return await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
  },

  async signIn(email, password) {
    return await supabaseClient.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    return await supabaseClient.auth.signOut();
  },

  async getUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
  },

  async getSession() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    return session;
  },

  onAuthStateChange(callback) {
    return supabaseClient.auth.onAuthStateChange(callback);
  }
};

// Database helpers
const db = {
  // Profile
  async getProfile(userId) {
    return await supabaseClient.from('profiles').select('*').eq('id', userId).single();
  },

  async updateProfile(userId, updates) {
    return await supabaseClient.from('profiles').update(updates).eq('id', userId);
  },

  // Categories
  async getCategories(type = null) {
    let query = supabaseClient.from('categories').select('*');
    if (type) query = query.eq('type', type);
    return await query.order('name');
  },

  async createCategory(data) {
    const user = await auth.getUser();
    return await supabaseClient.from('categories').insert({ ...data, user_id: user.id });
  },

  // Transactions
  async getTransactions(filters = {}) {
    let query = supabaseClient.from('transactions').select(`
      *,
      categories(name, icon, color)
    `).order('date', { ascending: false });

    if (filters.type) query = query.eq('type', filters.type);
    if (filters.startDate) query = query.gte('date', filters.startDate);
    if (filters.endDate) query = query.lte('date', filters.endDate);
    if (filters.limit) query = query.limit(filters.limit);

    return await query;
  },

  async createTransaction(data) {
    const user = await auth.getUser();
    return await supabaseClient.from('transactions').insert({ ...data, user_id: user.id });
  },

  async updateTransaction(id, updates) {
    return await supabaseClient.from('transactions').update(updates).eq('id', id);
  },

  async deleteTransaction(id) {
    return await supabaseClient.from('transactions').delete().eq('id', id);
  },

  // Budgets
  async getBudgets() {
    return await supabaseClient.from('budgets').select(`
      *,
      categories(name, icon, color)
    `).order('created_at');
  },

  async createBudget(data) {
    const user = await auth.getUser();
    return await supabaseClient.from('budgets').insert({ ...data, user_id: user.id });
  },

  async updateBudget(id, updates) {
    return await supabaseClient.from('budgets').update(updates).eq('id', id);
  },

  async deleteBudget(id) {
    return await supabaseClient.from('budgets').delete().eq('id', id);
  },

  // Savings Goals
  async getSavingsGoals() {
    return await supabaseClient.from('savings_goals').select('*').order('created_at');
  },

  async createSavingsGoal(data) {
    const user = await auth.getUser();
    return await supabaseClient.from('savings_goals').insert({ ...data, user_id: user.id });
  },

  async updateSavingsGoal(id, updates) {
    return await supabaseClient.from('savings_goals').update(updates).eq('id', id);
  },

  async deleteSavingsGoal(id) {
    return await supabaseClient.from('savings_goals').delete().eq('id', id);
  },

  // Stats/Analytics
  async getMonthlyStats(year, month) {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    const { data: transactions } = await supabaseClient
      .from('transactions')
      .select('amount, type')
      .gte('date', startDate)
      .lte('date', endDate);

    const income = transactions?.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
    const expenses = transactions?.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0) || 0;

    return { income, expenses, balance: income - expenses };
  }
};

window.FinanceApp = { supabase: supabaseClient, auth, db };
