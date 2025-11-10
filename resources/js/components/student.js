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
            .f-wrap{padding:18px;color:var(--ink);font-family:Inter,Segoe UI,Arial,Helvetica,sans-serif}
            .f-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
            .f-title{margin:0;font-size:20px;font-weight:800;letter-spacing:.2px}
            .f-actions{display:flex;gap:8px;align-items:center}
            .f-input{padding:8px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--ink);font-size:14px}
            .f-btn{padding:8px 14px;background:var(--primary);color:#0b1020;border:none;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700}
            .f-btn:hover{filter:brightness(1.05)}
            .f-btn-outline{background:transparent;border:1px solid var(--border);color:var(--ink)}
            .f-btn-outline:hover{background:rgba(148,163,184,.08)}
            .f-card{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;box-shadow:var(--shadow);overflow:hidden}
            .f-tablebar{display:flex;justify-content:flex-end;gap:8px;padding:10px 12px;background:rgba(255,255,255,.02);border-bottom:1px solid var(--border)}
            .f-table{width:100%;border-collapse:collapse;background:transparent}
            .f-table th{background:transparent;padding:12px;text-align:left;font-weight:700;border-bottom:1px solid var(--border);color:var(--muted);font-size:12px;letter-spacing:.3px;text-transform:uppercase}
            .f-table td{padding:12px;border-bottom:1px solid var(--border)}
            .f-table tr:hover{background:rgba(255,255,255,.02)}
            .f-pill{padding:4px 8px;border-radius:12px;background:#1f2937;border:1px solid #283241;font-size:12px;color:#cbd5e1}
            .f-small{font-size:12px}
            .f-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;z-index:2000}
            .f-modal{width:960px;max-width:96vw;background:#f9fafb;color:#0f172a;border-radius:12px;padding:28px;box-shadow:0 24px 72px rgba(0,0,0,.55)}
            .f-modal h3{margin:0 0 18px;font-size:22px;font-weight:700;color:#0b1340}
            .f-modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px 24px;align-items:start}
            .f-modal-field{margin-bottom:12px}
            .f-modal-label{display:block;font-size:13.5px;margin-bottom:6px;font-weight:600;color:#0b1340}
            .f-modal-input{width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;color:#0f172a;font-size:14px}
            .f-modal-buttons{display:flex;gap:12px;justify-content:flex-end;margin-top:22px}
            .f-modal-btn{padding:10px 20px;border:none;border-radius:4px;cursor:pointer;font-size:14px;font-weight:500}
            .f-modal-cancel{background:#64748b;color:#fff}
            .f-modal-save{background:#2563eb;color:#fff}
        </style>
        <div class="f-wrap">
            <div class="f-topbar">
                <h2 class="f-title">Students</h2>
                <div class="f-actions">
                    <input id="s-q" class="f-input" placeholder="Search name or email" style="width:200px" />
                    <button id="s-search" class="f-btn">Search</button>
                    <button id="s-add" class="f-btn">Add Student</button>
                </div>
            </div>
            <div id="s-error" class="f-small" style="color:#ffb3b3;min-height:16px;margin-bottom:12px"></div>
            <div class="f-card">
              <div class="f-tablebar">
                <select id="s-filter-department" class="f-input" style="width:200px">
                  <option value="">All Departments</option>
                </select>
                <select id="s-filter-course" class="f-input" style="width:200px">
                  <option value="">All Courses</option>
                </select>
                <button id="s-archived" class="f-btn f-btn-outline">Archived</button>
              </div>
                            <table class="f-table">
                                <thead>
                                        <tr><th style="width:48px">#</th><th>Name</th><th>Department</th><th>Course</th><th>Year</th><th>Status</th><th>Action</th></tr>
                                </thead>
                                <tbody id="s-body"><tr><td colspan="7" class="f-small">Loading…</td></tr></tbody>
                            </table>
            </div>
            <div id="s-modal" class="f-modal-overlay">
              <div class="f-modal">
                <h3 id="sm-title">Add Student</h3>
                <div class="f-modal-grid">
                  <div class="f-modal-field"><label class="f-modal-label">Student ID</label><input id="sm-student_id" class="f-modal-input" placeholder="optional" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Date of Birth</label><input id="sm-dob" type="date" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">First Name</label><input id="sm-f_name" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Sex</label><select id="sm-sex" class="f-modal-input"><option value="">Select</option><option>Male</option><option>Female</option></select></div>
                  <div class="f-modal-field"><label class="f-modal-label">Middle Name</label><input id="sm-m_name" class="f-modal-input" /></div>
                  <div class="f-modal-field"><label class="f-modal-label">Phone Number</label><input id="sm-phone" class="f-modal-input" maxlength="11" inputmode="numeric" placeholder="11 digits" /></div>
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
    const filterCourseEl = rootEl.querySelector('#s-filter-course');
    const filterDepartmentEl = rootEl.querySelector('#s-filter-department');
    let showingArchived = false;
    // caches for filters
    let departmentsCache = [];
    let coursesCache = [];

    rootEl.querySelector('#s-search').addEventListener('click', () => load());
    qEl.addEventListener('keypress', e => { if (e.key === 'Enter') load(); });
    // Real-time search as you type
    qEl.addEventListener('input', () => load());
    
    rootEl.querySelector('#s-add').addEventListener('click', () => openModal());
    archivedBtn.addEventListener('click', () => {
        showingArchived = !showingArchived;
        archivedBtn.textContent = showingArchived ? 'Show Active' : 'Archived';
        archivedBtn.style.background = showingArchived ? '#2d6cdf' : 'transparent';
        load();
    });
    
    // Filter dropdowns in tablebar
    filterCourseEl.addEventListener('change', () => load());
    filterDepartmentEl.addEventListener('change', () => { repopulateCourseFilter(); load(); });
    
    const modal = rootEl.querySelector('#s-modal');
    const qs = (id) => modal.querySelector(id);
    qs('#sm-cancel').addEventListener('click', () => closeModal());
    qs('#sm-save').addEventListener('click', saveModal);

    // ensure phone input only accepts digits and max 11 characters
    try {
        const phoneEl = qs('#sm-phone');
        if (phoneEl) {
            phoneEl.addEventListener('input', (e) => {
                const cleaned = phoneEl.value.replace(/\D/g, '').slice(0, 11);
                if (phoneEl.value !== cleaned) phoneEl.value = cleaned;
            });
        }
    } catch (e) { /* ignore if modal not present */ }

    // ensure phone input only accepts digits and max 11 characters
    try {
        const phoneEl = qs('#sm-phone');
        if (phoneEl) {
            phoneEl.addEventListener('input', (e) => {
                const cleaned = phoneEl.value.replace(/\D/g, '').slice(0, 11);
                if (phoneEl.value !== cleaned) phoneEl.value = cleaned;
            });
        }
    } catch (e) { /* ignore if modal not present */ }

    let currentRows = [];
    async function getNextStudentId() {
        try {
            const res = await api('/api/students/next-id');
            if (res && res.next_id) return String(res.next_id);
        } catch (e) {}
        return String(2310001);
    }

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
            // show display id when editing, keep dataset.editId as primary key
            qs('#sm-student_id').value = init.display_id || init.student_id || '';
            qs('#sm-student_id').readOnly = true;
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
            // ensure course list matches department before setting the selected course
            try { qs('#sm-department').dispatchEvent(new Event('change')); } catch(e) {}
            qs('#sm-course').value = (init.course_id != null ? String(init.course_id) : '');
            qs('#sm-ay').value = (init.academic_year_id != null ? String(init.academic_year_id) : '');
            qs('#sm-year').value = init.year_level || '';
            modal.dataset.editId = init.student_id;
        } else {
            delete modal.dataset.editId;
            // Pre-fill next student display id when adding a new student
            try {
                const nextId = await getNextStudentId();
                const idEl = qs('#sm-student_id');
                idEl.value = nextId;
                idEl.readOnly = true;
                idEl.placeholder = '(auto-generated)';
            } catch(_) { /* ignore */ }
        }
    }

    function closeModal() { modal.style.display = 'none'; }

    async function saveModal() {
        const err = qs('#sm-error'); err.textContent = '';
        // sanitize phone number: only digits and must be exactly 11 digits
        const rawPhone = qs('#sm-phone').value.trim() || '';
        const digits = rawPhone.replace(/\D/g, '');
        if (digits.length !== 11) { err.textContent = 'Phone number is required and must be exactly 11 digits.'; return; }

        const payload = {
            f_name: qs('#sm-f_name').value.trim(),
            m_name: qs('#sm-m_name').value.trim() || null,
            l_name: qs('#sm-l_name').value.trim(),
            suffix: qs('#sm-suffix').value.trim() || null,
            date_of_birth: qs('#sm-dob').value || null,
            sex: qs('#sm-sex').value || null,
            phone_number: digits || null,
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
            const isEdit = Boolean(modal.dataset.editId);
            if (isEdit) {
                await api(`/api/students/${modal.dataset.editId}`, { method: 'PUT', body: JSON.stringify(payload) });
            } else {
                await api('/api/students', { method: 'POST', body: JSON.stringify(payload) });
            }
            // Dispatch global event for dashboard counters and notifications
            // Update local persistent counters for robustness
            try {
                const s = JSON.parse(window.localStorage.getItem('academix_stats')||'{}');
                const curr = { students: Number(s.students)||0, faculty: Number(s.faculty)||0 };
                if (!isEdit) curr.students = Math.max(0, curr.students + 1);
                window.localStorage.setItem('academix_stats', JSON.stringify(curr));
            } catch(_) {}
            window.dispatchEvent(new CustomEvent('academix:entity', {
                detail: {
                    entity: 'student',
                    action: isEdit ? 'updated' : 'created',
                    delta: isEdit ? 0 : 1,
                    details: `${payload.f_name} ${payload.l_name}`.trim()
                }
            }));
            window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
            closeModal();
            await load();
        } catch (e) { errorBox.textContent = e.message; }
    }

    let optionsLoaded = false;
    async function ensureOptions() {
        if (optionsLoaded) return;
        let departments = [], courses = [], years = [];
        try { departments = await api('/api/settings/departments'); } catch (_) {}
        try { courses = await api('/api/settings/courses'); } catch (_) {}
        try { years = await api('/api/settings/academic-years'); } catch (_) {}

        departmentsCache = Array.isArray(departments) ? departments : [];
        coursesCache = Array.isArray(courses) ? courses : [];

        const fill = (sel, rows, id, label) => {
            const el = qs(sel);
            el.innerHTML = '<option value="">Select</option>' + rows.map(r => `<option value="${r[id]}">${r[label]}</option>`).join('');
        };
        if (departmentsCache.length) fill('#sm-department', departmentsCache, 'department_id', 'department_name');
        if (coursesCache.length) fill('#sm-course', coursesCache, 'course_id', 'course_name');
        if (Array.isArray(years) && years.length) fill('#sm-ay', years, 'academic_year_id', 'school_year');
        
        // Populate filter dropdowns in tablebar
        if (departmentsCache.length) {
            filterDepartmentEl.innerHTML = '<option value="">All Departments</option>' + 
              departmentsCache.map(d => `<option value="${d.department_id}">${d.department_name}</option>`).join('');
        }
        repopulateCourseFilter();
        
        // Hook modal department -> course dependency so the Course select only shows
        // courses that belong to the selected department in the Add/Edit modal.
        try {
            const modalDept = qs('#sm-department');
            const modalCourse = qs('#sm-course');
            const repopulateModalCourse = () => {
                const sel = modalDept.value ? Number(modalDept.value) : null;
                const list = sel ? coursesCache.filter(c => Number(c.department_id) === sel) : coursesCache;
                modalCourse.innerHTML = '<option value="">Select</option>' + list.map(c => `<option value="${c.course_id}">${c.course_name}</option>`).join('');
            };
            modalDept.addEventListener('change', repopulateModalCourse);
            // initialize modal course options according to current department value
            repopulateModalCourse();
        } catch (e) {
            // ignore if modal elements not present
        }

        optionsLoaded = true;
    }

    function repopulateCourseFilter() {
        const selectedDept = filterDepartmentEl.value ? Number(filterDepartmentEl.value) : null;
        const list = selectedDept
            ? coursesCache.filter(c => Number(c.department_id) === selectedDept)
            : coursesCache;
        filterCourseEl.innerHTML = '<option value="">All Courses</option>' + list.map(c => `<option value="${c.course_id}">${c.course_name}</option>`).join('');
    }

    async function load(page = 1) {
        errorBox.textContent = '';
        const params = new URLSearchParams();
        const qVal = qEl.value.trim();
        if (qVal) params.set('q', qVal);
        
        // Add filter parameters from tablebar
        const courseId = filterCourseEl.value;
        const deptId = filterDepartmentEl.value;
        if (courseId) params.set('course_id', courseId);
        if (deptId) params.set('department_id', deptId);
        
        params.set('page', String(page));
        if (showingArchived) params.set('archived', '1');
        try {
            window.dispatchEvent(new CustomEvent('academix:notify', { detail: { entity:'student', action:'fetch:start', details: params.toString() } }));
            const data = await api(`/api/students?${params.toString()}`);
            currentRows = data.data || [];
            renderRows(currentRows);
            window.dispatchEvent(new CustomEvent('academix:notify', { detail: { entity:'student', action:'fetch:end', details: `rows=${currentRows.length}` } }));
        } catch (e) {
            errorBox.textContent = e.message;
            window.dispatchEvent(new CustomEvent('academix:notify', { detail: { entity:'student', action:'fetch:error', details: e.message } }));
        }
    }

    function renderRows(rows) {
        const tbody = rootEl.querySelector('#s-body');
        tbody.innerHTML = '';
        if (!rows.length) {
            tbody.appendChild(h('tr', {}, [h('td', { colspan: 6, text: 'No students found' })]));
            return;
        }
        rows.forEach((stu, idx) => {
            const number = idx + 1;
            const cells = [
                h('td', { text: String(number) }),
                h('td', { text: `${stu.f_name || ''} ${stu.l_name || ''}`.trim() }),
                h('td', { text: stu.department?.department_name || stu.department_name || '' }),
                h('td', { text: stu.course?.course_name || stu.course_name || '' }),
                h('td', { text: stu.academic_year?.school_year || '' }),
                h('td', {}, [h('span', { class: 'f-pill f-small', text: (stu.status && String(stu.status).toLowerCase() !== 'active') ? (String(stu.status).charAt(0).toUpperCase() + String(stu.status).slice(1)) : (stu.archived_at ? 'Archived' : 'Active') })])
            ];
            const actions = [];
            if (!showingArchived) {
                actions.push(h('button', { class: 'f-btn f-small', 'data-action': 'edit', 'data-id': stu.student_id }, 'Edit'));
                actions.push(h('span', { text: ' ' }));
                actions.push(h('button', { class: 'f-btn f-small', style: 'background:#d32f2f', 'data-action': 'delete', 'data-id': stu.student_id }, 'Archive'));
            } else {
                // Archived view: show Restore and permanent Delete (no Edit)
                actions.push(h('button', { class: 'f-btn f-small', style: 'background:#4caf50', 'data-action': 'restore', 'data-id': stu.student_id }, 'Restore'));
                actions.push(h('span', { text: ' ' }));
                actions.push(h('button', { class: 'f-btn f-small', style: 'background:#c62828', 'data-action': 'permanent-delete', 'data-id': stu.student_id }, 'Delete'));
            }
            cells.push(h('td', {}, actions));
            const tr = h('tr', {}, cells);
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
            else if (action === 'permanent-delete') { onPermanentDelete(student); }
        };

        async function onPermanentDelete(stu) {
            if (!confirm(`Permanently delete ${stu.f_name} ${stu.l_name}? This cannot be undone.`)) return;
            try {
                await api(`/api/students/${stu.student_id}/delete`, { method: 'POST' });
                try {
                    const s = JSON.parse(window.localStorage.getItem('academix_stats')||'{}');
                    const curr = { students: Number(s.students)||0, faculty: Number(s.faculty)||0 };
                    curr.students = Math.max(0, curr.students - 1);
                    window.localStorage.setItem('academix_stats', JSON.stringify(curr));
                } catch(_) {}
                window.dispatchEvent(new CustomEvent('academix:entity', { detail: { entity:'student', action:'deleted', delta:0, details:`${stu.f_name || ''} ${stu.l_name || ''}`.trim() } }));
                window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
                await load();
            } catch (e) { errorBox.textContent = e.message; }
        }
    }

    // ARCHIVE uses POST to /archive, not DELETE
    async function onArchive(stu) {
        if (!confirm(`Archive ${stu.f_name} ${stu.l_name}?`)) return;
        try {
            await api(`/api/students/${stu.student_id}/archive`, { method: 'POST' });
            try {
                const s = JSON.parse(window.localStorage.getItem('academix_stats')||'{}');
                const curr = { students: Number(s.students)||0, faculty: Number(s.faculty)||0 };
                curr.students = Math.max(0, curr.students - 1);
                window.localStorage.setItem('academix_stats', JSON.stringify(curr));
            } catch(_) {}
            window.dispatchEvent(new CustomEvent('academix:entity', {
                detail: { entity: 'student', action: 'archived', delta: -1, details: `${stu.f_name || ''} ${stu.l_name || ''}`.trim() }
            }));
            window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
            await load();
        } catch (e) { errorBox.textContent = e.message; }
    }

    async function onRestore(stu) {
        if (!confirm(`Restore ${stu.f_name} ${stu.l_name}?`)) return;
        try {
            await api(`/api/students/${stu.student_id}/restore`, { method: 'POST' });
            try {
                const s = JSON.parse(window.localStorage.getItem('academix_stats')||'{}');
                const curr = { students: Number(s.students)||0, faculty: Number(s.faculty)||0 };
                curr.students = Math.max(0, curr.students + 1);
                window.localStorage.setItem('academix_stats', JSON.stringify(curr));
            } catch(_) {}
            window.dispatchEvent(new CustomEvent('academix:entity', {
                detail: { entity: 'student', action: 'restored', delta: +1, details: `${stu.f_name || ''} ${stu.l_name || ''}`.trim() }
            }));
            window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
            await load();
        } catch (e) { errorBox.textContent = e.message; }
    }

    (async function init(){
        await ensureOptions();
        await load();
    })();
}
