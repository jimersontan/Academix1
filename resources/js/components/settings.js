// settings.js
// Settings management UI (vanilla JS) - Admin only
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

function detectId(item) {
    // Return primary id for item (works with course.department_id style or id)
    return item.course_id || item.department_id || item.academic_year_id || item.id || null;
}

export function mountSettings(rootEl) {
    if (!rootEl) throw new Error('mountSettings: root element is required');

    // Full UI template (kept same structure / classes as your original)
    rootEl.innerHTML = `
        <style>
            .st-wrap{padding:18px;color:var(--ink);font-family:Inter,Segoe UI,Arial,Helvetica,sans-serif}
            .st-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
            .st-title{margin:0;font-size:20px;font-weight:800;letter-spacing:.2px}
            .st-search{display:flex;gap:8px;align-items:center;margin-bottom:12px}
            .st-input{padding:8px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--ink);font-size:14px}
            .st-tabs{display:flex;gap:4px;margin-bottom:12px}
            .st-tab{padding:8px 14px;background:rgba(255,255,255,.02);color:var(--ink);border:1px solid var(--border);border-bottom:none;border-radius:10px 10px 0 0;cursor:pointer;font-size:14px}
            .st-tab.active{background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));color:var(--ink)}
            .st-tab:hover:not(.active){filter:brightness(1.05)}
            .st-content{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;padding:16px;min-height:400px;box-shadow:var(--shadow)}
            .st-actions{display:flex;gap:8px;align-items:center;margin-bottom:12px}
            .st-btn{padding:8px 14px;background:var(--primary);color:#0b1020;border:none;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700}
            .st-btn:hover{filter:brightness(1.05)}
            .st-btn-outline{background:transparent;border:1px solid var(--border);color:var(--ink)}
            .st-btn-outline:hover{background:rgba(148,163,184,.08)}
            .st-table{width:100%;border-collapse:collapse;background:transparent;border-radius:14px;overflow:hidden}
            .st-table th{background:transparent;padding:12px;text-align:left;font-weight:700;border-bottom:1px solid var(--border);color:var(--muted);font-size:12px;letter-spacing:.3px;text-transform:uppercase}
            .st-table td{padding:12px;border-bottom:1px solid var(--border)}
            .st-table tr:hover{background:rgba(255,255,255,.02)}
            .st-pill{padding:4px 8px;border-radius:12px;background:#1f2937;border:1px solid #283241;font-size:12px;color:#cbd5e1}
            .st-small{font-size:12px}
            .st-error{color:#ffb3b3;font-size:12px;min-height:16px;margin-bottom:12px}
            .st-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;z-index:2000}
            .st-modal{width:500px;max-width:95vw;background:#e8e8e8;color:#111;border-radius:8px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
            .st-modal h3{margin:0 0 16px;font-size:20px;font-weight:600}
            .st-modal-field{margin-bottom:16px}
            .st-modal-label{display:block;font-size:13px;margin-bottom:4px;font-weight:500}
            .st-modal-input{width:100%;padding:8px 12px;border:1px solid #ccc;border-radius:4px;background:#fff;color:#111;font-size:14px}
            .st-modal-buttons{display:flex;gap:12px;justify-content:center;margin-top:20px}
            .st-modal-btn{padding:10px 20px;border:none;border-radius:4px;cursor:pointer;font-size:14px;font-weight:500}
            .st-modal-cancel{background:#666;color:#fff}
            .st-modal-save{background:#2d6cdf;color:#fff}
        </style>
        <div class="st-wrap">
            <div class="st-topbar">
                <h2 class="st-title">Settings</h2>
            </div>
            <div class="st-search">
                <input id="st-search" class="st-input" placeholder="SEARCH" style="width:200px" />
            </div>
            <div class="st-tabs">
                <button class="st-tab active" data-tab="courses">Course</button>
                <button class="st-tab" data-tab="departments">Departments</button>
                <button class="st-tab" data-tab="academic-years">Academic Years</button>
            </div>
            <div class="st-content">
                <div id="st-courses" class="st-tab-content">
                    <div class="st-actions">
                        <button id="st-add-course" class="st-btn">Add Course</button>
                        <button id="st-archived-courses" class="st-btn st-btn-outline">Show Archived</button>
                    </div>
                    <div id="st-error-courses" class="st-error"></div>
                    <table class="st-table">
                        <thead>
                            <tr><th>Course Name</th><th>Department</th><th>Status</th><th>Action</th></tr>
                        </thead>
                        <tbody id="st-body-courses"><tr><td colspan="4" class="st-small">Loading…</td></tr></tbody>
                    </table>
                </div>
                <div id="st-departments" class="st-tab-content" style="display:none">
                    <div class="st-actions">
                        <button id="st-add-department" class="st-btn">Add Department</button>
                        <button id="st-archived-departments" class="st-btn st-btn-outline">Show Archived</button>
                    </div>
                    <div id="st-error-departments" class="st-error"></div>
                    <table class="st-table">
                        <thead>
                            <tr><th>Department Name</th><th>Status</th><th>Action</th></tr>
                        </thead>
                        <tbody id="st-body-departments"><tr><td colspan="3" class="st-small">Loading…</td></tr></tbody>
                    </table>
                </div>
                <div id="st-academic-years" class="st-tab-content" style="display:none">
                    <div class="st-actions">
                        <button id="st-add-academic-year" class="st-btn">Add Academic Year</button>
                        <button id="st-archived-academic-years" class="st-btn st-btn-outline">Show Archived</button>
                    </div>
                    <div id="st-error-academic-years" class="st-error"></div>
                    <table class="st-table">
                        <thead>
                            <tr><th>School Year</th><th>Status</th><th>Action</th></tr>
                        </thead>
                        <tbody id="st-body-academic-years"><tr><td colspan="3" class="st-small">Loading…</td></tr></tbody>
                    </table>
                </div>
            </div>

            <!-- Course Modal -->
            <div id="st-modal-course" class="st-modal-overlay">
                <div class="st-modal">
                    <h3 id="stm-course-title">Add Course</h3>
                    <div class="st-modal-field">
                        <label class="st-modal-label">Course Name</label>
                        <input id="stm-course-name" class="st-modal-input" />
                    </div>
                    <div class="st-modal-field">
                        <label class="st-modal-label">Department</label>
                        <select id="stm-course-department" class="st-modal-input"><option value="">Loading…</option></select>
                    </div>
                    <div id="stm-course-error" style="color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center"></div>
                    <div class="st-modal-buttons">
                        <button id="stm-course-cancel" class="st-modal-btn st-modal-cancel">Cancel</button>
                        <button id="stm-course-save" class="st-modal-btn st-modal-save">Add</button>
                    </div>
                </div>
            </div>

            <!-- Department Modal -->
            <div id="st-modal-department" class="st-modal-overlay">
                <div class="st-modal">
                    <h3 id="stm-department-title">Add Department</h3>
                    <div class="st-modal-field">
                        <label class="st-modal-label">Department Name</label>
                        <input id="stm-department-name" class="st-modal-input" />
                    </div>
                    <div id="stm-department-error" style="color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center"></div>
                    <div class="st-modal-buttons">
                        <button id="stm-department-cancel" class="st-modal-btn st-modal-cancel">Cancel</button>
                        <button id="stm-department-save" class="st-modal-btn st-modal-save">Add</button>
                    </div>
                </div>
            </div>

            <!-- Academic Year Modal -->
            <div id="st-modal-academic-year" class="st-modal-overlay">
                <div class="st-modal">
                    <h3 id="stm-academic-year-title">Add Academic Year</h3>
                    <div class="st-modal-field">
                        <label class="st-modal-label">School Year</label>
                        <input id="stm-academic-year-name" class="st-modal-input" placeholder="e.g., 2025-2026" />
                    </div>
                    <div id="stm-academic-year-error" style="color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center"></div>
                    <div class="st-modal-buttons">
                        <button id="stm-academic-year-cancel" class="st-modal-btn st-modal-cancel">Cancel</button>
                        <button id="stm-academic-year-save" class="st-modal-btn st-modal-save">Add</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // State
    let currentTab = 'courses';
    let showingArchived = { courses: false, departments: false, 'academic-years': false };
    let allData = { courses: [], departments: [], 'academic-years': [] };
    const searchEl = rootEl.querySelector('#st-search');

    // Tab switching
    rootEl.querySelectorAll('.st-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
    
    // Search functionality
    searchEl.addEventListener('input', () => {
        filterAndRender();
    });
    searchEl.addEventListener('keypress', e => {
        if (e.key === 'Enter') filterAndRender();
    });

    function switchTab(tabName) {
        currentTab = tabName;
        // Update tab buttons
        rootEl.querySelectorAll('.st-tab').forEach(t => t.classList.remove('active'));
        rootEl.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        // Update content
        rootEl.querySelectorAll('.st-tab-content').forEach(c => c.style.display = 'none');
        rootEl.querySelector(`#st-${tabName}`).style.display = 'block';
        // Load data for current tab
        loadCurrentTab();
    }

    // Helper: make short acronym from a department/program name
    function makeAcronym(txt) {
        if (!txt) return '';
        // keep 'program' so we produce NP for 'Nursing Program'
        const stop = new Set(['department','of','the','and','&','staff']);
        const words = txt.split(/\s+/).filter(w => w.trim().length > 0);
        const meaningful = words.filter(w => !stop.has(w.toLowerCase()));
        const source = meaningful.length ? meaningful : words;
        let letters = source.map(w => w[0] ? w[0].toUpperCase() : '').join('');
        if (letters.length > 3) letters = letters.slice(0,3);
        return letters;
    }

    // Action buttons
    rootEl.querySelector('#st-add-course').addEventListener('click', () => openModal('course'));
    rootEl.querySelector('#st-add-department').addEventListener('click', () => openModal('department'));
    rootEl.querySelector('#st-add-academic-year').addEventListener('click', () => openModal('academic-year'));

    rootEl.querySelector('#st-archived-courses').addEventListener('click', () => toggleArchived('courses'));
    rootEl.querySelector('#st-archived-departments').addEventListener('click', () => toggleArchived('departments'));
    rootEl.querySelector('#st-archived-academic-years').addEventListener('click', () => toggleArchived('academic-years'));

    // Modal setup
    setupModal('course');
    setupModal('department');
    setupModal('academic-year');

    function setupModal(type) {
        const cancelBtn = rootEl.querySelector(`#stm-${type}-cancel`);
        const saveBtn = rootEl.querySelector(`#stm-${type}-save`);
        cancelBtn.addEventListener('click', () => closeModal(type));
        saveBtn.addEventListener('click', () => saveModal(type));
    }

    function toggleArchived(type) {
        showingArchived[type] = !showingArchived[type];
        const btn = rootEl.querySelector(`#st-archived-${type}`);
        btn.textContent = showingArchived[type] ? 'Show Active' : 'Show Archived';
        btn.classList.toggle('st-btn-outline', !showingArchived[type]);
        loadCurrentTab();
    }

    async function openModal(type, init = null) {
        const modal = rootEl.querySelector(`#st-modal-${type}`);
        const title = rootEl.querySelector(`#stm-${type}-title`);
        const saveBtn = rootEl.querySelector(`#stm-${type}-save`);

        // Friendly title (singular)
        const friendly = {
            'course': 'Course',
            'department': 'Department',
            'academic-year': 'Academic Year'
        }[type] || type;

        title.textContent = init ? `Edit ${friendly}` : `Add ${friendly}`;
        saveBtn.textContent = init ? 'Save' : 'Add';

        // Reset inputs
        modal.querySelectorAll('input, select').forEach(i => i.value = '');

        // Populate if editing
        if (init) {
            if (type === 'course') {
                rootEl.querySelector('#stm-course-name').value = init.course_name || '';
                // set value by department_id if present, otherwise try nested department
                rootEl.querySelector('#stm-course-department').value = init.department_id || (init.department && init.department.department_id) || '';
            } else if (type === 'department') {
                rootEl.querySelector('#stm-department-name').value = init.department_name || '';
            } else if (type === 'academic-year') {
                rootEl.querySelector('#stm-academic-year-name').value = init.school_year || '';
            }
            const id = detectId(init);
            if (id != null) modal.dataset.editId = id;
        } else {
            delete modal.dataset.editId;
        }

        // Load departments for course modal so select has options before showing
        if (type === 'course') {
            await loadDepartmentsForCourse();
        }

        modal.style.display = 'flex';
    }

    function closeModal(type) {
        const modal = rootEl.querySelector(`#st-modal-${type}`);
        modal.style.display = 'none';
    }

    async function saveModal(type) {
        const modal = rootEl.querySelector(`#st-modal-${type}`);
        const errorEl = rootEl.querySelector(`#stm-${type}-error`);
        errorEl.textContent = '';

        let payload = {};
        let endpoint = '';

        if (type === 'course') {
            const name = rootEl.querySelector('#stm-course-name').value.trim();
            const deptId = rootEl.querySelector('#stm-course-department').value;
            if (!name) { errorEl.textContent = 'Course name is required.'; return; }
            if (!deptId) { errorEl.textContent = 'Please select a department.'; return; }
            payload = { course_name: name, department_id: Number(deptId) };
            endpoint = '/api/settings/courses';
        } else if (type === 'department') {
            const name = rootEl.querySelector('#stm-department-name').value.trim();
            if (!name) { errorEl.textContent = 'Department name is required.'; return; }
            payload = { department_name: name };
            endpoint = '/api/settings/departments';
        } else if (type === 'academic-year') {
            const name = rootEl.querySelector('#stm-academic-year-name').value.trim();
            if (!name) { errorEl.textContent = 'School year is required.'; return; }
            payload = { school_year: name };
            endpoint = '/api/settings/academic-years';
        }

        try {
            if (modal.dataset.editId) {
                await api(`${endpoint}/${modal.dataset.editId}`, { method: 'PUT', body: JSON.stringify(payload) });
            } else {
                await api(endpoint, { method: 'POST', body: JSON.stringify(payload) });
            }
            closeModal(type);
            loadCurrentTab();
        } catch (e) {
            errorEl.textContent = e.message;
        }
    }

    async function loadDepartmentsForCourse() {
        try {
            const departments = await api('/api/settings/departments');
            const select = rootEl.querySelector('#stm-course-department');
            select.innerHTML = '<option value="">Select Department</option>' +
                departments.map(d => `<option value="${d.department_id}">${d.department_name}</option>`).join('');
        } catch (e) {
            console.error('Failed to load departments:', e);
            // keep existing options if any
        }
    }

    async function loadCurrentTab() {
        const errorEl = rootEl.querySelector(`#st-error-${currentTab}`);
        errorEl.textContent = '';

        try {
            if (currentTab === 'courses') {
                const params = new URLSearchParams();
                if (showingArchived.courses) params.set('archived', '1');
                const data = await api(`/api/settings/courses?${params.toString()}`);
                allData.courses = Array.isArray(data) ? data : [];
                filterAndRender();
            } else if (currentTab === 'departments') {
                const params = new URLSearchParams();
                if (showingArchived.departments) params.set('archived', '1');
                const data = await api(`/api/settings/departments?${params.toString()}`);
                allData.departments = Array.isArray(data) ? data : [];
                filterAndRender();
            } else if (currentTab === 'academic-years') {
                const params = new URLSearchParams();
                if (showingArchived['academic-years']) params.set('archived', '1');
                const data = await api(`/api/settings/academic-years?${params.toString()}`);
                allData['academic-years'] = Array.isArray(data) ? data : [];
                filterAndRender();
            }
        } catch (e) {
            errorEl.textContent = e.message;
        }
    }
    
    function filterAndRender() {
        const searchTerm = searchEl.value.trim().toLowerCase();
        
        if (currentTab === 'courses') {
            let filtered = allData.courses;
            if (searchTerm) {
                filtered = filtered.filter(c => 
                    (c.course_name || '').toLowerCase().includes(searchTerm) ||
                    (c.department?.department_name || '').toLowerCase().includes(searchTerm)
                );
            }
            renderCourses(filtered);
        } else if (currentTab === 'departments') {
            let filtered = allData.departments;
            if (searchTerm) {
                filtered = filtered.filter(d => 
                    (d.department_name || '').toLowerCase().includes(searchTerm)
                );
            }
            renderDepartments(filtered);
        } else if (currentTab === 'academic-years') {
            let filtered = allData['academic-years'];
            if (searchTerm) {
                filtered = filtered.filter(y => 
                    (y.school_year || '').toLowerCase().includes(searchTerm)
                );
            }
            renderAcademicYears(filtered);
        }
    }

    /* Rendering + event wiring
       Note: we attach button listeners per rendered row to avoid duplicate event listeners
    */

    function renderCourses(courses) {
        const tbody = rootEl.querySelector('#st-body-courses');
        tbody.innerHTML = '';
        if (!courses.length) {
            tbody.appendChild(h('tr', {}, [h('td', { colspan: 4, text: 'No courses found' })]));
            return;
        }
        courses.forEach(course => {
            const departmentLabel = course.department?.department_name || course.department_name || (course.department_id ? String(course.department_id) : '');
            const tr = h('tr', {}, [
                h('td', { text: course.course_name || '' }),
                h('td', { text: departmentLabel }),
                h('td', {}, [h('span', { class: 'st-pill st-small', text: course.archived_at ? 'Archived' : 'Active' })]),
                h('td', {}, [
                    h('button', { class: 'st-btn st-small', 'data-action': 'edit', 'data-id': detectId(course) }, 'Edit'),
                    h('span', { text: ' ' }),
                    (showingArchived.courses
                        ? h('button', { class: 'st-btn st-small', style: 'background:#4caf50', 'data-action': 'restore', 'data-id': detectId(course) }, 'Restore')
                        : h('button', { class: 'st-btn st-small', style: 'background:#d32f2f', 'data-action': 'archive', 'data-id': detectId(course) }, 'Archive'))
                ])
            ]);
            tbody.appendChild(tr);

            // Wire buttons
            tr.querySelectorAll('button[data-action]').forEach(btn => {
                btn.addEventListener('click', (e) => handleRowAction(e, 'course', course));
            });
        });
    }

    function renderDepartments(departments) {
        const tbody = rootEl.querySelector('#st-body-departments');
        tbody.innerHTML = '';
        if (!departments.length) {
            tbody.appendChild(h('tr', {}, [h('td', { colspan: 3, text: 'No departments found' })]));
            return;
        }
        departments.forEach(dept => {
            const short = makeAcronym(dept.department_name || '');
            const label = short ? `${dept.department_name} (${short})` : (dept.department_name || '');
            const tr = h('tr', {}, [
                h('td', { text: label }),
                h('td', {}, [h('span', { class: 'st-pill st-small', text: dept.deleted_at ? 'Archived' : 'Active' })]),
                h('td', {}, [
                    h('button', { class: 'st-btn st-small', 'data-action': 'edit', 'data-id': detectId(dept) }, 'Edit'),
                    h('span', { text: ' ' }),
                    (showingArchived.departments
                        ? h('button', { class: 'st-btn st-small', style: 'background:#4caf50', 'data-action': 'restore', 'data-id': detectId(dept) }, 'Restore')
                        : h('button', { class: 'st-btn st-small', style: 'background:#d32f2f', 'data-action': 'archive', 'data-id': detectId(dept) }, 'Archive'))
                ])
            ]);
            tbody.appendChild(tr);

            tr.querySelectorAll('button[data-action]').forEach(btn => {
                btn.addEventListener('click', (e) => handleRowAction(e, 'department', dept));
            });
        });
    }

    function renderAcademicYears(years) {
        const tbody = rootEl.querySelector('#st-body-academic-years');
        tbody.innerHTML = '';
        if (!years.length) {
            tbody.appendChild(h('tr', {}, [h('td', { colspan: 3, text: 'No academic years found' })]));
            return;
        }
        years.forEach(year => {
            const tr = h('tr', {}, [
                h('td', { text: year.school_year || '' }),
                h('td', {}, [h('span', { class: 'st-pill st-small', text: year.archived_at ? 'Archived' : 'Active' })]),
                h('td', {}, [
                    h('button', { class: 'st-btn st-small', 'data-action': 'edit', 'data-id': detectId(year) }, 'Edit'),
                    h('span', { text: ' ' }),
                    (showingArchived['academic-years']
                        ? h('button', { class: 'st-btn st-small', style: 'background:#4caf50', 'data-action': 'restore', 'data-id': detectId(year) }, 'Restore')
                        : h('button', { class: 'st-btn st-small', style: 'background:#d32f2f', 'data-action': 'archive', 'data-id': detectId(year) }, 'Archive'))
                ])
            ]);
            tbody.appendChild(tr);

            tr.querySelectorAll('button[data-action]').forEach(btn => {
                btn.addEventListener('click', (e) => handleRowAction(e, 'academic-year', year));
            });
        });
    }

    // Handler for row actions - unified
    function handleRowAction(e, singularType, item) {
        e.stopPropagation();
        const action = e.currentTarget.dataset.action;
        const id = e.currentTarget.dataset.id;
        if (!action) return;

        if (action === 'edit') {
            // Open the correct modal and seed item
            openModal(singularType, item);
        } else if (action === 'archive') {
            if (confirm('Archive this item?')) {
                const plural = pluralize(singularType);
                archiveItem(plural, id);
            }
        } else if (action === 'restore') {
            if (confirm('Restore this item?')) {
                const plural = pluralize(singularType);
                restoreItem(plural, id);
            }
        }
    }

    function pluralize(singular) {
        // maps modal types to the API/type names used elsewhere
        if (singular === 'course') return 'courses';
        if (singular === 'department') return 'departments';
        if (singular === 'academic-year') return 'academic-years';
        // fallback
        return singular + 's';
    }

    async function archiveItem(type, id) {
        try {
            if (type === 'courses') {
                await api(`/api/settings/courses/${id}/archive`, { method: 'POST' });
            } else if (type === 'departments') {
                await api(`/api/settings/departments/${id}/archive`, { method: 'POST' });
            } else if (type === 'academic-years') {
                await api(`/api/settings/academic-years/${id}/archive`, { method: 'POST' });
            }
            loadCurrentTab();
        } catch (e) {
            rootEl.querySelector(`#st-error-${type}`).textContent = e.message;
        }
    }

    async function restoreItem(type, id) {
        try {
            if (type === 'courses') {
                await api(`/api/settings/courses/${id}/restore`, { method: 'POST' });
            } else if (type === 'departments') {
                await api(`/api/settings/departments/${id}/restore`, { method: 'POST' });
            } else if (type === 'academic-years') {
                await api(`/api/settings/academic-years/${id}/restore`, { method: 'POST' });
            }
            loadCurrentTab();
        } catch (e) {
            rootEl.querySelector(`#st-error-${type}`).textContent = e.message;
        }
    }

    // Initial load
    loadCurrentTab();
}
