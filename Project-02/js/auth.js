document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const errorMsg = document.getElementById('error-msg');

    function showError(msg) {
        if(errorMsg) {
            errorMsg.textContent = msg;
            errorMsg.classList.remove('hidden');
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const btn = loginForm.querySelector('button');
            const originalText = btn.textContent;
            
            try {
                btn.textContent = 'SIGNING IN...';
                btn.disabled = true;
                const { error } = await window.FinanceApp.auth.signIn(email, password);
                
                if (error) throw error;
                window.location.href = 'dashboard.html'; // Direct to dashboard
            } catch (err) {
                console.error("Login Error:", err);
                showError(err.message || String(err));
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const btn = signupForm.querySelector('button');
            const originalText = btn.textContent;
            
            try {
                btn.textContent = 'CREATING ACCOUNT...';
                btn.disabled = true;
                if(errorMsg) errorMsg.classList.add('hidden'); // Clear prev error
                
                // Using the specific auth helper defined in supabase.js
                const response = await window.FinanceApp.auth.signUp(email, password, fullName);
                
                if (response.error) {
                     throw response.error;
                }
                
                // Safely check if user object was returned via optional chaining manually
                const user = (response.data && response.data.user) ? response.data.user : null;
                
                if (!user) {
                     throw new Error("Supabase servers couldn't return the user correctly. Try logging in anyway.");
                }
                
                const identities = user.identities || [];
                if (identities.length === 0) {
                     showError("User already exists or email is taken.");
                     btn.textContent = originalText;
                     btn.disabled = false;
                } else {
                     // Successfully Account Created
                     alert("Welcome " + fullName + "! Account successfully created.");
                     window.location.href = 'dashboard.html'; // Go directly to dashboard
                }
            } catch (err) {
                console.error("Signup Error Detailed:", err);
                let msg = err.message || err.error_description || String(err);
                showError("RAW ERROR: " + msg);
                
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }
});
