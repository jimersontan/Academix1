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
        body{background:#000;color:#fff;font-family:Arial,Helvetica,sans-serif}
        .shell{min-height:100vh;display:grid;grid-template-columns:240px 1fr}
        .sidebar{background:#111;padding:14px}
        .brand{display:flex;align-items:center;gap:10px;margin-bottom:18px}
        .brand img{width:40px;height:40px}
        .menu a{display:block;color:#ddd;text-decoration:none;padding:8px 6px;border-radius:4px}
        .menu a:hover{background:#1f1f1f}
        .content{padding:18px}
        .cards{display:grid;grid-template-columns:repeat(3,200px);gap:16px}
        .card{background:#2b2b2b;border-radius:8px;padding:12px}
        .card h4{margin:0 0 8px;font-weight:700}
        .list{margin-top:18px;background:#2b2b2b;border-radius:8px;padding:12px}
        .topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
        .btn{background:#2d6cdf;color:#fff;border:none;padding:8px 12px;border-radius:4px;cursor:pointer}
      </style>
      <div class="shell">
        <aside class="sidebar">
          <div class="brand">
            <img src="https://cdn.vectorstock.com/i/500p/25/20/books-stack-logo-template-vector-27212520.jpg" alt="logo" />
            <div>
              <div style="font-weight:700">Academix</div>
              <div style="font-size:12px;opacity:.8">Student Management Portal</div>
            </div>
          </div>
          <nav class="menu">
            <a href="dashboard.html">Dashboard</a>
            <a href="#" id="menu-students">Students</a>
            <a href="#" id="menu-faculty">Faculty</a>
            <a href="#" id="menu-report">Report</a>
            <a href="#" id="menu-settings">Settings</a>
            <a href="#" id="menu-profile">My Profile</a>
            <a href="#" id="menu-logout">Logout</a>
          </nav>
        </aside>
        <main class="content" id="main">
          <div class="topbar">
            <h2 style="margin:0">Dashboard</h2>
          </div>
          <section class="cards">
            <div class="card">
              <h4>Total Student</h4>
              <div id="stat-students">0</div>
            </div>
            <div class="card">
              <h4>Total Faculty</h4>
              <div id="stat-faculty">0</div>
            </div>
            <div class="card">
              <h4>Course Offered</h4>
              <div id="stat-courses">0</div>
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

    // Load stats for dashboard
    fetchJson('/api/dashboard/stats').then((data)=>{
        if (!data) return;
        rootEl.querySelector('#stat-students').textContent = data.total_students ?? 0;
        rootEl.querySelector('#stat-faculty').textContent = data.total_faculty ?? 0;
        rootEl.querySelector('#stat-courses').textContent = (data.students_per_course ? new Set(data.students_per_course.map(x=>x.course_id)).size : 0);
        const dept = data.faculty_per_department || [];
        const html = dept.map(d=>`<div style="padding:6px 0;border-top:1px solid #3a3a3a">${d.department_name || 'N/A'} — ${d.total}</div>`).join('') || 'No data';
        rootEl.querySelector('#departments').innerHTML = html;
    });

    // Logout
    const logout = async () => {
        try { await fetchJson('/api/auth/logout', { method:'POST' }); } catch(e) {}
        window.localStorage.removeItem('academix_token');
        window.location.href = 'index.html';
    };
    rootEl.querySelector('#menu-logout').addEventListener('click', (e)=>{ e.preventDefault(); logout(); });

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
}


