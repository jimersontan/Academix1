// Faculty management UI (vanilla JS)
// Requires: token in localStorage key `academix_token`

function getTokenOrRedirect() {
    const token = window.localStorage.getItem('academix_token');
    if (!token) {
        window.location.href = '/';
        throw new Error('No token');
    }
    return token;
}

async function api(path, options = {}) {
    const token = getTokenOrRedirect();
    const res = await fetch(path, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...(options.headers || {})
        },
        ...options,
    });
    if (res.status === 401) { window.location.href = '/'; return Promise.reject(new Error('Unauthorized')); }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
}

function h(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
        if (k === 'class') el.className = v; else if (k === 'text') el.textContent = v; else el.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
        if (c == null) return; if (typeof c === 'string') el.appendChild(document.createTextNode(c)); else el.appendChild(c);
    });
    return el;
}

export function mountFaculty(rootEl) {
    if (!rootEl) throw new Error('mountFaculty: root element is required');

    rootEl.innerHTML = `
        <style>
            .f-wrap{padding:18px;color:#fff;font-family:Arial,Helvetica,sans-serif}
            .f-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
            .f-title{margin:0;font-size:24px;font-weight:700}
            .f-actions{display:flex;gap:8px;align-items:center}
            .f-input{padding:8px 12px;border:1px solid #666;border-radius:4px;background:#2b2b2b;color:#fff;font-size:14px}
            .f-btn{padding:8px 16px;background:#2d6cdf;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:14px}
            .f-btn:hover{background:#1e5bb8}
            .f-btn-outline{background:transparent;border:1px solid #666;color:#ddd}
            .f-btn-outline:hover{background:#333}
            .f-table{width:100%;border-collapse:collapse;background:#2b2b2b;border-radius:8px;overflow:hidden}
            .f-table th{background:#333;padding:12px;text-align:left;font-weight:600;border-bottom:1px solid #444}
            .f-table td{padding:12px;border-bottom:1px solid #444}
            .f-table tr:hover{background:#333}
            .f-pill{padding:4px 8px;border-radius:12px;background:#444;font-size:12px}
            .f-small{font-size:12px}
            .f-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;z-index:2000}
            .f-modal{width:900px;max-width:95vw;background:#e8e8e8;color:#111;border-radius:8px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
            .f-modal h3{margin:0 0 16px;font-size:20px;font-weight:600}
            .f-modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 20px;align-items:start}
            .f-modal-field{margin-bottom:12px}
            .f-modal-label{display:block;font-size:13px;margin-bottom:4px;font-weight:500}
            .f-modal-input{width:100%;padding:8px 12px;border:1px solid #ccc;border-radius:4px;background:#fff;color:#111;font-size:14px}
            .f-modal-buttons{display:flex;gap:12px;justify-content:center;margin-top:20px}
            .f-modal-btn{padding:10px 20px;border:none;border-radius:4px;cursor:pointer;font-size:14px;font-weight:500}
            .f-modal-cancel{background:#666;color:#fff}
            .f-modal-save{background:#2d6cdf;color:#fff}
        </style>
        <div class="f-wrap">
            <div class="f-topbar">
                <h2 class="f-title">Faculty</h2>
                <div class="f-actions">
                    <input id="f-q" class="f-input" placeholder="Search name or email" style="width:200px" />
                    <button id="f-search" class="f-btn">Search</button>
                    <button id="f-add" class="f-btn">Add Faculty</button>
                    <button id="f-archived" class="f-btn f-btn-outline">Archived</button>
                </div>
            </div>
            <div id="f-error" class="f-small" style="color:#ffb3b3;min-height:16px;margin-bottom:12px"></div>
            <table class="f-table">
                <thead>
                    <tr><th>Name</th><th>Department</th><th>Position</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody id="f-body"><tr><td colspan="5" class="f-small">Loading…</td></tr></tbody>
            </table>
            <div id="f-modal" class="f-modal-overlay">
              <div class="f-modal">
                <h3 id="fm-title">Add Faculty</h3>
                <div class="f-modal-grid">
                  <div class="f-modal-field">
                    <label class="f-modal-label">Faculty ID</label>
                    <input id="fm-faculty_id" class="f-modal-input" placeholder="optional" />
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Date of Birth</label>
                    <input id="fm-dob" type="date" class="f-modal-input" />
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">First Name</label>
                    <input id="fm-f_name" class="f-modal-input" />
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Sex</label>
                    <select id="fm-sex" class="f-modal-input">
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Middle Name</label>
                    <input id="fm-m_name" class="f-modal-input" />
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Phone Number</label>
                    <input id="fm-phone" class="f-modal-input" />
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Last Name</label>
                    <input id="fm-l_name" class="f-modal-input" />
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Email Address</label>
                    <input id="fm-email" type="email" class="f-modal-input" />
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Suffix</label>
                    <input id="fm-suffix" class="f-modal-input" />
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Address</label>
                    <input id="fm-address" class="f-modal-input" />
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Position</label>
                    <input id="fm-position" class="f-modal-input" placeholder="e.g., Professor, Instructor" />
                  </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Department</label>
                    <select id="fm-department" class="f-modal-input"><option value="">Loading…</option></select>
                  </div>
                </div>
                <div id="fm-error" style="color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center"></div>
                <div class="f-modal-buttons">
                  <button id="fm-cancel" class="f-modal-btn f-modal-cancel">Cancel</button>
                  <button id="fm-save" class="f-modal-btn f-modal-save">Add</button>
                </div>
              </div>
            </div>
        </div>
    `;

    const errorBox = rootEl.querySelector('#f-error');
    const qEl = rootEl.querySelector('#f-q');
    const archivedBtn = rootEl.querySelector('#f-archived');
    let showingArchived = false;
    
    rootEl.querySelector('#f-search').addEventListener('click', () => load());
    rootEl.querySelector('#f-add').addEventListener('click', () => openModal());
    archivedBtn.addEventListener('click', () => {
        showingArchived = !showingArchived;
        archivedBtn.textContent = showingArchived ? 'Show Active' : 'Show Archived';
        archivedBtn.style.background = showingArchived ? '#2d6cdf' : '#666';
        load();
    });

    // Modal helpers
    const modal = rootEl.querySelector('#f-modal');
    const qs = (id) => modal.querySelector(id);
    qs('#fm-cancel').addEventListener('click', ()=> closeModal());
    qs('#fm-save').addEventListener('click', saveModal);

    async function openModal(init = null) {
        errorBox.textContent = '';
        await ensureOptions();
        modal.style.display = 'flex';
        qs('#fm-title').textContent = init ? 'Edit Faculty' : 'Add Faculty';
        qs('#fm-save').textContent = init ? 'Save' : 'Add';
        // reset
        ['#fm-faculty_id','#fm-f_name','#fm-m_name','#fm-l_name','#fm-suffix','#fm-dob','#fm-sex','#fm-phone','#fm-email','#fm-address','#fm-position','#fm-department']
          .forEach(sel=>{ const el=qs(sel); if(el.tagName==='SELECT'){ el.value=''; } else { el.value=''; }});
        if (init) {
            if (init.faculty_id) qs('#fm-faculty_id').value = init.faculty_id;
            qs('#fm-f_name').value = init.f_name || '';
            qs('#fm-m_name').value = init.m_name || '';
            qs('#fm-l_name').value = init.l_name || '';
            qs('#fm-suffix').value = init.suffix || '';
            qs('#fm-dob').value = init.date_of_birth || '';
            qs('#fm-sex').value = init.sex || '';
            qs('#fm-phone').value = init.phone_number || '';
            qs('#fm-email').value = init.email_address || '';
            qs('#fm-address').value = init.address || '';
            qs('#fm-position').value = init.position || '';
            qs('#fm-department').value = (init.department_id != null ? String(init.department_id) : '');
            modal.dataset.editId = init.faculty_id;
        } else {
            delete modal.dataset.editId;
        }
    }

    function closeModal(){ modal.style.display = 'none'; }

    async function saveModal(){
        const err = qs('#fm-error'); err.textContent = '';
        const payload = {
            f_name: qs('#fm-f_name').value.trim(),
            m_name: qs('#fm-m_name').value.trim() || null,
            l_name: qs('#fm-l_name').value.trim(),
            suffix: qs('#fm-suffix').value.trim() || null,
            date_of_birth: qs('#fm-dob').value || null,
            sex: qs('#fm-sex').value || null,
            phone_number: qs('#fm-phone').value || null,
            email_address: qs('#fm-email').value || null,
            address: qs('#fm-address').value || null,
            position: qs('#fm-position').value.trim() || null,
            department_id: Number(qs('#fm-department').value)
        };
        if (!payload.f_name || !payload.l_name) { err.textContent = 'First and Last name are required.'; return; }
        if (!payload.department_id) { err.textContent = 'Please select Department.'; return; }
        try {
            if (modal.dataset.editId) {
                await api(`/api/faculty/${modal.dataset.editId}`, { method:'PUT', body: JSON.stringify(payload) });
            } else {
                await api('/api/faculty', { method:'POST', body: JSON.stringify(payload) });
            }
            closeModal();
            await load();
        } catch(e){ errorBox.textContent = e.message; }
    }

    // Options caches
    let optionsLoaded = false;
    async function ensureOptions(){
        if (optionsLoaded) return;
        let departments = [];
        try { departments = await api('/api/settings/departments'); } catch(_) {}
        // Seed defaults in DB if empty so foreign keys are valid
        if (!Array.isArray(departments) || departments.length === 0) {
            try {
                const cs = await api('/api/settings/departments', { method:'POST', body: JSON.stringify({ department_name:'Computer Science' }) });
                const it = await api('/api/settings/departments', { method:'POST', body: JSON.stringify({ department_name:'Information Technology' }) });
                departments = [cs, it].filter(Boolean);
            } catch(_) { departments = []; }
        }
        const fill = (sel, rows, id, label) => {
            const el = qs(sel); el.innerHTML = '<option value="">Select</option>' + rows.map(r=>`<option value="${r[id]}">${r[label] || r[id]}</option>`).join('');
        };
        fill('#fm-department', departments, (departments[0] && ('department_id' in departments[0] ? 'department_id' : 'id')) || 'department_id', 'department_name');
        optionsLoaded = true;
    }

    async function load(page = 1) {
        errorBox.textContent = '';
        const params = new URLSearchParams();
        const qVal = qEl.value.trim(); if (qVal) params.set('q', qVal);
        params.set('page', String(page));
        if (showingArchived) params.set('archived', '1');
        try {
            const data = await api(`/api/faculty?${params.toString()}`);
            renderRows(data.data || []);
        } catch (e) { errorBox.textContent = e.message; }
    }

    function renderRows(rows) {
        const tbody = rootEl.querySelector('#f-body');
        tbody.innerHTML = '';
        if (!rows.length) { tbody.appendChild(h('tr',{},[h('td',{colspan:5,text:'No faculty found'})])); return; }
        rows.forEach(fac => {
            const tr = h('tr',{},[
                h('td',{text:`${fac.f_name || ''} ${fac.l_name || ''}`.trim()}),
                h('td',{text: fac.department?.department_name || fac.department_name || fac.department_id || ''}),
                h('td',{text: fac.position || ''}),
                h('td',{},[h('span',{class:'f-pill f-small',text: fac.deleted_at ? 'Archived' : 'Active'})]),
                h('td',{},[
                    h('button',{class:'f-btn f-small','data-action':'edit','data-id':fac.faculty_id},'Edit'),
                    h('span',{text:' ' }),
                    showingArchived 
                        ? h('button',{class:'f-btn f-small',style:'background:#4caf50','data-action':'restore','data-id':fac.faculty_id},'Restore')
                        : h('button',{class:'f-btn f-small',style:'background:#d32f2f','data-action':'delete','data-id':fac.faculty_id},'Delete')
                ])
            ]);
            tbody.appendChild(tr);
        });
        
        // Add event listeners for Edit/Delete/Restore buttons
        tbody.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'edit') {
                const facultyId = e.target.dataset.id;
                const faculty = rows.find(f => f.faculty_id == facultyId);
                if (faculty) openModal(faculty);
            } else if (e.target.dataset.action === 'delete') {
                const facultyId = e.target.dataset.id;
                const faculty = rows.find(f => f.faculty_id == facultyId);
                if (faculty) onArchive(faculty);
            } else if (e.target.dataset.action === 'restore') {
                const facultyId = e.target.dataset.id;
                const faculty = rows.find(f => f.faculty_id == facultyId);
                if (faculty) onRestore(faculty);
            }
        });
    }

    async function onArchive(fac) {
        if (!confirm('Archive this faculty member?')) return;
        try { await api(`/api/faculty/${fac.faculty_id}/archive`, { method:'POST' }); await load(); }
        catch(e){ errorBox.textContent = e.message; }
    }

    async function onRestore(fac) {
        if (!confirm('Restore this faculty member?')) return;
        try { await api(`/api/faculty/${fac.faculty_id}/restore`, { method:'POST' }); await load(); }
        catch(e){ errorBox.textContent = e.message; }
    }

    load();
}
