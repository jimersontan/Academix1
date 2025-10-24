// Merged Reports UI: choose type (Student/Faculty), search, pick a person, view details, export CSV
import notify from './notify';
import JSZip from 'jszip';

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
    .r-item{padding:8px;border-bottom:1px solid #1f1f1f;cursor:pointer;display:flex;align-items:center;justify-content:space-between}
    .r-item:last-child{border-bottom:none}
    .r-item:hover{background:#232323}
    .r-details{margin-top:12px}
    /* New badge and highlight for recently added rows */
    .r-item.new{background:linear-gradient(90deg, rgba(26,103,50,0.12), rgba(26,103,50,0.04));box-shadow:inset 0 0 0 1px rgba(26,103,50,0.06)}
    .r-new-badge{background:#1db954;color:#fff;padding:2px 6px;border-radius:10px;font-size:11px;margin-left:8px}
    table tr.selected{background:linear-gradient(90deg, rgba(26,103,50,0.12), rgba(26,103,50,0.04));}
    </style>
        <div class="r-wrap">
            <h2 style="margin:0 0 12px;font-size:22px">Reports</h2>
            <div class="r-card">
                <div class="r-controls" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
                    <div style="display:flex;align-items:center;gap:8px">
                        <strong style="min-width:60px">Type</strong>
                        <select id="r-type" class="r-input" style="min-width:140px"><option value="student">Student</option><option value="faculty">Faculty</option></select>
                        <select id="r-course" class="r-input" style="min-width:200px"><option value="">All Courses</option></select>
                        <select id="r-department" class="r-input" style="min-width:200px;display:none"><option value="">All Departments</option></select>
                        <button id="r-generate" class="r-btn">Generate Report</button>
                        <button id="r-export" class="r-btn" style="background:#4caf50;margin-left:6px">Export</button>
                        <button id="r-import" class="r-btn" style="background:#6c757d;margin-left:6px">Import</button>
                    </div>
                </div>
                <div>
                    <div id="r-results" class="r-list">No results yet</div>
                </div>
            </div>
        </div>
    `;

    const el = rootEl;
    const deptEl = el.querySelector('#r-department');
    const courseEl = el.querySelector('#r-course');
    const typeEl = el.querySelector('#r-type');
    const generateBtn = el.querySelector('#r-generate');
    const exportBtn = el.querySelector('#r-export');
    const resultsEl = el.querySelector('#r-results');
    const detailsEl = el.querySelector('#r-person-details');

    let lastRows = [];
    let selected = null;
    // debug mode: when ?debug=1 is present in URL, use debug endpoint to load sample data
    const DEBUG_MODE = (typeof window !== 'undefined') && (new URLSearchParams(window.location.search).get('debug') === '1');
    // track recently-created IDs so server-fetched results can still show a NEW badge
    const RECENT_NEW_TTL = 15000; // ms to consider a created record as "new"
    const recentCreated = { student: new Map(), faculty: new Map() };

    // Listen for newly created students/faculty so Reports UI can show them immediately
    window.addEventListener('student:created', (e) => {
        try {
            const created = e && e.detail;
            if (!created) return;
            // if current view is student, prepend to results and re-render
            if (typeEl && typeEl.value === 'student') {
                // mark it as new so renderResults can show a badge/highlight
                created._isNew = true;
                // remember id and timestamp so later Generate (server fetch) can mark it too
                try { recentCreated.student.set(String(created.student_id || created.id), Date.now()); } catch(e){}
                lastRows = [created].concat(lastRows || []);
                renderResults(lastRows, 'student');
                // clear the new flag after a short delay and re-render to remove highlight
                setTimeout(()=>{
                    // find the item in lastRows and clear flag
                    const idx = lastRows.findIndex(rr => (rr.student_id || rr.id) === (created.student_id || created.id));
                    if (idx !== -1) {
                        lastRows[idx]._isNew = false;
                        renderResults(lastRows, 'student');
                    }
                    // also clear the recentCreated map entry
                    try { recentCreated.student.delete(String(created.student_id || created.id)); } catch(e){}
                }, 7000);
            }
        } catch(err){ /* ignore */ }
    });
    window.addEventListener('faculty:created', (e) => {
        try {
            const created = e && e.detail;
            if (!created) return;
            if (typeEl && typeEl.value === 'faculty') {
                created._isNew = true;
                try { recentCreated.faculty.set(String(created.faculty_id || created.id), Date.now()); } catch(e){}
                lastRows = [created].concat(lastRows || []);
                renderResults(lastRows, 'faculty');
                setTimeout(()=>{
                    const idx = lastRows.findIndex(rr => (rr.faculty_id || rr.id) === (created.faculty_id || created.id));
                    if (idx !== -1) {
                        lastRows[idx]._isNew = false;
                        renderResults(lastRows, 'faculty');
                    }
                    try { recentCreated.faculty.delete(String(created.faculty_id || created.id)); } catch(e){}
                }, 7000);
            }
        } catch(err){ /* ignore */ }
    });

    async function apiGet(path) {
        try {
            const token = window.localStorage.getItem('academix_token');
            const headers = { 'Accept': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) };
            const url = (path.startsWith('http') ? path : (window.location.origin + path));
            const res = await fetch(url, { headers, credentials: 'same-origin' });
            if (res.status === 401) {
                // unauthenticated - redirect to login
                notify('Session expired. Redirecting to login...','Reports','error');
                window.location.href = '/';
                return null;
            }
            if (!res.ok) {
                const txt = await res.text().catch(()=>`HTTP ${res.status}`);
                console.warn('apiGet bad response', url, res.status, txt);
                notify(`API error: ${res.status} - ${String(txt).slice(0,200)}`,'Reports','error');
                return null;
            }
            // parse JSON; on parse error return null
            try {
                return await res.json();
            } catch(parseErr){
                console.error('apiGet JSON parse error', parseErr);
                notify('Invalid JSON response from server','Reports','error');
                return null;
            }
        } catch(err) {
            console.error('apiGet network error', err);
            notify('Network error: could not reach API','Reports','error');
            return null;
        }
    }

    // POST helper for uploads and actions
    async function apiPost(path, body) {
        try {
            const token = window.localStorage.getItem('academix_token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const url = (path.startsWith('http') ? path : (window.location.origin + path));
            const res = await fetch(url, { method: 'POST', body, headers, credentials: 'same-origin' });
            if (res.status === 401) {
                notify('Session expired. Redirecting to login...','Reports','error');
                window.location.href = '/';
                return null;
            }
            if (!res.ok) {
                const txt = await res.text().catch(()=>`HTTP ${res.status}`);
                console.warn('apiPost bad response', url, res.status, txt);
                notify(`API error: ${res.status} - ${String(txt).slice(0,200)}`,'Reports','error');
                return null;
            }
            try {
                return await res.json();
            } catch(parseErr){
                console.error('apiPost JSON parse error', parseErr);
                notify('Invalid JSON response from server','Reports','error');
                return null;
            }
        } catch(err) {
            console.error('apiPost network error', err);
            notify('Network error: could not reach API','Reports','error');
            return null;
        }
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
            let rows = [];
            if (DEBUG_MODE) {
                // fetch sample data and pick the right type
                const sample = await apiGet('/api/reports/debug-sample');
                if (!sample || !sample.data) {
                    resultsEl.innerHTML = '<div style="color:#f88;padding:8px">Failed to load debug sample data.</div>';
                    return;
                }
                if (type === 'student') rows = sample.data.students || [];
                else rows = sample.data.faculty || [];
            } else {
                const json = await apiGet('/api/reports/search?'+params.toString());
                if (!json) {
                    // apiGet already notified user. Show friendly UI message.
                    resultsEl.innerHTML = '<div style="color:#f88;padding:8px">Failed to fetch report results. Check your session or network.</div>';
                    return;
                }
                rows = (json && json.data) || [];
            }
            // if any of the fetched rows match recently-created IDs, mark them as new
            try {
                const now = Date.now();
                rows = rows.map(r => {
                    const id = (type === 'student') ? (r.student_id || r.id) : (r.faculty_id || r.id);
                    const key = String(id);
                    const ts = recentCreated[type] && recentCreated[type].get(key);
                    if (ts && (now - ts) < RECENT_NEW_TTL) {
                        r._isNew = true;
                        const remaining = Math.max(0, RECENT_NEW_TTL - (now - ts));
                        setTimeout(() => {
                            try { recentCreated[type].delete(key); } catch(e){}
                            const idx = lastRows.findIndex(rr => ((type === 'student') ? (rr.student_id || rr.id) : (rr.faculty_id || rr.id)) == id);
                            if (idx !== -1) { lastRows[idx]._isNew = false; renderResults(lastRows, type); }
                        }, remaining);
                    }
                    return r;
                });
            } catch(e) { /* ignore */ }
            lastRows = rows;
            renderResults(rows, type);
            // auto-select the first result so full details load into the details pane
            if (rows.length >= 1) {
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
        // Build a Word-compatible HTML document (saved as .doc). This will open in MS Word
        // and display a simple bordered table with columns: Full Name, Course, Email, Position, Department
        const escapeHtml = v => String(v === null || v === undefined ? '' : v)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Choose columns per type exactly as requested by user
        const cols = (type === 'student')
            ? ['Student ID','Name','Sex','Department','Course','Academic Year','Year Level','Status']
            : ['Faculty ID','Name','Sex','Department','Position'];

        const rowsHtml = rows.map(r => {
            const studentId = escapeHtml(r.student_id || r.student_number || r.id || '');
            const facultyId = escapeHtml(r.faculty_id || r.faculty_number || r.id || '');
            // prefer consolidated `name` field if present (name-only); otherwise fall back to first+last
            const nameOnly = escapeHtml((r.name && String(r.name).trim()) || (((r.f_name||'') + ' ' + (r.l_name||'')).trim()) || '');
            const sex = escapeHtml(r.sex || r.gender || '');
            const department = escapeHtml((r.department && (r.department.department_name||r.department.name)) || r.department_name || '');
            const course = escapeHtml((r.course && (r.course.course_name||r.course.name)) || r.course_name || '');
            const academicYear = escapeHtml((r.academicYear && (r.academicYear.year || r.academicYear.name)) || r.academic_year || '');
            const yearLevel = escapeHtml(r.year_level || r.year || '');
            const status = escapeHtml(r.status || r.record_status || '');
            const position = escapeHtml(r.position || '');
            const cells = (type === 'student')
                ? [studentId, nameOnly, sex, department, course, academicYear, yearLevel, status]
                : [facultyId, nameOnly, sex, department, position];
            return `<tr>${cells.map(c=>`<td style="border:1px solid #000;padding:6px">${c}</td>`).join('')}</tr>`;
        }).join('\n');

    const tableHeader = `<tr>${cols.map(c=>`<th style="border:1px solid #000;padding:6px;background:#eee">${c}</th>`).join('')}</tr>`;
        const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Report</title></head><body>`+
            `<h2>${type === 'student' ? 'Student' : 'Faculty'} Report</h2>`+
            `<table style="border-collapse:collapse;width:100%">${tableHeader}${rowsHtml}</table>`+
            `</body></html>`;

                // Build a simple .docx package using JSZip. This is a minimal WordprocessingML package
                // that contains a document.xml with a table. It will open in Word and show the table.
                try {
                        const zip = new JSZip();

                        // [Content_Types].xml
                        const contentTypes = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;
                        zip.file('[Content_Types].xml', contentTypes);

                        // _rels/.rels
                        const rels = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="/word/document.xml"/>
</Relationships>`;
                        zip.folder('_rels').file('.rels', rels);

                        // word/_rels/document.xml.rels (empty, no media)
                        zip.folder('word').folder('_rels').file('document.xml.rels', `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`);

                                                                        // Build table rows as WordprocessingML with header styling and column widths
                                                                        const escapeXml = s => String(s === null || s === undefined ? '' : s)
                                                                                .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                                                                        const wp = (text) => `<w:p xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:r><w:t>${escapeXml(text)}</w:t></w:r></w:p>`;
                                                                        // column widths in dxa (twips) - tuned per type and number of columns
                                                                        const colWidths = (type === 'student')
                                                                            ? [1800, 6000, 1200, 3600, 3600, 2400, 1800, 1800]
                                                                            : [1800, 6000, 1200, 3600, 3000];
                                                                        // cell builders with basic styling: header cells have shading and centered text
                                                                        const makeCell = (text, width) => `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/></w:tcPr><w:p xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:pPr><w:jc w:val="left"/></w:pPr><w:r><w:t>${escapeXml(text)}</w:t></w:r></w:p></w:tc>`;
                                                                        const makeHeaderCell = (text, width) => `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/><w:shd w:val="clear" w:fill="D9E1F2"/></w:tcPr><w:p xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>${escapeXml(text)}</w:t></w:r></w:p></w:tc>`;
                                                                        const th = cols.map((c,i) => makeHeaderCell(c, colWidths[i] || 2400)).join('');
                                                                        const trs = rows.map(r => {
                                                                                        const studentId = (r.student_id || r.student_number || r.id || '');
                                                                                        const facultyId = (r.faculty_id || r.faculty_number || r.id || '');
                                                                                        const fullName = (((r.f_name||'') + (r.m_name?(' '+r.m_name):'') + ' ' + (r.l_name||'') + (r.suffix?(' '+r.suffix):'')).trim() || r.name || '');
                                                                                        const sex = r.sex || r.gender || '';
                                                                                        const department = (r.department && (r.department.department_name||r.department.name)) || r.department_name || '';
                                                                                        const course = (r.course && (r.course.course_name||r.course.name)) || r.course_name || '';
                                                                                        const academicYear = (r.academicYear && (r.academicYear.year || r.academicYear.name)) || r.academic_year || '';
                                                                                        const yearLevel = r.year_level || r.year || '';
                                                                                        const status = r.status || r.record_status || '';
                                                                                        const position = r.position || '';
                                                                                        const cells = (type === 'student')
                                                                                            ? [studentId, fullName, sex, department, course, academicYear, yearLevel, status]
                                                                                            : [facultyId, fullName, sex, department, position];
                                                                                        return `<w:tr>${cells.map((c,i)=>makeCell(c, colWidths[i] || 2400)).join('')}</w:tr>`;
                                                                        }).join('');

                                                                        // document.xml with table borders
                                                                        const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                        <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
                            <w:body>
                                <w:p><w:r><w:t>${type === 'student' ? 'Student Report' : 'Faculty Report'}</w:t></w:r></w:p>
                                <w:tbl>
                                    <w:tblPr>
                                        <w:tblStyle w:val="TableGrid"/>
                                        <w:tblBorders>
                                            <w:top w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                                            <w:left w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                                            <w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                                            <w:right w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                                            <w:insideH w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                                            <w:insideV w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                                        </w:tblBorders>
                                    </w:tblPr>
                                            <w:tblGrid>
                                                ${colWidths.map(w=>`<w:gridCol w:w="${w}"/>`).join('')}
                                            </w:tblGrid>
                                    <w:tr>${th}</w:tr>
                                    ${trs}
                                </w:tbl>
                                <w:sectPr/>
                            </w:body>
                        </w:document>`;
                        zip.folder('word').file('document.xml', documentXml);

                        const mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                        // include timestamp in filename for clarity
                        const pad = (n)=>String(n).padStart(2,'0');
                        const dt = new Date();
                        const ts = dt.getFullYear()+''+pad(dt.getMonth()+1)+''+pad(dt.getDate())+'_'+pad(dt.getHours())+''+pad(dt.getMinutes())+''+pad(dt.getSeconds());
                        const filename = (type === 'student') ? `student_results_${ts}.docx` : `faculty_results_${ts}.docx`;
                        zip.generateAsync({ type: 'blob' }).then(function(content){
                                const url = URL.createObjectURL(content);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = filename;
                                document.body.appendChild(a);
                                a.click();
                                setTimeout(()=>{ URL.revokeObjectURL(url); document.body.removeChild(a); }, 500);
                                notify('Export started (docx)','Reports','success');
                        }).catch(err => {
                                console.error('docx generation failed', err);
                                notify('Export failed','Reports','error');
                        });
                        return;
                } catch(err) {
                        console.error('docx export error', err);
                        notify('Export failed','Reports','error');
                }
    }
    function exportStudent() { exportResultsForType('student'); }
    function exportFaculty() { exportResultsForType('faculty'); }

    function renderResults(rows, type) {
        if (!rows || !rows.length) { resultsEl.innerHTML = '<div style="color:#aaa;padding:8px">No results</div>'; return; }
        // Build a table view for generated report results so users see full columns similar to exported docx
        resultsEl.innerHTML = '';
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.border = '1px solid #222';
        table.style.background = '#111';
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const thStyle = 'padding:8px;background:#d9e1f2;color:#000;border:1px solid #000;text-align:left;font-weight:700';
        const studentHeaders = ['Student ID','Full Name','Sex','Department','Course','Academic Year','Year Level','Status'];
        const facultyHeaders = ['Faculty ID','Full Name','Sex','Department','Position'];
        const headers = (type === 'student') ? studentHeaders : facultyHeaders;
        headers.forEach(h=>{ const th = document.createElement('th'); th.style.cssText = thStyle; th.textContent = h; headerRow.appendChild(th); });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        rows.forEach(r=>{
            const tr = document.createElement('tr');
            tr.dataset.id = (type === 'student' ? (r.student_id || r.id) : (r.faculty_id || r.id));
            tr.style.cursor = 'pointer';
            // row cells
            const getFullName = (row) => {
                // full detail: include first, middle, last, suffix when available
                const parts = [];
                if (row.f_name) parts.push(row.f_name);
                if (row.m_name) parts.push(row.m_name);
                if (row.l_name) parts.push(row.l_name);
                if (row.suffix) parts.push(row.suffix);
                const fn = parts.join(' ').trim();
                return fn || (row.name || '');
            };
            const academicYearText = (r.academicYear && (r.academicYear.year || r.academicYear.name)) || r.academic_year || '';
            const deptText = (r.department && (r.department.department_name||r.department.name)) || r.department_name || '';
            const courseText = (r.course && (r.course.course_name||r.course.name)) || r.course_name || '';
            const cells = (type === 'student')
                ? [ (r.student_id||r.id||''), getFullName(r), (r.sex||r.gender||''), deptText, courseText, academicYearText, (r.year_level||r.year||''), (r.status||r.record_status||'') ]
                : [ (r.faculty_id||r.id||''), getFullName(r), (r.sex||r.gender||''), deptText, (r.position||'') ];
            cells.forEach((c,i)=>{
                const td = document.createElement('td');
                td.style.border = '1px solid #000';
                td.style.padding = '8px';
                td.style.color = '#ddd';
                td.textContent = c;
                tr.appendChild(td);
            });
            if (r._isNew) {
                tr.style.background = 'linear-gradient(90deg, rgba(26,103,50,0.12), rgba(26,103,50,0.04))';
            }
            tr.addEventListener('click', ()=> {
                if (detailsEl) {
                    selectPerson(type, tr.dataset.id);
                } else {
                    // no details pane: toggle a simple selected highlight
                    const prev = tbody.querySelector('tr.selected');
                    if (prev) prev.classList.remove('selected');
                    tr.classList.add('selected');
                }
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        resultsEl.appendChild(table);
    }

    async function selectPerson(type, id) {
        if (!detailsEl) return; // details pane removed; nothing to do
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

    // wire unified controls
    if (typeEl) {
        // on type change, show course for student or department for faculty
        typeEl.addEventListener('change', ()=>{
            const t = typeEl.value;
            if (t === 'student') {
                courseEl.style.display = '';
                deptEl.style.display = 'none';
            } else {
                courseEl.style.display = 'none';
                deptEl.style.display = '';
            }
        });
    }
    if (generateBtn) generateBtn.addEventListener('click', ()=> doSearch(typeEl ? typeEl.value : 'student'));
    if (exportBtn) exportBtn.addEventListener('click', ()=> exportResultsForType(typeEl ? typeEl.value : 'student'));

    // Import flow: hidden file input + upload to API
    const importBtn = el.querySelector('#r-import');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    if (importBtn) {
        importBtn.addEventListener('click', ()=> fileInput.click());
    }

    fileInput.addEventListener('change', async ()=>{
        const files = fileInput.files;
        if (!files || !files.length) return;
        const file = files[0];
        const t = typeEl ? typeEl.value : 'student';
        const fd = new FormData();
        fd.append('file', file);
        fd.append('type', t);
        notify('Uploading import...','Reports','info');
        try {
            const json = await apiPost('/api/reports/import', fd);
            if (json && json.success) {
                notify('Import completed','Reports','success');
                // refresh current results
                doSearch(t);
            } else {
                notify((json && json.message) || 'Import failed','Reports','error');
            }
        } catch(err){
            console.error('Import failed', err);
            notify('Import failed: network error','Reports','error');
        } finally {
            fileInput.value = '';
        }
    });

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
