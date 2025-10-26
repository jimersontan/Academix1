function requireToken() {
  const token = window.localStorage.getItem('academix_token');
  if (!token) { window.location.href = 'index.html'; throw new Error('No token'); }
  return token;
}

async function api(url, options = {}) {
  const token = requireToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      'Authorization': `Bearer ${token}`,
      ...(options.headers || {})
    }
  });
  if (res.status === 401) { window.localStorage.removeItem('academix_token'); window.location.href = 'index.html'; return; }
  const data = await res.json().catch(()=>({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export function mountMyProfile(rootEl){
  if (!rootEl) throw new Error('mountMyProfile: root element is required');

  rootEl.innerHTML = `
    <style>
      /* Use global dashboard theme variables */
      .p-wrap{padding:18px;color:var(--ink);font-family:Inter,Segoe UI,Arial,Helvetica,sans-serif}

      .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
      .title{margin:0;font-size:20px;font-weight:800;letter-spacing:.2px}

      .card{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;padding:20px;box-shadow:var(--shadow)}

      .profile{display:flex;align-items:center;gap:18px}
      .avatar{width:120px;height:120px;border-radius:12px;object-fit:cover;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow)}
      .name{font-size:18px;font-weight:700;margin:0 0 4px}
      .uname{font-size:13px;color:var(--muted);margin:0}
      .name-line{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      .badge{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:999px;background:#1f2937;border:1px solid #283241;color:#cbd5e1;font-size:11px;font-weight:700;letter-spacing:.02em}
      .info{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:8px}
      .label-sm{color:var(--muted);font-size:11px}
      .val-sm{font-size:12px}

      .btn{padding:8px 14px;border:none;border-radius:10px;background:var(--primary);color:#0b1020;cursor:pointer;font-weight:700;letter-spacing:.01em;transition:filter .15s, transform .02s}
      .btn:hover{filter:brightness(1.05)}
      .btn:active{transform:translateY(1px)}
      .btn.secondary{background:transparent;border:1px solid var(--border);color:var(--ink)}
      .btn.secondary:hover{background:rgba(148,163,184,.08)}

      .input{width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--ink);transition:border-color .2s, box-shadow .2s}
      .input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(96,165,250,.15)}

      .label{display:block;font-size:12px;margin:10px 0 6px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
      .muted{color:var(--muted);font-size:12px}
      .error{color:#ffb3b3;font-size:12px;min-height:16px;margin-top:8px}

      .row{display:grid;grid-template-columns:1fr 1fr;gap:12px}

      .controls{display:flex;gap:10px;align-items:center}

      .hidden{display:none}

      .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:1000}
      .modal{width:min(640px,95vw);max-height:90vh;overflow:auto;background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:18px;box-shadow:var(--shadow)}
      .modal h3{margin:0 0 8px;font-size:18px}
      .modal-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}

      .form-grid{display:grid;gap:12px}
      .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}

      @media (max-width: 640px){ .row{grid-template-columns:1fr} .profile{flex-direction:column;align-items:flex-start} .grid-2{grid-template-columns:1fr} }
    </style>

    <div class="p-wrap">
      <div class="header">
        <h2 class="title">My Profile</h2>
        <div class="controls">
          <button id="pf-logout" class="btn secondary">Log out</button>
          <button id="pf-edit" class="btn">Edit Profile</button>
        </div>
      </div>

      <div class="card">
        <div class="profile">
          <img id="pf-avatar" class="avatar" src="" alt="avatar" />
          <div style="flex:1">
            <div class="name-line">
              <p id="pf-name" class="name">&nbsp;</p>
              <span id="pf-role" class="badge">User</span>
            </div>
            <p id="pf-uname" class="uname">&nbsp;</p>
            <div class="info">
              <div>
                <div class="label-sm">User</div>
                <div id="pf-info-user" class="val-sm">—</div>
              </div>
              <div>
                <div class="label-sm">Email</div>
                <div id="pf-info-email" class="val-sm">—</div>
              </div>
              <div>
                <div class="label-sm">Role</div>
                <div id="pf-info-role" class="val-sm">—</div>
              </div>
            </div>
            <div class="controls" style="margin-top:10px">
              <input id="pf-file" type="file" accept="image/*" />
              <button id="pf-upload" class="btn secondary">Upload Avatar</button>
            </div>
            <div class="muted" style="margin-top:6px">PNG/JPG, ≤ 5MB</div>
            <div id="pf-avatar-error" class="error"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="pf-modal" class="modal-backdrop">
      <div class="modal">
        <h3>Edit Account</h3>
        <div class="muted">Update your profile info or change your password. Leave password fields blank to keep your current password.</div>
        <div class="form-grid" style="margin-top:8px">
          <div>
            <label class="label">Name</label>
            <input id="pf-name-input" class="input" placeholder="Full name" />
          </div>
          <div>
            <label class="label">Username</label>
            <input id="pf-username" class="input" placeholder="Username" />
          </div>
          <div>
            <label class="label">Email</label>
            <input id="pf-email" type="email" class="input" placeholder="Email" />
          </div>
          <div>
            <label class="label">Role</label>
            <select id="pf-role-input" class="input">
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label class="label">Current Password</label>
            <input id="pf-acc-current" type="password" class="input" placeholder="Required if changing password" />
          </div>
          <div class="grid-2">
            <div>
              <label class="label">New Password</label>
              <input id="pf-acc-new" type="password" class="input" />
            </div>
            <div>
              <label class="label">Confirm New Password</label>
              <input id="pf-acc-confirm" type="password" class="input" />
            </div>
          </div>
        </div>
        <div id="pf-account-error" class="error"></div>
        <div class="modal-actions">
          <button id="pf-cancel" class="btn secondary">Cancel</button>
          <button id="pf-account-save" class="btn">Save</button>
        </div>
      </div>
    </div>
  `;

  const qs = (s)=>rootEl.querySelector(s);
  const setText = (sel, txt)=>{
    const el = qs(sel);
    if (el) { el.textContent = txt; }
    else { try { console.warn('[MyProfile] Missing element for selector:', sel); } catch(_){} }
  };
  const setSrc = (sel, url)=>{ const el = qs(sel); if (el) el.src = url; };
  const notify = (action, details)=>{
    window.dispatchEvent(new CustomEvent('academix:notify', { detail:{ entity:'profile', action, details } }));
  };
  function normalizeAvatarUrl(u){
    if (!u) return u;
    try{
      const url = new URL(u, window.location.origin);
      // If different origin but under /storage, use relative path to avoid CORS and host mismatch
      if (url.origin !== window.location.origin){
        if (url.pathname.startsWith('/storage/')) return url.pathname;
        return null; // skip using cross-origin avatar
      }
      return url.href;
    }catch(_){ return u; }
  }
  let currentUser = null;
  const AVATAR_KEY = 'academix_avatar_url';
  const AVATAR_DATA_KEY = 'academix_avatar_dataurl';

  async function fileToDataURL(file, maxSize = 256){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.onerror = ()=>reject(new Error('Failed to read image'));
      reader.onload = ()=>{
        const img = new Image();
        img.onload = ()=>{
          try{
            const scale = Math.min(1, maxSize/Math.max(img.width, img.height));
            const w = Math.max(1, Math.round(img.width * scale));
            const h = Math.max(1, Math.round(img.height * scale));
            const canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL('image/jpeg', 0.9));
          }catch(e){ resolve(reader.result); }
        };
        img.onerror = ()=>resolve(reader.result);
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async function cacheAvatarFromUrl(url){
    try{
      const res = await fetch(url, { mode: 'cors' });
      if (!res.ok) return;
      const blob = await res.blob();
      const dataUrl = await fileToDataURL(blob);
      window.localStorage.setItem(AVATAR_DATA_KEY, dataUrl);
    }catch(_){ /* ignore CORS or other errors */ }
  }

  async function loadMe(){
    try {
      const me = await api('/api/me');
      if (!me) return;
      currentUser = me;
      const cachedData = window.localStorage.getItem(AVATAR_DATA_KEY);
      const normalizedRemote = normalizeAvatarUrl(me.avatar_url || window.localStorage.getItem(AVATAR_KEY));
      const avatarUrl = cachedData || normalizedRemote || 'https://via.placeholder.com/120x120?text=Avatar';
      const imgEl = qs('#pf-avatar'); if (imgEl) imgEl.src = avatarUrl;
      if (normalizedRemote) { try { window.localStorage.setItem(AVATAR_KEY, normalizedRemote); } catch(_){}
        // Only attempt fetch/cache when same-origin
        try { const u = new URL(normalizedRemote, window.location.origin); if (u.origin === window.location.origin) cacheAvatarFromUrl(normalizedRemote); } catch(_){}
      }
      const full = (me.name && String(me.name).trim()) || [me.f_name, me.l_name].filter(Boolean).join(' ');
      setText('#pf-name', full || '—');
      const uname = me.username || me.user_name || me.email || me.email_address || '';
      setText('#pf-uname', uname ? '@'+uname : '');
      setText('#pf-info-user', uname ? '@'+uname : '—');
      const email = me.email || me.email_address || '';
      setText('#pf-info-email', email || '—');
      const isAdmin = (me.is_admin === true) || (typeof me.role === 'string' && me.role.toLowerCase().includes('admin')) || (Array.isArray(me.roles) && me.roles.some(r => String(r).toLowerCase().includes('admin')));
      const roleText = isAdmin ? 'Admin' : (me.role || me.user_type || (Array.isArray(me.roles) ? me.roles[0] : '') || 'User');
      setText('#pf-role', roleText);
      setText('#pf-info-role', roleText);
      const uEl = qs('#pf-username'); if (uEl) uEl.value = uname;
      const nEl = qs('#pf-name-input'); if (nEl) nEl.value = full || '';
      const eEl = qs('#pf-email'); if (eEl) eEl.value = email || '';
      const rEl = qs('#pf-role-input'); if (rEl) rEl.value = roleText;
    } catch(e){ const er = qs('#pf-account-error'); if (er) er.textContent = e.message; }
  }

  const modal = qs('#pf-modal');
  const openModal = ()=>{ if (modal) modal.style.display='flex'; };
  const closeModal = ()=>{ if (modal) modal.style.display='none'; };

  const editBtn = qs('#pf-edit');
  if (editBtn){ editBtn.addEventListener('click', openModal); }
  const cancelBtn = qs('#pf-cancel');
  if (cancelBtn){ cancelBtn.addEventListener('click', closeModal); }
  if (modal){ modal.addEventListener('click', (e)=>{ if (e.target===modal) closeModal(); }); }

  const fileInput = qs('#pf-file');
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files && fileInput.files[0];
      const err = qs('#pf-avatar-error'); if (err) err.textContent = '';
      if (!file) { if (err) err.textContent = 'No file selected.'; return; }
      const validTypes = ['image/png','image/jpeg','image/jpg','image/webp'];
      if (!validTypes.includes(file.type)){ if (err) err.textContent = 'Unsupported file type.'; fileInput.value=''; return; }
      if (file.size > 5*1024*1024){ if (err) err.textContent = 'Image must be ≤ 5MB.'; fileInput.value=''; return; }
      // Do not preview or cache yet; wait for Upload click
    });
  }

  qs('#pf-upload').addEventListener('click', async ()=>{
    const file = qs('#pf-file').files && qs('#pf-file').files[0];
    const err = qs('#pf-avatar-error'); if (err) err.textContent = '';
    const uploadBtn = qs('#pf-upload');
    if (!file){ if (err) err.textContent = 'Please choose an image file.'; return; }
    const validTypes = ['image/png','image/jpeg','image/jpg','image/webp'];
    if (!validTypes.includes(file.type)){ if (err) err.textContent = 'Unsupported file type.'; return; }
    if (file.size > 5*1024*1024){ if (err) err.textContent = 'Image must be ≤ 5MB.'; return; }

    if (uploadBtn){ uploadBtn.disabled = true; uploadBtn.textContent = 'Uploading...'; }
    const fd = new FormData(); fd.append('avatar', file);

    const parseAvatarUrl = (data)=>{
      if (!data || typeof data !== 'object') return '';
      return data.avatar_url || data.url || (data.data && (data.data.avatar_url || data.data.url)) || data.path || '';
    };

    try{
      let data = await api('/api/me/avatar', { method:'POST', body: fd });
      let newUrl = parseAvatarUrl(data);
      if (!newUrl) {
        data = await api('/api/user/avatar', { method:'POST', body: fd });
        newUrl = parseAvatarUrl(data);
      }
      if (!newUrl) { throw new Error('Upload succeeded but no avatar URL returned.'); }
      const normalized = normalizeAvatarUrl(newUrl) || newUrl;
      const imgEl2 = qs('#pf-avatar'); if (imgEl2) imgEl2.src = normalized;
      try { window.localStorage.setItem(AVATAR_KEY, normalized); } catch(_){}
      try { const dataUrl = await fileToDataURL(file); window.localStorage.setItem(AVATAR_DATA_KEY, dataUrl); } catch(_) {}
      // Only try caching remote if same-origin
      try { const u = new URL(normalized, window.location.origin); if (u.origin === window.location.origin) await cacheAvatarFromUrl(normalized); } catch(_){}
      notify('avatar_updated', file.name);
    }catch(e){ if (err) err.textContent = e.message || 'Upload failed.'; }
    finally{ if (uploadBtn){ uploadBtn.disabled = false; uploadBtn.textContent = 'Upload Avatar'; } }
  });

  const accSave = qs('#pf-account-save');
  if (accSave){
    accSave.addEventListener('click', async ()=>{
      const name = (qs('#pf-name-input')?.value || '').trim();
      const email = (qs('#pf-email')?.value || '').trim();
      const username = (qs('#pf-username')?.value || '').trim();
      const roleSelected = (qs('#pf-role-input')?.value || 'User');
      const current_password = (qs('#pf-acc-current')?.value || '');
      const new_password = (qs('#pf-acc-new')?.value || '');
      const confirm_password = (qs('#pf-acc-confirm')?.value || '');
      const err = qs('#pf-account-error'); if (err) err.textContent = '';

      if (!username){ if (err) err.textContent = 'Username is required.'; return; }
      if (!email){ if (err) err.textContent = 'Email is required.'; return; }
      if (!name){ if (err) err.textContent = 'Name is required.'; return; }
      if (new_password || confirm_password){
        if (!current_password){ if (err) err.textContent = 'Current password is required.'; return; }
        if (new_password !== confirm_password){ if (err) err.textContent = 'Passwords do not match.'; return; }
      }

      try {
        // Try to support both single-field and first/last name APIs
        const payload = { name, username, email, role: roleSelected, user_type: roleSelected, is_admin: roleSelected === 'Admin' };
        const parts = name.split(' ');
        if (parts.length >= 2) { payload.f_name = parts.slice(0, -1).join(' '); payload.l_name = parts.slice(-1).join(' '); }
        await api('/api/me', { method:'PUT', body: JSON.stringify(payload) });

        // Optimistically update UI without waiting for fresh fetch
        currentUser = { ...(currentUser||{}), name, username, email, role: roleSelected, user_type: roleSelected, is_admin: roleSelected==='Admin' };
        setText('#pf-name', name);
        setText('#pf-uname', username ? '@'+username : '');
        setText('#pf-info-user', username ? '@'+username : '—');
        setText('#pf-info-email', email || '—');
        setText('#pf-role', roleSelected);
        setText('#pf-info-role', roleSelected);

        // Update password if provided
        if (new_password){
          await api('/api/me/password', { method:'POST', body: JSON.stringify({ current_password, new_password, confirm_password }) });
        }
        notify('credentials_updated', 'Account updated');
        closeModal();
        // Also refresh from server to reflect any canonical values
        await loadMe();
      } catch(e){ if (err) err.textContent = e.message; }
    });
  }

  // Preload avatar from localStorage while fetching profile
  try {
    const cachedData = window.localStorage.getItem(AVATAR_DATA_KEY);
    const cachedUrl = window.localStorage.getItem(AVATAR_KEY);
    const img = qs('#pf-avatar');
    if (img && (cachedData || cachedUrl)) {
      img.src = cachedData || cachedUrl;
    }
  } catch(_) {}

  // Logout handler
  const logoutBtn = qs('#pf-logout');
  if (logoutBtn){
    logoutBtn.addEventListener('click', async ()=>{
      try { await api('/api/logout', { method:'POST' }); } catch(_){}
      try { window.localStorage.removeItem('academix_token'); } catch(_){}
      window.location.href = '/';
    });
  }

  loadMe();
}