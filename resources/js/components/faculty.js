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
    const url = (path && (path.indexOf('http://') === 0 || path.indexOf('https://') === 0)) ? path : (window.location.origin + path);
    let res;
    try {
        res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...(options.headers || {})
            },
            ...options,
        });
    } catch (err) {
        throw new Error('Network error: could not reach API. Make sure the backend server is running and reachable.');
    }
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

import notify from './notify';

export function mountFaculty(rootEl) {
    if (!rootEl) throw new Error('mountFaculty: root element is required');

    rootEl.innerHTML = `
        <style>
            .f-wrap{padding:32px 18px;color:#fff;font-family:Arial,Helvetica,sans-serif}
            .f-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
            .f-title{margin:0;font-size:24px;font-weight:700}
            .f-actions{display:flex;gap:8px;align-items:center}
            .f-input{padding:8px 12px;border:1px solid #666;border-radius:4px;background:#2b2b2b;color:#fff;font-size:14px}
            .f-btn{padding:8px 16px;background:#2d6cdf;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:14px}
            .f-btn:hover{background:#1e5bb8}
            .f-btn-outline{background:transparent;border:1px solid #666;color:#ddd}
            .f-btn-outline:hover{background:#333}
            .f-table{width:100%;border-collapse:separate;border-spacing:12px 12px;background:transparent}
            .f-table thead th{padding:0;text-align:left;font-weight:600}
            .f-header{background:#333;padding:12px 14px;border-radius:8px;color:#fff;font-weight:700}
            .f-table thead tr th:first-child .f-header{border-radius:8px 0 0 8px}
            .f-table thead tr th:last-child .f-header{border-radius:0 8px 8px 0}
            .f-table tbody tr{background:transparent}
            .f-table td{padding:0;border:none;vertical-align:middle}
            .f-cell{background:#2b2b2b;padding:14px 12px;border-radius:8px;color:#fff;box-shadow:inset 0 -1px 0 rgba(255,255,255,0.03)}
            .f-table tbody tr td:first-child .f-cell{border-radius:8px 0 0 8px}
            .f-table tbody tr td:last-child .f-cell{border-radius:0 8px 8px 0}
                .f-table{width:100%;border-collapse:collapse;border-spacing:0;background:transparent}
                .f-table thead tr{background:#333}
                .f-table thead th{padding:12px 14px;text-align:left;font-weight:600;color:#fff}
                .f-table thead th:first-child{border-radius:8px 0 0 8px}
                .f-table thead th:last-child{border-radius:0 8px 8px 0}
                .f-table tbody tr{background:#2b2b2b}
                .f-table td{padding:14px 12px;border:none;vertical-align:middle}
                .f-table tbody tr:first-child td:first-child{border-top-left-radius:8px}
                .f-table tbody tr:first-child td:last-child{border-top-right-radius:8px}
                .f-table tbody tr:last-child td:first-child{border-bottom-left-radius:8px}
                .f-table tbody tr:last-child td:last-child{border-bottom-right-radius:8px}
            .f-table tr:hover{background:#333}
            .f-pill{padding:4px 8px;border-radius:12px;background:#444;font-size:12px}
            .f-small{font-size:12px}
            .f-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;z-index:2000}
            .f-modal{width:900px;max-width:95vw;background:#e8e8e8;color:#111;border-radius:8px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
            .f-modal h3{margin:0 0 16px;font-size:26px;font-weight:800}
            /* More spacing between fields/columns to match design */
                .f-modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:34px 26px;align-items:start}
            .f-modal-field{margin-bottom:18px}
            .f-modal-label{display:block;font-size:18px;margin-bottom:12px;font-weight:700}
            .f-modal-input{width:100%;padding:14px 16px;border:1px solid #ccc;border-radius:6px;background:#fff;color:#111;font-size:20px;height:56px;box-sizing:border-box}
                .f-modal-buttons{display:flex;gap:18px;justify-content:center;margin-top:24px}
                .f-modal-btn{padding:12px 20px;border:none;border-radius:6px;cursor:pointer;font-size:16px;font-weight:600}
            .f-modal-cancel{background:#666;color:#fff}
            .f-modal-save{background:#2d6cdf;color:#fff}
        </style>
        <div class="f-wrap">
            <div class="f-topbar">
                <h2 class="f-title">Faculty</h2>
                <div class="f-actions">
                    <input id="f-q" class="f-input" placeholder="Search name or email" style="width:220px" />
                    <select id="f-department-filter" class="f-input" style="width:220px"><option value="">All Departments</option></select>
                    <button id="f-search" class="f-btn">Search</button>
                    <button id="f-add" class="f-btn">Add Faculty</button>
                    <button id="f-archived" class="f-btn f-btn-outline">Archived</button>
                </div>
            </div>
            <div id="f-error" class="f-small" style="color:#ffb3b3;min-height:16px;margin-bottom:12px"></div>
            <table class="f-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="f-body"><tr><td colspan="5" class="f-small">Loading…</td></tr></tbody>
            </table>
            <div id="f-modal" class="f-modal-overlay">
              <div class="f-modal">
                <h3 id="fm-title">Add Faculty</h3>
                <div class="f-modal-grid">
                                    <div class="f-modal-field">
                                        <label class="f-modal-label">Faculty ID</label>
                                        <input id="fm-faculty_id" class="f-modal-input" />
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
                                        <input id="fm-phone" class="f-modal-input" maxlength="11" inputmode="numeric" pattern="\d*" />
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
                                        <label class="f-modal-label">Suffix <span style="font-weight:400;font-size:12px;color:#666">(optional)</span></label>
                                        <input id="fm-suffix" class="f-modal-input" placeholder="optional" />
                                    </div>
                  <div class="f-modal-field">
                    <label class="f-modal-label">Address</label>
                    <input id="fm-address" class="f-modal-input" />
                  </div>
                                    <div class="f-modal-field">
                                        <label class="f-modal-label">Position</label>
                                        <select id="fm-position" class="f-modal-input">
                                            <option value="">Select position</option>
                                            <option>Dean</option>
                                            <option>Chairperson</option>
                                            <option>Instructor</option>
                                            <option>Professor</option>
                                            <option>Associate Professor</option>
                                            <option>Assistant Professor</option>
                                            <option>Lecturer</option>
                                            <option>Program Coordinator</option>
                                        </select>
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

        // live search + department filter (guard for missing elements)
        const fQ = rootEl.querySelector('#f-q');
        const fDept = rootEl.querySelector('#f-department-filter');
        let fTimer = null;
        if (fQ) fQ.addEventListener('input', ()=>{ clearTimeout(fTimer); fTimer = setTimeout(()=>load(), 300); });
        if (fDept) fDept.addEventListener('change', ()=> load());

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
        let phoneVal = qs('#fm-phone').value || '';
        phoneVal = phoneVal.replace(/[^0-9]/g, '');
        const payload = {
            f_name: qs('#fm-f_name').value.trim(),
            m_name: qs('#fm-m_name').value.trim() || null,
            l_name: qs('#fm-l_name').value.trim(),
            suffix: qs('#fm-suffix').value.trim() || null,
            date_of_birth: qs('#fm-dob').value || null,
            sex: qs('#fm-sex').value || null,
            phone_number: phoneVal || null,
            email_address: qs('#fm-email').value || null,
            address: qs('#fm-address').value || null,
            position: qs('#fm-position').value.trim() || null,
            department_id: Number(qs('#fm-department').value)
        };
        if (!payload.f_name || !payload.l_name) { err.textContent = 'First and Last name are required.'; return; }
        if (!payload.department_id) { err.textContent = 'Please select Department.'; return; }
        if (phoneVal && phoneVal.length !== 11) { qs('#fm-error').textContent = 'Phone number must be 11 digits.'; return; }
        // Validate DOB if provided
        const dobVal = qs('#fm-dob').value || '';
        if (dobVal) {
            const dobRe = /^\d{4}-\d{2}-\d{2}$/;
            if (!dobRe.test(dobVal)) { qs('#fm-error').textContent = 'Date of birth must be in YYYY-MM-DD format.'; return; }
            const dobDate = new Date(dobVal);
            if (Number.isNaN(dobDate.getTime())) { qs('#fm-error').textContent = 'Invalid date of birth.'; return; }
            const year = dobDate.getUTCFullYear();
            if (year < 1900 || year > (new Date().getFullYear() - 18)) { qs('#fm-error').textContent = 'Date of birth looks unrealistic.'; return; }
        }
        try {
                if (modal.dataset.editId) {
                    await api(`/api/faculty/${modal.dataset.editId}`, { method:'PUT', body: JSON.stringify(payload) });
                    notify('Successfully updated', 'Faculty', 'success');
                } else {
                    await api('/api/faculty', { method:'POST', body: JSON.stringify(payload) });
                    notify('Successfully added', 'Faculty', 'success');
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
        const idKey = (departments[0] && ('department_id' in departments[0] ? 'department_id' : 'id')) || 'department_id';
        // fill modal select
        const modalDept = qs('#fm-department');
        if (modalDept) modalDept.innerHTML = '<option value="">Select</option>' + departments.map(r=>`<option value="${r[idKey]}">${r.department_name || r[idKey]}</option>`).join('');
        // fill top-level filter select
        const topDept = rootEl.querySelector('#f-department-filter');
        if (topDept) topDept.innerHTML = '<option value="">All Departments</option>' + departments.map(r=>`<option value="${r[idKey]}">${r.department_name || r[idKey]}</option>`).join('');
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
                    let rows = data.data || [];
                    const qLower = (fQ && fQ.value) ? fQ.value.trim().toLowerCase() : '';
                    const deptVal = (fDept && fDept.value) ? fDept.value : '';
                    if (qLower || deptVal) {
                        rows = rows.filter(f => {
                            const fullName = (`${f.f_name || ''} ${f.l_name || ''}`).toLowerCase();
                            const deptName = (f.department?.department_name || f.department_name || '').toLowerCase();
                            const pos = (f.position||'').toLowerCase();
                            const matchesQ = !qLower || fullName.includes(qLower) || deptName.includes(qLower) || pos.includes(qLower) || (f.email_address||'').toLowerCase().includes(qLower);
                            const matchesDept = !deptVal || String((f.department && (f.department.department_id ?? f.department.id)) || f.department_id || '') === String(deptVal);
                            return matchesQ && matchesDept;
                        });
                    }
                    renderRows(rows || []);
        } catch (e) { errorBox.textContent = e.message; }
    }

    function renderRows(rows) {
        const tbody = rootEl.querySelector('#f-body');
        tbody.innerHTML = '';
        if (!rows.length) { tbody.appendChild(h('tr',{},[h('td',{colspan:5,text:'No faculty found'})])); return; }
                rows.forEach(fac => {
                        const actionChildren = showingArchived
                                ? [
                                        h('button',{class:'f-btn f-small',style:'background:#4caf50','data-action':'restore','data-id':fac.faculty_id},'Restore'),
                                        h('span',{text:' '}),
                                        h('button',{class:'f-btn f-small',style:'background:#d32f2f','data-action':'delete','data-id':fac.faculty_id},'Delete')
                                    ]
                                : [
                                        h('button',{class:'f-btn f-small','data-action':'edit','data-id':fac.faculty_id},'Edit'),
                                        h('span',{text:' '}),
                                        h('button',{class:'f-btn f-small',style:'background:#d32f2f','data-action':'archive','data-id':fac.faculty_id},'Archive')
                                    ];

            const tr = h('tr',{},[
        h('td',{}, h('div',{class:'f-cell', text: `${fac.f_name || ''} ${fac.l_name || ''}`.trim()})),
        h('td',{}, h('div',{class:'f-cell', text: fac.department?.department_name || fac.department_name || fac.department_id || ''})),
        h('td',{}, h('div',{class:'f-cell', text: fac.position || ''})),
        h('td',{}, h('div',{class:'f-cell'}, [h('span',{class:'f-pill f-small',text: fac.deleted_at ? 'Archived' : 'Active'})])),
                h('td',{}, h('div',{class:'f-cell'}, actionChildren))
        ]);
            tbody.appendChild(tr);
        });
        
        // helper to disable a button until async work completes
        const disableOnce = (btn) => {
            if (!btn) return function(){};
            btn.disabled = true; btn.style.opacity = '0.6';
            return () => { btn.disabled = false; btn.style.opacity = ''; };
        };

        // Single onclick handler so listeners don't stack and every click registers immediately
        tbody.onclick = function (e) {
            const btn = e.target && e.target.closest ? e.target.closest('button') : null;
            if (!btn) return;
            const action = btn.dataset.action;
            const id = btn.dataset.id;
            const findFaculty = (idVal) => rows.find(f => String(f.faculty_id) === String(idVal));
            if (action === 'edit') {
                const faculty = findFaculty(id);
                if (faculty) openModal(faculty);
            } else if (action === 'archive') {
                const faculty = findFaculty(id);
                if (!faculty) return;
                const restore = disableOnce(btn);
                (async () => { try { await onArchive(faculty); await load(); notify('Successfully archived', 'Faculty', 'success'); } catch(e){ errorBox.textContent = e.message } finally { restore(); } })();
            } else if (action === 'restore') {
                const faculty = findFaculty(id);
                if (!faculty) return;
                const restore = disableOnce(btn);
                (async () => { try { await onRestore(faculty); await load(); notify('Successfully restored', 'Faculty', 'success'); } catch(e){ errorBox.textContent = e.message } finally { restore(); } })();
            } else if (action === 'delete') {
                const faculty = findFaculty(id);
                if (!faculty) return;
                if (!confirm('Permanently delete this faculty record? This cannot be undone.')) return;
                const restore = disableOnce(btn);
                (async () => {
                    try {
                        await api(`/api/faculty/${id}`, { method: 'DELETE' });
                        await load();
                        notify('Successfully deleted', 'Faculty', 'success');
                    } catch (err) { errorBox.textContent = err.message; }
                    restore();
                })();
            }
        };

        async function awaitOnArchive(fac, restore) { try { await onArchive(fac); } catch(e){}; restore(); }
        async function awaitOnRestore(fac, restore) { try { await onRestore(fac); } catch(e){}; restore(); }
    }

    async function onArchive(fac) {
        if (!confirm('Archive this faculty member?')) return;
        try { await api(`/api/faculty/${fac.faculty_id}/archive`, { method:'POST' }); await load(); notify('Successfully archived', 'Faculty', 'success'); }
        catch(e){ errorBox.textContent = e.message; }
    }

    async function onRestore(fac) {
        if (!confirm('Restore this faculty member?')) return;
        try { await api(`/api/faculty/${fac.faculty_id}/restore`, { method:'POST' }); await load(); notify('Successfully restored', 'Faculty', 'success'); }
        catch(e){ errorBox.textContent = e.message; }
    }

    // Ensure department filter is populated before first load
    ensureOptions().then(() => load());
}
