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
          <section class="list" style="margin-top:18px">
            <h4 style="margin:0 0 10px">Charts</h4>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">
                  <div style="background:transparent;padding:8px;border-radius:8px">
                    <h4 style="margin:0 0 8px;font-size:13px;color:var(--muted)">Students per Course</h4>
                    <div style="height:220px;width:100%">
                      <canvas id="students-chart" style="width:100%;height:100%"></canvas>
                    </div>
                  </div>
                  <div style="background:transparent;padding:8px;border-radius:8px">
                    <h4 style="margin:0 0 8px;font-size:13px;color:var(--muted)">Faculty per Department</h4>
                    <div style="height:220px;width:100%;display:flex;align-items:center;justify-content:center">
                      <canvas id="faculty-chart" style="width:100%;height:100%;max-width:320px;max-height:220px"></canvas>
                    </div>
                  </div>
            </div>
          </section>
          <section class="list">
            <h4 style="margin:0 0 10px">Top Departments</h4>
            <div id="departments">Loading...</div>
          </section>
          <!-- duplicated charts section removed -->
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

    // Helper: make short acronym from a department/program name
    function makeAcronym(txt) {
      if (!txt) return '';
      // Keep 'Program' so names like 'Nursing Program' become 'NP'
      const stop = new Set(['department','of','the','and','&','staff']);
      const words = txt.split(/\s+/).filter(w => w.trim().length > 0);
      const meaningful = words.filter(w => !stop.has(w.toLowerCase()));
      const source = meaningful.length ? meaningful : words;
      let letters = source.map(w => w[0] ? w[0].toUpperCase() : '').join('');
      if (letters.length > 3) letters = letters.slice(0,3);
      return letters;
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
          // show only top 5 departments by total (descending)
          const top = (Array.isArray(dept) ? dept.slice() : []).sort((a,b)=>Number(b.total||0)-Number(a.total||0)).slice(0,5);
          const html = top.map(d=>{
            const name = d.department_name || 'N/A';
            const short = makeAcronym(name);
            const label = short ? `${name} (${short})` : name;
            return `<div style="padding:6px 0;border-top:1px solid #3a3a3a">${label} — ${d.total}</div>`;
          }).join('') || 'No data';
          rootEl.querySelector('#departments').innerHTML = html;
        }
        try { window.localStorage.setItem('academix_stats', JSON.stringify({ students:s, faculty:f })); } catch(e) {}
        try { drawCharts(data); } catch(e) {}
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
        // show only top 5 departments by total (descending)
        const top = (Array.isArray(dept) ? dept.slice() : []).sort((a,b)=>Number(b.total||0)-Number(a.total||0)).slice(0,5);
        const html = top.map(d=>{
          const name = d.department_name || 'N/A';
          const short = makeAcronym(name);
          const label = short ? `${name} (${short})` : name;
          return `<div style="padding:6px 0;border-top:1px solid #3a3a3a">${label} — ${d.total}</div>`;
        }).join('') || 'No data';
        rootEl.querySelector('#departments').innerHTML = html;
        try { window.localStorage.setItem('academix_stats', JSON.stringify({ students:s, faculty:f })); } catch(e) {}
        try { drawCharts(data); } catch(e) {}
    });

    // Simple canvas charts (no external deps)
    function drawCharts(data) {
      // Students per course - horizontal bars
      const sdata = data.students_per_course || [];
      const sc = document.getElementById('students-chart');
      if (sc && sc.getContext) {
        const ctx = sc.getContext('2d');
        sc.width = sc.clientWidth * devicePixelRatio;
        sc.height = sc.clientHeight * devicePixelRatio;
        ctx.clearRect(0,0,sc.width, sc.height);
        const padding = 20 * devicePixelRatio;
        const labelWidth = 140 * devicePixelRatio;
        const chartW = sc.width - padding*2 - labelWidth;
        const maxVal = sdata.reduce((m, x) => Math.max(m, Number(x.total||0)), 1);
        const barH = Math.max(18 * devicePixelRatio, (sc.height - padding*2) / Math.max(1, sdata.length) - 8);
        sdata.forEach((row, i) => {
          const y = padding + i * (barH + 8);
          const val = Number(row.total || 0);
          ctx.fillStyle = '#cbd5e1';
          ctx.font = `${12 * devicePixelRatio}px Inter, sans-serif`;
          ctx.textBaseline = 'middle';
          ctx.fillText(row.course_name || `Course ${i+1}`, padding, y + barH/2 + 4);
          ctx.strokeStyle = '#ffffff66';
          ctx.lineWidth = 2 * devicePixelRatio;
          ctx.strokeRect(padding + labelWidth, y, chartW, barH);
          if (val > 0) {
            const hue = (i * 137.50776405003785) % 360;
            // Darken bars and apply 70% opacity so they appear less washed-out on dark background
            // Use hsla with explicit commas for broader canvas compatibility
            const barSat = 66;
            const barLight = 40;
            ctx.fillStyle = `hsla(${hue}, ${barSat}%, ${barLight}%, 0.7)`;
            const w = Math.round((val / maxVal) * chartW);
            ctx.fillRect(padding + labelWidth, y, w, barH);
          }
        });
      }

      // Faculty per department - pie (filter out departments with zero count, use different palette,
      // label only sufficiently large slices inside, render small legend for the rest)
      const fdata = (data.faculty_per_department || []).filter(d => Number(d.total || 0) > 0);
      const fc = document.getElementById('faculty-chart');
      if (fc && fc.getContext) {
        const ctx = fc.getContext('2d');
        fc.width = fc.clientWidth * devicePixelRatio;
        fc.height = fc.clientHeight * devicePixelRatio;
        ctx.clearRect(0,0,fc.width, fc.height);
  const cx = fc.width/2;
  const cy = fc.height/2;
  // Increase radius so the pie fills the available circle area more fully
  const radius = Math.min(fc.width, fc.height) * 0.48;
        const total = fdata.reduce((s,x)=>s + Number(x.total||0), 0) || 1;
        if (fdata.length === 0) {
          // draw empty state
          ctx.font = `${12 * devicePixelRatio}px Inter, sans-serif`;
          ctx.fillStyle = '#94a3b8';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('No faculty data', cx, cy);
        } else {
          let angle = -Math.PI/2;
          const hueOffset = 80; // offset so pie colors don't match bar hues
          const legend = [];
          const MIN_LABEL_ANGLE = 0.28; // ~16 degrees — threshold to draw inside-label

          fdata.forEach((d,i)=>{
            const count = Number(d.total || 0);
            const slice = (count / total) * Math.PI*2;
            const hue = (hueOffset + i * 137.5) % 360;
            const sat = 68;
            const light = 52;

            // draw slice with 70% opacity (hsla) so slices aren't too light on dark bg
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, 0.7)`;
            ctx.arc(cx, cy, radius, angle, angle + slice);
            ctx.closePath();
            ctx.fill();

            // label handling: if slice big enough, draw inside; else add to legend
            const mid = angle + slice/2;
            if (slice >= MIN_LABEL_ANGLE) {
              // position labels a bit closer to center so they remain inside larger slices
              const lx = cx + Math.cos(mid) * radius * 0.5;
              const ly = cy + Math.sin(mid) * radius * 0.5;

              // Try to fit the department/program name inside the slice.
              // Compute an approximate available width based on arc length at 60% radius.
              const fullLabel = (d.department_name || '').toString();
              // produce a short inside-circle label: prefer acronym for long names or when containing 'Program'
              const makeAcronym = (txt) => {
                if (!txt) return '';
                // keep 'program' because we want acronyms like 'NP' (Nursing Program)
                const stop = new Set(['department','of','the','and','&','staff']);
                const words = txt.split(/\s+/).filter(w => w.trim().length > 0);
                const meaningful = words.filter(w => !stop.has(w.toLowerCase()));
                const source = meaningful.length ? meaningful : words;
                let letters = source.map(w => w[0] ? w[0].toUpperCase() : '').join('');
                // limit to 3 letters for compactness
                if (letters.length > 3) letters = letters.slice(0,3);
                return letters;
              };
              let label = fullLabel;
              // If the name contains 'program' or is fairly long, use acronym for inside label
              if (/program/i.test(fullLabel) || fullLabel.length > 14) {
                const ac = makeAcronym(fullLabel);
                if (ac) label = ac;
              }
              const approxArcLen = Math.max(10, slice * radius * 0.6);
              const padding = 6 * devicePixelRatio;
              const availableWidth = approxArcLen - padding;

              // Helper: draw wrapped/fitted text centered at (lx,ly)
              const drawFittedText = (text) => {
                // Start with a comfortable font size and step down until it fits or hits min
                let fontSize = 12 * devicePixelRatio;
                const minFont = 8 * devicePixelRatio;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const textColor = (light < 65) ? '#ffffff' : '#0b1020';
                ctx.fillStyle = textColor;

                // Try single-line first
                while (fontSize >= minFont) {
                  ctx.font = `${fontSize}px Inter, sans-serif`;
                  const w = ctx.measureText(text).width;
                  if (w <= availableWidth) {
                    ctx.fillText(text, lx, ly);
                    return;
                  }
                  fontSize -= 1 * devicePixelRatio;
                }

                // If single-line didn't fit, try two-line wrap by splitting on spaces
                const words = text.split(/\s+/);
                if (words.length === 1) {
                  // fallback: ellipsize to fit
                  let ell = text;
                  while (ctx.measureText(ell + '\u2026').width > availableWidth && ell.length > 3) {
                    ell = ell.slice(0, -1);
                  }
                  ctx.fillText(ell + '\u2026', lx, ly);
                  return;
                }

                // Attempt two lines
                let line1 = words[0];
                let line2 = words.slice(1).join(' ');
                // balance by moving words from line2 to line1 if needed
                for (let i = 1; i < words.length; i++) {
                  const candidate = words.slice(0, i+1).join(' ');
                  ctx.font = `${Math.max(minFont, fontSize)}px Inter, sans-serif`;
                  if (ctx.measureText(candidate).width <= availableWidth) {
                    line1 = candidate;
                    line2 = words.slice(i+1).join(' ');
                  } else {
                    break;
                  }
                }

                // reduce font until both lines fit
                fontSize = Math.max(minFont, fontSize);
                while (fontSize >= minFont) {
                  ctx.font = `${fontSize}px Inter, sans-serif`;
                  const w1 = ctx.measureText(line1).width;
                  const w2 = ctx.measureText(line2).width;
                  if (w1 <= availableWidth && w2 <= availableWidth) break;
                  fontSize -= 1 * devicePixelRatio;
                }

                // If still too wide, ellipsize the second line
                ctx.font = `${Math.max(minFont, fontSize)}px Inter, sans-serif`;
                if (ctx.measureText(line2).width > availableWidth) {
                  let ell2 = line2;
                  while (ctx.measureText(ell2 + '\u2026').width > availableWidth && ell2.length > 3) {
                    ell2 = ell2.slice(0, -1);
                  }
                  line2 = ell2 + '\u2026';
                }

                // draw two lines centered vertically
                const lineHeight = (fontSize + 2) * 1.1;
                ctx.textAlign = 'center';
                ctx.fillText(line1, lx, ly - lineHeight/2);
                ctx.fillText(line2, lx, ly + lineHeight/2);
              };

              try {
                drawFittedText(label);
              } catch (e) {
                // fallback: short label
                const short = label.length > 20 ? label.slice(0, 17) + '\u2026' : label;
                ctx.font = `${10 * devicePixelRatio}px Inter, sans-serif`;
                ctx.fillStyle = (light < 65) ? '#ffffff' : '#0b1020';
                ctx.fillText(short, lx, ly);
              }
            } else {
              // add legend entry
              legend.push({ name: d.department_name || '', total: count, hue });
            }

            angle += slice;
          });

          // render legend for small slices. Prefer to the right if there's horizontal space,
          // otherwise render below the pie.
          if (legend.length > 0) {
            const fontSize = Math.max(10 * devicePixelRatio, 10);
            ctx.font = `${fontSize}px Inter, sans-serif`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            const dotSize = 8 * devicePixelRatio;
            const padding = 6 * devicePixelRatio;

            const canPlaceRight = fc.width > fc.height * 1.15; // enough width to place legend to the right
            if (canPlaceRight) {
              const startX = cx + radius + (8 * devicePixelRatio);
              let y = Math.max(8 * devicePixelRatio, cy - radius);
              legend.forEach((lg) => {
                ctx.fillStyle = `hsl(${lg.hue}deg 68% 52%)`;
                ctx.fillRect(startX, y, dotSize, dotSize);
                ctx.fillStyle = '#e6edf3';
                const label = lg.name.length > 24 ? lg.name.slice(0, 21) + '\u2026' : lg.name;
                ctx.fillText(`${label} (${lg.total})`, startX + dotSize + padding, y);
                y += dotSize + padding;
              });
            } else {
              const startY = cy + radius + (8 * devicePixelRatio);
              const startX = Math.max(8 * devicePixelRatio, cx - radius);
              let y = startY;
              legend.forEach((lg) => {
                ctx.fillStyle = `hsl(${lg.hue}deg 68% 52%)`;
                ctx.fillRect(startX, y, dotSize, dotSize);
                ctx.fillStyle = '#e6edf3';
                const label = lg.name.length > 24 ? lg.name.slice(0, 21) + '\u2026' : lg.name;
                ctx.fillText(`${label} (${lg.total})`, startX + dotSize + padding, y);
                y += dotSize + padding;
              });
            }
          }
        }
      }
    }


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

