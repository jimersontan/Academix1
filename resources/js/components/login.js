// Lightweight login UI component (vanilla JS)
// Usage:
//   import { mountLogin } from './components/login';
//   mountLogin(document.getElementById('app'));

export function mountLogin(rootEl, options = {}) {
    if (!rootEl) throw new Error('mountLogin: root element is required');

    const bgUrl = options.backgroundUrl || 'https://tse4.mm.bing.net/th/id/OIP.tgQYDIWK0Z67zJ1pohyo4QHaEK?pid=Api&P=0&h=180';
    const logoUrl = options.logoUrl || 'https://tse3.mm.bing.net/th/id/OIP.kNZRsLF495e1651A1kiMvwHaHa?pid=Api&P=0&h=180';

    rootEl.innerHTML = `
        <style>
            .ax-bg{position:fixed;inset:0;background:url('${bgUrl}') center/cover no-repeat;filter:brightness(.75)}
            .ax-wrap{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center}
            .ax-brand{position:absolute;top:32px;left:32px;color:#fff;display:flex;align-items:center;gap:12px}
            .ax-brand img{width:64px;height:64px;border-radius:8px}
            .ax-brand h1{margin:0;font-size:44px;font-weight:700}
            .ax-brand p{margin:0;opacity:.95}
            .ax-card{width:360px;background:#333;color:#fff;padding:22px;border-radius:6px;box-shadow:0 12px 28px rgba(0,0,0,.45)}
            .ax-card h2{margin:0 0 10px;font-size:18px}
            .ax-field{margin:10px 0}
            .ax-label{display:block;font-size:13px;color:#ddd;margin-bottom:6px}
            .ax-input{width:100%;padding:8px 10px;border:1px solid #777;border-radius:3px;background:#eee;color:#222}
            .ax-actions{margin-top:14px;display:flex;justify-content:flex-end}
            .ax-btn{background:#2d6cdf;color:#fff;border:none;padding:8px 14px;border-radius:3px;cursor:pointer}
            .ax-btn:disabled{opacity:.6;cursor:not-allowed}
            .ax-error{margin-top:10px;color:#ffb3b3;min-height:18px;font-size:13px}
        </style>
        <div class="ax-bg" aria-hidden="true"></div>
        <div class="ax-wrap">
            <div class="ax-brand">
                <img alt="logo" src="${logoUrl}">
                <div>
                    <h1>Academix</h1>
                    <p>Student Management Portal</p>
                </div>
            </div>
            <div class="ax-card">
                <h2>LOGIN</h2>
                <div class="ax-field">
                    <label class="ax-label" for="ax-username">UserName</label>
                    <input class="ax-input" id="ax-username" autocomplete="username" />
                </div>
                <div class="ax-field">
                    <label class="ax-label" for="ax-password">Password</label>
                    <input type="password" class="ax-input" id="ax-password" autocomplete="current-password" />
                </div>
                <div class="ax-actions">
                    <button id="ax-submit" class="ax-btn">Sign In</button>
                </div>
                <div id="ax-error" class="ax-error"></div>
            </div>
        </div>
    `;

    const $ = (sel) => rootEl.querySelector(sel);
    const usernameEl = $('#ax-username');
    const passwordEl = $('#ax-password');
    const submitBtn = $('#ax-submit');
    const errorBox = $('#ax-error');

    async function login() {
        errorBox.textContent = '';
        submitBtn.disabled = true;
        const username = usernameEl.value.trim();
        const password = passwordEl.value;
        if (!username || !password) {
            errorBox.textContent = 'Please enter username and password.';
            submitBtn.disabled = false;
            return;
        }
        try {
            const res = await fetch('api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ username, password, device_name: 'web' })
            });
            const data = await res.json().catch(() => ({ ok:false }));
            if (res.ok && data.token) {
                // persist token for subsequent API calls
                window.localStorage.setItem('academix_token', data.token);
                if (typeof options.onSuccess === 'function') options.onSuccess(data);
            } else {
                errorBox.textContent = (data && data.errors && (data.errors.username?.[0] || data.message)) || 'Invalid credentials.';
                submitBtn.disabled = false;
            }
        } catch (e) {
            errorBox.textContent = 'Network error. Please try again.';
            submitBtn.disabled = false;
        }
    }

    submitBtn.addEventListener('click', login);
    passwordEl.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ login(); } });
}


