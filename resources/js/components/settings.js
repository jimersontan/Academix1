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
        if (k === 'class') el.className = v; else if (k === 'text') el.textContent = v; else el.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
        if (c == null) return; if (typeof c === 'string') el.appendChild(document.createTextNode(c)); else el.appendChild(c);
    });
    return el;
}

export function mountSettings(rootEl) {
    if (!rootEl) throw new Error('mountSettings: root element is required');

    rootEl.innerHTML = `
        <style>
            .st-wrap{padding:18px;color:#fff;font-family:Arial,Helvetica,sans-serif}
            .st-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
            .st-title{margin:0;font-size:24px;font-weight:700}
            .st-search{display:flex;gap:8px;align-items:center;margin-bottom:16px}
            .st-input{padding:8px 12px;border:1px solid #666;border-radius:4px;background:#2b2b2b;color:#fff;font-size:14px}
            .st-tabs{display:flex;gap:4px;margin-bottom:16px}
            .st-tab{padding:10px 16px;background:#333;color:#ddd;border:none;border-radius:4px 4px 0 0;cursor:pointer;font-size:14px}
            .st-tab.active{background:#2d6cdf;color:#fff}
            .st-tab:hover:not(.active){background:#444}
            .st-content{background:#2b2b2b;border-radius:8px;padding:20px;min-height:400px}
            .st-actions{display:flex;gap:8px;align-items:center;margin-bottom:16px}
            .st-btn{padding:8px 16px;background:#2d6cdf;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:14px}
            .st-btn:hover{background:#1e5bb8}
            .st-btn-outline{background:transparent;border:1px solid #666;color:#ddd}
            .st-btn-outline:hover{background:#333}
            .st-table{width:100%;border-collapse:collapse;background:#333;border-radius:8px;overflow:hidden}
            .st-table th{background:#444;padding:12px;text-align:left;font-weight:600;border-bottom:1px solid #555}
            .st-table td{padding:12px;border-bottom:1px solid #555}
            .st-table tr:hover{background:#444}
            .st-pill{padding:4px 8px;border-radius:12px;background:#555;font-size:12px}
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

    let currentTab = 'courses';
    let showingArchived = { courses: false, departments: false, 'academic-years': false };

    // Tab switching
    rootEl.querySelectorAll('.st-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
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

    // Event listeners
    rootEl.querySelector('#st-add-course').addEventListener('click', () => openModal('course'));
    rootEl.querySelector('#st-add-department').addEventListener('click', () => openModal('department'));
    rootEl.querySelector('#st-add-academic-year').addEventListener('click', () => openModal('academic-year'));
    
    rootEl.querySelector('#st-archived-courses').addEventListener('click', () => toggleArchived('courses'));
    rootEl.querySelector('#st-archived-departments').addEventListener('click', () => toggleArchived('departments'));
    rootEl.querySelector('#st-archived-academic-years').addEventListener('click', () => toggleArchived('academic-years'));

    // Modal event listeners
    setupModal('course');
    setupModal('department');
    setupModal('academic-year');

    function setupModal(type) {
        const modal = rootEl.querySelector(`#st-modal-${type}`);
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
        
        title.textContent = init ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        saveBtn.textContent = init ? 'Save' : 'Add';
        
        // Reset form
        const inputs = modal.querySelectorAll('input, select');
        inputs.forEach(input => input.value = '');
        
        // Populate if editing
        if (init) {
            if (type === 'course') {
                rootEl.querySelector('#stm-course-name').value = init.course_name || '';
                rootEl.querySelector('#stm-course-department').value = init.department_id || '';
            } else if (type === 'department') {
                rootEl.querySelector('#stm-department-name').value = init.department_name || '';
            } else if (type === 'academic-year') {
                rootEl.querySelector('#stm-academic-year-name').value = init.school_year || '';
            }
            modal.dataset.editId = init[`${type.replace('-', '_')}_id`] || init.id;
        } else {
            delete modal.dataset.editId;
        }
        
        // Load departments for course modal
        if (type === 'course') {
            await loadDepartmentsForCourse();
        }
        
        modal.style.display = 'flex';
    }

    function closeModal(type) {
        rootEl.querySelector(`#st-modal-${type}`).style.display = 'none';
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
                renderCourses(data);
            } else if (currentTab === 'departments') {
                const params = new URLSearchParams();
                if (showingArchived.departments) params.set('archived', '1');
                const data = await api(`/api/settings/departments?${params.toString()}`);
                renderDepartments(data);
            } else if (currentTab === 'academic-years') {
                const params = new URLSearchParams();
                if (showingArchived['academic-years']) params.set('archived', '1');
                const data = await api(`/api/settings/academic-years?${params.toString()}`);
                renderAcademicYears(data);
            }
        } catch (e) {
            errorEl.textContent = e.message;
        }
    }

    function renderCourses(courses) {
        const tbody = rootEl.querySelector('#st-body-courses');
        tbody.innerHTML = '';
        if (!courses.length) {
            tbody.appendChild(h('tr', {}, [h('td', { colspan: 4, text: 'No courses found' })]));
            return;
        }
        courses.forEach(course => {
            const tr = h('tr', {}, [
                h('td', { text: course.course_name }),
                h('td', { text: course.department?.department_name || course.department_name || course.department_id || '' }),
                h('td', {}, [h('span', { class: 'st-pill st-small', text: course.archived_at ? 'Archived' : 'Active' })]),
                h('td', {}, [
                    h('button', { class: 'st-btn st-small', 'data-action': 'edit', 'data-id': course.course_id }, 'Edit'),
                    h('span', { text: ' ' }),
                    showingArchived.courses 
                        ? h('button', { class: 'st-btn st-small', style: 'background:#4caf50', 'data-action': 'restore', 'data-id': course.course_id }, 'Restore')
                        : h('button', { class: 'st-btn st-small', style: 'background:#d32f2f', 'data-action': 'archive', 'data-id': course.course_id }, 'Archive')
                ])
            ]);
            tbody.appendChild(tr);
        });
        setupTableEvents('courses', courses);
    }

    function renderDepartments(departments) {
        const tbody = rootEl.querySelector('#st-body-departments');
        tbody.innerHTML = '';
        if (!departments.length) {
            tbody.appendChild(h('tr', {}, [h('td', { colspan: 3, text: 'No departments found' })]));
            return;
        }
        departments.forEach(dept => {
            const tr = h('tr', {}, [
                h('td', { text: dept.department_name }),
                h('td', {}, [h('span', { class: 'st-pill st-small', text: dept.deleted_at ? 'Archived' : 'Active' })]),
                h('td', {}, [
                    h('button', { class: 'st-btn st-small', 'data-action': 'edit', 'data-id': dept.department_id }, 'Edit'),
                    h('span', { text: ' ' }),
                    showingArchived.departments 
                        ? h('button', { class: 'st-btn st-small', style: 'background:#4caf50', 'data-action': 'restore', 'data-id': dept.department_id }, 'Restore')
                        : h('button', { class: 'st-btn st-small', style: 'background:#d32f2f', 'data-action': 'archive', 'data-id': dept.department_id }, 'Archive')
                ])
            ]);
            tbody.appendChild(tr);
        });
        setupTableEvents('departments', departments);
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
                h('td', { text: year.school_year }),
                h('td', {}, [h('span', { class: 'st-pill st-small', text: year.archived_at ? 'Archived' : 'Active' })]),
                h('td', {}, [
                    h('button', { class: 'st-btn st-small', 'data-action': 'edit', 'data-id': year.academic_year_id }, 'Edit'),
                    h('span', { text: ' ' }),
                    showingArchived['academic-years'] 
                        ? h('button', { class: 'st-btn st-small', style: 'background:#4caf50', 'data-action': 'restore', 'data-id': year.academic_year_id }, 'Restore')
                        : h('button', { class: 'st-btn st-small', style: 'background:#d32f2f', 'data-action': 'archive', 'data-id': year.academic_year_id }, 'Archive')
                ])
            ]);
            tbody.appendChild(tr);
        });
        setupTableEvents('academic-years', years);
    }

    function setupTableEvents(type, items) {
        const tbody = rootEl.querySelector(`#st-body-${type}`);
        tbody.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'edit') {
                const id = e.target.dataset.id;
                const item = items.find(i => (i[`${type.replace('-', '_')}_id`] || i.id) == id);
                if (item) openModal(type.replace('-', '-'), item);
            } else if (e.target.dataset.action === 'archive') {
                const id = e.target.dataset.id;
                if (confirm('Archive this item?')) {
                    archiveItem(type, id);
                }
            } else if (e.target.dataset.action === 'restore') {
                const id = e.target.dataset.id;
                if (confirm('Restore this item?')) {
                    restoreItem(type, id);
                }
            }
        });
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
