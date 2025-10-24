// Merged Reports UI: choose type (Student/Faculty), search, pick a person, view details, export CSV
import notify from './notify';

export function mountReport(rootEl) {
    if (!rootEl) throw new Error('mountReport: root element is required');
    rootEl.innerHTML = `
        <style>
        .r-wrap{padding:20px;color:#fff;font-family:Arial,Helvetica,sans-serif}
        .r-card{background:#1b1b1b;padding:18px;border-radius:8px}
        .r-controls{display:flex;gap:8px;align-items:center;margin-bottom:12px}
        .r-input{padding:10px 12px;border-radius:6px;border:1px solid #444;background:#222;color:#fff}
        .r-btn{padding:10px 12px;border-radius:6px;border:none;background:#2d6cdf;color:#fff;cursor:pointer}
        .r-list{max-height:320px;overflow:auto;border:1px solid #262626;padding:8px;border-radius:6px}
        .r-item{padding:8px;border-bottom:1px solid #1f1f1f;cursor:pointer}
        .r-item:last-child{border-bottom:none}
        .r-item:hover{background:#232323}
        .r-details{margin-top:12px}
        </style>
        <div class="r-wrap">
            <h2 style="margin:0 0 12px;font-size:22px">Reports</h2>
            <div class="r-card">
                <div class="r-controls" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
                    <div style="display:flex;align-items:center;gap:8px">
                        <strong style="min-width:60px">Student</strong>
                        <select id="r-course" class="r-input" style="min-width:200px"><option value="">All Courses</option></select>
                        <button id="r-search-student" class="r-btn">Generate Student</button>
                        <button id="r-export-student" class="r-btn" style="background:#4caf50;margin-left:6px">Export Student</button>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px">
                        <strong style="min-width:60px">Faculty</strong>
                        <select id="r-department" class="r-input" style="min-width:200px"><option value="">All Departments</option></select>
                        <button id="r-search-faculty" class="r-btn">Generate Faculty</button>
                        <button id="r-export-faculty" class="r-btn" style="background:#4caf50;margin-left:6px">Export Faculty</button>
                    </div>
                </div>
                <div style="display:flex;gap:12px">
                    <div style="flex:1">
                        <div id="r-results" class="r-list">No results yet</div>
                    </div>
                    <div style="flex:1">
                        <div id="r-person-details" class="r-details"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const el = rootEl;
    const deptEl = el.querySelector('#r-department');
    const courseEl = el.querySelector('#r-course');
    const searchStudentBtn = el.querySelector('#r-search-student');
    const searchFacultyBtn = el.querySelector('#r-search-faculty');
    const exportStudentBtn = el.querySelector('#r-export-student');
    const exportFacultyBtn = el.querySelector('#r-export-faculty');
    const resultsEl = el.querySelector('#r-results');
    const detailsEl = el.querySelector('#r-person-details');

    let lastRows = [];
    let selected = null;

    async function apiGet(path) {
        const token = window.localStorage.getItem('academix_token');
        const headers = { 'Accept': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) };
        const res = await fetch(path, { headers });
        if (res.status === 401) { window.location.href = '/'; return null; }
        return res.json().catch(()=>({}));
    }

    // CSV export: downloads the currently filtered rows stored in `lastRows` as report_results.csv

    async function doSearch(type) {
        const params = new URLSearchParams();
        params.set('type', type);
        if (type === 'student') {
            const course = courseEl.value; if (course) params.set('course_id', course);
        } else {
            const dept = deptEl.value; if (dept) params.set('department_id', dept);
        }
        resultsEl.innerHTML = 'Loading...';
        try {
            const json = await apiGet('/api/reports/search?'+params.toString());
            const rows = (json && json.data) || [];
            lastRows = rows;
            renderResults(rows, type);
            // if generate produced exactly one person, auto-select and show details
            if (rows.length === 1) {
                const r = rows[0];
                const id = (type === 'student') ? (r.student_id || r.id) : (r.faculty_id || r.id);
                // small delay to ensure list rendered
                setTimeout(()=> selectPerson(type, id), 60);
            }
        } catch(e){ notify('Filter failed','Reports','error'); resultsEl.innerHTML = 'Failed'; }
    }

    function exportResultsForType(desiredType) {
        if (!lastRows || !lastRows.length) { notify('No rows to export','Reports','info'); return; }
        const rows = lastRows.filter(r => {
            // determine type of row (student rows will have student_id or course)
            const isStudent = Boolean(r.student_id || r.course_id || r.academicYear || r.academic_year_id);
            return desiredType === 'student' ? isStudent : !isStudent;
        });
        if (!rows.length) { notify('No rows of selected type to export','Reports','info'); return; }
        const type = desiredType;
        // build CSV rows
        let headers = [];
        let mapRow = r => ({});
        if (type === 'student') {
            headers = ['Student ID','First Name','Last Name','Email','Department','Course','Year Level','Academic Year'];
            mapRow = r => ({
                'Student ID': r.student_id || r.id || '',
                'First Name': r.f_name || r.first_name || '',
                'Last Name': r.l_name || r.last_name || '',
                'Email': r.email_address || r.email || '',
                'Department': (r.department && (r.department.department_name || r.department.name)) || r.department_name || '',
                'Course': (r.course && (r.course.course_name || r.course.name)) || r.course_name || '',
                'Year Level': r.year_level || '',
                'Academic Year': (r.academicYear && r.academicYear.year) || ''
            });
        } else {
            headers = ['Faculty ID','First Name','Last Name','Email','Department'];
            mapRow = r => ({
                'Faculty ID': r.faculty_id || r.id || '',
                'First Name': r.f_name || r.first_name || '',
                'Last Name': r.l_name || r.last_name || '',
                'Email': r.email_address || r.email || '',
                'Department': (r.department && (r.department.department_name || r.department.name)) || r.department_name || ''
            });
        }

        // build CSV string
        const escape = v => '"' + String(v === null || v === undefined ? '' : v).replace(/"/g, '""') + '"';
        const csvLines = [];
        csvLines.push(headers.map(h => escape(h)).join(','));
        rows.forEach(r => {
            const mapped = mapRow(r);
            const line = headers.map(h => escape(mapped[h]));
            csvLines.push(line.join(','));
        });
        const csv = csvLines.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
    a.download = (type === 'student') ? 'student_results.csv' : 'faculty_results.csv';
        document.body.appendChild(a);
        a.click();
        setTimeout(()=>{ URL.revokeObjectURL(url); document.body.removeChild(a); }, 500);
        notify('Export started','Reports','success');
    }
    function exportStudent() { exportResultsForType('student'); }
    function exportFaculty() { exportResultsForType('faculty'); }

    function renderResults(rows, type) {
        if (!rows || !rows.length) { resultsEl.innerHTML = '<div style="color:#aaa;padding:8px">No results</div>'; return; }
        resultsEl.innerHTML = '';
        rows.forEach(r => {
            const name = ((r.f_name||'') + ' ' + (r.l_name||'')).trim() || r.name || 'Unknown';
            const elItem = document.createElement('div');
            elItem.className = 'r-item';
            elItem.textContent = name + (type === 'student' ? (' — ' + (r.course?.course_name||r.course_name||'')) : (' — ' + (r.department?.department_name||r.department_name||'')));
            elItem.dataset.id = (type === 'student' ? (r.student_id || r.id) : (r.faculty_id || r.id));
            elItem.addEventListener('click', ()=> selectPerson(type, elItem.dataset.id));
            resultsEl.appendChild(elItem);
        });
    }

    async function selectPerson(type, id) {
        selected = null; detailsEl.innerHTML = 'Loading...';
        try {
            const json = await apiGet('/api/reports/person?type='+encodeURIComponent(type)+'&id='+encodeURIComponent(id));
            const row = json && json.data;
            if (!row) { detailsEl.innerHTML = '<div style="color:#ccc">Person not found or archived</div>'; return; }
            selected = { type, row };
            renderDetails(selected);
        } catch(e){ notify('Failed to load details','Reports','error'); detailsEl.innerHTML = 'Failed to load'; }
    }

    function renderDetails(sel) {
        const r = sel.row;
        if (sel.type === 'faculty') {
            detailsEl.innerHTML = `
                <div style="font-weight:700">${(r.f_name||'')+' '+(r.l_name||'')}</div>
                <div class="muted">${r.email_address||''}</div>
                <div style="margin-top:8px">Department: ${r.department?.department_name||r.department_name||''}</div>
            `;
            return;
        }
        detailsEl.innerHTML = `
            <div style="font-weight:700">${(r.f_name||'')+' '+(r.l_name||'')}</div>
            <div class="muted">${r.email_address||''}</div>
            <div style="margin-top:8px">Course: ${r.course?.course_name||r.course_name||''}</div>
            <div>Year Level: ${r.year_level||''}</div>
            <div>Academic Year: ${r.academicYear?.year || ''}</div>
        `;
    }

    if (searchStudentBtn) searchStudentBtn.addEventListener('click', ()=> doSearch('student'));
    if (searchFacultyBtn) searchFacultyBtn.addEventListener('click', ()=> doSearch('faculty'));
    if (exportStudentBtn) exportStudentBtn.addEventListener('click', exportStudent);
    if (exportFacultyBtn) exportFacultyBtn.addEventListener('click', exportFaculty);

    // load departments and courses
    async function loadOptions(){
        try {
            const deps = await apiGet('/api/settings/departments');
            const courses = await apiGet('/api/settings/courses');
            const dlist = (deps && Array.isArray(deps) ? deps : (deps && deps.data ? deps.data : []));
            const clist = (courses && Array.isArray(courses) ? courses : (courses && courses.data ? courses.data : []));
            deptEl.innerHTML = '<option value="">All Departments</option>' + dlist.map(d=>`<option value="${d.department_id||d.id}">${d.department_name||d.name||''}</option>`).join('');
            courseEl.innerHTML = '<option value="">All Courses</option>' + clist.map(c=>`<option value="${c.course_id||c.id}" data-dept="${c.department_id}">${c.course_name||c.name||''}</option>`).join('');
            // filter course list when department changes (affects student view only if you want)
            deptEl.addEventListener('change', ()=>{
                const val = deptEl.value;
                const opts = Array.from(courseEl.querySelectorAll('option'));
                courseEl.innerHTML = '';
                courseEl.appendChild(new Option('All Courses',''));
                opts.slice(1).forEach(o=>{ if (!val || String(o.getAttribute('data-dept')) === String(val)) courseEl.appendChild(o.cloneNode(true)); });
            });
        } catch(e){ console.warn('Failed to load options', e); }
    }

    loadOptions();

    // CSV export button removed

}

export default mountReport;
