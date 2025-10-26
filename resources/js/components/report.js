// report.js
// Report management UI (vanilla JS) - Admin only
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

export function mountReport(rootEl) {
    if (!rootEl) throw new Error('mountReport: root element is required');

    // Full UI template (same structure as settings)
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
        </style>
        <div class="st-wrap">
            <div class="st-topbar">
                <h2 class="st-title">Reports</h2>
            </div>
            <div class="st-search">
                <input id="st-search" class="st-input" placeholder="SEARCH" style="width:200px" />
            </div>
            <div class="st-tabs">
                <button class="st-tab active" data-tab="students">Students</button>
                <button class="st-tab" data-tab="faculty">Faculty</button>
            </div>
            <div class="st-content">
                <div id="st-students" class="st-tab-content">
                    <div class="st-actions">
                        <label style="color:#ddd;font-size:14px;margin-right:8px">Filter by Course:</label>
                        <select id="st-course-filter" class="st-input" style="width:250px">
                            <option value="">All Courses</option>
                        </select>
                        <button id="st-generate-students" class="st-btn">Generate Report</button>
                    </div>
                    <div id="st-error-students" class="st-error"></div>
                    <table class="st-table">
                        <thead>
                            <tr><th>Student ID</th><th>Name</th><th>Course</th><th>Department</th><th>Year Level</th><th>Email</th><th>Phone</th></tr>
                        </thead>
                        <tbody id="st-body-students"><tr><td colspan="7" class="st-small">Click "Generate Report" to load data</td></tr></tbody>
                    </table>
                </div>
                <div id="st-faculty" class="st-tab-content" style="display:none">
                    <div class="st-actions">
                        <label style="color:#ddd;font-size:14px;margin-right:8px">Filter by Department:</label>
                        <select id="st-department-filter" class="st-input" style="width:250px">
                            <option value="">All Departments</option>
                        </select>
                        <button id="st-generate-faculty" class="st-btn">Generate Report</button>
                    </div>
                    <div id="st-error-faculty" class="st-error"></div>
                    <table class="st-table">
                        <thead>
                            <tr><th>Faculty ID</th><th>Name</th><th>Department</th><th>Position</th><th>Email</th><th>Phone</th></tr>
                        </thead>
                        <tbody id="st-body-faculty"><tr><td colspan="6" class="st-small">Click "Generate Report" to load data</td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // State
    let currentTab = 'students';
    let courses = [];
    let departments = [];
    let allStudents = [];
    let allFaculty = [];
    const searchEl = rootEl.querySelector('#st-search');

    // Tab switching
    rootEl.querySelectorAll('.st-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
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
        // Clear search when switching tabs
        searchEl.value = '';
    }
    
    // Search functionality
    searchEl.addEventListener('input', () => {
        filterAndRender();
    });
    searchEl.addEventListener('keypress', e => {
        if (e.key === 'Enter') filterAndRender();
    });

    // Load courses and departments for filters
    async function loadFilters() {
        try {
            // Load courses
            courses = await api('/api/reports/courses');
            const courseSelect = rootEl.querySelector('#st-course-filter');
            courseSelect.innerHTML = '<option value="">All Courses</option>' +
                courses.map(c => `<option value="${c.course_id}">${c.course_name} (${c.department?.department_name || 'N/A'})</option>`).join('');

            // Load departments
            departments = await api('/api/reports/departments');
            const deptSelect = rootEl.querySelector('#st-department-filter');
            deptSelect.innerHTML = '<option value="">All Departments</option>' +
                departments.map(d => `<option value="${d.department_id}">${d.department_name}</option>`).join('');
        } catch (e) {
            console.error('Failed to load filters:', e);
        }
    }

    // Load Students Report
    async function loadStudents() {
        const errorEl = rootEl.querySelector('#st-error-students');
        const tbody = rootEl.querySelector('#st-body-students');
        errorEl.textContent = '';
        tbody.innerHTML = '<tr><td colspan="7" class="st-small">Loading…</td></tr>';

        try {
            const courseId = rootEl.querySelector('#st-course-filter').value;
            const params = new URLSearchParams();
            if (courseId) params.set('course_id', courseId);
            
            const data = await api(`/api/reports/students?${params.toString()}`);
            allStudents = Array.isArray(data) ? data : [];
            filterAndRender();
        } catch (e) {
            errorEl.textContent = e.message;
            tbody.innerHTML = '<tr><td colspan="7" class="st-small">Failed to load data</td></tr>';
        }
    }

    // Load Faculty Report
    async function loadFaculty() {
        const errorEl = rootEl.querySelector('#st-error-faculty');
        const tbody = rootEl.querySelector('#st-body-faculty');
        errorEl.textContent = '';
        tbody.innerHTML = '<tr><td colspan="6" class="st-small">Loading…</td></tr>';

        try {
            const deptId = rootEl.querySelector('#st-department-filter').value;
            const params = new URLSearchParams();
            if (deptId) params.set('department_id', deptId);
            
            const data = await api(`/api/reports/faculty?${params.toString()}`);
            allFaculty = Array.isArray(data) ? data : [];
            filterAndRender();
        } catch (e) {
            errorEl.textContent = e.message;
            tbody.innerHTML = '<tr><td colspan="6" class="st-small">Failed to load data</td></tr>';
        }
    }

    // Generate Students Report button
    rootEl.querySelector('#st-generate-students').addEventListener('click', loadStudents);

    // Generate Faculty Report button
    rootEl.querySelector('#st-generate-faculty').addEventListener('click', loadFaculty);

    // Filter change listeners - do not auto-generate; user must click Generate

    // Render Students
    function renderStudents(students) {
        const tbody = rootEl.querySelector('#st-body-students');
        tbody.innerHTML = '';
        
        if (!students.length) {
            tbody.appendChild(h('tr', {}, [h('td', { colspan: 7, text: 'No students found' })]));
            return;
        }

        students.forEach(student => {
            const fullName = [student.f_name, student.m_name, student.l_name, student.suffix]
                .filter(Boolean).join(' ');
            const courseName = student.course?.course_name || 'N/A';
            const deptName = student.department?.department_name || 'N/A';
            
            const tr = h('tr', {}, [
                h('td', { text: student.student_id || 'N/A' }),
                h('td', { text: fullName }),
                h('td', { text: courseName }),
                h('td', { text: deptName }),
                h('td', { text: student.year_level || 'N/A' }),
                h('td', { text: student.email_address || 'N/A' }),
                h('td', { text: student.phone_number || 'N/A' })
            ]);
            tbody.appendChild(tr);
        });
    }

    // Render Faculty
    function renderFaculty(faculty) {
        const tbody = rootEl.querySelector('#st-body-faculty');
        tbody.innerHTML = '';
        
        if (!faculty.length) {
            tbody.appendChild(h('tr', {}, [h('td', { colspan: 6, text: 'No faculty found' })]));
            return;
        }

        faculty.forEach(fac => {
            const fullName = [fac.f_name, fac.m_name, fac.l_name, fac.suffix]
                .filter(Boolean).join(' ');
            const deptName = fac.department?.department_name || 'N/A';
            
            const tr = h('tr', {}, [
                h('td', { text: fac.faculty_id || 'N/A' }),
                h('td', { text: fullName }),
                h('td', { text: deptName }),
                h('td', { text: fac.position || 'N/A' }),
                h('td', { text: fac.email_address || 'N/A' }),
                h('td', { text: fac.phone_number || 'N/A' })
            ]);
            tbody.appendChild(tr);
        });
    }

    // Filter and render based on search
    function filterAndRender() {
        const searchTerm = searchEl.value.trim().toLowerCase();
        
        if (currentTab === 'students') {
            let filtered = allStudents;
            if (searchTerm) {
                filtered = filtered.filter(s => {
                    const fullName = [s.f_name, s.m_name, s.l_name, s.suffix].filter(Boolean).join(' ').toLowerCase();
                    const courseName = (s.course?.course_name || '').toLowerCase();
                    const deptName = (s.department?.department_name || '').toLowerCase();
                    const email = (s.email_address || '').toLowerCase();
                    const phone = (s.phone_number || '').toLowerCase();
                    
                    return fullName.includes(searchTerm) || 
                           courseName.includes(searchTerm) || 
                           deptName.includes(searchTerm) ||
                           email.includes(searchTerm) ||
                           phone.includes(searchTerm);
                });
            }
            renderStudents(filtered);
        } else if (currentTab === 'faculty') {
            let filtered = allFaculty;
            if (searchTerm) {
                filtered = filtered.filter(f => {
                    const fullName = [f.f_name, f.m_name, f.l_name, f.suffix].filter(Boolean).join(' ').toLowerCase();
                    const deptName = (f.department?.department_name || '').toLowerCase();
                    const position = (f.position || '').toLowerCase();
                    const email = (f.email_address || '').toLowerCase();
                    const phone = (f.phone_number || '').toLowerCase();
                    
                    return fullName.includes(searchTerm) || 
                           deptName.includes(searchTerm) ||
                           position.includes(searchTerm) ||
                           email.includes(searchTerm) ||
                           phone.includes(searchTerm);
                });
            }
            renderFaculty(filtered);
        }
    }
    
    // Initial load of filters only; do not auto-generate any report
    async function initialize() {
        await loadFilters();
    }
    
    initialize();
}