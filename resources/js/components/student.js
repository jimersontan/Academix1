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
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else el.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
        if (c == null) return;
        if (typeof c === 'string') el.appendChild(document.createTextNode(c));
        else el.appendChild(c);
    });
    return el;
}

export function mountStudents(rootEl) {
    if (!rootEl) throw new Error('mountStudents: root element is required');

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
                <h2 class="f-title">Students</h2>
                <div class="f-actions">
                    <input id="s-q" class="f-input" placeholder="Search name or email" style="width:200px" />
                    <button id="s-search" class="f-btn">Search</button>
                    <button id="s-add" class="f-btn">Add Student</button>
                    <button id="s-archived" class="f-btn f-btn-outline">Archived</button>
                </div>
            </div>
            <div id="s-error" class="f-small" style="color:#ffb3b3;min-height:16px;margin-bottom:12px"></div>
            <table class="f-table">
                <thead>
                    <tr><th>Name</th><th>Department</th><th>Course</th><th>Year</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody id="s-body"><tr><td colspan="6" class="f-small">Loading…</td></tr></tbody>
            </table>
            <div id="s-modal" class="f-modal-overlay">
              <div class="f-modal">
                <h3 id="sm-title">Add Student</h3>
                <div class="f-modal-grid">
                  <div class="f-modal-field"><label class="f-modal-label">Student ID</label><input id="sm-student_id" class="f-modal-input" placeholder="optional" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Date of Birth</label><input id="sm-dob" type="date" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">First Name</label><input id="sm-f_name" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Sex</label><select id="sm-sex" class="f-modal-input"><option value="">Select</option><option>Male</option><option>Female</option></select></div>
                  <div class="f-modal-field"><label class="f-modal-label">Middle Name</label><input id="sm-m_name" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Phone Number</label><input id="sm-phone" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Last Name</label><input id="sm-l_name" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Email Address</label><input id="sm-email" type="email" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Suffix</label><input id="sm-suffix" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Address</label><input id="sm-address" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Department</label><select id="sm-department" class="f-modal-input"><option value="">Loading…</option></select></div>
                  <div class="f-modal-field"><label class="f-modal-label">Course</label><select id="sm-course" class="f-modal-input"><option value="">Loading…</option></select></div>
                  <div class="f-modal-field"><label class="f-modal-label">Academic Year</label><select id="sm-ay" class="f-modal-input"><option value="">Loading…</option></select></div>
                  <div class="f-modal-field"><label class="f-modal-label">Year Level</label><input id="sm-year" class="f-modal-input" placeholder="e.g., 1st, 2nd, 3rd" /></div>
                </div>
                <div id="sm-error" style="color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center"></div>
                <div class="f-modal-buttons">
                  <button id="sm-cancel" class="f-modal-btn f-modal-cancel">Cancel</button>
                  <button id="sm-save" class="f-modal-btn f-modal-save">Add</button>
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
    qEl.addEventListener('keypress', e => { if (e.key === 'Enter') load(); });
    rootEl.querySelector('#s-add').addEventListener('click', () => openModal());
    archivedBtn.addEventListener('click', () => {
        showingArchived = !showingArchived;
        archivedBtn.textContent = showingArchived ? 'Show Active' : 'Archived';
        archivedBtn.style.background = showingArchived ? '#2d6cdf' : 'transparent';
        load();
    });

    const modal = rootEl.querySelector('#s-modal');
    const qs = (id) => modal.querySelector(id);
    qs('#sm-cancel').addEventListener('click', () => closeModal());
    qs('#sm-save').addEventListener('click', saveModal);

    let currentRows = [];

    async function openModal(init = null) {
        errorBox.textContent = '';
        await ensureOptions();
        modal.style.display = 'flex';
        qs('#sm-title').textContent = init ? 'Edit Student' : 'Add Student';
        qs('#sm-save').textContent = init ? 'Save' : 'Add';
        [
            '#sm-student_id', '#sm-f_name', '#sm-m_name', '#sm-l_name', '#sm-suffix', '#sm-dob',
            '#sm-sex', '#sm-phone', '#sm-email', '#sm-address', '#sm-department',
            '#sm-course', '#sm-ay', '#sm-year'
        ].forEach(sel => { const el = qs(sel); el.value = ''; });

        if (init) {
            qs('#sm-student_id').value = init.student_id || '';
            qs('#sm-f_name').value = init.f_name || '';
            qs('#sm-m_name').value = init.m_name || '';
            qs('#sm-l_name').value = init.l_name || '';
            qs('#sm-suffix').value = init.suffix || '';
            qs('#sm-dob').value = init.date_of_birth || '';
            qs('#sm-sex').value = init.sex || '';
            qs('#sm-phone').value = init.phone_number || '';
            qs('#sm-email').value = init.email_address || '';
            qs('#sm-address').value = init.address || '';
            qs('#sm-department').value = (init.department_id != null ? String(init.department_id) : '');
            qs('#sm-course').value = (init.course_id != null ? String(init.course_id) : '');
            qs('#sm-ay').value = (init.academic_year_id != null ? String(init.academic_year_id) : '');
            qs('#sm-year').value = init.year_level || '';
            modal.dataset.editId = init.student_id;
        } else {
            delete modal.dataset.editId;
        }
    }

    function closeModal() { modal.style.display = 'none'; }

    async function saveModal() {
        const err = qs('#sm-error'); err.textContent = '';
        const payload = {
            f_name: qs('#sm-f_name').value.trim(),
            m_name: qs('#sm-m_name').value.trim() || null,
            l_name: qs('#sm-l_name').value.trim(),
            suffix: qs('#sm-suffix').value.trim() || null,
            date_of_birth: qs('#sm-dob').value || null,
            sex: qs('#sm-sex').value || null,
            phone_number: qs('#sm-phone').value || null,
            email_address: qs('#sm-email').value || null,
            address: qs('#sm-address').value || null,
            department_id: Number(qs('#sm-department').value),
            course_id: Number(qs('#sm-course').value),
            academic_year_id: Number(qs('#sm-ay').value),
            year_level: qs('#sm-year').value.trim() || '1st'
        };
        if (!payload.f_name || !payload.l_name) { err.textContent = 'First and Last name are required.'; return; }
        if (!payload.department_id || !payload.course_id || !payload.academic_year_id) { err.textContent = 'Please select Department, Course, and Academic Year.'; return; }
        try {
            if (modal.dataset.editId) {
                await api(`/api/students/${modal.dataset.editId}`, { method: 'PUT', body: JSON.stringify(payload) });
            } else {
                await api('/api/students', { method: 'POST', body: JSON.stringify(payload) });
            }
            closeModal();
            await load();
        } catch (e) { errorBox.textContent = e.message; }
    }

    let optionsLoaded = false;
    async function ensureOptions() {
        if (optionsLoaded) return;
        let departments = [], courses = [], years = [];
        try { departments = await api('/api/settings/departments'); } catch (_) {}
        if (!Array.isArray(departments) || departments.length === 0) {
            try {
                const cs = await api('/api/settings/departments', { method: 'POST', body: JSON.stringify({ department_name: 'Computer Science' }) });
                const it = await api('/api/settings/departments', { method: 'POST', body: JSON.stringify({ department_name: 'Information Technology' }) });
                departments = [cs, it].filter(Boolean);
            } catch (_) { departments = []; }
        }
        try { courses = await api('/api/settings/courses'); } catch (_) {}
        try { years = await api('/api/settings/academic-years'); } catch (_) {}

        const fill = (sel, rows, id, label) => {
            const el = qs(sel);
            el.innerHTML = '<option value="">Select</option>' + rows.map(r => `<option value="${r[id]}">${r[label]}</option>`).join('');
        };
        if (departments.length) fill('#sm-department', departments, 'department_id', 'department_name');
        if (courses.length) fill('#sm-course', courses, 'course_id', 'course_name');
        if (years.length) fill('#sm-ay', years, 'academic_year_id', 'school_year');
        optionsLoaded = true;
    }

    async function load(page = 1) {
        errorBox.textContent = '';
        const params = new URLSearchParams();
        const qVal = qEl.value.trim();
        if (qVal) params.set('q', qVal);
        params.set('page', String(page));
        if (showingArchived) params.set('archived', '1');
        try {
            const data = await api(`/api/students?${params.toString()}`);
            currentRows = data.data || [];
            renderRows(currentRows);
        } catch (e) {
            errorBox.textContent = e.message;
        }
    }

    function renderRows(rows) {
        const tbody = rootEl.querySelector('#s-body');
        tbody.innerHTML = '';
        if (!rows.length) {
            tbody.appendChild(h('tr', {}, [h('td', { colspan: 6, text: 'No students found' })]));
            return;
        }
        rows.forEach(stu => {
            const tr = h('tr', {}, [
                h('td', { text: `${stu.f_name || ''} ${stu.l_name || ''}`.trim() }),
                h('td', { text: stu.department?.department_name || stu.department_name || '' }),
                h('td', { text: stu.course?.course_name || stu.course_name || '' }),
                h('td', { text: stu.academic_year?.school_year || '' }),
                h('td', {}, [h('span', { class: 'f-pill f-small', text: stu.archived_at ? 'Archived' : 'Active' })]),
                h('td', {}, [
                    h('button', { class: 'f-btn f-small', 'data-action': 'edit', 'data-id': stu.student_id }, 'Edit'),
                    h('span', { text: ' ' }),
                    showingArchived
                        ? h('button', { class: 'f-btn f-small', style: 'background:#4caf50', 'data-action': 'restore', 'data-id': stu.student_id }, 'Restore')
                        : h('button', { class: 'f-btn f-small', style: 'background:#d32f2f', 'data-action': 'delete', 'data-id': stu.student_id }, 'Archive')
                ])
            ]);
            tbody.appendChild(tr);
        });

        tbody.onclick = function(e) {
            const id = e.target.dataset.id;
            if (!id) return;
            const action = e.target.dataset.action;
            const student = rows.find(s => s.student_id == id);
            if (!student) return;
            if (action === 'edit') { openModal(student); }
            else if (action === 'delete') { onArchive(student); }
            else if (action === 'restore') { onRestore(student); }
        };
    }

    // ARCHIVE uses POST to /archive, not DELETE
    async function onArchive(stu) {
        if (!confirm(`Archive ${stu.f_name} ${stu.l_name}?`)) return;
        try {
            await api(`/api/students/${stu.student_id}/archive`, { method: 'POST' });
            await load();
        } catch (e) { errorBox.textContent = e.message; }
    }

    async function onRestore(stu) {
        if (!confirm(`Restore ${stu.f_name} ${stu.l_name}?`)) return;
        try {
            await api(`/api/students/${stu.student_id}/restore`, { method: 'POST' });
            await load();
        } catch (e) { errorBox.textContent = e.message; }
    }

    load();
}
