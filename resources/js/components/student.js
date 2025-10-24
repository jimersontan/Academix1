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
        // More helpful network error message instead of generic "Failed to fetch"
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

export function mountStudents(rootEl) {
    if (!rootEl) throw new Error('mountStudents: root element is required');

    rootEl.innerHTML = `
        <style>
            .s-wrap{padding:32px 20px;color:#eee}
            .s-actions{display:flex;gap:8px;align-items:center;margin-bottom:12px}
            /* Make inputs visually thinner like the Figma "type bar" while keeping comfortable horizontal padding */
            /* Slightly larger fonts for projector/readability */
            .s-input{padding:14px 16px;border:1px solid #666;border-radius:6px;background:#111;color:#eee;font-size:18px;height:48px;box-sizing:border-box}
            /* Modal typography tuned for projector readability */
            #s-modal .s-input{font-size:20px;height:56px;padding:14px 16px}
            .s-form-label{display:block;font-size:18px;margin-bottom:14px;color:inherit;font-weight:600}
            .s-btn{padding:8px 12px;background:#2d6cdf;color:#fff;border:none;border-radius:4px;cursor:pointer}
            /* rows are transparent now; each cell gets its own boxed container */
            .s-table{width:100%;border-collapse:collapse;border-spacing:0;background:transparent}
            .s-table thead tr{background:#333}
            .s-table thead th{padding:12px 14px;font-size:14px;text-align:left;color:#fff;font-weight:700}
            .s-table thead th:first-child{border-radius:8px 0 0 8px}
            .s-table thead th:last-child{border-radius:0 8px 8px 0}
            /* connected row boxes */
            .s-table tbody tr{background:#2b2b2b}
            .s-table td{padding:14px 12px;font-size:14px;border:none;vertical-align:middle}
            .s-table tbody tr:first-child td:first-child{border-top-left-radius:8px}
            .s-table tbody tr:first-child td:last-child{border-top-right-radius:8px}
            .s-table tbody tr:last-child td:first-child{border-bottom-left-radius:8px}
            .s-table tbody tr:last-child td:last-child{border-bottom-right-radius:8px}
            .s-pill{padding:4px 8px;border-radius:12px;background:#444}
            .s-small{font-size:12px}
        </style>
        <div class="s-wrap">
            <div class="s-actions">
                <input id="s-q" class="s-input" placeholder="Search Name" />
                <select id="s-department-filter" class="s-input" style="width:220px"><option value="">All Departments</option></select>
                <select id="s-course-filter" class="s-input" style="width:180px"><option value="">All Courses</option></select>
                <button id="s-search" class="s-btn">Search</button>
                <button id="s-add" class="s-btn">Add Student</button>
                <button id="s-archived" class="s-btn" style="background:#666">Show Archived</button>
            </div>
            <div id="s-error" class="s-small" style="color:#ffb3b3;min-height:16px"></div>
            <table class="s-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Department</th>
                        <th>Course</th>
                        <th>Year Level</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="s-body"><tr><td colspan="6" class="s-small">Loading…</td></tr></tbody>
            </table>
            <div id="s-modal" style="position:fixed;inset:0;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;z-index:2000">
                            <div style="width:920px;max-width:96vw;background:#e8e8e8;color:#111;border-radius:8px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.5)">
                                <h3 id="f-title" style="margin:0 0 16px;font-size:26px;font-weight:800">Add Student</h3>
                                <!-- increase vertical spacing between rows to match Figma -->
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px 24px;align-items:start">
                                                        <div>
                                                            <label class="s-form-label">Student ID</label>
                                                            <input id="f-student_id" class="s-input" style="width:100%" />
                                                        </div>
                                    <div>
                                        <label class="s-form-label">Date of Birth</label>
                                        <input id="f-dob" type="date" class="s-input" style="width:100%" />
                                    </div>
                                    <div>
                                        <label class="s-form-label">First Name</label>
                                        <input id="f-f_name" class="s-input" style="width:100%" />
                                    </div>
                                    <div>
                                        <label class="s-form-label">Sex</label>
                                        <select id="f-sex" class="s-input" style="width:100%">
                                            <option value="">Select</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="s-form-label">Middle Name</label>
                                        <input id="f-m_name" class="s-input" style="width:100%" />
                                    </div>
                                                        <div>
                                                            <label class="s-form-label">Phone Number</label>
                                                            <input id="f-phone" class="s-input" style="width:100%" maxlength="11" inputmode="numeric" pattern="\d*" />
                                                        </div>
                                    <div>
                                        <label class="s-form-label">Last Name</label>
                                        <input id="f-l_name" class="s-input" style="width:100%" />
                                    </div>
                                    <div>
                                        <label class="s-form-label">Email Address</label>
                                        <input id="f-email" type="email" class="s-input" style="width:100%" />
                                    </div>
                                                        <div>
                                                            <label class="s-form-label">Suffix <span style="font-weight:400;font-size:11px;color:#666">(optional)</span></label>
                                                            <input id="f-suffix" class="s-input" style="width:100%" placeholder="optional" />
                                                        </div>
                                    <div>
                                        <label class="s-form-label">Address</label>
                                        <input id="f-address" class="s-input" style="width:100%" />
                                    </div>
                                    <div>
                                        <label class="s-form-label">Department</label>
                                        <select id="f-department" class="s-input" style="width:100%"><option value="">Loading…</option></select>
                                    </div>
                                    <div>
                                        <label class="s-form-label">Status</label>
                                        <select id="f-status" class="s-input" style="width:100%">
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="s-form-label">Course</label>
                                        <select id="f-course" class="s-input" style="width:100%"><option value="">Loading…</option></select>
                                    </div>
                                    <div>
                                        <label class="s-form-label">Academic Year</label>
                                        <select id="f-ay" class="s-input" style="width:100%"><option value="">Loading…</option></select>
                                    </div>
                                    <div>
                                        <label class="s-form-label">Year Level</label>
                                        <input id="f-year" class="s-input" style="width:100%" placeholder="e.g., 1st, 2nd, 3rd" />
                                    </div>
                                </div>
                                <div id="f-error" style="color:#b00020;font-size:14px;min-height:18px;margin-top:12px;text-align:center"></div>
                                <div style="display:flex;gap:18px;justify-content:center;margin-top:18px">
                                    <button id="f-cancel" class="s-btn" style="background:#666;padding:12px 18px;font-size:16px">Cancel</button>
                                    <button id="f-save" class="s-btn" style="padding:12px 18px;font-size:16px">Add</button>
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

    // Live search (debounced) and filters
    const qInput = rootEl.querySelector('#s-q');
    const deptFilter = rootEl.querySelector('#s-department-filter');
    const courseFilter = rootEl.querySelector('#s-course-filter');
    let searchTimer = null;
    qInput.addEventListener('input', ()=>{ clearTimeout(searchTimer); searchTimer = setTimeout(()=>load(), 300); });
    deptFilter.addEventListener('change', ()=> load());
    courseFilter.addEventListener('change', ()=> load());

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

                // Helper: ensure the select has an option for a value; if not, append a safe option label
                const ensureOption = (sel, val, labelCandidate) => {
                    const el = qs(sel);
                    if (!val) { el.value = ''; return; }
                    const found = Array.from(el.options).some(o => String(o.value) === String(val));
                    if (!found) {
                        const opt = document.createElement('option');
                        opt.value = String(val);
                        opt.text = String(labelCandidate || val);
                        el.appendChild(opt);
                    }
                    el.value = String(val);
                };

                ensureOption('#f-department', init.department_id != null ? String(init.department_id) : (init.department && (init.department.department_id != null || init.department.id != null)) ? String(init.department.department_id ?? init.department.id) : '', init.department?.department_name || init.department_name || init.department?.name || 'Unknown');

            qs('#f-status').value = init.status || 'active';

            let courseVal = '';
            if (init.course_id != null) {
                courseVal = String(init.course_id);
            } else if (init.course && (init.course.course_id != null || init.course.id != null)) {
                courseVal = String(init.course.course_id ?? init.course.id);
            }
                ensureOption('#f-course', courseVal, init.course?.course_name || init.course_name || init.course?.name || 'Unknown');

            let ayVal = '';
            if (init.academic_year_id != null) {
                ayVal = String(init.academic_year_id);
            } else if (init.academic_year && (init.academic_year.academic_year_id != null || init.academic_year.id != null)) {
                ayVal = String(init.academic_year.academic_year_id ?? init.academic_year.id);
            }
                ensureOption('#f-ay', ayVal, init.academic_year?.school_year || init.school_year || init.academic_year || 'Unknown');

            qs('#f-year').value = init.year_level || '';
            modal.dataset.editId = init.student_id;
        } else {
            delete modal.dataset.editId;
        }
    }

    function closeModal(){ modal.style.display = 'none'; }

    async function saveModal(){
        const err = qs('#f-error'); err.textContent = '';
        let phoneVal = qs('#f-phone').value || '';
        phoneVal = phoneVal.replace(/[^0-9]/g, '');
        const payload = {
            f_name: qs('#f-f_name').value.trim(),
            m_name: qs('#f-m_name').value.trim() || null,
            l_name: qs('#f-l_name').value.trim(),
            suffix: qs('#f-suffix').value.trim() || null,
            date_of_birth: qs('#f-dob').value || null,
            sex: qs('#f-sex').value || null,
            phone_number: phoneVal || null,
            email_address: qs('#f-email').value || null,
            address: qs('#f-address').value || null,
            status: qs('#f-status').value || 'active',
            department_id: Number(qs('#f-department').value),
            course_id: Number(qs('#f-course').value),
            academic_year_id: Number(qs('#f-ay').value),
            year_level: (qs('#f-year').value.trim() || '1st')
        };
        if (phoneVal && phoneVal.length !== 11) { qs('#f-error').textContent = 'Phone number must be 11 digits.'; return; }
        // Validate date_of_birth format (YYYY-MM-DD) and reasonable range
        const dobVal = qs('#f-dob').value || '';
        if (dobVal) {
            const dobRe = /^\d{4}-\d{2}-\d{2}$/;
            if (!dobRe.test(dobVal)) { qs('#f-error').textContent = 'Date of birth must be in YYYY-MM-DD format.'; return; }
            const dobDate = new Date(dobVal);
            if (Number.isNaN(dobDate.getTime())) { qs('#f-error').textContent = 'Invalid date of birth.'; return; }
            // Prevent bogus years (e.g., 11111)
            const year = dobDate.getUTCFullYear();
            if (year < 1900 || year > (new Date().getFullYear() - 10)) { qs('#f-error').textContent = 'Date of birth looks unrealistic.'; return; }
        }
        if (!payload.f_name || !payload.l_name) { err.textContent = 'First and Last name are required.'; return; }
        if (!payload.department_id || !payload.course_id || !payload.academic_year_id) { err.textContent = 'Please select Department, Course and Academic Year.'; return; }
        try {
                if (modal.dataset.editId) {
                    await api(`/api/students/${modal.dataset.editId}`, { method:'PUT', body: JSON.stringify(payload) });
                    notify('Successfully updated', 'Student', 'success');
                } else {
                    await api('/api/students', { method:'POST', body: JSON.stringify(payload) });
                    notify('Successfully added', 'Student', 'success');
                }
                closeModal();
                await load();
        } catch(e){ errorBox.textContent = e.message; }
    }

    // Options caches
    let optionsLoaded = false;
    // keep a master copy of courses so we can filter them by department without refetching
    let allCourses = [];
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
        const fill = (el, rows, id, label, includeAllLabel) => {
            el.innerHTML = (includeAllLabel ? '<option value="">All</option>' : '<option value="">Select</option>') + rows.map(r=>`<option value="${r[id]}">${r[label] || r[id]}</option>`).join('');
        };
        const deptIdKey = (departments[0] && ('department_id' in departments[0] ? 'department_id' : 'id')) || 'department_id';
        const courseIdKey = (courses[0] && ('course_id' in courses[0] ? 'course_id' : 'id')) || 'course_id';
        fill(qs('#f-department'), departments, deptIdKey, 'department_name', false);
        // populate top filters
        const topDept = rootEl.querySelector('#s-department-filter');
        const topCourse = rootEl.querySelector('#s-course-filter');
        fill(topDept, departments, deptIdKey, 'department_name', true);

        // store master list and provide filter helpers so course lists show only courses belonging to the selected department
        allCourses = Array.isArray(courses) ? courses : [];
        const filterCoursesFor = (deptId) => {
            return (allCourses || []).filter(c => {
                const cDept = c.department_id ?? (c.department && (c.department.department_id ?? c.department.id)) ?? null;
                if (!deptId) return true;
                return String(cDept) === String(deptId);
            });
        };

        // populate modal and top course selects filtered by current department selection (if any)
        const modalDeptEl = qs('#f-department');
        const currentModalDept = modalDeptEl ? modalDeptEl.value : '';
        const modalCourses = filterCoursesFor(currentModalDept);
        fill(qs('#f-course'), modalCourses, courseIdKey, 'course_name', false);

        const currentTopDept = topDept ? topDept.value : '';
        const topCourses = filterCoursesFor(currentTopDept);
        fill(topCourse, topCourses, courseIdKey, 'course_name', true);

        // when department changes in the modal, filter course options to only those in the dept
        if (modalDeptEl) {
            modalDeptEl.addEventListener('change', () => {
                const v = modalDeptEl.value;
                const list = filterCoursesFor(v);
                fill(qs('#f-course'), list, courseIdKey, 'course_name', false);
            });
        }

        // when the top-level department filter changes, also filter the top-level course filter
        if (topDept) {
            topDept.addEventListener('change', () => {
                const v = topDept.value;
                const list = filterCoursesFor(v);
                fill(topCourse, list, courseIdKey, 'course_name', true);
                // existing behavior also triggers load; keep that
                load();
            });
        }
        fill(qs('#f-ay'), years, (years[0] && ('academic_year_id' in years[0] ? 'academic_year_id' : 'id')) || 'academic_year_id', 'school_year', false);
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
            let rows = data.data || [];
            // client-side filtering by query, department and course for better matching
            const qLower = qVal.toLowerCase();
            const deptVal = deptFilter.value;
            const courseVal = courseFilter.value;
            if (qLower || deptVal || courseVal) {
                rows = rows.filter(stu => {
                    const deptName = (stu.department?.department_name || stu.department_name || '').toString().toLowerCase();
                    const courseName = (stu.course?.course_name || stu.course_name || '').toString().toLowerCase();
                    const fullName = (`${stu.f_name || ''} ${stu.l_name || ''}`).toLowerCase();
                    const matchesQ = !qLower || fullName.includes(qLower) || deptName.includes(qLower) || courseName.includes(qLower) || (stu.email_address||'').toLowerCase().includes(qLower);
                    const matchesDept = !deptVal || String((stu.department && (stu.department.department_id ?? stu.department.id)) || stu.department_id || '') === String(deptVal);
                    const matchesCourse = !courseVal || String((stu.course && (stu.course.course_id ?? stu.course.id)) || stu.course_id || '') === String(courseVal);
                    return matchesQ && matchesDept && matchesCourse;
                });
            }
            renderRows(rows || []);
        } catch (e) { errorBox.textContent = e.message; }
    }

    function renderRows(rows) {
        const tbody = rootEl.querySelector('#s-body');
        tbody.innerHTML = '';
        if (!rows.length) { tbody.appendChild(h('tr',{},[h('td',{colspan:6,text:'No students found'})])); return; }
                rows.forEach(stu => {
                        const actionChildren = showingArchived
                                ? [
                                        h('button',{class:'s-btn s-small',style:'background:#4caf50','data-action':'restore','data-id':stu.student_id},'Restore'),
                                        h('span',{text:' '}),
                                        h('button',{class:'s-btn s-small',style:'background:#d32f2f','data-action':'delete','data-id':stu.student_id},'Delete')
                                    ]
                                : [
                                        h('button',{class:'s-btn s-small','data-action':'edit','data-id':stu.student_id},'Edit'),
                                        h('span',{text:' '}),
                                        h('button',{class:'s-btn s-small',style:'background:#d32f2f','data-action':'archive','data-id':stu.student_id},'Archive')
                                    ];

                        const tr = h('tr',{},[
                        h('td',{text:`${stu.f_name || ''} ${stu.l_name || ''}`.trim()}),
                        h('td',{text: stu.department?.department_name || stu.department_name || stu.department_id || ''}),
                        h('td',{text: stu.course?.course_name || stu.course_name || stu.course_id || ''}),
                        h('td',{text: stu.year_level || stu.academic_year?.school_year || stu.academic_year || stu.academic_year_id || ''}),
                        h('td',{},[h('span',{class:'s-pill s-small',text: stu.archived_at ? 'Archived' : 'Active'})]),
                                        h('td',{}, actionChildren)
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
            const findStudent = (idVal) => rows.find(s => String(s.student_id) === String(idVal));
            if (action === 'edit') {
                const student = findStudent(id);
                if (student) openModal(student);
            } else if (action === 'archive') {
                const student = findStudent(id);
                if (!student) return;
                const restore = disableOnce(btn);
                (async () => { try { await onArchive(student); await load(); notify('Successfully archived', 'Student', 'success'); } catch(e){ errorBox.textContent = e.message } finally { restore(); } })();
            } else if (action === 'restore') {
                const student = findStudent(id);
                if (!student) return;
                const restore = disableOnce(btn);
                (async () => { try { await onRestore(student); await load(); notify('Successfully restored', 'Student', 'success'); } catch(e){ errorBox.textContent = e.message } finally { restore(); } })();
            } else if (action === 'delete') {
                const student = findStudent(id);
                if (!student) return;
                if (!confirm('Permanently delete this student? This cannot be undone.')) return;
                const restore = disableOnce(btn);
                (async () => {
                    try {
                        await api(`/api/students/${id}`, { method: 'DELETE' });
                        await load();
                        notify('Successfully deleted', 'Student', 'success');
                    } catch (err) { errorBox.textContent = err.message; }
                    restore();
                })();
            }
        };

        async function awaitOnArchive(student, restore) {
            try { await onArchive(student); } catch(e){}
            restore();
        }
        async function awaitOnRestore(student, restore) {
            try { await onRestore(student); } catch(e){}
            restore();
        }
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

    // Ensure filter dropdowns are populated before the first load
    ensureOptions().then(() => load());
}


