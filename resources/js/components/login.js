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
            * { box-sizing: border-box; }
            body, html { margin: 0; padding: 0; height: 100%; font-family: Arial, Helvetica, sans-serif; }

            .ax-bg {
                position: fixed;
                inset: 0;
                background: url('${bgUrl}') center/cover no-repeat;
                filter: brightness(0.6);
                z-index: -1;
            }
            .ax-wrap {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .ax-brand {
                position: absolute;
                top: 60px;
                left: 80px;
                color: #fff;
                display: flex;
                align-items: center;
                gap: 16px;
            }
            .ax-brand img { width: 70px; height: 70px; }
            .ax-brand h1 { font-size: 48px; margin: 0; font-weight: 700; }
            .ax-brand p { font-size: 18px; margin: 4px 0 0; opacity: 0.9; }

            .ax-card {
                background: rgba(0,0,0,0.75);
                color: #fff;
                padding: 28px 30px;
                border-radius: 4px;
                width: 320px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            }
            .ax-card h2 {
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                margin: 0 0 16px;
                letter-spacing: 1px;
            }

            .ax-field {
                margin-bottom: 14px;
            }
            .ax-label {
                display: block;
                font-size: 14px;
                margin-bottom: 4px;
                color: #fff;
            }
            .ax-input {
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 3px;
                font-size: 14px;
                color: #111;
            }
            .ax-input:focus {
                outline: 2px solid #2d6cdf;
            }

            .ax-actions {
                text-align: center;
                margin-top: 18px;
            }
            .ax-btn {
                background: #2d6cdf;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 3px;
                font-size: 14px;
                cursor: pointer;
                transition: background 0.2s;
            }
            .ax-btn:hover {
                background: #1e5bb8;
            }
            .ax-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .ax-error {
                margin-top: 10px;
                color: #ffb3b3;
                text-align: center;
                font-size: 13px;
                min-height: 18px;
            }
        </style>

        <div class="ax-bg"></div>
        <div class="ax-wrap">
            <div class="ax-brand">
                <img src="${logoUrl}" alt="logo">
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
                    <button id="ax-submit" class="ax-btn">Sign in</button>
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
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ username, password, device_name: 'web' })
            });
            const data = await res.json().catch(() => ({ ok:false }));
            if (res.ok && data.token) {
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
