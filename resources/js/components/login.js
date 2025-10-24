// Lightweight login UI component (vanilla JS)
// Usage:
//   import { mountLogin } from './components/login';
//   mountLogin(document.getElementById('app'));

export function mountLogin(rootEl, options = {}) {
    if (!rootEl) throw new Error('mountLogin: root element is required');

    // Use a higher-resolution default image (remove small h=180 query) so background isn't blurry when scaled
    const bgUrl = options.backgroundUrl || 'https://tse4.mm.bing.net/th/id/OIP.tgQYDIWK0Z67zJ1pohyo4QHaEK?pid=Api&P=0';
    const logoUrl = options.logoUrl || 'https://tse3.mm.bing.net/th/id/OIP.kNZRsLF495e1651A1kiMvwHaHa?pid=Api&P=0';

    rootEl.innerHTML = `
        <style>
            .ax-bg{position:fixed;inset:0;background-image:url('${bgUrl}');background-position:center;background-size:cover;background-repeat:no-repeat;background-attachment:fixed;filter:brightness(.75)}
            .ax-wrap{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center}
            .ax-brand{position:absolute;top:28px;left:28px;color:#fff;display:flex;align-items:center;gap:12px;z-index:3}
            .ax-brand img{width:64px;height:64px;border-radius:8px;object-fit:cover}
            .ax-brand h1{margin:0;font-size:40px;font-weight:700}
            .ax-brand p{margin:0;opacity:.95}
            /* Larger, centered login card for projector */
            .ax-card{width:520px;max-width:96vw;background:rgba(34,34,34,0.95);color:#fff;padding:28px;border-radius:10px;box-shadow:0 18px 48px rgba(0,0,0,.6);z-index:4}
            .ax-card h2{margin:0 0 12px;font-size:24px;letter-spacing:0.6px}
            .ax-field{margin:12px 0}
            .ax-label{display:block;font-size:16px;color:#e7e7e7;margin-bottom:8px;font-weight:600}
            /* Type bars (inputs) — bigger and more touch-friendly */
            .ax-input{width:100%;padding:12px 14px;border:1px solid #999;border-radius:6px;background:#fff;color:#111;font-size:18px;height:48px;box-sizing:border-box}
            .ax-actions{margin-top:18px;display:flex;justify-content:flex-end}
            .ax-btn{background:#2d6cdf;color:#fff;border:none;padding:10px 18px;border-radius:6px;cursor:pointer;font-size:16px}
            .ax-btn:disabled{opacity:.6;cursor:not-allowed}
            .ax-error{margin-top:12px;color:#ffb3b3;min-height:20px;font-size:14px}
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
                <div class="ax-field" style="position:relative">
                    <label class="ax-label" for="ax-password">Password</label>
                    <input type="password" class="ax-input" id="ax-password" autocomplete="current-password" style="padding-right:84px" />
                    <button id="ax-toggle-password" type="button" style="position:absolute;right:12px;top:38px;background:transparent;border:1px solid rgba(255,255,255,0.12);color:#fff;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:14px">Show</button>
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
    const toggleBtn = $('#ax-toggle-password');

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
            const res = await fetch('/api/auth/login', {
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
    // Toggle show/hide password so users can reveal what they typed
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (passwordEl.type === 'password') {
                passwordEl.type = 'text';
                toggleBtn.textContent = 'Hide';
                toggleBtn.setAttribute('aria-pressed', 'true');
            } else {
                passwordEl.type = 'password';
                toggleBtn.textContent = 'Show';
                toggleBtn.setAttribute('aria-pressed', 'false');
            }
        });
    }
}


