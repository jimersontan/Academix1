// Simple admin-only Dashboard
// Usage: import { mountDashboard } from './components/dashboard';
//        mountDashboard(document.getElementById('app'))

function requireToken() {
    const token = window.localStorage.getItem('academix_token');
    if (!token) {
        window.location.href = 'index.html';
        throw new Error('No token');
    }
    return token;
}

export async function fetchJson(url, options = {}) {
    const token = requireToken();
    const res = await fetch(url, {
        ...options,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...(options.headers || {})
        }
    });
    if (res.status === 401) {
        window.localStorage.removeItem('academix_token');
        window.location.href = 'index.html';
        return;
    }
    return res.json();
}

export function mountDashboard(rootEl) {
    if (!rootEl) throw new Error('mountDashboard: root element is required');

    rootEl.innerHTML = `
      <style>
        :root{
          --bg:#0c1222;          /* deep slate */
          --panel:#111827;       /* sidebar/panel */
          --surface:#0f172a;     /* main content base */
          --card:#1f2937;        /* card surface */
          --card-ink:#e5e7eb;    /* text on card */
          --ink:#e6edf3;         /* base text */
          --muted:#94a3b8;       /* muted text */
          --primary:#60a5fa;     /* accents */
          --border:rgba(148,163,184,.18);
          --shadow:0 10px 30px rgba(2,6,23,.35);
        }
        body{background:var(--bg);color:var(--ink);font-family:Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, Helvetica, sans-serif}
        .shell{min-height:100vh;display:grid;grid-template-columns:260px 1fr;background:linear-gradient(180deg, rgba(96,165,250,.06), transparent 200px)}
        .sidebar{background:var(--panel);padding:18px;border-right:1px solid var(--border)}
        .brand{display:flex;align-items:center;gap:12px;margin-bottom:22px}
        .brand img{width:40px;height:40px;border-radius:8px}
        .brand .name{font-weight:700;letter-spacing:.2px}
        .brand .sub{font-size:12px;color:var(--muted)}
        .menu a{display:block;color:var(--ink);opacity:.85;text-decoration:none;padding:10px 8px;border-radius:8px}
        .menu a:hover{background:rgba(148,163,184,.08);opacity:1}
        .content{padding:22px}
        .topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
        .topbar h2{margin:0;font-size:20px;letter-spacing:.2px}
        .cards{display:grid;grid-template-columns:repeat(auto-fit, minmax(220px,1fr));gap:16px}
        .card{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;padding:16px;box-shadow:var(--shadow)}
        .card h4{margin:0 0 10px;font-weight:700;color:var(--muted);font-size:12px;letter-spacing:.3px;text-transform:uppercase}
        .stat{font-size:28px;font-weight:800;color:var(--card-ink)}
        .list{margin-top:18px;background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;padding:16px;box-shadow:var(--shadow)}
        .list h4{margin:0 0 10px;font-size:14px;color:var(--muted);letter-spacing:.3px;text-transform:uppercase}
        .dept-item{padding:10px 0;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
        .dept-name{color:var(--ink)}
        .dept-total{color:var(--primary);font-weight:700}
        .btn{background:var(--primary);color:#0b1020;border:none;padding:8px 12px;border-radius:8px;cursor:pointer}
        @media (max-width: 900px){ .shell{grid-template-columns:1fr} .sidebar{position:sticky;top:0;z-index:10} }
      </style>
      <div class="shell">
        <aside class="sidebar">
          <div class="brand">
            <img src="https://cdn.vectorstock.com/i/500p/25/20/books-stack-logo-template-vector-27212520.jpg" alt="logo" />
            <div>
              <div class="name">Academix</div>
              <div class="sub">Student Management Portal</div>
            </div>
          </div>
          <nav class="menu">
            <a href="dashboard">Dashboard</a>
            <a href="#" id="menu-students">Students</a>
            <a href="#" id="menu-faculty">Faculty</a>
            <a href="#" id="menu-report">Report</a>
            <a href="#" id="menu-settings">Settings</a>
            <a href="#" id="menu-profile">My Profile</a>
          </nav>
        </aside>
        <main class="content" id="main">
          <div class="topbar">
            <h2 id="page-title" style="margin:0">Dashboard</h2>
          </div>
          <section class="cards">
            <div class="card">
              <h4>Total Students</h4>
              <div class="stat" id="stat-students">0</div>
            </div>
            <div class="card">
              <h4>Total Faculty</h4>
              <div class="stat" id="stat-faculty">0</div>
            </div>
            <div class="card">
              <h4>Courses Offered</h4>
              <div class="stat" id="stat-courses">0</div>
            </div>
          </section>
          <section class="list">
            <h4 style="margin:0 0 10px">Departments</h4>
            <div id="departments">Loading...</div>
          </section>
        </main>
      </div>
    `;

    const main = rootEl.querySelector('#main');
    const pageTitle = rootEl.querySelector('#page-title');

    function setTitle(t){ if (pageTitle) pageTitle.textContent = t; }

    function mountView(name){
      if (name === 'profile' && window.Academix && typeof window.Academix.mountMyProfile === 'function'){
        main.innerHTML = '';
        setTitle('My Profile');
        window.Academix.mountMyProfile(main);
        return true;
      }
      return false;
    }

    // Initialize counters from local snapshot immediately (before network)
    try {
      const snap = JSON.parse(window.localStorage.getItem('academix_stats')||'{}');
      const initStudents = Number(snap.students)||0;
      const initFaculty = Number(snap.faculty)||0;
      if (rootEl.querySelector('#stat-students')) rootEl.querySelector('#stat-students').textContent = initStudents;
      if (rootEl.querySelector('#stat-faculty')) rootEl.querySelector('#stat-faculty').textContent = initFaculty;
    } catch(_) {}

    // Helpers: update counters and notifications
    const statStudentsEl = () => rootEl.querySelector('#stat-students');
    const statFacultyEl = () => rootEl.querySelector('#stat-faculty');

    function clamp(n){ return Math.max(0, Number.isFinite(n) ? n : 0); }

    function saveStats(students, faculty){
      try { window.localStorage.setItem('academix_stats', JSON.stringify({ students, faculty })); } catch(e) {}
    }
    function readStats(){
      try { const s = JSON.parse(window.localStorage.getItem('academix_stats')||'{}'); return { students: Number(s.students)||0, faculty: Number(s.faculty)||0 }; } catch(e){ return { students:0, faculty:0 }; }
    }

    function setCounters({students, faculty}){
      if (statStudentsEl()) statStudentsEl().textContent = clamp(students);
      if (statFacultyEl()) statFacultyEl().textContent = clamp(faculty);
      saveStats(clamp(students), clamp(faculty));
    }

    function adjustCounter(kind, delta){
      const curr = readStats();
      if (kind === 'student') curr.students = clamp(curr.students + delta);
      if (kind === 'faculty') curr.faculty = clamp(curr.faculty + delta);
      setCounters(curr);
    }




    // Refetch authoritative stats from backend
    async function refreshStats(){
      try{
        const data = await fetchJson('/api/dashboard/stats');
        if (!data) return;
        const s = data.total_students ?? 0;
        const f = data.total_faculty ?? 0;
        const c = (data.total_courses ?? (Array.isArray(data.students_per_course) ? new Set(data.students_per_course.map(x=>x.course_id)).size : 0));
        if (rootEl.querySelector('#stat-students')) rootEl.querySelector('#stat-students').textContent = s;
        if (rootEl.querySelector('#stat-faculty')) rootEl.querySelector('#stat-faculty').textContent = f;
        if (rootEl.querySelector('#stat-courses')) rootEl.querySelector('#stat-courses').textContent = c;
        const dept = data.faculty_per_department || [];
        if (rootEl.querySelector('#departments')) {
          const html = dept.map(d=>`<div style="padding:6px 0;border-top:1px solid #3a3a3a">${d.department_name || 'N/A'} — ${d.total}</div>`).join('') || 'No data';
          rootEl.querySelector('#departments').innerHTML = html;
        }
        try { window.localStorage.setItem('academix_stats', JSON.stringify({ students:s, faculty:f })); } catch(e) {}
      }catch(e){ /* silent */ }
    }

    // Listen for app-wide entity mutations
    window.addEventListener('academix:entity', (e)=>{
      const { entity, action, delta=0 } = e.detail || {};
      if (!entity || !action) return;
      if (delta) adjustCounter(entity, delta);
    });

    // On-demand authoritative refresh
    window.addEventListener('academix:stats:refresh', () => { refreshStats(); });

    // Refresh when tab becomes visible (e.g., user navigates back to dashboard)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') refreshStats();
    });


    // Load stats for dashboard and seed localStorage snapshot
    fetchJson('/api/dashboard/stats').then((data)=>{
        if (!data) return;
        const s = data.total_students ?? 0;
        const f = data.total_faculty ?? 0;
        const c = data.total_courses ?? (data.students_per_course ? new Set(data.students_per_course.map(x=>x.course_id)).size : 0);
        rootEl.querySelector('#stat-students').textContent = s;
        rootEl.querySelector('#stat-faculty').textContent = f;
        rootEl.querySelector('#stat-courses').textContent = c;
        const dept = data.faculty_per_department || [];
        const html = dept.map(d=>`<div style="padding:6px 0;border-top:1px solid #3a3a3a">${d.department_name || 'N/A'} — ${d.total}</div>`).join('') || 'No data';
        rootEl.querySelector('#departments').innerHTML = html;
        try { window.localStorage.setItem('academix_stats', JSON.stringify({ students:s, faculty:f })); } catch(e) {}
    });


    // Navigate to Students inside the same dashboard shell
    const menuStudents = rootEl.querySelector('#menu-students');
    if (menuStudents) {
        menuStudents.addEventListener('click', (e)=>{
            e.preventDefault();
            if (window.Academix && typeof window.Academix.mountStudents === 'function') {
                // Replace main content with the students module
                main.innerHTML = '';
                window.Academix.mountStudents(main);
            }
        });
    }

    // Navigate to Faculty inside the same dashboard shell
    const menuFaculty = rootEl.querySelector('#menu-faculty');
    if (menuFaculty) {
        menuFaculty.addEventListener('click', (e)=>{
            e.preventDefault();
            if (window.Academix && typeof window.Academix.mountFaculty === 'function') {
                // Replace main content with the faculty module
                main.innerHTML = '';
                window.Academix.mountFaculty(main);
            }
        });
    }

    // Navigate to Settings inside the same dashboard shell
    const menuSettings = rootEl.querySelector('#menu-settings');
    if (menuSettings) {
        menuSettings.addEventListener('click', (e)=>{
            e.preventDefault();
            if (window.Academix && typeof window.Academix.mountSettings === 'function') {
                // Replace main content with the settings module
                main.innerHTML = '';
                window.Academix.mountSettings(main);
            }
        });
    }

    // Navigate to Report inside the same dashboard shell
    const menuReport = rootEl.querySelector('#menu-report');
    if (menuReport) {
        menuReport.addEventListener('click', (e)=>{
            e.preventDefault();
            if (window.Academix && typeof window.Academix.mountReport === 'function') {
                // Replace main content with the report module
                main.innerHTML = '';
                window.Academix.mountReport(main);
            }
        });
    }

    // Navigate to My Profile inside the same dashboard shell
    const menuProfile = rootEl.querySelector('#menu-profile');
    if (menuProfile) {
        menuProfile.addEventListener('click', (e)=>{
            e.preventDefault();
            // Update hash to allow deep-linking and back/forward
            if (location.hash !== '#profile') location.hash = '#profile';
            if (!mountView('profile')) {
                window.dispatchEvent(new CustomEvent('academix:notify', { detail:{ entity:'app', action:'error', details:'My Profile module is not available.' } }));
            }
        });
    }

    // Auto-mount by hash (supports direct visit or back navigation)
    const applyHashRoute = () => {
      if (location.hash === '#profile') {
        mountView('profile');
      } else if (location.hash === '' || location.hash === '#dashboard') {
        setTitle('Dashboard');
      }
    };
    window.addEventListener('hashchange', applyHashRoute);
    // Run once on load
    applyHashRoute();
}

