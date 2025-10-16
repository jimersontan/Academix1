// Students management UI (vanilla JS)
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

export function mountStudents(rootEl) {
    if (!rootEl) throw new Error('mountStudents: root element is required');

    rootEl.innerHTML = `
        <style>
            .s-wrap{padding:16px;color:#eee}
            .s-actions{display:flex;gap:8px;align-items:center;margin-bottom:12px}
            .s-input{padding:6px 8px;border:1px solid #666;border-radius:4px;background:#111;color:#eee}
            .s-btn{padding:6px 10px;background:#2d6cdf;color:#fff;border:none;border-radius:4px;cursor:pointer}
            .s-table{width:100%;border-collapse:collapse;background:#222}
            .s-table th,.s-table td{border:1px solid #444;padding:8px;font-size:14px}
            .s-pill{padding:2px 6px;border-radius:10px;background:#444}
            .s-small{font-size:12px}
        </style>
        <div class="s-wrap">
            <div class="s-actions">
                <input id="s-q" class="s-input" placeholder="Search name or email" />
                <button id="s-search" class="s-btn">Search</button>
                <button id="s-add" class="s-btn">Add Student</button>
                <button id="s-archived" class="s-btn" style="background:#666">Show Archived</button>
            </div>
            <div id="s-error" class="s-small" style="color:#ffb3b3;min-height:16px"></div>
            <table class="s-table">
                <thead>
                    <tr><th>Student Name</th><th>Department</th><th>Course</th><th>Year</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody id="s-body"><tr><td colspan="6" class="s-small">Loading…</td></tr></tbody>
            </table>
            <div id="s-modal" style="position:fixed;inset:0;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;z-index:2000">
              <div style="width:920px;max-width:96vw;background:#e8e8e8;color:#111;border-radius:8px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.5)">
                <h3 id="f-title" style="margin:0 0 14px">Add Student</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px 16px;align-items:center">
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Student ID</label>
                    <input id="f-student_id" class="s-input" style="width:100%" placeholder="optional" />
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Date of Birth</label>
                    <input id="f-dob" type="date" class="s-input" style="width:100%" />
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">First Name</label>
                    <input id="f-f_name" class="s-input" style="width:100%" />
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Sex</label>
                    <select id="f-sex" class="s-input" style="width:100%">
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Middle Name</label>
                    <input id="f-m_name" class="s-input" style="width:100%" />
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Phone Number</label>
                    <input id="f-phone" class="s-input" style="width:100%" />
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Last Name</label>
                    <input id="f-l_name" class="s-input" style="width:100%" />
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Email Address</label>
                    <input id="f-email" type="email" class="s-input" style="width:100%" />
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Suffix</label>
                    <input id="f-suffix" class="s-input" style="width:100%" />
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Address</label>
                    <input id="f-address" class="s-input" style="width:100%" />
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Department</label>
                    <select id="f-department" class="s-input" style="width:100%"><option value="">Loading…</option></select>
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Status</label>
                    <select id="f-status" class="s-input" style="width:100%">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Course</label>
                    <select id="f-course" class="s-input" style="width:100%"><option value="">Loading…</option></select>
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Academic Year</label>
                    <select id="f-ay" class="s-input" style="width:100%"><option value="">Loading…</option></select>
                  </div>
                  <div>
                    <label style="display:block;font-size:12px;margin-bottom:4px">Year Level</label>
                    <input id="f-year" class="s-input" style="width:100%" placeholder="e.g., 1st, 2nd, 3rd" />
                  </div>
                </div>
                <div id="f-error" style="color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center"></div>
                <div style="display:flex;gap:12px;justify-content:center;margin-top:10px">
                  <button id="f-cancel" class="s-btn" style="background:#666">Cancel</button>
                  <button id="f-save" class="s-btn">Add</button>
                </div>
              </div>
            </div>
        </div>
    `;

    const errorBox = rootEl.querySelector('#s-error');
    const qEl = rootEl.querySelector('#s-q');
    const archivedBtn = rootEl.querySelector('#s-archived');
    let showingArchived = false;
    
    rootEl.querySelector('#s-search').addEventListener('click', () => load());
    rootEl.querySelector('#s-add').addEventListener('click', () => openModal());
    archivedBtn.addEventListener('click', () => {
        showingArchived = !showingArchived;
        archivedBtn.textContent = showingArchived ? 'Show Active' : 'Show Archived';
        archivedBtn.style.background = showingArchived ? '#2d6cdf' : '#666';
        load();
    });

    // Modal helpers
    const modal = rootEl.querySelector('#s-modal');
    const qs = (id) => modal.querySelector(id);
    qs('#f-cancel').addEventListener('click', ()=> closeModal());
    qs('#f-save').addEventListener('click', saveModal);

    async function openModal(init = null) {
        errorBox.textContent = '';
        await ensureOptions();
        modal.style.display = 'flex';
        qs('#f-title').textContent = init ? 'Edit Student' : 'Add Student';
        qs('#f-save').textContent = init ? 'Save' : 'Add';
        // reset
        ['#f-student_id','#f-f_name','#f-m_name','#f-l_name','#f-suffix','#f-dob','#f-sex','#f-phone','#f-email','#f-address','#f-department','#f-status','#f-course','#f-ay','#f-year']
          .forEach(sel=>{ const el=qs(sel); if(el.tagName==='SELECT'){ el.value=''; } else { el.value=''; }});
        if (init) {
            if (init.student_id) qs('#f-student_id').value = init.student_id;
            qs('#f-f_name').value = init.f_name || '';
            qs('#f-m_name').value = init.m_name || '';
            qs('#f-l_name').value = init.l_name || '';
            qs('#f-suffix').value = init.suffix || '';
            qs('#f-dob').value = init.date_of_birth || '';
            qs('#f-sex').value = init.sex || '';
            qs('#f-phone').value = init.phone_number || '';
            qs('#f-email').value = init.email_address || '';
            qs('#f-address').value = init.address || '';
            qs('#f-department').value = (init.department_id != null ? String(init.department_id) : '');
            qs('#f-status').value = init.status || 'active';
            qs('#f-course').value = (init.course_id != null ? String(init.course_id) : '');
            qs('#f-ay').value = (init.academic_year_id != null ? String(init.academic_year_id) : '');
            qs('#f-year').value = init.year_level || '';
            modal.dataset.editId = init.student_id;
        } else {
            delete modal.dataset.editId;
        }
    }

    function closeModal(){ modal.style.display = 'none'; }

    async function saveModal(){
        const err = qs('#f-error'); err.textContent = '';
        const payload = {
            f_name: qs('#f-f_name').value.trim(),
            m_name: qs('#f-m_name').value.trim() || null,
            l_name: qs('#f-l_name').value.trim(),
            suffix: qs('#f-suffix').value.trim() || null,
            date_of_birth: qs('#f-dob').value || null,
            sex: qs('#f-sex').value || null,
            phone_number: qs('#f-phone').value || null,
            email_address: qs('#f-email').value || null,
            address: qs('#f-address').value || null,
            status: qs('#f-status').value || 'active',
            department_id: Number(qs('#f-department').value),
            course_id: Number(qs('#f-course').value),
            academic_year_id: Number(qs('#f-ay').value),
            year_level: (qs('#f-year').value.trim() || '1st')
        };
        if (!payload.f_name || !payload.l_name) { err.textContent = 'First and Last name are required.'; return; }
        if (!payload.department_id || !payload.course_id || !payload.academic_year_id) { err.textContent = 'Please select Department, Course and Academic Year.'; return; }
        try {
            if (modal.dataset.editId) {
                await api(`/api/students/${modal.dataset.editId}`, { method:'PUT', body: JSON.stringify(payload) });
            } else {
                await api('/api/students', { method:'POST', body: JSON.stringify(payload) });
            }
            closeModal();
            await load();
        } catch(e){ errorBox.textContent = e.message; }
    }

    // Options caches
    let optionsLoaded = false;
    async function ensureOptions(){
        if (optionsLoaded) return;
        let departments = [], courses = [], years = [];
        try { departments = await api('/api/settings/departments'); } catch(_) {}
        // Seed defaults in DB if empty so foreign keys are valid
        if (!Array.isArray(departments) || departments.length === 0) {
            try {
                const cs = await api('/api/settings/departments', { method:'POST', body: JSON.stringify({ department_name:'Computer Science' }) });
                const it = await api('/api/settings/departments', { method:'POST', body: JSON.stringify({ department_name:'Information Technology' }) });
                departments = [cs, it].filter(Boolean);
            } catch(_) { departments = []; }
        }

        try { courses = await api('/api/settings/courses'); } catch(_) {}
        if (!Array.isArray(courses) || courses.length === 0) {
            const depId = (departments[0] && (departments[0].department_id || departments[0].id)) || null;
            if (depId) {
                try {
                    const bscs = await api('/api/settings/courses', { method:'POST', body: JSON.stringify({ course_name:'BSCS', department_id: depId }) });
                    const bsit = await api('/api/settings/courses', { method:'POST', body: JSON.stringify({ course_name:'BSIT', department_id: depId }) });
                    courses = [bscs, bsit].filter(Boolean);
                } catch(_) { courses = []; }
            }
        }

        try { years = await api('/api/settings/academic-years'); } catch(_) {}
        if (!Array.isArray(years) || years.length === 0) {
            try {
                const y = await api('/api/settings/academic-years', { method:'POST', body: JSON.stringify({ school_year:'2025-2026' }) });
                years = [y];
            } catch(_) { years = []; }
        }
        const fill = (sel, rows, id, label) => {
            const el = qs(sel); el.innerHTML = '<option value="">Select</option>' + rows.map(r=>`<option value="${r[id]}">${r[label] || r[id]}</option>`).join('');
        };
        fill('#f-department', departments, (departments[0] && ('department_id' in departments[0] ? 'department_id' : 'id')) || 'department_id', 'department_name');
        fill('#f-course', courses, (courses[0] && ('course_id' in courses[0] ? 'course_id' : 'id')) || 'course_id', 'course_name');
        fill('#f-ay', years, (years[0] && ('academic_year_id' in years[0] ? 'academic_year_id' : 'id')) || 'academic_year_id', 'school_year');
        optionsLoaded = true;
    }

    async function load(page = 1) {
        errorBox.textContent = '';
        const params = new URLSearchParams();
        const qVal = qEl.value.trim(); if (qVal) params.set('q', qVal);
        params.set('page', String(page));
        if (showingArchived) params.set('archived', '1');
        try {
            const data = await api(`/api/students?${params.toString()}`);
            renderRows(data.data || []);
        } catch (e) { errorBox.textContent = e.message; }
    }

    function renderRows(rows) {
        const tbody = rootEl.querySelector('#s-body');
        tbody.innerHTML = '';
        if (!rows.length) { tbody.appendChild(h('tr',{},[h('td',{colspan:6,text:'No students found'})])); return; }
        rows.forEach(stu => {
            const tr = h('tr',{},[
                h('td',{text:`${stu.f_name || ''} ${stu.l_name || ''}`.trim()}),
                h('td',{text: stu.department?.department_name || stu.department_name || stu.department_id || ''}),
                h('td',{text: stu.course?.course_name || stu.course_name || stu.course_id || ''}),
                h('td',{text: stu.academic_year?.school_year || stu.academic_year || stu.academic_year_id || ''}),
                h('td',{},[h('span',{class:'s-pill s-small',text: stu.archived_at ? 'Archived' : 'Active'})]),
                h('td',{},[
                    h('button',{class:'s-btn s-small','data-action':'edit','data-id':stu.student_id},'Edit'),
                    h('span',{text:' ' }),
                    showingArchived 
                        ? h('button',{class:'s-btn s-small',style:'background:#4caf50','data-action':'restore','data-id':stu.student_id},'Restore')
                        : h('button',{class:'s-btn s-small',style:'background:#d32f2f','data-action':'delete','data-id':stu.student_id},'Delete')
                ])
            ]);
            tbody.appendChild(tr);
        });
        
        // Add event listeners for Edit/Delete/Restore buttons
        tbody.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'edit') {
                const studentId = e.target.dataset.id;
                const student = rows.find(s => s.student_id == studentId);
                if (student) openModal(student);
            } else if (e.target.dataset.action === 'delete') {
                const studentId = e.target.dataset.id;
                const student = rows.find(s => s.student_id == studentId);
                if (student) onArchive(student);
            } else if (e.target.dataset.action === 'restore') {
                const studentId = e.target.dataset.id;
                const student = rows.find(s => s.student_id == studentId);
                if (student) onRestore(student);
            }
        });
    }

    function promptStudent(init = {}) {
        const f = prompt('First name:', init.f_name || ''); if (f == null) return null;
        const l = prompt('Last name:', init.l_name || ''); if (l == null) return null;
        const dept = prompt('Department ID:', init.department_id || ''); if (dept == null) return null;
        const course = prompt('Course ID:', init.course_id || ''); if (course == null) return null;
        const ay = prompt('Academic Year ID:', init.academic_year_id || ''); if (ay == null) return null;
        return { f_name: f.trim(), l_name: l.trim(), department_id: Number(dept), course_id: Number(course), academic_year_id: Number(ay) };
    }

    async function onEdit(stu) { openModal(stu); }

    async function onArchive(stu) {
        if (!confirm('Archive this student?')) return;
        try { await api(`/api/students/${stu.student_id}/archive`, { method:'POST' }); await load(); }
        catch(e){ errorBox.textContent = e.message; }
    }

    async function onRestore(stu) {
        if (!confirm('Restore this student?')) return;
        try { await api(`/api/students/${stu.student_id}/restore`, { method:'POST' }); await load(); }
        catch(e){ errorBox.textContent = e.message; }
    }

    load();
}


