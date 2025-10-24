// Simple admin-only Dashboard
// Usage: import { mountDashboard } from './components/dashboard';
//        mountDashboard(document.getElementById('app'))

function requireToken() {
    const token = window.localStorage.getItem('academix_token');
    if (!token) {
        window.location.href = 'index.html';
        throw new Error('No token');
    }
    return token;
}

export async function fetchJson(url, options = {}) {
    const token = requireToken();
    const res = await fetch(url, {
        ...options,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...(options.headers || {})
        }
    });
    if (res.status === 401) {
        window.localStorage.removeItem('academix_token');
        window.location.href = 'index.html';
        return;
    }
    return res.json();
}

import notify from './notify';

export function mountDashboard(rootEl) {
    if (!rootEl) throw new Error('mountDashboard: root element is required');

    rootEl.innerHTML = `
      <style>
        :root{--bg:#0b0b0b;--panel:#2b2b2b;--muted:#8a8a8a}
        body{background:var(--bg);color:#fff;font-family:Arial,Helvetica,sans-serif}
        .shell{min-height:100vh;display:grid;grid-template-columns:320px 1fr;gap:20px;padding:24px}
        /* left navigation card (rounded) */
        .left-card{background:#0f0f0f;border-radius:20px;padding:22px;width:280px;box-shadow:0 10px 30px rgba(0,0,0,0.6)}
        .brand{display:flex;align-items:center;gap:12px;margin-bottom:18px}
        .brand img{width:64px;height:64px;border-radius:8px}
        .brand h1{font-size:30px;margin:0}
  .nav-links{margin-top:14px}
  /* inner nav container to match Figma-like dark rounded box */
  .nav-inner{background:#0b0b0b;padding:18px;border-radius:28px;box-shadow:0 8px 30px rgba(0,0,0,0.6)}
  .nav-links a{display:block;color:#ddd;text-decoration:none;padding:12px;border-radius:6px;margin:6px 0}
  .nav-links a:hover{background:#151515}

        /* main header/banner */
        .banner{background-image:url('https://tse4.mm.bing.net/th/id/OIP.tgQYDIWK0Z67zJ1pohyo4QHaEK?pid=Api&P=0');background-size:cover;border-radius:12px;padding:28px;color:#fff;position:relative}
        .banner::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.65));border-radius:12px}
        .banner-inner{position:relative;z-index:2;display:flex;gap:20px;align-items:center}
        .banner h2{margin:0;font-size:34px}

        /* stat cards */
        .stats{display:flex;gap:18px;margin-top:18px}
        .stat{background:var(--panel);padding:18px;border-radius:12px;display:flex;gap:14px;align-items:center;min-width:220px}
        .stat .icon{width:40px;height:40px;background:#e6e6e6;border-radius:6px}
        .stat .label{font-weight:700}
        .stat .value{font-size:22px;margin-top:6px}

        /* departments big list */
        .dept-list{margin-top:22px;background:var(--panel);padding:18px;border-radius:12px}
        .dept-list h3{margin:0 0 10px}
        .dept-item{padding:10px 12px;border-top:1px solid rgba(255,255,255,0.03)}
        .dept-item:first-child{border-top:none}

        /* small helpers */
        .muted{color:var(--muted);font-size:13px}
      </style>

      <div style="display:flex;gap:20px">
        <aside class="left-card">
          <div class="brand">
            <img src="/public/css/../img/logo.png" onerror="this.src='https://cdn.vectorstock.com/i/500p/25/20/books-stack-logo-template-vector-27212520.jpg'" />
            <div>
              <div style="font-weight:800;font-size:18px">Academix</div>
              <div class="muted">Student Management Portal</div>
            </div>
          </div>
          <nav class="nav-links">
            <div class="nav-inner">
              <a href="#" id="menu-dashboard">Dashboard</a>
              <a href="#" id="menu-students">Students</a>
              <a href="#" id="menu-faculty">Faculty</a>
              <a href="#" id="menu-report">Report</a>
              <a href="#" id="menu-profile">My Profile</a>
              <a href="#" id="menu-settings">Settings</a>
            </div>
          </nav>
        </aside>

        <main style="flex:1">
          <div class="banner">
            <div class="banner-inner">
              <div style="flex:1">
                <h2>Dashboard</h2>
                <div class="muted">Academic Management</div>
              </div>
            </div>
            <div class="stats" style="position:relative;z-index:3">
              <div class="stat">
                <div class="icon"></div>
                <div>
                  <div class="label">Total Student</div>
                  <div id="stat-students" class="value">0</div>
                </div>
              </div>
              <div class="stat">
                <div class="icon"></div>
                <div>
                  <div class="label">Total Faculty</div>
                  <div id="stat-faculty" class="value">0</div>
                </div>
              </div>
              <div class="stat">
                <div class="icon"></div>
                <div>
                  <div class="label">Course Offered</div>
                  <div id="stat-courses" class="value">0</div>
                </div>
              </div>
            </div>
          </div>

          <section class="dept-list">
            <h3>Departments</h3>
            <div id="departments">Loading...</div>
          </section>
        </main>
      </div>
    `;

  // select the main element inside the dashboard shell
  const main = rootEl.querySelector('main');

  // Load stats for dashboard (and poll every 5s so new students/faculty are reflected automatically)
  async function fetchStats(){
    try{
      const data = await fetchJson('/api/dashboard/stats');
      if (!data) return;
      const sEl = rootEl.querySelector('#stat-students');
      const fEl = rootEl.querySelector('#stat-faculty');
      const cEl = rootEl.querySelector('#stat-courses');
      const dEl = rootEl.querySelector('#departments');
      if (sEl) sEl.textContent = data.total_students ?? 0;
      if (fEl) fEl.textContent = data.total_faculty ?? 0;
      if (cEl) cEl.textContent = (data.students_per_course ? new Set((data.students_per_course||[]).map(x=>x.course_id)).size : 0);
      const dept = data.faculty_per_department || [];
      const html = (dept.map(d=>`<div class="dept-item">${d.department_name || 'N/A'} — ${d.total}</div>`).join('')) || '<div class="muted">No data</div>';
      if (dEl) dEl.innerHTML = html;
    }catch(e){ console.warn('dashboard stats failed', e); }
  }
  fetchStats();
  // Poll so updates appear when new students/faculty/courses are added elsewhere
  const statsInterval = setInterval(fetchStats, 5000);

    // Logout
    const logout = async () => {
        try { await fetchJson('/api/auth/logout', { method:'POST' }); } catch(e) {}
        window.localStorage.removeItem('academix_token');
        window.location.href = 'index.html';
    };
    // Profile modal (contains logout button)
    const profileModalHtml = `
      <div id="profile-modal" style="position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:3000">
        <div style="background:#111;color:#fff;padding:20px;border-radius:8px;width:360px;box-shadow:0 20px 60px rgba(0,0,0,.6)">
          <h3 style="margin:0 0 8px">My Profile</h3>
          <div id="profile-info" style="margin-bottom:12px;display:flex;gap:12px;align-items:center">
            <img id="profile-avatar" src="" alt="avatar" style="width:64px;height:64px;border-radius:50%;background:#222;object-fit:cover" />
            <div style="flex:1">
              <div id="profile-name-modal" style="font-weight:700">Admin</div>
              <div id="profile-email-modal" style="font-size:12px;opacity:.8">admin@example.com</div>
              <div style="margin-top:8px">
                <input id="profile-avatar-input" type="file" accept="image/*" style="color:#fff" />
              </div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
            <div>
              <label style="display:block;font-size:12px;opacity:.9;margin-bottom:6px">Username</label>
              <input id="profile-username" type="text" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
            </div>
            <div>
              <label style="display:block;font-size:12px;opacity:.9;margin-bottom:6px">Email</label>
              <input id="profile-email" type="email" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
            </div>
          </div>
          <div style="margin-bottom:12px">
            <h4 style="margin:0 0 8px;font-size:14px">Change Password</h4>
            <div style="display:grid;gap:8px">
              <input id="profile-current-password" type="password" placeholder="Current password" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
              <input id="profile-new-password" type="password" placeholder="New password" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
              <input id="profile-new-password-confirm" type="password" placeholder="Confirm new password" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <button id="profile-save" style="background:#2d6cdf;color:#fff;border:none;padding:8px 10px;border-radius:4px">Save</button>
            <button id="profile-close" style="background:#666;color:#fff;border:none;padding:8px 10px;border-radius:4px">Close</button>
            <button id="profile-logout" style="background:#d32f2f;color:#fff;border:none;padding:8px 10px;border-radius:4px">Logout</button>
          </div>
        </div>
      </div>`;
  main.insertAdjacentHTML('beforeend', profileModalHtml);
  const profileModal = rootEl.querySelector('#profile-modal');
  // Open profile modal from menu-profile (default) -> we will also support in-main profile page
  const menuProfile = rootEl.querySelector('#menu-profile');
  // Render profile page inside main (replaces main content) with left admin card and right edit form
  async function renderProfilePage(container) {
    container.innerHTML = `
      <div class="topbar">
        <h2 style="margin:0">My Profile</h2>
      </div>
      <div style="display:grid;grid-template-columns:320px 1fr;gap:18px">
        <div style="background:#2b2b2b;padding:18px;border-radius:8px;display:flex;flex-direction:column;justify-content:space-between;min-height:300px">
          <div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;position:relative">
              <div id="profile-avatar-wrap" style="width:120px;height:120px;border-radius:50%;overflow:hidden;position:relative;background:#111;background-size:cover;background-position:center center;cursor:grab;display:flex;align-items:center;justify-content:center">
                <div id="profile-avatar-overlay" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none">
                  <button id="profile-avatar-choose" style="pointer-events:auto;background:rgba(0,0,0,0.5);color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">Choose file</button>
                </div>
                <input id="profile-avatar-input-page" type="file" accept="image/*" style="display:none" />
              </div>
              <div id="profile-name-page" style="font-weight:700;color:#fff">Admin</div>
              <div id="profile-email-page" style="font-size:13px;opacity:.8;color:#ddd">admin@example.com</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;justify-content:flex-start">
              <button id="profile-edit-page" class="btn">Edit Profile</button>
            </div>
            <div style="display:flex;gap:8px">
              <button id="profile-remove-page" style="background:#2d6cdf;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer">Remove Profile</button>
              <button id="profile-logout-page" style="background:#d32f2f;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer">Logout</button>
            </div>
          </div>
        </div>
        <div style="background:#2b2b2b;padding:18px;border-radius:8px;">
          <div style="margin-bottom:12px">
            <label style="display:block;font-size:12px;opacity:.9;margin-bottom:6px">First Name</label>
            <input id="profile-first-name-page" type="text" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
          </div>
          <div style="margin-bottom:12px">
            <label style="display:block;font-size:12px;opacity:.9;margin-bottom:6px">Middle Name</label>
            <input id="profile-middle-name-page" type="text" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
          </div>
          <div style="margin-bottom:12px">
            <label style="display:block;font-size:12px;opacity:.9;margin-bottom:6px">Last Name</label>
            <input id="profile-last-name-page" type="text" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
          </div>
          <!-- edit form container (hidden until Edit Profile clicked) -->
          <div id="profile-edit-container" style="display:none;margin-bottom:12px;background:rgba(0,0,0,0.06);padding:12px;border-radius:6px">
            <div style="display:grid;gap:8px;margin-bottom:8px">
              <label style="display:block;font-size:12px;opacity:.9;margin-bottom:6px">Email</label>
              <input id="profile-email-edit-page" type="email" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
            </div>
            <div style="display:grid;gap:8px">
              <input id="profile-current-password-page" type="password" placeholder="Current password" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
              <input id="profile-new-password-page" type="password" placeholder="New password" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
              <input id="profile-new-password-confirm-page" type="password" placeholder="Confirm new password" style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff" />
            </div>
          </div>
          <div style="margin-bottom:12px">
            <label style="display:block;font-size:12px;opacity:.9;margin-bottom:6px">Role</label>
            <input id="profile-role-page" type="text" readonly style="width:100%;padding:8px;border-radius:6px;border:1px solid #333;background:#0f0f0f;color:#fff;opacity:.9" />
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <button id="profile-save-page" class="btn" style="background:#2d6cdf;color:#fff;border:none;padding:8px 12px;border-radius:6px">Save</button>
          </div>
        </div>
      </div>
    `;

    // Populate values from API
    const avatarImg = container.querySelector('#profile-avatar-page');
    const avatarInput = container.querySelector('#profile-avatar-input-page');
    const avatarChoose = container.querySelector('#profile-avatar-choose');
    const nameEl = container.querySelector('#profile-name-page');
    const emailEl = container.querySelector('#profile-email-page');
    const firstNameInput = container.querySelector('#profile-first-name-page');
    const middleNameInput = container.querySelector('#profile-middle-name-page');
    const lastNameInput = container.querySelector('#profile-last-name-page');
    const roleInput = container.querySelector('#profile-role-page');

  // load stored avatar (image data and position)
  const avatarWrap = container.querySelector('#profile-avatar-wrap');
  const avatarOverlay = container.querySelector('#profile-avatar-overlay');
    const storedAvatar = window.localStorage.getItem('academix_avatar');
    const storedPos = window.localStorage.getItem('academix_avatar_pos');
    if (avatarWrap && storedAvatar) {
      avatarWrap.style.backgroundImage = `url(${storedAvatar})`;
      if (storedPos) avatarWrap.style.backgroundPosition = storedPos;
      // hide the choose overlay when an avatar already exists
      if (avatarOverlay) avatarOverlay.style.display = 'none';
    }

    // Avatar choose button
    if (avatarChoose && avatarInput) avatarChoose.addEventListener('click', ()=>{ avatarInput.click(); });

    // Avatar upload: set as background and persist
    if (avatarInput && avatarWrap) {
      avatarInput.addEventListener('change', (ev) => {
        const f = ev.target.files && ev.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = function(e) {
          try { window.localStorage.setItem('academix_avatar', e.target.result); } catch (err) { console.warn('Avatar save failed', err); }
          avatarWrap.style.backgroundImage = `url(${e.target.result})`;
          avatarWrap.style.backgroundSize = 'cover';
          avatarWrap.style.backgroundPosition = 'center center';
          // hide the choose overlay once an image has been set
          if (avatarOverlay) avatarOverlay.style.display = 'none';
          try { window.localStorage.setItem('academix_avatar_pos', 'center center'); } catch (err) {}
        };
        reader.readAsDataURL(f);
      });
    }

    // Drag-to-pan implementation for avatarWrap (mouse + touch)
    if (avatarWrap) {
      let dragging = false;
      let startClient = {x:0,y:0};
      let startPos = {x:50,y:50};
      const parsePos = (posStr) => {
        try {
          const parts = (posStr||'50% 50%').trim().split(/\s+/);
          const x = parts[0] && parts[0].includes('%') ? parseFloat(parts[0]) : (parts[0] === 'center' ? 50 : 50);
          const y = parts[1] && parts[1].includes('%') ? parseFloat(parts[1]) : (parts[1] === 'center' ? 50 : 50);
          return {x,y};
        } catch(e){ return {x:50,y:50}; }
      };
      const toPosStr = (p) => `${p.x}% ${p.y}%`;
      // initialize from persisted value
      try { startPos = parsePos(window.localStorage.getItem('academix_avatar_pos') || avatarWrap.style.backgroundPosition || '50% 50%'); } catch(e){ startPos = {x:50,y:50}; }

      const beginDrag = (clientX, clientY) => {
        dragging = true;
        startClient.x = clientX; startClient.y = clientY;
        // anchor the start position so moves are relative to it
        startPos = parsePos(avatarWrap.style.backgroundPosition || window.localStorage.getItem('academix_avatar_pos') || '50% 50%');
        avatarWrap.style.cursor = 'grabbing';
      };

      const updateDrag = (clientX, clientY) => {
        if (!dragging) return;
        const dx = clientX - startClient.x;
        const dy = clientY - startClient.y;
        const rect = avatarWrap.getBoundingClientRect();
        // convert pixel delta to percent relative to element size
        const deltaX = (dx / rect.width) * 100;
        const deltaY = (dy / rect.height) * 100;
        let nx = startPos.x + deltaX;
        let ny = startPos.y + deltaY;
        nx = Math.max(0, Math.min(100, nx));
        ny = Math.max(0, Math.min(100, ny));
        avatarWrap.style.backgroundPosition = toPosStr({x: nx, y: ny});
      };

      const endDrag = () => {
        if (!dragging) return;
        dragging = false; avatarWrap.style.cursor = 'grab';
        const pos = avatarWrap.style.backgroundPosition || window.localStorage.getItem('academix_avatar_pos') || '50% 50%';
        try { window.localStorage.setItem('academix_avatar_pos', pos); } catch(e){}
      };

      // Mouse events
      avatarWrap.addEventListener('mousedown', (ev) => { ev.preventDefault(); beginDrag(ev.clientX, ev.clientY); });
      document.addEventListener('mousemove', (ev) => { updateDrag(ev.clientX, ev.clientY); });
      document.addEventListener('mouseup', (ev) => { endDrag(); });

      // Touch events (basic support)
      avatarWrap.addEventListener('touchstart', (ev) => {
        if (!ev.touches || !ev.touches[0]) return;
        const t = ev.touches[0]; beginDrag(t.clientX, t.clientY);
      }, { passive: false });
      document.addEventListener('touchmove', (ev) => {
        if (!ev.touches || !ev.touches[0]) return;
        const t = ev.touches[0]; updateDrag(t.clientX, t.clientY);
      }, { passive: false });
      document.addEventListener('touchend', (ev) => { endDrag(); });
    }

    // fetch current user
    const user = await fetchJson('/api/auth/me');
    if (user) {
      const first = user.f_name || user.first_name || user.first || '';
      const middle = user.m_name || user.middle_name || '';
      const last = user.l_name || user.last_name || user.last || '';
      const role = user.type || user.role || 'admin';
      const displayName = `${first} ${last}`.trim() || user.name || 'Admin';
      const mail = user.email || '';
      if (nameEl) nameEl.textContent = displayName;
      if (emailEl) emailEl.textContent = mail;
      if (firstNameInput) firstNameInput.value = first || '';
      if (middleNameInput) middleNameInput.value = middle || '';
      if (lastNameInput) lastNameInput.value = last || '';
      if (roleInput) roleInput.value = role || '';
    }

    // helper: disable button while async action runs
    const disableOnce = (btn) => {
      if (!btn) return function(){};
      btn.disabled = true; btn.style.opacity = '0.6';
      return () => { btn.disabled = false; btn.style.opacity = ''; };
    };

    // Save handler
    const saveBtn = container.querySelector('#profile-save-page');
    if (saveBtn) saveBtn.addEventListener('click', async () => {
  const first = (container.querySelector('#profile-first-name-page') || {}).value || '';
  const middle = (container.querySelector('#profile-middle-name-page') || {}).value || '';
  const last = (container.querySelector('#profile-last-name-page') || {}).value || '';
  // role is read-only, do not submit changes to role from client
  const current_password = (container.querySelector('#profile-current-password-page') || {}).value || '';
  const new_password = (container.querySelector('#profile-new-password-page') || {}).value || '';
  const new_password_confirmation = (container.querySelector('#profile-new-password-confirm-page') || {}).value || '';
      // Validation: require First and Last name
  if (!first.trim() || !last.trim()) { notify('First and Last name are required.', 'Profile', 'error'); return; }
      const payload = {};
  // Always include name fields
  payload.first_name = first.trim() || null;
  payload.middle_name = middle.trim() || null;
  payload.last_name = last.trim() || null;
      // include email if edit mode is visible
      const editContainer = container.querySelector('#profile-edit-container');
      if (editContainer && editContainer.style.display !== 'none') {
        const email = (container.querySelector('#profile-email-edit-page') || {}).value || '';
  if (!email.trim()) { notify('Email is required to save profile changes.', 'Profile', 'error'); return; }
        // basic email format check
        const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRe.test(email)) { notify('Please enter a valid email address.', 'Profile', 'error'); return; }
        payload.email = email.trim();
      }
  if (new_password) {
  if (!current_password) { notify('Current password is required to set a new password.', 'Profile', 'error'); return; }
  if (new_password !== new_password_confirmation) { notify('New password and confirmation do not match.', 'Profile', 'error'); return; }
    payload.new_password = new_password; payload.new_password_confirmation = new_password_confirmation; payload.current_password = current_password;
  }
      const restore = disableOnce(saveBtn);
      try {
        const res = await fetchJson('/api/auth/profile', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
        if (!res) { restore(); return; }
        notify('Profile updated', 'Admin', 'success');
        restore();
      } catch (err) { console.error(err); notify(err.message || 'Update failed', 'Profile', 'error'); restore(); }
    });

    // Logout handler
    const logoutBtn = container.querySelector('#profile-logout-page');
    if (logoutBtn) logoutBtn.addEventListener('click', () => { logout(); });

    // Remove Profile (clear avatar)
    const removeBtn = container.querySelector('#profile-remove-page');
    if (removeBtn) removeBtn.addEventListener('click', () => {
      if (!confirm('Remove profile picture? This will clear the current avatar.')) return;
      try { window.localStorage.removeItem('academix_avatar'); window.localStorage.removeItem('academix_avatar_pos'); } catch(e){}
      const avatarWrap = container.querySelector('#profile-avatar-wrap');
      if (avatarWrap) { avatarWrap.style.backgroundImage = ''; avatarWrap.style.backgroundPosition = 'center center'; avatarWrap.style.backgroundSize = ''; }
      // show the choose overlay again
      if (avatarOverlay) avatarOverlay.style.display = 'flex';
      notify('Profile picture removed', 'Admin', 'success');
    });

    // Edit Profile toggles edit mode: show username/email/password inputs in right column
    const editBtn = container.querySelector('#profile-edit-page');
    if (editBtn) editBtn.addEventListener('click', async () => {
      const editContainer = container.querySelector('#profile-edit-container');
      if (!editContainer) return;
      if (editContainer.style.display === 'none' || !editContainer.style.display) {
        // show and populate from API
        editContainer.style.display = 'block';
        const user = await fetchJson('/api/auth/me');
        if (user) {
          const email = user.email || '';
          const eEl = container.querySelector('#profile-email-edit-page');
          if (eEl) eEl.value = email;
        }
      } else {
        // hide
        editContainer.style.display = 'none';
      }
    });
  }

  if (menuProfile) menuProfile.addEventListener('click', (e)=>{ e.preventDefault(); main.innerHTML = ''; renderProfilePage(main); });
  rootEl.querySelector('#profile-close').addEventListener('click', ()=>{ profileModal.style.display='none'; });
  // Logout from modal and sidebar
  rootEl.querySelector('#profile-logout').addEventListener('click', ()=>{ logout(); });
  // Sidebar profile card removed; logout remains available in the profile modal

  // Populate profile info from API
  fetchJson('/api/auth/me').then((user) => {
    if (!user) return;
    const name = user.name || user.f_name || `${user.f_name || ''} ${user.l_name || ''}`.trim() || 'Admin';
    const email = user.email || user.email_address || '';
    const elName = rootEl.querySelector('#profile-name');
    const elEmail = rootEl.querySelector('#profile-email');
    if (elName) elName.textContent = name;
    if (elEmail) elEmail.textContent = email;
    const modalName = rootEl.querySelector('#profile-name-modal');
    const modalEmail = rootEl.querySelector('#profile-email-modal');
    if (modalName) modalName.textContent = name;
    if (modalEmail) modalEmail.textContent = email;
    // Load avatar from localStorage if present
    const avatarData = window.localStorage.getItem('academix_avatar');
    const avatarImg = rootEl.querySelector('#profile-avatar');
    if (avatarData && avatarImg) { avatarImg.src = avatarData; }
    const avatarInput = rootEl.querySelector('#profile-avatar-input');
    if (avatarInput && avatarImg) {
      avatarInput.addEventListener('change', (ev) => {
        const f = ev.target.files && ev.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = function(e) {
          avatarImg.src = e.target.result;
          try { window.localStorage.setItem('academix_avatar', e.target.result); } catch (err) { console.warn('Avatar save failed', err); }
        };
        reader.readAsDataURL(f);
      });
    }
  }).catch(err => { /* ignore - user may be unauthenticated */ });
  
  // Profile save handler
  const profileSaveBtn = rootEl.querySelector('#profile-save');
  if (profileSaveBtn) profileSaveBtn.addEventListener('click', async () => {
    const emailEl = rootEl.querySelector('#profile-email');
    const current_password_el = rootEl.querySelector('#profile-current-password');
    const new_password_el = rootEl.querySelector('#profile-new-password');
    const new_password_confirmation_el = rootEl.querySelector('#profile-new-password-confirm');
    const email = emailEl ? (emailEl.value || '').trim() : '';
    const current_password = current_password_el ? (current_password_el.value || '') : '';
    const new_password = new_password_el ? (new_password_el.value || '') : '';
    const new_password_confirmation = new_password_confirmation_el ? (new_password_confirmation_el.value || '') : '';
    // Require email to be present
    if (!email) { notify('Email is required to save profile.', 'Profile', 'error'); return; }
    const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRe.test(email)) { notify('Please enter a valid email address.', 'Profile', 'error'); return; }
    if (new_password) {
      if (!current_password) { notify('Current password is required to change password.', 'Profile', 'error'); return; }
      if (new_password !== new_password_confirmation) { notify('New password and confirmation do not match.', 'Profile', 'error'); return; }
    }
    const payload = { email };
    if (new_password) { payload.new_password = new_password; payload.new_password_confirmation = new_password_confirmation; payload.current_password = current_password; }
    try {
      const res = await fetchJson('/api/auth/profile', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if (!res) return;
      // update UI with returned user
      const returned = res.user || res;
      if (returned) {
        const modalEmail = rootEl.querySelector('#profile-email-modal');
        if (modalEmail && returned.email) modalEmail.textContent = returned.email;
      }
      notify('Profile updated', 'Admin', 'success');
  } catch (err) { console.error(err); notify(err.message || 'Update failed', 'Profile', 'error'); }
  });
  // Sidebar logout removed: logout is available inside the Profile modal only

    // Navigate to Students inside the same dashboard shell
    const menuStudents = rootEl.querySelector('#menu-students');
    if (menuStudents) {
        menuStudents.addEventListener('click', (e)=>{
            e.preventDefault();
            if (window.Academix && typeof window.Academix.mountStudents === 'function') {
                // Replace main content with the students module
                main.innerHTML = '';
                window.Academix.mountStudents(main);
            }
        });
    }

    // Navigate to Faculty inside the same dashboard shell
    const menuFaculty = rootEl.querySelector('#menu-faculty');
    if (menuFaculty) {
        menuFaculty.addEventListener('click', (e)=>{
            e.preventDefault();
            if (window.Academix && typeof window.Academix.mountFaculty === 'function') {
                // Replace main content with the faculty module
                main.innerHTML = '';
                window.Academix.mountFaculty(main);
            }
        });
    }

    // Navigate to Settings inside the same dashboard shell
    const menuSettings = rootEl.querySelector('#menu-settings');
    if (menuSettings) {
        menuSettings.addEventListener('click', (e)=>{
            e.preventDefault();
            if (window.Academix && typeof window.Academix.mountSettings === 'function') {
                // Replace main content with the settings module
                main.innerHTML = '';
                window.Academix.mountSettings(main);
            }
        });
    }

  // Navigate to Dashboard (re-render dashboard main area)
  const menuDashboard = rootEl.querySelector('#menu-dashboard');
  if (menuDashboard) {
    menuDashboard.addEventListener('click', (e)=>{
      e.preventDefault();
      // clear and re-render the dashboard template into rootEl
      rootEl.innerHTML = '';
      // remount dashboard into the same root element
      // call mountDashboard to fully re-initialize UI
      setTimeout(()=>{ try { mountDashboard(rootEl); } catch(err){ console.error('re-mount dashboard failed', err); } }, 0);
    });
  }
  const menuReport = rootEl.querySelector('#menu-report');
  if (menuReport) {
    menuReport.addEventListener('click', (e)=>{
      e.preventDefault();
      try { const mountReport = window.Academix && window.Academix.mountReport; if (mountReport) { mountReport(main); } }
      catch(err){ console.error('mount report failed', err); }
    });
  }
}


