/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/login */ "./resources/js/components/login.js");
/* harmony import */ var _components_dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dashboard */ "./resources/js/components/dashboard.js");
/* harmony import */ var _components_student__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/student */ "./resources/js/components/student.js");
/* harmony import */ var _components_faculty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/faculty */ "./resources/js/components/faculty.js");
/* harmony import */ var _components_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/settings */ "./resources/js/components/settings.js");
/* harmony import */ var _components_report__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/report */ "./resources/js/components/report.js");
/* harmony import */ var _components_myprofile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/myprofile */ "./resources/js/components/myprofile.js");







window.Academix = window.Academix || {};
window.Academix.mountLogin = _components_login__WEBPACK_IMPORTED_MODULE_0__.mountLogin;
window.Academix.mountDashboard = _components_dashboard__WEBPACK_IMPORTED_MODULE_1__.mountDashboard;
window.Academix.mountStudents = _components_student__WEBPACK_IMPORTED_MODULE_2__.mountStudents;
window.Academix.mountFaculty = _components_faculty__WEBPACK_IMPORTED_MODULE_3__.mountFaculty;
window.Academix.mountSettings = _components_settings__WEBPACK_IMPORTED_MODULE_4__.mountSettings;
window.Academix.mountReport = _components_report__WEBPACK_IMPORTED_MODULE_5__.mountReport;
window.Academix.mountMyProfile = _components_myprofile__WEBPACK_IMPORTED_MODULE_6__.mountMyProfile;

/***/ }),

/***/ "./resources/js/components/dashboard.js":
/*!**********************************************!*\
  !*** ./resources/js/components/dashboard.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchJson: () => (/* binding */ fetchJson),
/* harmony export */   mountDashboard: () => (/* binding */ mountDashboard)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Simple admin-only Dashboard
// Usage: import { mountDashboard } from './components/dashboard';
//        mountDashboard(document.getElementById('app'))

function requireToken() {
  var token = window.localStorage.getItem('academix_token');
  if (!token) {
    window.location.href = 'index.html';
    throw new Error('No token');
  }
  return token;
}
function fetchJson(_x) {
  return _fetchJson.apply(this, arguments);
}
function _fetchJson() {
  _fetchJson = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(url) {
    var options,
      token,
      res,
      _args2 = arguments;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          token = requireToken();
          _context2.n = 1;
          return fetch(url, _objectSpread(_objectSpread({}, options), {}, {
            headers: _objectSpread({
              'Accept': 'application/json',
              'Authorization': "Bearer ".concat(token)
            }, options.headers || {})
          }));
        case 1:
          res = _context2.v;
          if (!(res.status === 401)) {
            _context2.n = 2;
            break;
          }
          window.localStorage.removeItem('academix_token');
          window.location.href = 'index.html';
          return _context2.a(2);
        case 2:
          return _context2.a(2, res.json());
      }
    }, _callee2);
  }));
  return _fetchJson.apply(this, arguments);
}
function mountDashboard(rootEl) {
  if (!rootEl) throw new Error('mountDashboard: root element is required');
  rootEl.innerHTML = "\n      <style>\n        :root{\n          --bg:#0c1222;          /* deep slate */\n          --panel:#111827;       /* sidebar/panel */\n          --surface:#0f172a;     /* main content base */\n          --card:#1f2937;        /* card surface */\n          --card-ink:#e5e7eb;    /* text on card */\n          --ink:#e6edf3;         /* base text */\n          --muted:#94a3b8;       /* muted text */\n          --primary:#60a5fa;     /* accents */\n          --border:rgba(148,163,184,.18);\n          --shadow:0 10px 30px rgba(2,6,23,.35);\n        }\n        body{background:var(--bg);color:var(--ink);font-family:Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, Helvetica, sans-serif}\n        .shell{min-height:100vh;display:grid;grid-template-columns:260px 1fr;background:linear-gradient(180deg, rgba(96,165,250,.06), transparent 200px)}\n        .sidebar{background:var(--panel);padding:18px;border-right:1px solid var(--border)}\n        .brand{display:flex;align-items:center;gap:12px;margin-bottom:22px}\n        .brand img{width:40px;height:40px;border-radius:8px}\n        .brand .name{font-weight:700;letter-spacing:.2px}\n        .brand .sub{font-size:12px;color:var(--muted)}\n        .menu a{display:block;color:var(--ink);opacity:.85;text-decoration:none;padding:10px 8px;border-radius:8px}\n        .menu a:hover{background:rgba(148,163,184,.08);opacity:1}\n        .content{padding:22px}\n        .topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}\n        .topbar h2{margin:0;font-size:20px;letter-spacing:.2px}\n        .cards{display:grid;grid-template-columns:repeat(auto-fit, minmax(220px,1fr));gap:16px}\n        .card{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;padding:16px;box-shadow:var(--shadow)}\n        .card h4{margin:0 0 10px;font-weight:700;color:var(--muted);font-size:12px;letter-spacing:.3px;text-transform:uppercase}\n        .stat{font-size:28px;font-weight:800;color:var(--card-ink)}\n        .list{margin-top:18px;background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;padding:16px;box-shadow:var(--shadow)}\n        .list h4{margin:0 0 10px;font-size:14px;color:var(--muted);letter-spacing:.3px;text-transform:uppercase}\n        .dept-item{padding:10px 0;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}\n        .dept-name{color:var(--ink)}\n        .dept-total{color:var(--primary);font-weight:700}\n        .btn{background:var(--primary);color:#0b1020;border:none;padding:8px 12px;border-radius:8px;cursor:pointer}\n        @media (max-width: 900px){ .shell{grid-template-columns:1fr} .sidebar{position:sticky;top:0;z-index:10} }\n      </style>\n      <div class=\"shell\">\n        <aside class=\"sidebar\">\n          <div class=\"brand\">\n            <img src=\"https://cdn.vectorstock.com/i/500p/25/20/books-stack-logo-template-vector-27212520.jpg\" alt=\"logo\" />\n            <div>\n              <div class=\"name\">Academix</div>\n              <div class=\"sub\">Student Management Portal</div>\n            </div>\n          </div>\n          <nav class=\"menu\">\n            <a href=\"dashboard\">Dashboard</a>\n            <a href=\"#\" id=\"menu-students\">Students</a>\n            <a href=\"#\" id=\"menu-faculty\">Faculty</a>\n            <a href=\"#\" id=\"menu-report\">Report</a>\n            <a href=\"#\" id=\"menu-settings\">Settings</a>\n            <a href=\"#\" id=\"menu-profile\">My Profile</a>\n          </nav>\n        </aside>\n        <main class=\"content\" id=\"main\">\n          <div class=\"topbar\">\n            <h2 id=\"page-title\" style=\"margin:0\">Dashboard</h2>\n          </div>\n          <section class=\"cards\">\n            <div class=\"card\">\n              <h4>Total Students</h4>\n              <div class=\"stat\" id=\"stat-students\">0</div>\n            </div>\n            <div class=\"card\">\n              <h4>Total Faculty</h4>\n              <div class=\"stat\" id=\"stat-faculty\">0</div>\n            </div>\n            <div class=\"card\">\n              <h4>Courses Offered</h4>\n              <div class=\"stat\" id=\"stat-courses\">0</div>\n            </div>\n          </section>\n          <section class=\"list\" style=\"margin-top:18px\">\n            <h4 style=\"margin:0 0 10px\">Charts</h4>\n            <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start\">\n                  <div style=\"background:transparent;padding:8px;border-radius:8px\">\n                    <h4 style=\"margin:0 0 8px;font-size:13px;color:var(--muted)\">Students per Course</h4>\n                    <div style=\"height:220px;width:100%\">\n                      <canvas id=\"students-chart\" style=\"width:100%;height:100%\"></canvas>\n                    </div>\n                  </div>\n                  <div style=\"background:transparent;padding:8px;border-radius:8px\">\n                    <h4 style=\"margin:0 0 8px;font-size:13px;color:var(--muted)\">Faculty per Department</h4>\n                    <div style=\"height:220px;width:100%;display:flex;align-items:center;justify-content:center\">\n                      <canvas id=\"faculty-chart\" style=\"width:100%;height:100%;max-width:320px;max-height:220px\"></canvas>\n                    </div>\n                  </div>\n            </div>\n          </section>\n          <section class=\"list\">\n            <h4 style=\"margin:0 0 10px\">Top Departments</h4>\n            <div id=\"departments\">Loading...</div>\n          </section>\n          <!-- duplicated charts section removed -->\n        </main>\n      </div>\n    ";
  var main = rootEl.querySelector('#main');
  var pageTitle = rootEl.querySelector('#page-title');
  function setTitle(t) {
    if (pageTitle) pageTitle.textContent = t;
  }
  function mountView(name) {
    if (name === 'profile' && window.Academix && typeof window.Academix.mountMyProfile === 'function') {
      main.innerHTML = '';
      setTitle('My Profile');
      window.Academix.mountMyProfile(main);
      return true;
    }
    return false;
  }

  // Initialize counters from local snapshot immediately (before network)
  try {
    var snap = JSON.parse(window.localStorage.getItem('academix_stats') || '{}');
    var initStudents = Number(snap.students) || 0;
    var initFaculty = Number(snap.faculty) || 0;
    if (rootEl.querySelector('#stat-students')) rootEl.querySelector('#stat-students').textContent = initStudents;
    if (rootEl.querySelector('#stat-faculty')) rootEl.querySelector('#stat-faculty').textContent = initFaculty;
  } catch (_) {}

  // Helpers: update counters and notifications
  var statStudentsEl = function statStudentsEl() {
    return rootEl.querySelector('#stat-students');
  };
  var statFacultyEl = function statFacultyEl() {
    return rootEl.querySelector('#stat-faculty');
  };
  function clamp(n) {
    return Math.max(0, Number.isFinite(n) ? n : 0);
  }
  function saveStats(students, faculty) {
    try {
      window.localStorage.setItem('academix_stats', JSON.stringify({
        students: students,
        faculty: faculty
      }));
    } catch (e) {}
  }
  function readStats() {
    try {
      var s = JSON.parse(window.localStorage.getItem('academix_stats') || '{}');
      return {
        students: Number(s.students) || 0,
        faculty: Number(s.faculty) || 0
      };
    } catch (e) {
      return {
        students: 0,
        faculty: 0
      };
    }
  }
  function setCounters(_ref) {
    var students = _ref.students,
      faculty = _ref.faculty;
    if (statStudentsEl()) statStudentsEl().textContent = clamp(students);
    if (statFacultyEl()) statFacultyEl().textContent = clamp(faculty);
    saveStats(clamp(students), clamp(faculty));
  }
  function adjustCounter(kind, delta) {
    var curr = readStats();
    if (kind === 'student') curr.students = clamp(curr.students + delta);
    if (kind === 'faculty') curr.faculty = clamp(curr.faculty + delta);
    setCounters(curr);
  }

  // Helper: make short acronym from a department/program name
  function makeAcronym(txt) {
    if (!txt) return '';
    // Keep 'Program' so names like 'Nursing Program' become 'NP'
    var stop = new Set(['department', 'of', 'the', 'and', '&', 'staff']);
    var words = txt.split(/\s+/).filter(function (w) {
      return w.trim().length > 0;
    });
    var meaningful = words.filter(function (w) {
      return !stop.has(w.toLowerCase());
    });
    var source = meaningful.length ? meaningful : words;
    var letters = source.map(function (w) {
      return w[0] ? w[0].toUpperCase() : '';
    }).join('');
    if (letters.length > 3) letters = letters.slice(0, 3);
    return letters;
  }

  // Refetch authoritative stats from backend
  function refreshStats() {
    return _refreshStats.apply(this, arguments);
  } // Listen for app-wide entity mutations
  function _refreshStats() {
    _refreshStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _data$total_students2, _data$total_faculty2, _data$total_courses2, data, s, f, c, dept, top, html, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return fetchJson('/api/dashboard/stats');
          case 1:
            data = _context.v;
            if (data) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            s = (_data$total_students2 = data.total_students) !== null && _data$total_students2 !== void 0 ? _data$total_students2 : 0;
            f = (_data$total_faculty2 = data.total_faculty) !== null && _data$total_faculty2 !== void 0 ? _data$total_faculty2 : 0;
            c = (_data$total_courses2 = data.total_courses) !== null && _data$total_courses2 !== void 0 ? _data$total_courses2 : Array.isArray(data.students_per_course) ? new Set(data.students_per_course.map(function (x) {
              return x.course_id;
            })).size : 0;
            if (rootEl.querySelector('#stat-students')) rootEl.querySelector('#stat-students').textContent = s;
            if (rootEl.querySelector('#stat-faculty')) rootEl.querySelector('#stat-faculty').textContent = f;
            if (rootEl.querySelector('#stat-courses')) rootEl.querySelector('#stat-courses').textContent = c;
            dept = data.faculty_per_department || [];
            if (rootEl.querySelector('#departments')) {
              // show only top 5 departments by total (descending)
              top = (Array.isArray(dept) ? dept.slice() : []).sort(function (a, b) {
                return Number(b.total || 0) - Number(a.total || 0);
              }).slice(0, 5);
              html = top.map(function (d) {
                var name = d.department_name || 'N/A';
                var _short3 = makeAcronym(name);
                var label = _short3 ? "".concat(name, " (").concat(_short3, ")") : name;
                return "<div style=\"padding:6px 0;border-top:1px solid #3a3a3a\">".concat(label, " \u2014 ").concat(d.total, "</div>");
              }).join('') || 'No data';
              rootEl.querySelector('#departments').innerHTML = html;
            }
            try {
              window.localStorage.setItem('academix_stats', JSON.stringify({
                students: s,
                faculty: f
              }));
            } catch (e) {}
            try {
              drawCharts(data);
            } catch (e) {}
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 3]]);
    }));
    return _refreshStats.apply(this, arguments);
  }
  window.addEventListener('academix:entity', function (e) {
    var _ref2 = e.detail || {},
      entity = _ref2.entity,
      action = _ref2.action,
      _ref2$delta = _ref2.delta,
      delta = _ref2$delta === void 0 ? 0 : _ref2$delta;
    if (!entity || !action) return;
    if (delta) adjustCounter(entity, delta);
  });

  // On-demand authoritative refresh
  window.addEventListener('academix:stats:refresh', function () {
    refreshStats();
  });

  // Refresh when tab becomes visible (e.g., user navigates back to dashboard)
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') refreshStats();
  });

  // Load stats for dashboard and seed localStorage snapshot
  fetchJson('/api/dashboard/stats').then(function (data) {
    var _data$total_students, _data$total_faculty, _data$total_courses;
    if (!data) return;
    var s = (_data$total_students = data.total_students) !== null && _data$total_students !== void 0 ? _data$total_students : 0;
    var f = (_data$total_faculty = data.total_faculty) !== null && _data$total_faculty !== void 0 ? _data$total_faculty : 0;
    var c = (_data$total_courses = data.total_courses) !== null && _data$total_courses !== void 0 ? _data$total_courses : data.students_per_course ? new Set(data.students_per_course.map(function (x) {
      return x.course_id;
    })).size : 0;
    rootEl.querySelector('#stat-students').textContent = s;
    rootEl.querySelector('#stat-faculty').textContent = f;
    rootEl.querySelector('#stat-courses').textContent = c;
    var dept = data.faculty_per_department || [];
    // show only top 5 departments by total (descending)
    var top = (Array.isArray(dept) ? dept.slice() : []).sort(function (a, b) {
      return Number(b.total || 0) - Number(a.total || 0);
    }).slice(0, 5);
    var html = top.map(function (d) {
      var name = d.department_name || 'N/A';
      var _short = makeAcronym(name);
      var label = _short ? "".concat(name, " (").concat(_short, ")") : name;
      return "<div style=\"padding:6px 0;border-top:1px solid #3a3a3a\">".concat(label, " \u2014 ").concat(d.total, "</div>");
    }).join('') || 'No data';
    rootEl.querySelector('#departments').innerHTML = html;
    try {
      window.localStorage.setItem('academix_stats', JSON.stringify({
        students: s,
        faculty: f
      }));
    } catch (e) {}
    try {
      drawCharts(data);
    } catch (e) {}
  });

  // Simple canvas charts (no external deps)
  function drawCharts(data) {
    // Students per course - horizontal bars
    var sdata = data.students_per_course || [];
    var sc = document.getElementById('students-chart');
    if (sc && sc.getContext) {
      var ctx = sc.getContext('2d');
      sc.width = sc.clientWidth * devicePixelRatio;
      sc.height = sc.clientHeight * devicePixelRatio;
      ctx.clearRect(0, 0, sc.width, sc.height);
      var padding = 20 * devicePixelRatio;
      var labelWidth = 140 * devicePixelRatio;
      var chartW = sc.width - padding * 2 - labelWidth;
      var maxVal = sdata.reduce(function (m, x) {
        return Math.max(m, Number(x.total || 0));
      }, 1);
      var barH = Math.max(18 * devicePixelRatio, (sc.height - padding * 2) / Math.max(1, sdata.length) - 8);
      sdata.forEach(function (row, i) {
        var y = padding + i * (barH + 8);
        var val = Number(row.total || 0);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = "".concat(12 * devicePixelRatio, "px Inter, sans-serif");
        ctx.textBaseline = 'middle';
        ctx.fillText(row.course_name || "Course ".concat(i + 1), padding, y + barH / 2 + 4);
        ctx.strokeStyle = '#ffffff66';
        ctx.lineWidth = 2 * devicePixelRatio;
        ctx.strokeRect(padding + labelWidth, y, chartW, barH);
        if (val > 0) {
          var hue = i * 137.50776405003785 % 360;
          // Darken bars and apply 70% opacity so they appear less washed-out on dark background
          // Use hsla with explicit commas for broader canvas compatibility
          var barSat = 66;
          var barLight = 40;
          ctx.fillStyle = "hsla(".concat(hue, ", ").concat(barSat, "%, ").concat(barLight, "%, 0.7)");
          var w = Math.round(val / maxVal * chartW);
          ctx.fillRect(padding + labelWidth, y, w, barH);
        }
      });
    }

    // Faculty per department - pie (filter out departments with zero count, use different palette,
    // label only sufficiently large slices inside, render small legend for the rest)
    var fdata = (data.faculty_per_department || []).filter(function (d) {
      return Number(d.total || 0) > 0;
    });
    var fc = document.getElementById('faculty-chart');
    if (fc && fc.getContext) {
      var _ctx = fc.getContext('2d');
      fc.width = fc.clientWidth * devicePixelRatio;
      fc.height = fc.clientHeight * devicePixelRatio;
      _ctx.clearRect(0, 0, fc.width, fc.height);
      var cx = fc.width / 2;
      var cy = fc.height / 2;
      // Increase radius so the pie fills the available circle area more fully
      var radius = Math.min(fc.width, fc.height) * 0.48;
      var total = fdata.reduce(function (s, x) {
        return s + Number(x.total || 0);
      }, 0) || 1;
      if (fdata.length === 0) {
        // draw empty state
        _ctx.font = "".concat(12 * devicePixelRatio, "px Inter, sans-serif");
        _ctx.fillStyle = '#94a3b8';
        _ctx.textAlign = 'center';
        _ctx.textBaseline = 'middle';
        _ctx.fillText('No faculty data', cx, cy);
      } else {
        var angle = -Math.PI / 2;
        var hueOffset = 80; // offset so pie colors don't match bar hues
        var legend = [];
        var MIN_LABEL_ANGLE = 0.28; // ~16 degrees — threshold to draw inside-label

        fdata.forEach(function (d, i) {
          var count = Number(d.total || 0);
          var slice = count / total * Math.PI * 2;
          var hue = (hueOffset + i * 137.5) % 360;
          var sat = 68;
          var light = 52;

          // draw slice with 70% opacity (hsla) so slices aren't too light on dark bg
          _ctx.beginPath();
          _ctx.moveTo(cx, cy);
          _ctx.fillStyle = "hsla(".concat(hue, ", ").concat(sat, "%, ").concat(light, "%, 0.7)");
          _ctx.arc(cx, cy, radius, angle, angle + slice);
          _ctx.closePath();
          _ctx.fill();

          // label handling: if slice big enough, draw inside; else add to legend
          var mid = angle + slice / 2;
          if (slice >= MIN_LABEL_ANGLE) {
            // position labels a bit closer to center so they remain inside larger slices
            var lx = cx + Math.cos(mid) * radius * 0.5;
            var ly = cy + Math.sin(mid) * radius * 0.5;

            // Try to fit the department/program name inside the slice.
            // Compute an approximate available width based on arc length at 60% radius.
            var fullLabel = (d.department_name || '').toString();
            // produce a short inside-circle label: prefer acronym for long names or when containing 'Program'
            var _makeAcronym = function _makeAcronym(txt) {
              if (!txt) return '';
              // keep 'program' because we want acronyms like 'NP' (Nursing Program)
              var stop = new Set(['department', 'of', 'the', 'and', '&', 'staff']);
              var words = txt.split(/\s+/).filter(function (w) {
                return w.trim().length > 0;
              });
              var meaningful = words.filter(function (w) {
                return !stop.has(w.toLowerCase());
              });
              var source = meaningful.length ? meaningful : words;
              var letters = source.map(function (w) {
                return w[0] ? w[0].toUpperCase() : '';
              }).join('');
              // limit to 3 letters for compactness
              if (letters.length > 3) letters = letters.slice(0, 3);
              return letters;
            };
            var label = fullLabel;
            // If the name contains 'program' or is fairly long, use acronym for inside label
            if (/program/i.test(fullLabel) || fullLabel.length > 14) {
              var ac = _makeAcronym(fullLabel);
              if (ac) label = ac;
            }
            var approxArcLen = Math.max(10, slice * radius * 0.6);
            var _padding = 6 * devicePixelRatio;
            var availableWidth = approxArcLen - _padding;

            // Helper: draw wrapped/fitted text centered at (lx,ly)
            var drawFittedText = function drawFittedText(text) {
              // Start with a comfortable font size and step down until it fits or hits min
              var fontSize = 12 * devicePixelRatio;
              var minFont = 8 * devicePixelRatio;
              _ctx.textAlign = 'center';
              _ctx.textBaseline = 'middle';
              var textColor = light < 65 ? '#ffffff' : '#0b1020';
              _ctx.fillStyle = textColor;

              // Try single-line first
              while (fontSize >= minFont) {
                _ctx.font = "".concat(fontSize, "px Inter, sans-serif");
                var w = _ctx.measureText(text).width;
                if (w <= availableWidth) {
                  _ctx.fillText(text, lx, ly);
                  return;
                }
                fontSize -= 1 * devicePixelRatio;
              }

              // If single-line didn't fit, try two-line wrap by splitting on spaces
              var words = text.split(/\s+/);
              if (words.length === 1) {
                // fallback: ellipsize to fit
                var ell = text;
                while (_ctx.measureText(ell + "\u2026").width > availableWidth && ell.length > 3) {
                  ell = ell.slice(0, -1);
                }
                _ctx.fillText(ell + "\u2026", lx, ly);
                return;
              }

              // Attempt two lines
              var line1 = words[0];
              var line2 = words.slice(1).join(' ');
              // balance by moving words from line2 to line1 if needed
              for (var _i = 1; _i < words.length; _i++) {
                var candidate = words.slice(0, _i + 1).join(' ');
                _ctx.font = "".concat(Math.max(minFont, fontSize), "px Inter, sans-serif");
                if (_ctx.measureText(candidate).width <= availableWidth) {
                  line1 = candidate;
                  line2 = words.slice(_i + 1).join(' ');
                } else {
                  break;
                }
              }

              // reduce font until both lines fit
              fontSize = Math.max(minFont, fontSize);
              while (fontSize >= minFont) {
                _ctx.font = "".concat(fontSize, "px Inter, sans-serif");
                var w1 = _ctx.measureText(line1).width;
                var w2 = _ctx.measureText(line2).width;
                if (w1 <= availableWidth && w2 <= availableWidth) break;
                fontSize -= 1 * devicePixelRatio;
              }

              // If still too wide, ellipsize the second line
              _ctx.font = "".concat(Math.max(minFont, fontSize), "px Inter, sans-serif");
              if (_ctx.measureText(line2).width > availableWidth) {
                var ell2 = line2;
                while (_ctx.measureText(ell2 + "\u2026").width > availableWidth && ell2.length > 3) {
                  ell2 = ell2.slice(0, -1);
                }
                line2 = ell2 + "\u2026";
              }

              // draw two lines centered vertically
              var lineHeight = (fontSize + 2) * 1.1;
              _ctx.textAlign = 'center';
              _ctx.fillText(line1, lx, ly - lineHeight / 2);
              _ctx.fillText(line2, lx, ly + lineHeight / 2);
            };
            try {
              drawFittedText(label);
            } catch (e) {
              // fallback: short label
              var _short2 = label.length > 20 ? label.slice(0, 17) + "\u2026" : label;
              _ctx.font = "".concat(10 * devicePixelRatio, "px Inter, sans-serif");
              _ctx.fillStyle = light < 65 ? '#ffffff' : '#0b1020';
              _ctx.fillText(_short2, lx, ly);
            }
          } else {
            // add legend entry
            legend.push({
              name: d.department_name || '',
              total: count,
              hue: hue
            });
          }
          angle += slice;
        });

        // render legend for small slices. Prefer to the right if there's horizontal space,
        // otherwise render below the pie.
        if (legend.length > 0) {
          var fontSize = Math.max(10 * devicePixelRatio, 10);
          _ctx.font = "".concat(fontSize, "px Inter, sans-serif");
          _ctx.textAlign = 'left';
          _ctx.textBaseline = 'top';
          var dotSize = 8 * devicePixelRatio;
          var _padding2 = 6 * devicePixelRatio;
          var canPlaceRight = fc.width > fc.height * 1.15; // enough width to place legend to the right
          if (canPlaceRight) {
            var startX = cx + radius + 8 * devicePixelRatio;
            var y = Math.max(8 * devicePixelRatio, cy - radius);
            legend.forEach(function (lg) {
              _ctx.fillStyle = "hsl(".concat(lg.hue, "deg 68% 52%)");
              _ctx.fillRect(startX, y, dotSize, dotSize);
              _ctx.fillStyle = '#e6edf3';
              var label = lg.name.length > 24 ? lg.name.slice(0, 21) + "\u2026" : lg.name;
              _ctx.fillText("".concat(label, " (").concat(lg.total, ")"), startX + dotSize + _padding2, y);
              y += dotSize + _padding2;
            });
          } else {
            var startY = cy + radius + 8 * devicePixelRatio;
            var _startX = Math.max(8 * devicePixelRatio, cx - radius);
            var _y = startY;
            legend.forEach(function (lg) {
              _ctx.fillStyle = "hsl(".concat(lg.hue, "deg 68% 52%)");
              _ctx.fillRect(_startX, _y, dotSize, dotSize);
              _ctx.fillStyle = '#e6edf3';
              var label = lg.name.length > 24 ? lg.name.slice(0, 21) + "\u2026" : lg.name;
              _ctx.fillText("".concat(label, " (").concat(lg.total, ")"), _startX + dotSize + _padding2, _y);
              _y += dotSize + _padding2;
            });
          }
        }
      }
    }
  }

  // Navigate to Students inside the same dashboard shell
  var menuStudents = rootEl.querySelector('#menu-students');
  if (menuStudents) {
    menuStudents.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.Academix && typeof window.Academix.mountStudents === 'function') {
        // Replace main content with the students module
        main.innerHTML = '';
        window.Academix.mountStudents(main);
      }
    });
  }

  // Navigate to Faculty inside the same dashboard shell
  var menuFaculty = rootEl.querySelector('#menu-faculty');
  if (menuFaculty) {
    menuFaculty.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.Academix && typeof window.Academix.mountFaculty === 'function') {
        // Replace main content with the faculty module
        main.innerHTML = '';
        window.Academix.mountFaculty(main);
      }
    });
  }

  // Navigate to Settings inside the same dashboard shell
  var menuSettings = rootEl.querySelector('#menu-settings');
  if (menuSettings) {
    menuSettings.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.Academix && typeof window.Academix.mountSettings === 'function') {
        // Replace main content with the settings module
        main.innerHTML = '';
        window.Academix.mountSettings(main);
      }
    });
  }

  // Navigate to Report inside the same dashboard shell
  var menuReport = rootEl.querySelector('#menu-report');
  if (menuReport) {
    menuReport.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.Academix && typeof window.Academix.mountReport === 'function') {
        // Replace main content with the report module
        main.innerHTML = '';
        window.Academix.mountReport(main);
      }
    });
  }

  // Navigate to My Profile inside the same dashboard shell
  var menuProfile = rootEl.querySelector('#menu-profile');
  if (menuProfile) {
    menuProfile.addEventListener('click', function (e) {
      e.preventDefault();
      // Update hash to allow deep-linking and back/forward
      if (location.hash !== '#profile') location.hash = '#profile';
      if (!mountView('profile')) {
        window.dispatchEvent(new CustomEvent('academix:notify', {
          detail: {
            entity: 'app',
            action: 'error',
            details: 'My Profile module is not available.'
          }
        }));
      }
    });
  }

  // Auto-mount by hash (supports direct visit or back navigation)
  var applyHashRoute = function applyHashRoute() {
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

/***/ }),

/***/ "./resources/js/components/faculty.js":
/*!********************************************!*\
  !*** ./resources/js/components/faculty.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mountFaculty: () => (/* binding */ mountFaculty)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Faculty management UI (vanilla JS)
// Requires: token in localStorage key `academix_token`

function getTokenOrRedirect() {
  var token = window.localStorage.getItem('academix_token');
  if (!token) {
    window.location.href = '/';
    throw new Error('No token');
  }
  return token;
}
function api(_x) {
  return _api.apply(this, arguments);
}
function _api() {
  _api = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(path) {
    var options,
      token,
      res,
      data,
      _args0 = arguments;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          options = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
          token = getTokenOrRedirect();
          _context0.n = 1;
          return fetch(path, _objectSpread({
            headers: _objectSpread({
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            }, options.headers || {})
          }, options));
        case 1:
          res = _context0.v;
          if (!(res.status === 401)) {
            _context0.n = 2;
            break;
          }
          window.location.href = '/';
          return _context0.a(2, Promise.reject(new Error('Unauthorized')));
        case 2:
          _context0.n = 3;
          return res.json()["catch"](function () {
            return {};
          });
        case 3:
          data = _context0.v;
          if (res.ok) {
            _context0.n = 4;
            break;
          }
          throw new Error(data.message || 'Request failed');
        case 4:
          return _context0.a(2, data);
      }
    }, _callee0);
  }));
  return _api.apply(this, arguments);
}
function h(tag) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var el = document.createElement(tag);
  Object.entries(attrs).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];
    if (k === 'class') el.className = v;else if (k === 'text') el.textContent = v;else el.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(function (c) {
    if (c == null) return;
    if (typeof c === 'string') el.appendChild(document.createTextNode(c));else el.appendChild(c);
  });
  return el;
}
function mountFaculty(rootEl) {
  if (!rootEl) throw new Error('mountFaculty: root element is required');
  rootEl.innerHTML = "\n        <style>\n            .f-wrap{padding:18px;color:var(--ink);font-family:Inter,Segoe UI,Arial,Helvetica,sans-serif}\n            .f-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}\n            .f-title{margin:0;font-size:20px;font-weight:800;letter-spacing:.2px}\n            .f-actions{display:flex;gap:8px;align-items:center}\n            .f-input{padding:8px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--ink);font-size:14px}\n            .f-btn{padding:8px 14px;background:var(--primary);color:#0b1020;border:none;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700}\n            .f-btn:hover{filter:brightness(1.05)}\n            .f-btn-outline{background:transparent;border:1px solid var(--border);color:var(--ink)}\n            .f-btn-outline:hover{background:rgba(148,163,184,.08)}\n            .f-card{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;box-shadow:var(--shadow);overflow:hidden}\n            .f-tablebar{display:flex;justify-content:flex-end;gap:8px;padding:10px 12px;background:rgba(255,255,255,.02);border-bottom:1px solid var(--border)}\n            .f-table{width:100%;border-collapse:collapse;background:transparent}\n            .f-table th{background:transparent;padding:12px;text-align:left;font-weight:700;border-bottom:1px solid var(--border);color:var(--muted);font-size:12px;letter-spacing:.3px;text-transform:uppercase}\n            .f-table td{padding:12px;border-bottom:1px solid var(--border)}\n            .f-table tr:hover{background:rgba(255,255,255,.02)}\n            .f-pill{padding:4px 8px;border-radius:12px;background:#1f2937;border:1px solid #283241;font-size:12px;color:#cbd5e1}\n            .f-small{font-size:12px}\n            .f-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;z-index:2000}\n            .f-modal{width:960px;max-width:96vw;background:#f9fafb;color:#0f172a;border-radius:12px;padding:28px;box-shadow:0 24px 72px rgba(0,0,0,.55)}\n            .f-modal h3{margin:0 0 18px;font-size:22px;font-weight:700;color:#0b1340}\n            .f-modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px 24px;align-items:start}\n            .f-modal-field{margin-bottom:12px}\n            .f-modal-label{display:block;font-size:13.5px;margin-bottom:6px;font-weight:600;color:#0b1340}\n            .f-modal-input{width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;color:#0f172a;font-size:14px}\n            .f-modal-buttons{display:flex;gap:12px;justify-content:flex-end;margin-top:22px}\n            .f-modal-btn{padding:10px 20px;border:none;border-radius:4px;cursor:pointer;font-size:14px;font-weight:500}\n            .f-modal-cancel{background:#64748b;color:#fff}\n            .f-modal-save{background:#2563eb;color:#fff}\n        </style>\n        <div class=\"f-wrap\">\n            <div class=\"f-topbar\">\n                <h2 class=\"f-title\">Faculty</h2>\n                <div class=\"f-actions\">\n                    <input id=\"f-q\" class=\"f-input\" placeholder=\"Search name or email\" style=\"width:200px\" />\n                    <button id=\"f-search\" class=\"f-btn\">Search</button>\n                    <button id=\"f-add\" class=\"f-btn\">Add Faculty</button>\n                    <button id=\"f-archived\" class=\"f-btn f-btn-outline\">Archived</button>\n                </div>\n            </div>\n            <div id=\"f-error\" class=\"f-small\" style=\"color:#ffb3b3;min-height:16px;margin-bottom:12px\"></div>\n            <div class=\"f-card\">\n              <div class=\"f-tablebar\">\n                <select id=\"f-filter-department\" class=\"f-input\" style=\"width:200px\">\n                  <option value=\"\">All Departments</option>\n                </select>\n                <button id=\"f-archived\" class=\"f-btn f-btn-outline\">Archived</button>\n              </div>\n                            <table class=\"f-table\">\n                                <thead>\n                                        <tr><th style=\"width:48px\">#</th><th>Name</th><th>Department</th><th>Position</th><th>Status</th><th>Action</th></tr>\n                                </thead>\n                                <tbody id=\"f-body\"><tr><td colspan=\"6\" class=\"f-small\">Loading\u2026</td></tr></tbody>\n                            </table>\n            </div>\n            <div id=\"f-modal\" class=\"f-modal-overlay\">\n              <div class=\"f-modal\">\n                <h3 id=\"fm-title\">Add Faculty</h3>\n                <div class=\"f-modal-grid\">\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Faculty ID</label>\n                    <input id=\"fm-faculty_id\" class=\"f-modal-input\" placeholder=\"optional\" />\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Date of Birth</label>\n                    <input id=\"fm-dob\" type=\"date\" class=\"f-modal-input\" />\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">First Name</label>\n                    <input id=\"fm-f_name\" class=\"f-modal-input\" />\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Sex</label>\n                    <select id=\"fm-sex\" class=\"f-modal-input\">\n                      <option value=\"\">Select</option>\n                      <option>Male</option>\n                      <option>Female</option>\n                    </select>\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Middle Name</label>\n                    <input id=\"fm-m_name\" class=\"f-modal-input\" />\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Phone Number</label>\n                                        <input id=\"fm-phone\" class=\"f-modal-input\" maxlength=\"11\" inputmode=\"numeric\" placeholder=\"11 digits\" />\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Last Name</label>\n                    <input id=\"fm-l_name\" class=\"f-modal-input\" />\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Email Address</label>\n                    <input id=\"fm-email\" type=\"email\" class=\"f-modal-input\" />\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Suffix</label>\n                    <input id=\"fm-suffix\" class=\"f-modal-input\" />\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Address</label>\n                    <input id=\"fm-address\" class=\"f-modal-input\" />\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Position</label>\n                    <input id=\"fm-position\" class=\"f-modal-input\" placeholder=\"e.g., Professor, Instructor\" />\n                  </div>\n                  <div class=\"f-modal-field\">\n                    <label class=\"f-modal-label\">Department</label>\n                    <select id=\"fm-department\" class=\"f-modal-input\"><option value=\"\">Loading\u2026</option></select>\n                  </div>\n                </div>\n                <div id=\"fm-error\" style=\"color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center\"></div>\n                <div class=\"f-modal-buttons\">\n                  <button id=\"fm-cancel\" class=\"f-modal-btn f-modal-cancel\">Cancel</button>\n                  <button id=\"fm-save\" class=\"f-modal-btn f-modal-save\">Add</button>\n                </div>\n              </div>\n            </div>\n        </div>\n    ";
  var errorBox = rootEl.querySelector('#f-error');
  var qEl = rootEl.querySelector('#f-q');
  var archivedBtn = rootEl.querySelector('#f-archived');
  var filterDepartmentEl = rootEl.querySelector('#f-filter-department');
  var showingArchived = false;
  rootEl.querySelector('#f-search').addEventListener('click', function () {
    return load();
  });
  qEl.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') load();
  });
  // Real-time search as you type
  qEl.addEventListener('input', function () {
    return load();
  });
  rootEl.querySelector('#f-add').addEventListener('click', function () {
    return openModal();
  });
  archivedBtn.addEventListener('click', function () {
    showingArchived = !showingArchived;
    archivedBtn.textContent = showingArchived ? 'Show Active' : 'Archived';
    archivedBtn.style.background = showingArchived ? '#2d6cdf' : 'transparent';
    load();
  });

  // Filter dropdown - reload when changed
  if (filterDepartmentEl) filterDepartmentEl.addEventListener('change', function () {
    return load();
  });

  // Modal helpers
  var modal = rootEl.querySelector('#f-modal');
  var qs = function qs(id) {
    return modal.querySelector(id);
  };
  qs('#fm-cancel').addEventListener('click', function () {
    return closeModal();
  });
  qs('#fm-save').addEventListener('click', saveModal);

  // ensure phone input only accepts digits and max 11 characters
  try {
    var phoneEl = qs('#fm-phone');
    if (phoneEl) {
      phoneEl.addEventListener('input', function (e) {
        var cleaned = phoneEl.value.replace(/\D/g, '').slice(0, 11);
        if (phoneEl.value !== cleaned) phoneEl.value = cleaned;
      });
    }
  } catch (e) {/* ignore if modal not present */}
  function openModal() {
    return _openModal.apply(this, arguments);
  }
  function _openModal() {
    _openModal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var init,
        fmNext,
        fEl,
        _args4 = arguments,
        _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            init = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
            errorBox.textContent = '';
            _context4.n = 1;
            return ensureOptions();
          case 1:
            modal.style.display = 'flex';
            qs('#fm-title').textContent = init ? 'Edit Faculty' : 'Add Faculty';
            qs('#fm-save').textContent = init ? 'Save' : 'Add';
            // reset
            ['#fm-faculty_id', '#fm-f_name', '#fm-m_name', '#fm-l_name', '#fm-suffix', '#fm-dob', '#fm-sex', '#fm-phone', '#fm-email', '#fm-address', '#fm-position', '#fm-department'].forEach(function (sel) {
              var el = qs(sel);
              if (el.tagName === 'SELECT') {
                el.value = '';
              } else {
                el.value = '';
              }
            });
            if (!init) {
              _context4.n = 2;
              break;
            }
            // show display id when editing; dataset.editId remains the primary key
            if (init.display_id) qs('#fm-faculty_id').value = init.display_id;else if (init.faculty_id) qs('#fm-faculty_id').value = init.faculty_id;
            qs('#fm-faculty_id').readOnly = true;
            qs('#fm-f_name').value = init.f_name || '';
            qs('#fm-m_name').value = init.m_name || '';
            qs('#fm-l_name').value = init.l_name || '';
            qs('#fm-suffix').value = init.suffix || '';
            qs('#fm-dob').value = init.date_of_birth || '';
            qs('#fm-sex').value = init.sex || '';
            qs('#fm-phone').value = init.phone_number || '';
            qs('#fm-email').value = init.email_address || '';
            qs('#fm-address').value = init.address || '';
            qs('#fm-position').value = init.position || '';
            qs('#fm-department').value = init.department_id != null ? String(init.department_id) : '';
            modal.dataset.editId = init.faculty_id;
            _context4.n = 6;
            break;
          case 2:
            delete modal.dataset.editId;
            // Pre-fill next faculty display id when adding
            _context4.p = 3;
            _context4.n = 4;
            return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
              var res, _t2;
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.p = _context3.n) {
                  case 0:
                    _context3.p = 0;
                    _context3.n = 1;
                    return api('/api/faculty/next-id');
                  case 1:
                    res = _context3.v;
                    return _context3.a(2, res && res.next_id ? String(res.next_id) : String(2510001));
                  case 2:
                    _context3.p = 2;
                    _t2 = _context3.v;
                    return _context3.a(2, String(2510001));
                }
              }, _callee3, null, [[0, 2]]);
            }))();
          case 4:
            fmNext = _context4.v;
            fEl = qs('#fm-faculty_id');
            fEl.value = fmNext;
            fEl.readOnly = true;
            fEl.placeholder = '(auto-generated)';
            _context4.n = 6;
            break;
          case 5:
            _context4.p = 5;
            _t3 = _context4.v;
          case 6:
            return _context4.a(2);
        }
      }, _callee4, null, [[3, 5]]);
    }));
    return _openModal.apply(this, arguments);
  }
  function closeModal() {
    modal.style.display = 'none';
  }
  function saveModal() {
    return _saveModal.apply(this, arguments);
  } // Options caches
  function _saveModal() {
    _saveModal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var err, rawPhone, digits, payload, isEdit, _t4;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            err = qs('#fm-error');
            err.textContent = '';
            // sanitize phone number: only digits and must be exactly 11 digits
            rawPhone = qs('#fm-phone').value.trim() || '';
            digits = rawPhone.replace(/\D/g, '');
            if (!(digits.length !== 11)) {
              _context5.n = 1;
              break;
            }
            err.textContent = 'Phone number is required and must be exactly 11 digits.';
            return _context5.a(2);
          case 1:
            payload = {
              f_name: qs('#fm-f_name').value.trim(),
              m_name: qs('#fm-m_name').value.trim() || null,
              l_name: qs('#fm-l_name').value.trim(),
              suffix: qs('#fm-suffix').value.trim() || null,
              date_of_birth: qs('#fm-dob').value || null,
              sex: qs('#fm-sex').value || null,
              phone_number: digits || null,
              email_address: qs('#fm-email').value || null,
              address: qs('#fm-address').value || null,
              position: qs('#fm-position').value.trim() || null,
              department_id: Number(qs('#fm-department').value)
            };
            if (!(!payload.f_name || !payload.l_name)) {
              _context5.n = 2;
              break;
            }
            err.textContent = 'First and Last name are required.';
            return _context5.a(2);
          case 2:
            if (payload.department_id) {
              _context5.n = 3;
              break;
            }
            err.textContent = 'Please select Department.';
            return _context5.a(2);
          case 3:
            _context5.p = 3;
            isEdit = Boolean(modal.dataset.editId);
            if (!isEdit) {
              _context5.n = 5;
              break;
            }
            _context5.n = 4;
            return api("/api/faculty/".concat(modal.dataset.editId), {
              method: 'PUT',
              body: JSON.stringify(payload)
            });
          case 4:
            _context5.n = 6;
            break;
          case 5:
            _context5.n = 6;
            return api('/api/faculty', {
              method: 'POST',
              body: JSON.stringify(payload)
            });
          case 6:
            window.dispatchEvent(new CustomEvent('academix:entity', {
              detail: {
                entity: 'faculty',
                action: isEdit ? 'updated' : 'created',
                delta: isEdit ? 0 : 1,
                details: "".concat(payload.f_name, " ").concat(payload.l_name).trim()
              }
            }));
            window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
            closeModal();
            _context5.n = 7;
            return load();
          case 7:
            _context5.n = 9;
            break;
          case 8:
            _context5.p = 8;
            _t4 = _context5.v;
            errorBox.textContent = _t4.message;
          case 9:
            return _context5.a(2);
        }
      }, _callee5, null, [[3, 8]]);
    }));
    return _saveModal.apply(this, arguments);
  }
  var optionsLoaded = false;
  function ensureOptions() {
    return _ensureOptions.apply(this, arguments);
  }
  function _ensureOptions() {
    _ensureOptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var departments, cs, it, fill, _t5, _t6;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            if (!optionsLoaded) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            departments = [];
            _context6.p = 2;
            _context6.n = 3;
            return api('/api/settings/departments');
          case 3:
            departments = _context6.v;
            _context6.n = 5;
            break;
          case 4:
            _context6.p = 4;
            _t5 = _context6.v;
          case 5:
            if (!(!Array.isArray(departments) || departments.length === 0)) {
              _context6.n = 10;
              break;
            }
            _context6.p = 6;
            _context6.n = 7;
            return api('/api/settings/departments', {
              method: 'POST',
              body: JSON.stringify({
                department_name: 'Computer Science'
              })
            });
          case 7:
            cs = _context6.v;
            _context6.n = 8;
            return api('/api/settings/departments', {
              method: 'POST',
              body: JSON.stringify({
                department_name: 'Information Technology'
              })
            });
          case 8:
            it = _context6.v;
            departments = [cs, it].filter(Boolean);
            _context6.n = 10;
            break;
          case 9:
            _context6.p = 9;
            _t6 = _context6.v;
            departments = [];
          case 10:
            fill = function fill(sel, rows, id, label) {
              var el = qs(sel);
              el.innerHTML = '<option value="">Select</option>' + rows.map(function (r) {
                return "<option value=\"".concat(r[id], "\">").concat(r[label] || r[id], "</option>");
              }).join('');
            };
            fill('#fm-department', departments, departments[0] && ('department_id' in departments[0] ? 'department_id' : 'id') || 'department_id', 'department_name');

            // Populate filter dropdown in tablebar
            if (Array.isArray(departments) && departments.length && filterDepartmentEl) {
              filterDepartmentEl.innerHTML = '<option value="">All Departments</option>' + departments.map(function (d) {
                return "<option value=\"".concat(d.department_id || d.id, "\">").concat(d.department_name, "</option>");
              }).join('');
            }
            optionsLoaded = true;
          case 11:
            return _context6.a(2);
        }
      }, _callee6, null, [[6, 9], [2, 4]]);
    }));
    return _ensureOptions.apply(this, arguments);
  }
  function load() {
    return _load.apply(this, arguments);
  }
  function _load() {
    _load = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var page,
        params,
        qVal,
        deptId,
        data,
        _args7 = arguments,
        _t7;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            page = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : 1;
            errorBox.textContent = '';
            params = new URLSearchParams();
            qVal = qEl.value.trim();
            if (qVal) params.set('q', qVal);

            // Add filter parameter
            deptId = filterDepartmentEl && filterDepartmentEl.value;
            if (deptId) params.set('department_id', deptId);
            params.set('page', String(page));
            if (showingArchived) params.set('archived', '1');
            _context7.p = 1;
            window.dispatchEvent(new CustomEvent('academix:notify', {
              detail: {
                entity: 'faculty',
                action: 'fetch:start',
                details: params.toString()
              }
            }));
            _context7.n = 2;
            return api("/api/faculty?".concat(params.toString()));
          case 2:
            data = _context7.v;
            renderRows(data.data || []);
            window.dispatchEvent(new CustomEvent('academix:notify', {
              detail: {
                entity: 'faculty',
                action: 'fetch:end',
                details: "rows=".concat((data.data || []).length)
              }
            }));
            _context7.n = 4;
            break;
          case 3:
            _context7.p = 3;
            _t7 = _context7.v;
            errorBox.textContent = _t7.message;
            window.dispatchEvent(new CustomEvent('academix:notify', {
              detail: {
                entity: 'faculty',
                action: 'fetch:error',
                details: _t7.message
              }
            }));
          case 4:
            return _context7.a(2);
        }
      }, _callee7, null, [[1, 3]]);
    }));
    return _load.apply(this, arguments);
  }
  function renderRows(rows) {
    var tbody = rootEl.querySelector('#f-body');
    tbody.innerHTML = '';
    if (!rows.length) {
      tbody.appendChild(h('tr', {}, [h('td', {
        colspan: 5,
        text: 'No faculty found'
      })]));
      return;
    }
    rows.forEach(function (fac, idx) {
      var _fac$department;
      var number = idx + 1;
      var cells = [h('td', {
        text: String(number)
      }), h('td', {
        text: "".concat(fac.f_name || '', " ").concat(fac.l_name || '').trim()
      }), h('td', {
        text: ((_fac$department = fac.department) === null || _fac$department === void 0 ? void 0 : _fac$department.department_name) || fac.department_name || fac.department_id || ''
      }), h('td', {
        text: fac.position || ''
      }), h('td', {}, [h('span', {
        "class": 'f-pill f-small',
        text: fac.status && String(fac.status).toLowerCase() !== 'active' ? String(fac.status).charAt(0).toUpperCase() + String(fac.status).slice(1) : fac.deleted_at ? 'Archived' : 'Active'
      })])];
      // Actions
      var actions = [];
      if (!showingArchived) {
        actions.push(h('button', {
          "class": 'f-btn f-small',
          'data-action': 'edit',
          'data-id': fac.faculty_id
        }, 'Edit'));
        actions.push(h('span', {
          text: ' '
        }));
        actions.push(h('button', {
          "class": 'f-btn f-small',
          style: 'background:#d32f2f',
          'data-action': 'delete',
          'data-id': fac.faculty_id
        }, 'Archive'));
      } else {
        // In archived view: remove Edit, show Restore and permanent Delete
        actions.push(h('button', {
          "class": 'f-btn f-small',
          style: 'background:#4caf50',
          'data-action': 'restore',
          'data-id': fac.faculty_id
        }, 'Restore'));
        actions.push(h('span', {
          text: ' '
        }));
        actions.push(h('button', {
          "class": 'f-btn f-small',
          style: 'background:#c62828',
          'data-action': 'permanent-delete',
          'data-id': fac.faculty_id
        }, 'Delete'));
      }
      cells.push(h('td', {}, actions));
      var tr = h('tr', {}, cells);
      tbody.appendChild(tr);
    });

    // Add event listeners for Edit/Delete/Restore/Permanent-Delete buttons
    tbody.addEventListener('click', function (e) {
      var action = e.target.dataset.action;
      var id = e.target.dataset.id;
      if (!action || !id) return;
      var faculty = rows.find(function (f) {
        return f.faculty_id == id;
      });
      if (!faculty) return;
      if (action === 'edit') {
        openModal(faculty);
      } else if (action === 'delete') {
        onArchive(faculty);
      } else if (action === 'restore') {
        onRestore(faculty);
      } else if (action === 'permanent-delete') {
        onPermanentDelete(faculty);
      }
    });
    function onPermanentDelete(_x2) {
      return _onPermanentDelete.apply(this, arguments);
    }
    function _onPermanentDelete() {
      _onPermanentDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(fac) {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (confirm('Permanently delete this faculty member? This cannot be undone.')) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.p = 1;
              _context.n = 2;
              return api("/api/faculty/".concat(fac.faculty_id, "/delete"), {
                method: 'POST'
              });
            case 2:
              window.dispatchEvent(new CustomEvent('academix:entity', {
                detail: {
                  entity: 'faculty',
                  action: 'deleted',
                  delta: 0,
                  details: "".concat(fac.f_name || '', " ").concat(fac.l_name || '').trim()
                }
              }));
              window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
              _context.n = 3;
              return load();
            case 3:
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              errorBox.textContent = _t.message;
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[1, 4]]);
      }));
      return _onPermanentDelete.apply(this, arguments);
    }
  }
  function onArchive(_x3) {
    return _onArchive.apply(this, arguments);
  }
  function _onArchive() {
    _onArchive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(fac) {
      var _t8;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            if (confirm('Archive this faculty member?')) {
              _context8.n = 1;
              break;
            }
            return _context8.a(2);
          case 1:
            _context8.p = 1;
            _context8.n = 2;
            return api("/api/faculty/".concat(fac.faculty_id, "/archive"), {
              method: 'POST'
            });
          case 2:
            window.dispatchEvent(new CustomEvent('academix:entity', {
              detail: {
                entity: 'faculty',
                action: 'archived',
                delta: -1,
                details: "".concat(fac.f_name || '', " ").concat(fac.l_name || '').trim()
              }
            }));
            window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
            _context8.n = 3;
            return load();
          case 3:
            _context8.n = 5;
            break;
          case 4:
            _context8.p = 4;
            _t8 = _context8.v;
            errorBox.textContent = _t8.message;
          case 5:
            return _context8.a(2);
        }
      }, _callee8, null, [[1, 4]]);
    }));
    return _onArchive.apply(this, arguments);
  }
  function onRestore(_x4) {
    return _onRestore.apply(this, arguments);
  }
  function _onRestore() {
    _onRestore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(fac) {
      var _t9;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            if (confirm('Restore this faculty member?')) {
              _context9.n = 1;
              break;
            }
            return _context9.a(2);
          case 1:
            _context9.p = 1;
            _context9.n = 2;
            return api("/api/faculty/".concat(fac.faculty_id, "/restore"), {
              method: 'POST'
            });
          case 2:
            window.dispatchEvent(new CustomEvent('academix:entity', {
              detail: {
                entity: 'faculty',
                action: 'restored',
                delta: +1,
                details: "".concat(fac.f_name || '', " ").concat(fac.l_name || '').trim()
              }
            }));
            window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
            _context9.n = 3;
            return load();
          case 3:
            _context9.n = 5;
            break;
          case 4:
            _context9.p = 4;
            _t9 = _context9.v;
            errorBox.textContent = _t9.message;
          case 5:
            return _context9.a(2);
        }
      }, _callee9, null, [[1, 4]]);
    }));
    return _onRestore.apply(this, arguments);
  }
  (function () {
    var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return ensureOptions();
          case 1:
            _context2.n = 2;
            return load();
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    function init() {
      return _init.apply(this, arguments);
    }
    return init;
  })()();
}

/***/ }),

/***/ "./resources/js/components/login.js":
/*!******************************************!*\
  !*** ./resources/js/components/login.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mountLogin: () => (/* binding */ mountLogin)
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Lightweight login UI component (vanilla JS)
// Usage:
//   import { mountLogin } from './components/login';
//   mountLogin(document.getElementById('app'));

function mountLogin(rootEl) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!rootEl) throw new Error('mountLogin: root element is required');
  var bgUrl = options.backgroundUrl || 'https://tse4.mm.bing.net/th/id/OIP.tgQYDIWK0Z67zJ1pohyo4QHaEK?pid=Api&P=0&h=180';
  var logoUrl = options.logoUrl || 'https://tse3.mm.bing.net/th/id/OIP.kNZRsLF495e1651A1kiMvwHaHa?pid=Api&P=0&h=180';
  rootEl.innerHTML = "\n        <style>\n            * { box-sizing: border-box; }\n            body, html { margin: 0; padding: 0; height: 100%; font-family: Arial, Helvetica, sans-serif; }\n\n            .ax-bg {\n                position: fixed;\n                inset: 0;\n                background: url('".concat(bgUrl, "') center/cover no-repeat;\n                filter: brightness(0.6);\n                z-index: -1;\n            }\n            .ax-wrap {\n                min-height: 100vh;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                position: relative;\n            }\n\n            .ax-brand {\n                position: absolute;\n                top: 60px;\n                left: 80px;\n                color: #fff;\n                display: flex;\n                align-items: center;\n                gap: 16px;\n            }\n            .ax-brand img { width: 70px; height: 70px; }\n            .ax-brand h1 { font-size: 48px; margin: 0; font-weight: 700; }\n            .ax-brand p { font-size: 18px; margin: 4px 0 0; opacity: 0.9; }\n\n            .ax-card {\n                background: rgba(0,0,0,0.75);\n                color: #fff;\n                padding: 28px 30px;\n                border-radius: 4px;\n                width: 320px;\n                box-shadow: 0 10px 30px rgba(0,0,0,0.6);\n            }\n            .ax-card h2 {\n                text-align: center;\n                font-size: 20px;\n                font-weight: bold;\n                margin: 0 0 16px;\n                letter-spacing: 1px;\n            }\n\n            .ax-field {\n                margin-bottom: 14px;\n            }\n            .ax-label {\n                display: block;\n                font-size: 14px;\n                margin-bottom: 4px;\n                color: #fff;\n            }\n            .ax-input {\n                width: 100%;\n                padding: 10px;\n                border: none;\n                border-radius: 3px;\n                font-size: 14px;\n                color: #111;\n            }\n            .ax-input:focus {\n                outline: 2px solid #2d6cdf;\n            }\n\n            .ax-actions {\n                text-align: center;\n                margin-top: 18px;\n            }\n            .ax-btn {\n                background: #2d6cdf;\n                color: #fff;\n                border: none;\n                padding: 10px 20px;\n                border-radius: 3px;\n                font-size: 14px;\n                cursor: pointer;\n                transition: background 0.2s;\n            }\n            .ax-btn:hover {\n                background: #1e5bb8;\n            }\n            .ax-btn:disabled {\n                opacity: 0.6;\n                cursor: not-allowed;\n            }\n\n            .ax-error {\n                margin-top: 10px;\n                color: #ffb3b3;\n                text-align: center;\n                font-size: 13px;\n                min-height: 18px;\n            }\n        </style>\n\n        <div class=\"ax-bg\"></div>\n        <div class=\"ax-wrap\">\n            <div class=\"ax-brand\">\n                <img src=\"").concat(logoUrl, "\" alt=\"logo\">\n                <div>\n                    <h1>Academix</h1>\n                    <p>Student Management Portal</p>\n                </div>\n            </div>\n\n            <div class=\"ax-card\">\n                <h2>LOGIN</h2>\n                <div class=\"ax-field\">\n                    <label class=\"ax-label\" for=\"ax-username\">UserName</label>\n                    <input class=\"ax-input\" id=\"ax-username\" autocomplete=\"username\" />\n                </div>\n                <div class=\"ax-field\">\n                    <label class=\"ax-label\" for=\"ax-password\">Password</label>\n                    <input type=\"password\" class=\"ax-input\" id=\"ax-password\" autocomplete=\"current-password\" />\n                </div>\n                <div class=\"ax-actions\">\n                    <button id=\"ax-submit\" class=\"ax-btn\">Sign in</button>\n                </div>\n                <div id=\"ax-error\" class=\"ax-error\"></div>\n            </div>\n        </div>\n    ");
  var $ = function $(sel) {
    return rootEl.querySelector(sel);
  };
  var usernameEl = $('#ax-username');
  var passwordEl = $('#ax-password');
  var submitBtn = $('#ax-submit');
  var errorBox = $('#ax-error');
  function login() {
    return _login.apply(this, arguments);
  }
  function _login() {
    _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var username, password, res, data, _data$errors$username, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            errorBox.textContent = '';
            submitBtn.disabled = true;
            username = usernameEl.value.trim();
            password = passwordEl.value;
            if (!(!username || !password)) {
              _context.n = 1;
              break;
            }
            errorBox.textContent = 'Please enter username and password.';
            submitBtn.disabled = false;
            return _context.a(2);
          case 1:
            _context.p = 1;
            _context.n = 2;
            return fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                username: username,
                password: password,
                device_name: 'web'
              })
            });
          case 2:
            res = _context.v;
            _context.n = 3;
            return res.json()["catch"](function () {
              return {
                ok: false
              };
            });
          case 3:
            data = _context.v;
            if (res.ok && data.token) {
              window.localStorage.setItem('academix_token', data.token);
              if (typeof options.onSuccess === 'function') options.onSuccess(data);
            } else {
              errorBox.textContent = data && data.errors && (((_data$errors$username = data.errors.username) === null || _data$errors$username === void 0 ? void 0 : _data$errors$username[0]) || data.message) || 'Invalid credentials.';
              submitBtn.disabled = false;
            }
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            errorBox.textContent = 'Network error. Please try again.';
            submitBtn.disabled = false;
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 4]]);
    }));
    return _login.apply(this, arguments);
  }
  submitBtn.addEventListener('click', login);
  passwordEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      login();
    }
  });
}

/***/ }),

/***/ "./resources/js/components/myprofile.js":
/*!**********************************************!*\
  !*** ./resources/js/components/myprofile.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mountMyProfile: () => (/* binding */ mountMyProfile)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function requireToken() {
  var token = window.localStorage.getItem('academix_token');
  if (!token) {
    window.location.href = 'index.html';
    throw new Error('No token');
  }
  return token;
}
function api(_x) {
  return _api.apply(this, arguments);
}
function _api() {
  _api = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(url) {
    var options,
      token,
      res,
      data,
      _args7 = arguments;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
          token = requireToken();
          _context7.n = 1;
          return fetch(url, _objectSpread(_objectSpread({}, options), {}, {
            headers: _objectSpread(_objectSpread({
              'Accept': 'application/json'
            }, options.body instanceof FormData ? {} : {
              'Content-Type': 'application/json'
            }), {}, {
              'Authorization': "Bearer ".concat(token)
            }, options.headers || {})
          }));
        case 1:
          res = _context7.v;
          if (!(res.status === 401)) {
            _context7.n = 2;
            break;
          }
          window.localStorage.removeItem('academix_token');
          window.location.href = 'index.html';
          return _context7.a(2);
        case 2:
          _context7.n = 3;
          return res.json()["catch"](function () {
            return {};
          });
        case 3:
          data = _context7.v;
          if (res.ok) {
            _context7.n = 4;
            break;
          }
          throw new Error(data.message || 'Request failed');
        case 4:
          return _context7.a(2, data);
      }
    }, _callee7);
  }));
  return _api.apply(this, arguments);
}
function mountMyProfile(rootEl) {
  if (!rootEl) throw new Error('mountMyProfile: root element is required');
  rootEl.innerHTML = "\n    <style>\n      /* Use global dashboard theme variables */\n      .p-wrap{padding:18px;color:var(--ink);font-family:Inter,Segoe UI,Arial,Helvetica,sans-serif}\n\n      .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}\n      .title{margin:0;font-size:20px;font-weight:800;letter-spacing:.2px}\n\n      .card{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;padding:20px;box-shadow:var(--shadow)}\n\n      .profile{display:flex;align-items:center;gap:18px}\n      .avatar{width:120px;height:120px;border-radius:12px;object-fit:cover;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow)}\n      .name{font-size:18px;font-weight:700;margin:0 0 4px}\n      .uname{font-size:13px;color:var(--muted);margin:0}\n      .name-line{display:flex;align-items:center;gap:8px;flex-wrap:wrap}\n      .badge{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:999px;background:#1f2937;border:1px solid #283241;color:#cbd5e1;font-size:11px;font-weight:700;letter-spacing:.02em}\n      .info{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:8px}\n      .label-sm{color:var(--muted);font-size:11px}\n      .val-sm{font-size:12px}\n\n      .btn{padding:8px 14px;border:none;border-radius:10px;background:var(--primary);color:#0b1020;cursor:pointer;font-weight:700;letter-spacing:.01em;transition:filter .15s, transform .02s}\n      .btn:hover{filter:brightness(1.05)}\n      .btn:active{transform:translateY(1px)}\n      .btn.secondary{background:transparent;border:1px solid var(--border);color:var(--ink)}\n      .btn.secondary:hover{background:rgba(148,163,184,.08)}\n\n      .input{width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--ink);transition:border-color .2s, box-shadow .2s}\n      .input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(96,165,250,.15)}\n\n      .label{display:block;font-size:12px;margin:10px 0 6px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}\n      .muted{color:var(--muted);font-size:12px}\n      .error{color:#ffb3b3;font-size:12px;min-height:16px;margin-top:8px}\n\n      .row{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n\n      .controls{display:flex;gap:10px;align-items:center}\n\n      .hidden{display:none}\n\n      .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:1000}\n      .modal{width:min(640px,95vw);max-height:90vh;overflow:auto;background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:18px;box-shadow:var(--shadow)}\n      .modal h3{margin:0 0 8px;font-size:18px}\n      .modal-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}\n\n      .form-grid{display:grid;gap:12px}\n      .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n\n      @media (max-width: 640px){ .row{grid-template-columns:1fr} .profile{flex-direction:column;align-items:flex-start} .grid-2{grid-template-columns:1fr} }\n    </style>\n\n    <div class=\"p-wrap\">\n      <div class=\"header\">\n        <h2 class=\"title\">My Profile</h2>\n        <div class=\"controls\">\n          <button id=\"pf-logout\" class=\"btn secondary\">Log out</button>\n          <button id=\"pf-edit\" class=\"btn\">Edit Profile</button>\n        </div>\n      </div>\n\n      <div class=\"card\">\n        <div class=\"profile\">\n          <img id=\"pf-avatar\" class=\"avatar\" src=\"\" alt=\"avatar\" />\n          <div style=\"flex:1\">\n            <div class=\"name-line\">\n              <p id=\"pf-name\" class=\"name\">&nbsp;</p>\n              <span id=\"pf-role\" class=\"badge\">User</span>\n            </div>\n            <p id=\"pf-uname\" class=\"uname\">&nbsp;</p>\n            <div class=\"info\">\n              <div>\n                <div class=\"label-sm\">User</div>\n                <div id=\"pf-info-user\" class=\"val-sm\">\u2014</div>\n              </div>\n              <div>\n                <div class=\"label-sm\">Email</div>\n                <div id=\"pf-info-email\" class=\"val-sm\">\u2014</div>\n              </div>\n              <div>\n                <div class=\"label-sm\">Role</div>\n                <div id=\"pf-info-role\" class=\"val-sm\">\u2014</div>\n              </div>\n            </div>\n            <div class=\"controls\" style=\"margin-top:10px\">\n              <input id=\"pf-file\" type=\"file\" accept=\"image/*\" />\n              <button id=\"pf-upload\" class=\"btn secondary\">Upload Avatar</button>\n            </div>\n            <div class=\"muted\" style=\"margin-top:6px\">PNG/JPG, \u2264 5MB</div>\n            <div id=\"pf-avatar-error\" class=\"error\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"pf-modal\" class=\"modal-backdrop\">\n      <div class=\"modal\">\n        <h3>Edit Account</h3>\n        <div class=\"muted\">Update your profile info or change your password. Leave password fields blank to keep your current password.</div>\n        <div class=\"form-grid\" style=\"margin-top:8px\">\n          <div>\n            <label class=\"label\">Name</label>\n            <input id=\"pf-name-input\" class=\"input\" placeholder=\"Full name\" />\n          </div>\n          <div>\n            <label class=\"label\">Username</label>\n            <input id=\"pf-username\" class=\"input\" placeholder=\"Username\" />\n          </div>\n          <div>\n            <label class=\"label\">Email</label>\n            <input id=\"pf-email\" type=\"email\" class=\"input\" placeholder=\"Email\" />\n          </div>\n          <div>\n            <label class=\"label\">Role</label>\n            <select id=\"pf-role-input\" class=\"input\">\n              <option value=\"User\">User</option>\n              <option value=\"Admin\">Admin</option>\n            </select>\n          </div>\n          <div>\n            <label class=\"label\">Current Password</label>\n            <input id=\"pf-acc-current\" type=\"password\" class=\"input\" placeholder=\"Required if changing password\" />\n          </div>\n          <div class=\"grid-2\">\n            <div>\n              <label class=\"label\">New Password</label>\n              <input id=\"pf-acc-new\" type=\"password\" class=\"input\" />\n            </div>\n            <div>\n              <label class=\"label\">Confirm New Password</label>\n              <input id=\"pf-acc-confirm\" type=\"password\" class=\"input\" />\n            </div>\n          </div>\n        </div>\n        <div id=\"pf-account-error\" class=\"error\"></div>\n        <div class=\"modal-actions\">\n          <button id=\"pf-cancel\" class=\"btn secondary\">Cancel</button>\n          <button id=\"pf-account-save\" class=\"btn\">Save</button>\n        </div>\n      </div>\n    </div>\n  ";
  var qs = function qs(s) {
    return rootEl.querySelector(s);
  };
  var setText = function setText(sel, txt) {
    var el = qs(sel);
    if (el) {
      el.textContent = txt;
    } else {
      try {
        console.warn('[MyProfile] Missing element for selector:', sel);
      } catch (_) {}
    }
  };
  var setSrc = function setSrc(sel, url) {
    var el = qs(sel);
    if (el) el.src = url;
  };
  var notify = function notify(action, details) {
    window.dispatchEvent(new CustomEvent('academix:notify', {
      detail: {
        entity: 'profile',
        action: action,
        details: details
      }
    }));
  };
  function normalizeAvatarUrl(u) {
    if (!u) return u;
    try {
      var url = new URL(u, window.location.origin);
      // If different origin but under /storage, use relative path to avoid CORS and host mismatch
      if (url.origin !== window.location.origin) {
        if (url.pathname.startsWith('/storage/')) return url.pathname;
        return null; // skip using cross-origin avatar
      }
      return url.href;
    } catch (_) {
      return u;
    }
  }
  var currentUser = null;
  var AVATAR_KEY = 'academix_avatar_url';
  var AVATAR_DATA_KEY = 'academix_avatar_dataurl';
  function fileToDataURL(_x2) {
    return _fileToDataURL.apply(this, arguments);
  }
  function _fileToDataURL() {
    _fileToDataURL = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(file) {
      var maxSize,
        _args4 = arguments;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            maxSize = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 256;
            return _context4.a(2, new Promise(function (resolve, reject) {
              var reader = new FileReader();
              reader.onerror = function () {
                return reject(new Error('Failed to read image'));
              };
              reader.onload = function () {
                var img = new Image();
                img.onload = function () {
                  try {
                    var scale = Math.min(1, maxSize / Math.max(img.width, img.height));
                    var w = Math.max(1, Math.round(img.width * scale));
                    var h = Math.max(1, Math.round(img.height * scale));
                    var canvas = document.createElement('canvas');
                    canvas.width = w;
                    canvas.height = h;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, w, h);
                    resolve(canvas.toDataURL('image/jpeg', 0.9));
                  } catch (e) {
                    resolve(reader.result);
                  }
                };
                img.onerror = function () {
                  return resolve(reader.result);
                };
                img.src = reader.result;
              };
              reader.readAsDataURL(file);
            }));
        }
      }, _callee4);
    }));
    return _fileToDataURL.apply(this, arguments);
  }
  function cacheAvatarFromUrl(_x3) {
    return _cacheAvatarFromUrl.apply(this, arguments);
  }
  function _cacheAvatarFromUrl() {
    _cacheAvatarFromUrl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(url) {
      var res, blob, dataUrl, _t6;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            _context5.p = 0;
            _context5.n = 1;
            return fetch(url, {
              mode: 'cors'
            });
          case 1:
            res = _context5.v;
            if (res.ok) {
              _context5.n = 2;
              break;
            }
            return _context5.a(2);
          case 2:
            _context5.n = 3;
            return res.blob();
          case 3:
            blob = _context5.v;
            _context5.n = 4;
            return fileToDataURL(blob);
          case 4:
            dataUrl = _context5.v;
            window.localStorage.setItem(AVATAR_DATA_KEY, dataUrl);
            _context5.n = 6;
            break;
          case 5:
            _context5.p = 5;
            _t6 = _context5.v;
          case 6:
            return _context5.a(2);
        }
      }, _callee5, null, [[0, 5]]);
    }));
    return _cacheAvatarFromUrl.apply(this, arguments);
  }
  function loadMe() {
    return _loadMe.apply(this, arguments);
  }
  function _loadMe() {
    _loadMe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var me, _cachedData, normalizedRemote, avatarUrl, imgEl, u, full, uname, email, isAdmin, roleText, uEl, nEl, eEl, rEl, er, _t7;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            _context6.p = 0;
            _context6.n = 1;
            return api('/api/me');
          case 1:
            me = _context6.v;
            if (me) {
              _context6.n = 2;
              break;
            }
            return _context6.a(2);
          case 2:
            currentUser = me;
            _cachedData = window.localStorage.getItem(AVATAR_DATA_KEY);
            normalizedRemote = normalizeAvatarUrl(me.avatar_url || window.localStorage.getItem(AVATAR_KEY));
            avatarUrl = _cachedData || normalizedRemote || 'https://via.placeholder.com/120x120?text=Avatar';
            imgEl = qs('#pf-avatar');
            if (imgEl) imgEl.src = avatarUrl;
            if (normalizedRemote) {
              try {
                window.localStorage.setItem(AVATAR_KEY, normalizedRemote);
              } catch (_) {}
              // Only attempt fetch/cache when same-origin
              try {
                u = new URL(normalizedRemote, window.location.origin);
                if (u.origin === window.location.origin) cacheAvatarFromUrl(normalizedRemote);
              } catch (_) {}
            }
            full = me.name && String(me.name).trim() || [me.f_name, me.l_name].filter(Boolean).join(' ');
            setText('#pf-name', full || '—');
            uname = me.username || me.user_name || me.email || me.email_address || '';
            setText('#pf-uname', uname ? '@' + uname : '');
            setText('#pf-info-user', uname ? '@' + uname : '—');
            email = me.email || me.email_address || '';
            setText('#pf-info-email', email || '—');
            isAdmin = me.is_admin === true || typeof me.role === 'string' && me.role.toLowerCase().includes('admin') || Array.isArray(me.roles) && me.roles.some(function (r) {
              return String(r).toLowerCase().includes('admin');
            });
            roleText = isAdmin ? 'Admin' : me.role || me.user_type || (Array.isArray(me.roles) ? me.roles[0] : '') || 'User';
            setText('#pf-role', roleText);
            setText('#pf-info-role', roleText);
            uEl = qs('#pf-username');
            if (uEl) uEl.value = uname;
            nEl = qs('#pf-name-input');
            if (nEl) nEl.value = full || '';
            eEl = qs('#pf-email');
            if (eEl) eEl.value = email || '';
            rEl = qs('#pf-role-input');
            if (rEl) rEl.value = roleText;
            _context6.n = 4;
            break;
          case 3:
            _context6.p = 3;
            _t7 = _context6.v;
            er = qs('#pf-account-error');
            if (er) er.textContent = _t7.message;
          case 4:
            return _context6.a(2);
        }
      }, _callee6, null, [[0, 3]]);
    }));
    return _loadMe.apply(this, arguments);
  }
  var modal = qs('#pf-modal');
  var openModal = function openModal() {
    if (modal) modal.style.display = 'flex';
  };
  var closeModal = function closeModal() {
    if (modal) modal.style.display = 'none';
  };
  var editBtn = qs('#pf-edit');
  if (editBtn) {
    editBtn.addEventListener('click', openModal);
  }
  var cancelBtn = qs('#pf-cancel');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }
  var fileInput = qs('#pf-file');
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var file = fileInput.files && fileInput.files[0];
      var err = qs('#pf-avatar-error');
      if (err) err.textContent = '';
      if (!file) {
        if (err) err.textContent = 'No file selected.';
        return;
      }
      var validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        if (err) err.textContent = 'Unsupported file type.';
        fileInput.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        if (err) err.textContent = 'Image must be ≤ 5MB.';
        fileInput.value = '';
        return;
      }
      // Do not preview or cache yet; wait for Upload click
    });
  }
  qs('#pf-upload').addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var file, err, uploadBtn, validTypes, fd, parseAvatarUrl, data, newUrl, normalized, imgEl2, dataUrl, u, _t, _t2, _t3;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          file = qs('#pf-file').files && qs('#pf-file').files[0];
          err = qs('#pf-avatar-error');
          if (err) err.textContent = '';
          uploadBtn = qs('#pf-upload');
          if (file) {
            _context.n = 1;
            break;
          }
          if (err) err.textContent = 'Please choose an image file.';
          return _context.a(2);
        case 1:
          validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
          if (validTypes.includes(file.type)) {
            _context.n = 2;
            break;
          }
          if (err) err.textContent = 'Unsupported file type.';
          return _context.a(2);
        case 2:
          if (!(file.size > 5 * 1024 * 1024)) {
            _context.n = 3;
            break;
          }
          if (err) err.textContent = 'Image must be ≤ 5MB.';
          return _context.a(2);
        case 3:
          if (uploadBtn) {
            uploadBtn.disabled = true;
            uploadBtn.textContent = 'Uploading...';
          }
          fd = new FormData();
          fd.append('avatar', file);
          parseAvatarUrl = function parseAvatarUrl(data) {
            if (!data || _typeof(data) !== 'object') return '';
            return data.avatar_url || data.url || data.data && (data.data.avatar_url || data.data.url) || data.path || '';
          };
          _context.p = 4;
          _context.n = 5;
          return api('/api/me/avatar', {
            method: 'POST',
            body: fd
          });
        case 5:
          data = _context.v;
          newUrl = parseAvatarUrl(data);
          if (newUrl) {
            _context.n = 7;
            break;
          }
          _context.n = 6;
          return api('/api/user/avatar', {
            method: 'POST',
            body: fd
          });
        case 6:
          data = _context.v;
          newUrl = parseAvatarUrl(data);
        case 7:
          if (newUrl) {
            _context.n = 8;
            break;
          }
          throw new Error('Upload succeeded but no avatar URL returned.');
        case 8:
          normalized = normalizeAvatarUrl(newUrl) || newUrl;
          imgEl2 = qs('#pf-avatar');
          if (imgEl2) imgEl2.src = normalized;
          try {
            window.localStorage.setItem(AVATAR_KEY, normalized);
          } catch (_) {}
          _context.p = 9;
          _context.n = 10;
          return fileToDataURL(file);
        case 10:
          dataUrl = _context.v;
          window.localStorage.setItem(AVATAR_DATA_KEY, dataUrl);
          _context.n = 12;
          break;
        case 11:
          _context.p = 11;
          _t = _context.v;
        case 12:
          _context.p = 12;
          u = new URL(normalized, window.location.origin);
          if (!(u.origin === window.location.origin)) {
            _context.n = 13;
            break;
          }
          _context.n = 13;
          return cacheAvatarFromUrl(normalized);
        case 13:
          _context.n = 15;
          break;
        case 14:
          _context.p = 14;
          _t2 = _context.v;
        case 15:
          notify('avatar_updated', file.name);
          _context.n = 17;
          break;
        case 16:
          _context.p = 16;
          _t3 = _context.v;
          if (err) err.textContent = _t3.message || 'Upload failed.';
        case 17:
          _context.p = 17;
          if (uploadBtn) {
            uploadBtn.disabled = false;
            uploadBtn.textContent = 'Upload Avatar';
          }
          return _context.f(17);
        case 18:
          return _context.a(2);
      }
    }, _callee, null, [[12, 14], [9, 11], [4, 16, 17, 18]]);
  })));
  var accSave = qs('#pf-account-save');
  if (accSave) {
    accSave.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _qs, _qs2, _qs3, _qs4, _qs5, _qs6, _qs7;
      var name, email, username, roleSelected, current_password, new_password, confirm_password, err, payload, parts, _t4;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            name = (((_qs = qs('#pf-name-input')) === null || _qs === void 0 ? void 0 : _qs.value) || '').trim();
            email = (((_qs2 = qs('#pf-email')) === null || _qs2 === void 0 ? void 0 : _qs2.value) || '').trim();
            username = (((_qs3 = qs('#pf-username')) === null || _qs3 === void 0 ? void 0 : _qs3.value) || '').trim();
            roleSelected = ((_qs4 = qs('#pf-role-input')) === null || _qs4 === void 0 ? void 0 : _qs4.value) || 'User';
            current_password = ((_qs5 = qs('#pf-acc-current')) === null || _qs5 === void 0 ? void 0 : _qs5.value) || '';
            new_password = ((_qs6 = qs('#pf-acc-new')) === null || _qs6 === void 0 ? void 0 : _qs6.value) || '';
            confirm_password = ((_qs7 = qs('#pf-acc-confirm')) === null || _qs7 === void 0 ? void 0 : _qs7.value) || '';
            err = qs('#pf-account-error');
            if (err) err.textContent = '';
            if (username) {
              _context2.n = 1;
              break;
            }
            if (err) err.textContent = 'Username is required.';
            return _context2.a(2);
          case 1:
            if (email) {
              _context2.n = 2;
              break;
            }
            if (err) err.textContent = 'Email is required.';
            return _context2.a(2);
          case 2:
            if (name) {
              _context2.n = 3;
              break;
            }
            if (err) err.textContent = 'Name is required.';
            return _context2.a(2);
          case 3:
            if (!(new_password || confirm_password)) {
              _context2.n = 5;
              break;
            }
            if (current_password) {
              _context2.n = 4;
              break;
            }
            if (err) err.textContent = 'Current password is required.';
            return _context2.a(2);
          case 4:
            if (!(new_password !== confirm_password)) {
              _context2.n = 5;
              break;
            }
            if (err) err.textContent = 'Passwords do not match.';
            return _context2.a(2);
          case 5:
            _context2.p = 5;
            // Try to support both single-field and first/last name APIs
            payload = {
              name: name,
              username: username,
              email: email,
              role: roleSelected,
              user_type: roleSelected,
              is_admin: roleSelected === 'Admin'
            };
            parts = name.split(' ');
            if (parts.length >= 2) {
              payload.f_name = parts.slice(0, -1).join(' ');
              payload.l_name = parts.slice(-1).join(' ');
            }
            _context2.n = 6;
            return api('/api/me', {
              method: 'PUT',
              body: JSON.stringify(payload)
            });
          case 6:
            // Optimistically update UI without waiting for fresh fetch
            currentUser = _objectSpread(_objectSpread({}, currentUser || {}), {}, {
              name: name,
              username: username,
              email: email,
              role: roleSelected,
              user_type: roleSelected,
              is_admin: roleSelected === 'Admin'
            });
            setText('#pf-name', name);
            setText('#pf-uname', username ? '@' + username : '');
            setText('#pf-info-user', username ? '@' + username : '—');
            setText('#pf-info-email', email || '—');
            setText('#pf-role', roleSelected);
            setText('#pf-info-role', roleSelected);

            // Update password if provided
            if (!new_password) {
              _context2.n = 7;
              break;
            }
            _context2.n = 7;
            return api('/api/me/password', {
              method: 'POST',
              body: JSON.stringify({
                current_password: current_password,
                new_password: new_password,
                confirm_password: confirm_password
              })
            });
          case 7:
            notify('credentials_updated', 'Account updated');
            closeModal();
            // Also refresh from server to reflect any canonical values
            _context2.n = 8;
            return loadMe();
          case 8:
            _context2.n = 10;
            break;
          case 9:
            _context2.p = 9;
            _t4 = _context2.v;
            if (err) err.textContent = _t4.message;
          case 10:
            return _context2.a(2);
        }
      }, _callee2, null, [[5, 9]]);
    })));
  }

  // Preload avatar from localStorage while fetching profile
  try {
    var cachedData = window.localStorage.getItem(AVATAR_DATA_KEY);
    var cachedUrl = window.localStorage.getItem(AVATAR_KEY);
    var img = qs('#pf-avatar');
    if (img && (cachedData || cachedUrl)) {
      img.src = cachedData || cachedUrl;
    }
  } catch (_) {}

  // Logout handler
  var logoutBtn = qs('#pf-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _t5;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return api('/api/logout', {
              method: 'POST'
            });
          case 1:
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t5 = _context3.v;
          case 3:
            try {
              window.localStorage.removeItem('academix_token');
            } catch (_) {}
            window.location.href = '/';
          case 4:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    })));
  }
  loadMe();
}

/***/ }),

/***/ "./resources/js/components/report.js":
/*!*******************************************!*\
  !*** ./resources/js/components/report.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mountReport: () => (/* binding */ mountReport)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// report.js
// Report management UI (vanilla JS) - Admin only
// Requires: token in localStorage key `academix_token`

function getTokenOrRedirect() {
  var token = window.localStorage.getItem('academix_token');
  if (!token) {
    window.location.href = '/';
    throw new Error('No token');
  }
  return token;
}
function api(_x) {
  return _api.apply(this, arguments);
}
function _api() {
  _api = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(path) {
    var options,
      token,
      res,
      data,
      _args5 = arguments;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          token = getTokenOrRedirect();
          _context5.n = 1;
          return fetch(path, _objectSpread({
            headers: _objectSpread({
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            }, options.headers || {})
          }, options));
        case 1:
          res = _context5.v;
          if (!(res.status === 401)) {
            _context5.n = 2;
            break;
          }
          window.location.href = '/';
          return _context5.a(2, Promise.reject(new Error('Unauthorized')));
        case 2:
          _context5.n = 3;
          return res.json()["catch"](function () {
            return {};
          });
        case 3:
          data = _context5.v;
          if (res.ok) {
            _context5.n = 4;
            break;
          }
          throw new Error(data.message || 'Request failed');
        case 4:
          return _context5.a(2, data);
      }
    }, _callee5);
  }));
  return _api.apply(this, arguments);
}
function h(tag) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var el = document.createElement(tag);
  Object.entries(attrs).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];
    if (k === 'class') el.className = v;else if (k === 'text') el.textContent = v;else el.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(function (c) {
    if (c == null) return;
    if (typeof c === 'string') el.appendChild(document.createTextNode(c));else el.appendChild(c);
  });
  return el;
}
function mountReport(rootEl) {
  if (!rootEl) throw new Error('mountReport: root element is required');

  // Full UI template (same structure as settings)
  rootEl.innerHTML = "\n        <style>\n            .st-wrap{padding:18px;color:var(--ink);font-family:Inter,Segoe UI,Arial,Helvetica,sans-serif}\n            .st-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}\n            .st-title{margin:0;font-size:20px;font-weight:800;letter-spacing:.2px}\n            .st-search{display:flex;gap:8px;align-items:center;margin-bottom:12px}\n            .st-input{padding:8px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--ink);font-size:14px}\n            .st-tabs{display:flex;gap:4px;margin-bottom:12px}\n            .st-tab{padding:8px 14px;background:rgba(255,255,255,.02);color:var(--ink);border:1px solid var(--border);border-bottom:none;border-radius:10px 10px 0 0;cursor:pointer;font-size:14px}\n            .st-tab.active{background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));color:var(--ink)}\n            .st-tab:hover:not(.active){filter:brightness(1.05)}\n            .st-content{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;padding:16px;min-height:400px;box-shadow:var(--shadow)}\n            .st-actions{display:flex;gap:8px;align-items:center;margin-bottom:12px}\n            .st-btn{padding:8px 14px;background:var(--primary);color:#0b1020;border:none;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700}\n            .st-btn:hover{filter:brightness(1.05)}\n            .st-btn-outline{background:transparent;border:1px solid var(--border);color:var(--ink)}\n            .st-btn-outline:hover{background:rgba(148,163,184,.08)}\n            .st-table{width:100%;border-collapse:collapse;background:transparent;border-radius:14px;overflow:hidden}\n            .st-table th{background:transparent;padding:12px;text-align:left;font-weight:700;border-bottom:1px solid var(--border);color:var(--muted);font-size:12px;letter-spacing:.3px;text-transform:uppercase}\n            .st-table td{padding:12px;border-bottom:1px solid var(--border)}\n            .st-table tr:hover{background:rgba(255,255,255,.02)}\n            .st-pill{padding:4px 8px;border-radius:12px;background:#1f2937;border:1px solid #283241;font-size:12px;color:#cbd5e1}\n            .st-small{font-size:12px}\n            .st-error{color:#ffb3b3;font-size:12px;min-height:16px;margin-bottom:12px}\n        </style>\n        <div class=\"st-wrap\">\n            <div class=\"st-topbar\">\n                <h2 class=\"st-title\">Reports</h2>\n            </div>\n            <div class=\"st-search\">\n                <input id=\"st-search\" class=\"st-input\" placeholder=\"SEARCH\" style=\"width:200px\" />\n            </div>\n            <div class=\"st-tabs\">\n                <button class=\"st-tab active\" data-tab=\"students\">Students</button>\n                <button class=\"st-tab\" data-tab=\"faculty\">Faculty</button>\n            </div>\n            <div class=\"st-content\">\n                <div id=\"st-students\" class=\"st-tab-content\">\n                    <div class=\"st-actions\">\n                        <label style=\"color:#ddd;font-size:14px;margin-right:8px\">Filter by Course:</label>\n                        <select id=\"st-course-filter\" class=\"st-input\" style=\"width:250px\">\n                            <option value=\"\">All Courses</option>\n                        </select>\n                        <button id=\"st-generate-students\" class=\"st-btn\">Generate Report</button>\n                    </div>\n                    <div id=\"st-error-students\" class=\"st-error\"></div>\n                    <table class=\"st-table\">\n                        <thead>\n                            <tr><th>Student ID</th><th>Name</th><th>Course</th><th>Department</th><th>Year Level</th><th>Email</th><th>Phone</th></tr>\n                        </thead>\n                        <tbody id=\"st-body-students\"><tr><td colspan=\"7\" class=\"st-small\">Click \"Generate Report\" to load data</td></tr></tbody>\n                    </table>\n                </div>\n                <div id=\"st-faculty\" class=\"st-tab-content\" style=\"display:none\">\n                    <div class=\"st-actions\">\n                        <label style=\"color:#ddd;font-size:14px;margin-right:8px\">Filter by Department:</label>\n                        <select id=\"st-department-filter\" class=\"st-input\" style=\"width:250px\">\n                            <option value=\"\">All Departments</option>\n                        </select>\n                        <button id=\"st-generate-faculty\" class=\"st-btn\">Generate Report</button>\n                    </div>\n                    <div id=\"st-error-faculty\" class=\"st-error\"></div>\n                    <table class=\"st-table\">\n                        <thead>\n                            <tr><th>Faculty ID</th><th>Name</th><th>Department</th><th>Position</th><th>Email</th><th>Phone</th></tr>\n                        </thead>\n                        <tbody id=\"st-body-faculty\"><tr><td colspan=\"6\" class=\"st-small\">Click \"Generate Report\" to load data</td></tr></tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n    ";

  // State
  var currentTab = 'students';
  var courses = [];
  var departments = [];
  var allStudents = [];
  var allFaculty = [];
  var searchEl = rootEl.querySelector('#st-search');

  // Tab switching
  rootEl.querySelectorAll('.st-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      switchTab(tab.dataset.tab);
    });
  });
  function switchTab(tabName) {
    currentTab = tabName;
    // Update tab buttons
    rootEl.querySelectorAll('.st-tab').forEach(function (t) {
      return t.classList.remove('active');
    });
    rootEl.querySelector("[data-tab=\"".concat(tabName, "\"]")).classList.add('active');
    // Update content
    rootEl.querySelectorAll('.st-tab-content').forEach(function (c) {
      return c.style.display = 'none';
    });
    rootEl.querySelector("#st-".concat(tabName)).style.display = 'block';
    // Clear search when switching tabs
    searchEl.value = '';
  }

  // Search functionality
  searchEl.addEventListener('input', function () {
    filterAndRender();
  });
  searchEl.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') filterAndRender();
  });

  // Load courses and departments for filters
  function loadFilters() {
    return _loadFilters.apply(this, arguments);
  } // Load Students Report
  function _loadFilters() {
    _loadFilters = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var courseSelect, deptSelect, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return api('/api/reports/courses');
          case 1:
            courses = _context.v;
            courseSelect = rootEl.querySelector('#st-course-filter');
            courseSelect.innerHTML = '<option value="">All Courses</option>' + courses.map(function (c) {
              var _c$department;
              return "<option value=\"".concat(c.course_id, "\">").concat(c.course_name, " (").concat(((_c$department = c.department) === null || _c$department === void 0 ? void 0 : _c$department.department_name) || 'N/A', ")</option>");
            }).join('');

            // Load departments
            _context.n = 2;
            return api('/api/reports/departments');
          case 2:
            departments = _context.v;
            deptSelect = rootEl.querySelector('#st-department-filter');
            deptSelect.innerHTML = '<option value="">All Departments</option>' + departments.map(function (d) {
              return "<option value=\"".concat(d.department_id, "\">").concat(d.department_name, "</option>");
            }).join('');
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            console.error('Failed to load filters:', _t);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 3]]);
    }));
    return _loadFilters.apply(this, arguments);
  }
  function loadStudents() {
    return _loadStudents.apply(this, arguments);
  } // Load Faculty Report
  function _loadStudents() {
    _loadStudents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var errorEl, tbody, courseId, params, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            errorEl = rootEl.querySelector('#st-error-students');
            tbody = rootEl.querySelector('#st-body-students');
            errorEl.textContent = '';
            tbody.innerHTML = '<tr><td colspan="7" class="st-small">Loading…</td></tr>';
            _context2.p = 1;
            courseId = rootEl.querySelector('#st-course-filter').value;
            params = new URLSearchParams();
            if (courseId) params.set('course_id', courseId);
            _context2.n = 2;
            return api("/api/reports/students?".concat(params.toString()));
          case 2:
            data = _context2.v;
            allStudents = Array.isArray(data) ? data : [];
            filterAndRender();
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            errorEl.textContent = _t2.message;
            tbody.innerHTML = '<tr><td colspan="7" class="st-small">Failed to load data</td></tr>';
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    }));
    return _loadStudents.apply(this, arguments);
  }
  function loadFaculty() {
    return _loadFaculty.apply(this, arguments);
  } // Generate Students Report button
  function _loadFaculty() {
    _loadFaculty = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var errorEl, tbody, deptId, params, data, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            errorEl = rootEl.querySelector('#st-error-faculty');
            tbody = rootEl.querySelector('#st-body-faculty');
            errorEl.textContent = '';
            tbody.innerHTML = '<tr><td colspan="6" class="st-small">Loading…</td></tr>';
            _context3.p = 1;
            deptId = rootEl.querySelector('#st-department-filter').value;
            params = new URLSearchParams();
            if (deptId) params.set('department_id', deptId);
            _context3.n = 2;
            return api("/api/reports/faculty?".concat(params.toString()));
          case 2:
            data = _context3.v;
            allFaculty = Array.isArray(data) ? data : [];
            filterAndRender();
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t3 = _context3.v;
            errorEl.textContent = _t3.message;
            tbody.innerHTML = '<tr><td colspan="6" class="st-small">Failed to load data</td></tr>';
          case 4:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 3]]);
    }));
    return _loadFaculty.apply(this, arguments);
  }
  rootEl.querySelector('#st-generate-students').addEventListener('click', loadStudents);

  // Generate Faculty Report button
  rootEl.querySelector('#st-generate-faculty').addEventListener('click', loadFaculty);

  // Filter change listeners - do not auto-generate; user must click Generate

  // Render Students
  function renderStudents(students) {
    var tbody = rootEl.querySelector('#st-body-students');
    tbody.innerHTML = '';
    if (!students.length) {
      tbody.appendChild(h('tr', {}, [h('td', {
        colspan: 7,
        text: 'No students found'
      })]));
      return;
    }
    students.forEach(function (student) {
      var _student$course, _student$department;
      var fullName = [student.f_name, student.m_name, student.l_name, student.suffix].filter(Boolean).join(' ');
      var courseName = ((_student$course = student.course) === null || _student$course === void 0 ? void 0 : _student$course.course_name) || 'N/A';
      var deptName = ((_student$department = student.department) === null || _student$department === void 0 ? void 0 : _student$department.department_name) || 'N/A';
      var tr = h('tr', {}, [h('td', {
        text: student.student_id || 'N/A'
      }), h('td', {
        text: fullName
      }), h('td', {
        text: courseName
      }), h('td', {
        text: deptName
      }), h('td', {
        text: student.year_level || 'N/A'
      }), h('td', {
        text: student.email_address || 'N/A'
      }), h('td', {
        text: student.phone_number || 'N/A'
      })]);
      tbody.appendChild(tr);
    });
  }

  // Render Faculty
  function renderFaculty(faculty) {
    var tbody = rootEl.querySelector('#st-body-faculty');
    tbody.innerHTML = '';
    if (!faculty.length) {
      tbody.appendChild(h('tr', {}, [h('td', {
        colspan: 6,
        text: 'No faculty found'
      })]));
      return;
    }
    faculty.forEach(function (fac) {
      var _fac$department;
      var fullName = [fac.f_name, fac.m_name, fac.l_name, fac.suffix].filter(Boolean).join(' ');
      var deptName = ((_fac$department = fac.department) === null || _fac$department === void 0 ? void 0 : _fac$department.department_name) || 'N/A';
      var tr = h('tr', {}, [h('td', {
        text: fac.faculty_id || 'N/A'
      }), h('td', {
        text: fullName
      }), h('td', {
        text: deptName
      }), h('td', {
        text: fac.position || 'N/A'
      }), h('td', {
        text: fac.email_address || 'N/A'
      }), h('td', {
        text: fac.phone_number || 'N/A'
      })]);
      tbody.appendChild(tr);
    });
  }

  // Filter and render based on search
  function filterAndRender() {
    var searchTerm = searchEl.value.trim().toLowerCase();
    if (currentTab === 'students') {
      var filtered = allStudents;
      if (searchTerm) {
        filtered = filtered.filter(function (s) {
          var _s$course, _s$department;
          var fullName = [s.f_name, s.m_name, s.l_name, s.suffix].filter(Boolean).join(' ').toLowerCase();
          var courseName = (((_s$course = s.course) === null || _s$course === void 0 ? void 0 : _s$course.course_name) || '').toLowerCase();
          var deptName = (((_s$department = s.department) === null || _s$department === void 0 ? void 0 : _s$department.department_name) || '').toLowerCase();
          var email = (s.email_address || '').toLowerCase();
          var phone = (s.phone_number || '').toLowerCase();
          return fullName.includes(searchTerm) || courseName.includes(searchTerm) || deptName.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm);
        });
      }
      renderStudents(filtered);
    } else if (currentTab === 'faculty') {
      var _filtered = allFaculty;
      if (searchTerm) {
        _filtered = _filtered.filter(function (f) {
          var _f$department;
          var fullName = [f.f_name, f.m_name, f.l_name, f.suffix].filter(Boolean).join(' ').toLowerCase();
          var deptName = (((_f$department = f.department) === null || _f$department === void 0 ? void 0 : _f$department.department_name) || '').toLowerCase();
          var position = (f.position || '').toLowerCase();
          var email = (f.email_address || '').toLowerCase();
          var phone = (f.phone_number || '').toLowerCase();
          return fullName.includes(searchTerm) || deptName.includes(searchTerm) || position.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm);
        });
      }
      renderFaculty(_filtered);
    }
  }

  // Initial load of filters only; do not auto-generate any report
  function initialize() {
    return _initialize.apply(this, arguments);
  }
  function _initialize() {
    _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return loadFilters();
          case 1:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    return _initialize.apply(this, arguments);
  }
  initialize();
}

/***/ }),

/***/ "./resources/js/components/settings.js":
/*!*********************************************!*\
  !*** ./resources/js/components/settings.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mountSettings: () => (/* binding */ mountSettings)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// settings.js
// Settings management UI (vanilla JS) - Admin only
// Requires: token in localStorage key `academix_token`

function getTokenOrRedirect() {
  var token = window.localStorage.getItem('academix_token');
  if (!token) {
    window.location.href = '/';
    throw new Error('No token');
  }
  return token;
}
function api(_x) {
  return _api.apply(this, arguments);
}
function _api() {
  _api = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(path) {
    var options,
      token,
      res,
      data,
      _args7 = arguments;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
          token = getTokenOrRedirect();
          _context7.n = 1;
          return fetch(path, _objectSpread({
            headers: _objectSpread({
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            }, options.headers || {})
          }, options));
        case 1:
          res = _context7.v;
          if (!(res.status === 401)) {
            _context7.n = 2;
            break;
          }
          window.location.href = '/';
          return _context7.a(2, Promise.reject(new Error('Unauthorized')));
        case 2:
          _context7.n = 3;
          return res.json()["catch"](function () {
            return {};
          });
        case 3:
          data = _context7.v;
          if (res.ok) {
            _context7.n = 4;
            break;
          }
          throw new Error(data.message || 'Request failed');
        case 4:
          return _context7.a(2, data);
      }
    }, _callee7);
  }));
  return _api.apply(this, arguments);
}
function h(tag) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var el = document.createElement(tag);
  Object.entries(attrs).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];
    if (k === 'class') el.className = v;else if (k === 'text') el.textContent = v;else el.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(function (c) {
    if (c == null) return;
    if (typeof c === 'string') el.appendChild(document.createTextNode(c));else el.appendChild(c);
  });
  return el;
}
function detectId(item) {
  // Return primary id for item (works with course.department_id style or id)
  return item.course_id || item.department_id || item.academic_year_id || item.id || null;
}
function mountSettings(rootEl) {
  if (!rootEl) throw new Error('mountSettings: root element is required');

  // Full UI template (kept same structure / classes as your original)
  rootEl.innerHTML = "\n        <style>\n            .st-wrap{padding:18px;color:var(--ink);font-family:Inter,Segoe UI,Arial,Helvetica,sans-serif}\n            .st-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}\n            .st-title{margin:0;font-size:20px;font-weight:800;letter-spacing:.2px}\n            .st-search{display:flex;gap:8px;align-items:center;margin-bottom:12px}\n            .st-input{padding:8px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--ink);font-size:14px}\n            .st-tabs{display:flex;gap:4px;margin-bottom:12px}\n            .st-tab{padding:8px 14px;background:rgba(255,255,255,.02);color:var(--ink);border:1px solid var(--border);border-bottom:none;border-radius:10px 10px 0 0;cursor:pointer;font-size:14px}\n            .st-tab.active{background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));color:var(--ink)}\n            .st-tab:hover:not(.active){filter:brightness(1.05)}\n            .st-content{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;padding:16px;min-height:400px;box-shadow:var(--shadow)}\n            .st-actions{display:flex;gap:8px;align-items:center;margin-bottom:12px}\n            .st-btn{padding:8px 14px;background:var(--primary);color:#0b1020;border:none;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700}\n            .st-btn:hover{filter:brightness(1.05)}\n            .st-btn-outline{background:transparent;border:1px solid var(--border);color:var(--ink)}\n            .st-btn-outline:hover{background:rgba(148,163,184,.08)}\n            .st-table{width:100%;border-collapse:collapse;background:transparent;border-radius:14px;overflow:hidden}\n            .st-table th{background:transparent;padding:12px;text-align:left;font-weight:700;border-bottom:1px solid var(--border);color:var(--muted);font-size:12px;letter-spacing:.3px;text-transform:uppercase}\n            .st-table td{padding:12px;border-bottom:1px solid var(--border)}\n            .st-table tr:hover{background:rgba(255,255,255,.02)}\n            .st-pill{padding:4px 8px;border-radius:12px;background:#1f2937;border:1px solid #283241;font-size:12px;color:#cbd5e1}\n            .st-small{font-size:12px}\n            .st-error{color:#ffb3b3;font-size:12px;min-height:16px;margin-bottom:12px}\n            .st-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;z-index:2000}\n            .st-modal{width:500px;max-width:95vw;background:#e8e8e8;color:#111;border-radius:8px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.5)}\n            .st-modal h3{margin:0 0 16px;font-size:20px;font-weight:600}\n            .st-modal-field{margin-bottom:16px}\n            .st-modal-label{display:block;font-size:13px;margin-bottom:4px;font-weight:500}\n            .st-modal-input{width:100%;padding:8px 12px;border:1px solid #ccc;border-radius:4px;background:#fff;color:#111;font-size:14px}\n            .st-modal-buttons{display:flex;gap:12px;justify-content:center;margin-top:20px}\n            .st-modal-btn{padding:10px 20px;border:none;border-radius:4px;cursor:pointer;font-size:14px;font-weight:500}\n            .st-modal-cancel{background:#666;color:#fff}\n            .st-modal-save{background:#2d6cdf;color:#fff}\n        </style>\n        <div class=\"st-wrap\">\n            <div class=\"st-topbar\">\n                <h2 class=\"st-title\">Settings</h2>\n            </div>\n            <div class=\"st-search\">\n                <input id=\"st-search\" class=\"st-input\" placeholder=\"SEARCH\" style=\"width:200px\" />\n            </div>\n            <div class=\"st-tabs\">\n                <button class=\"st-tab active\" data-tab=\"courses\">Course</button>\n                <button class=\"st-tab\" data-tab=\"departments\">Departments</button>\n                <button class=\"st-tab\" data-tab=\"academic-years\">Academic Years</button>\n            </div>\n            <div class=\"st-content\">\n                <div id=\"st-courses\" class=\"st-tab-content\">\n                    <div class=\"st-actions\">\n                        <button id=\"st-add-course\" class=\"st-btn\">Add Course</button>\n                        <button id=\"st-archived-courses\" class=\"st-btn st-btn-outline\">Show Archived</button>\n                    </div>\n                    <div id=\"st-error-courses\" class=\"st-error\"></div>\n                    <table class=\"st-table\">\n                        <thead>\n                            <tr><th>Course Name</th><th>Department</th><th>Status</th><th>Action</th></tr>\n                        </thead>\n                        <tbody id=\"st-body-courses\"><tr><td colspan=\"4\" class=\"st-small\">Loading\u2026</td></tr></tbody>\n                    </table>\n                </div>\n                <div id=\"st-departments\" class=\"st-tab-content\" style=\"display:none\">\n                    <div class=\"st-actions\">\n                        <button id=\"st-add-department\" class=\"st-btn\">Add Department</button>\n                        <button id=\"st-archived-departments\" class=\"st-btn st-btn-outline\">Show Archived</button>\n                    </div>\n                    <div id=\"st-error-departments\" class=\"st-error\"></div>\n                    <table class=\"st-table\">\n                        <thead>\n                            <tr><th>Department Name</th><th>Status</th><th>Action</th></tr>\n                        </thead>\n                        <tbody id=\"st-body-departments\"><tr><td colspan=\"3\" class=\"st-small\">Loading\u2026</td></tr></tbody>\n                    </table>\n                </div>\n                <div id=\"st-academic-years\" class=\"st-tab-content\" style=\"display:none\">\n                    <div class=\"st-actions\">\n                        <button id=\"st-add-academic-year\" class=\"st-btn\">Add Academic Year</button>\n                        <button id=\"st-archived-academic-years\" class=\"st-btn st-btn-outline\">Show Archived</button>\n                    </div>\n                    <div id=\"st-error-academic-years\" class=\"st-error\"></div>\n                    <table class=\"st-table\">\n                        <thead>\n                            <tr><th>School Year</th><th>Status</th><th>Action</th></tr>\n                        </thead>\n                        <tbody id=\"st-body-academic-years\"><tr><td colspan=\"3\" class=\"st-small\">Loading\u2026</td></tr></tbody>\n                    </table>\n                </div>\n            </div>\n\n            <!-- Course Modal -->\n            <div id=\"st-modal-course\" class=\"st-modal-overlay\">\n                <div class=\"st-modal\">\n                    <h3 id=\"stm-course-title\">Add Course</h3>\n                    <div class=\"st-modal-field\">\n                        <label class=\"st-modal-label\">Course Name</label>\n                        <input id=\"stm-course-name\" class=\"st-modal-input\" />\n                    </div>\n                    <div class=\"st-modal-field\">\n                        <label class=\"st-modal-label\">Department</label>\n                        <select id=\"stm-course-department\" class=\"st-modal-input\"><option value=\"\">Loading\u2026</option></select>\n                    </div>\n                    <div id=\"stm-course-error\" style=\"color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center\"></div>\n                    <div class=\"st-modal-buttons\">\n                        <button id=\"stm-course-cancel\" class=\"st-modal-btn st-modal-cancel\">Cancel</button>\n                        <button id=\"stm-course-save\" class=\"st-modal-btn st-modal-save\">Add</button>\n                    </div>\n                </div>\n            </div>\n\n            <!-- Department Modal -->\n            <div id=\"st-modal-department\" class=\"st-modal-overlay\">\n                <div class=\"st-modal\">\n                    <h3 id=\"stm-department-title\">Add Department</h3>\n                    <div class=\"st-modal-field\">\n                        <label class=\"st-modal-label\">Department Name</label>\n                        <input id=\"stm-department-name\" class=\"st-modal-input\" />\n                    </div>\n                    <div id=\"stm-department-error\" style=\"color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center\"></div>\n                    <div class=\"st-modal-buttons\">\n                        <button id=\"stm-department-cancel\" class=\"st-modal-btn st-modal-cancel\">Cancel</button>\n                        <button id=\"stm-department-save\" class=\"st-modal-btn st-modal-save\">Add</button>\n                    </div>\n                </div>\n            </div>\n\n            <!-- Academic Year Modal -->\n            <div id=\"st-modal-academic-year\" class=\"st-modal-overlay\">\n                <div class=\"st-modal\">\n                    <h3 id=\"stm-academic-year-title\">Add Academic Year</h3>\n                    <div class=\"st-modal-field\">\n                        <label class=\"st-modal-label\">School Year</label>\n                        <input id=\"stm-academic-year-name\" class=\"st-modal-input\" placeholder=\"e.g., 2025-2026\" />\n                    </div>\n                    <div id=\"stm-academic-year-error\" style=\"color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center\"></div>\n                    <div class=\"st-modal-buttons\">\n                        <button id=\"stm-academic-year-cancel\" class=\"st-modal-btn st-modal-cancel\">Cancel</button>\n                        <button id=\"stm-academic-year-save\" class=\"st-modal-btn st-modal-save\">Add</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ";

  // State
  var currentTab = 'courses';
  var showingArchived = {
    courses: false,
    departments: false,
    'academic-years': false
  };
  var allData = {
    courses: [],
    departments: [],
    'academic-years': []
  };
  var searchEl = rootEl.querySelector('#st-search');

  // Tab switching
  rootEl.querySelectorAll('.st-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      switchTab(tab.dataset.tab);
    });
  });

  // Search functionality
  searchEl.addEventListener('input', function () {
    filterAndRender();
  });
  searchEl.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') filterAndRender();
  });
  function switchTab(tabName) {
    currentTab = tabName;
    // Update tab buttons
    rootEl.querySelectorAll('.st-tab').forEach(function (t) {
      return t.classList.remove('active');
    });
    rootEl.querySelector("[data-tab=\"".concat(tabName, "\"]")).classList.add('active');
    // Update content
    rootEl.querySelectorAll('.st-tab-content').forEach(function (c) {
      return c.style.display = 'none';
    });
    rootEl.querySelector("#st-".concat(tabName)).style.display = 'block';
    // Load data for current tab
    loadCurrentTab();
  }

  // Helper: make short acronym from a department/program name
  function makeAcronym(txt) {
    if (!txt) return '';
    // keep 'program' so we produce NP for 'Nursing Program'
    var stop = new Set(['department', 'of', 'the', 'and', '&', 'staff']);
    var words = txt.split(/\s+/).filter(function (w) {
      return w.trim().length > 0;
    });
    var meaningful = words.filter(function (w) {
      return !stop.has(w.toLowerCase());
    });
    var source = meaningful.length ? meaningful : words;
    var letters = source.map(function (w) {
      return w[0] ? w[0].toUpperCase() : '';
    }).join('');
    if (letters.length > 3) letters = letters.slice(0, 3);
    return letters;
  }

  // Action buttons
  rootEl.querySelector('#st-add-course').addEventListener('click', function () {
    return openModal('course');
  });
  rootEl.querySelector('#st-add-department').addEventListener('click', function () {
    return openModal('department');
  });
  rootEl.querySelector('#st-add-academic-year').addEventListener('click', function () {
    return openModal('academic-year');
  });
  rootEl.querySelector('#st-archived-courses').addEventListener('click', function () {
    return toggleArchived('courses');
  });
  rootEl.querySelector('#st-archived-departments').addEventListener('click', function () {
    return toggleArchived('departments');
  });
  rootEl.querySelector('#st-archived-academic-years').addEventListener('click', function () {
    return toggleArchived('academic-years');
  });

  // Modal setup
  setupModal('course');
  setupModal('department');
  setupModal('academic-year');
  function setupModal(type) {
    var cancelBtn = rootEl.querySelector("#stm-".concat(type, "-cancel"));
    var saveBtn = rootEl.querySelector("#stm-".concat(type, "-save"));
    cancelBtn.addEventListener('click', function () {
      return closeModal(type);
    });
    saveBtn.addEventListener('click', function () {
      return saveModal(type);
    });
  }
  function toggleArchived(type) {
    showingArchived[type] = !showingArchived[type];
    var btn = rootEl.querySelector("#st-archived-".concat(type));
    btn.textContent = showingArchived[type] ? 'Show Active' : 'Show Archived';
    btn.classList.toggle('st-btn-outline', !showingArchived[type]);
    loadCurrentTab();
  }
  function openModal(_x2) {
    return _openModal.apply(this, arguments);
  }
  function _openModal() {
    _openModal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(type) {
      var init,
        modal,
        title,
        saveBtn,
        friendly,
        id,
        _args = arguments;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            init = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            modal = rootEl.querySelector("#st-modal-".concat(type));
            title = rootEl.querySelector("#stm-".concat(type, "-title"));
            saveBtn = rootEl.querySelector("#stm-".concat(type, "-save")); // Friendly title (singular)
            friendly = {
              'course': 'Course',
              'department': 'Department',
              'academic-year': 'Academic Year'
            }[type] || type;
            title.textContent = init ? "Edit ".concat(friendly) : "Add ".concat(friendly);
            saveBtn.textContent = init ? 'Save' : 'Add';

            // Reset inputs
            modal.querySelectorAll('input, select').forEach(function (i) {
              return i.value = '';
            });

            // Populate if editing
            if (init) {
              if (type === 'course') {
                rootEl.querySelector('#stm-course-name').value = init.course_name || '';
                // set value by department_id if present, otherwise try nested department
                rootEl.querySelector('#stm-course-department').value = init.department_id || init.department && init.department.department_id || '';
              } else if (type === 'department') {
                rootEl.querySelector('#stm-department-name').value = init.department_name || '';
              } else if (type === 'academic-year') {
                rootEl.querySelector('#stm-academic-year-name').value = init.school_year || '';
              }
              id = detectId(init);
              if (id != null) modal.dataset.editId = id;
            } else {
              delete modal.dataset.editId;
            }

            // Load departments for course modal so select has options before showing
            if (!(type === 'course')) {
              _context.n = 1;
              break;
            }
            _context.n = 1;
            return loadDepartmentsForCourse();
          case 1:
            modal.style.display = 'flex';
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return _openModal.apply(this, arguments);
  }
  function closeModal(type) {
    var modal = rootEl.querySelector("#st-modal-".concat(type));
    modal.style.display = 'none';
  }
  function saveModal(_x3) {
    return _saveModal.apply(this, arguments);
  }
  function _saveModal() {
    _saveModal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(type) {
      var modal, errorEl, payload, endpoint, name, deptId, _name, _name2, _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            modal = rootEl.querySelector("#st-modal-".concat(type));
            errorEl = rootEl.querySelector("#stm-".concat(type, "-error"));
            errorEl.textContent = '';
            payload = {};
            endpoint = '';
            if (!(type === 'course')) {
              _context2.n = 3;
              break;
            }
            name = rootEl.querySelector('#stm-course-name').value.trim();
            deptId = rootEl.querySelector('#stm-course-department').value;
            if (name) {
              _context2.n = 1;
              break;
            }
            errorEl.textContent = 'Course name is required.';
            return _context2.a(2);
          case 1:
            if (deptId) {
              _context2.n = 2;
              break;
            }
            errorEl.textContent = 'Please select a department.';
            return _context2.a(2);
          case 2:
            payload = {
              course_name: name,
              department_id: Number(deptId)
            };
            endpoint = '/api/settings/courses';
            _context2.n = 7;
            break;
          case 3:
            if (!(type === 'department')) {
              _context2.n = 5;
              break;
            }
            _name = rootEl.querySelector('#stm-department-name').value.trim();
            if (_name) {
              _context2.n = 4;
              break;
            }
            errorEl.textContent = 'Department name is required.';
            return _context2.a(2);
          case 4:
            payload = {
              department_name: _name
            };
            endpoint = '/api/settings/departments';
            _context2.n = 7;
            break;
          case 5:
            if (!(type === 'academic-year')) {
              _context2.n = 7;
              break;
            }
            _name2 = rootEl.querySelector('#stm-academic-year-name').value.trim();
            if (_name2) {
              _context2.n = 6;
              break;
            }
            errorEl.textContent = 'School year is required.';
            return _context2.a(2);
          case 6:
            payload = {
              school_year: _name2
            };
            endpoint = '/api/settings/academic-years';
          case 7:
            _context2.p = 7;
            if (!modal.dataset.editId) {
              _context2.n = 9;
              break;
            }
            _context2.n = 8;
            return api("".concat(endpoint, "/").concat(modal.dataset.editId), {
              method: 'PUT',
              body: JSON.stringify(payload)
            });
          case 8:
            _context2.n = 10;
            break;
          case 9:
            _context2.n = 10;
            return api(endpoint, {
              method: 'POST',
              body: JSON.stringify(payload)
            });
          case 10:
            closeModal(type);
            loadCurrentTab();
            _context2.n = 12;
            break;
          case 11:
            _context2.p = 11;
            _t = _context2.v;
            errorEl.textContent = _t.message;
          case 12:
            return _context2.a(2);
        }
      }, _callee2, null, [[7, 11]]);
    }));
    return _saveModal.apply(this, arguments);
  }
  function loadDepartmentsForCourse() {
    return _loadDepartmentsForCourse.apply(this, arguments);
  }
  function _loadDepartmentsForCourse() {
    _loadDepartmentsForCourse = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var departments, select, _t2;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return api('/api/settings/departments');
          case 1:
            departments = _context3.v;
            select = rootEl.querySelector('#stm-course-department');
            select.innerHTML = '<option value="">Select Department</option>' + departments.map(function (d) {
              return "<option value=\"".concat(d.department_id, "\">").concat(d.department_name, "</option>");
            }).join('');
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t2 = _context3.v;
            console.error('Failed to load departments:', _t2);
            // keep existing options if any
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    }));
    return _loadDepartmentsForCourse.apply(this, arguments);
  }
  function loadCurrentTab() {
    return _loadCurrentTab.apply(this, arguments);
  }
  function _loadCurrentTab() {
    _loadCurrentTab = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var errorEl, params, data, _params, _data, _params2, _data2, _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            errorEl = rootEl.querySelector("#st-error-".concat(currentTab));
            errorEl.textContent = '';
            _context4.p = 1;
            if (!(currentTab === 'courses')) {
              _context4.n = 3;
              break;
            }
            params = new URLSearchParams();
            if (showingArchived.courses) params.set('archived', '1');
            _context4.n = 2;
            return api("/api/settings/courses?".concat(params.toString()));
          case 2:
            data = _context4.v;
            allData.courses = Array.isArray(data) ? data : [];
            filterAndRender();
            _context4.n = 7;
            break;
          case 3:
            if (!(currentTab === 'departments')) {
              _context4.n = 5;
              break;
            }
            _params = new URLSearchParams();
            if (showingArchived.departments) _params.set('archived', '1');
            _context4.n = 4;
            return api("/api/settings/departments?".concat(_params.toString()));
          case 4:
            _data = _context4.v;
            allData.departments = Array.isArray(_data) ? _data : [];
            filterAndRender();
            _context4.n = 7;
            break;
          case 5:
            if (!(currentTab === 'academic-years')) {
              _context4.n = 7;
              break;
            }
            _params2 = new URLSearchParams();
            if (showingArchived['academic-years']) _params2.set('archived', '1');
            _context4.n = 6;
            return api("/api/settings/academic-years?".concat(_params2.toString()));
          case 6:
            _data2 = _context4.v;
            allData['academic-years'] = Array.isArray(_data2) ? _data2 : [];
            filterAndRender();
          case 7:
            _context4.n = 9;
            break;
          case 8:
            _context4.p = 8;
            _t3 = _context4.v;
            errorEl.textContent = _t3.message;
          case 9:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 8]]);
    }));
    return _loadCurrentTab.apply(this, arguments);
  }
  function filterAndRender() {
    var searchTerm = searchEl.value.trim().toLowerCase();
    if (currentTab === 'courses') {
      var filtered = allData.courses;
      if (searchTerm) {
        filtered = filtered.filter(function (c) {
          var _c$department;
          return (c.course_name || '').toLowerCase().includes(searchTerm) || (((_c$department = c.department) === null || _c$department === void 0 ? void 0 : _c$department.department_name) || '').toLowerCase().includes(searchTerm);
        });
      }
      renderCourses(filtered);
    } else if (currentTab === 'departments') {
      var _filtered = allData.departments;
      if (searchTerm) {
        _filtered = _filtered.filter(function (d) {
          return (d.department_name || '').toLowerCase().includes(searchTerm);
        });
      }
      renderDepartments(_filtered);
    } else if (currentTab === 'academic-years') {
      var _filtered2 = allData['academic-years'];
      if (searchTerm) {
        _filtered2 = _filtered2.filter(function (y) {
          return (y.school_year || '').toLowerCase().includes(searchTerm);
        });
      }
      renderAcademicYears(_filtered2);
    }
  }

  /* Rendering + event wiring
     Note: we attach button listeners per rendered row to avoid duplicate event listeners
  */

  function renderCourses(courses) {
    var tbody = rootEl.querySelector('#st-body-courses');
    tbody.innerHTML = '';
    if (!courses.length) {
      tbody.appendChild(h('tr', {}, [h('td', {
        colspan: 4,
        text: 'No courses found'
      })]));
      return;
    }
    courses.forEach(function (course) {
      var _course$department;
      var departmentLabel = ((_course$department = course.department) === null || _course$department === void 0 ? void 0 : _course$department.department_name) || course.department_name || (course.department_id ? String(course.department_id) : '');
      var tr = h('tr', {}, [h('td', {
        text: course.course_name || ''
      }), h('td', {
        text: departmentLabel
      }), h('td', {}, [h('span', {
        "class": 'st-pill st-small',
        text: course.archived_at ? 'Archived' : 'Active'
      })]), h('td', {}, [h('button', {
        "class": 'st-btn st-small',
        'data-action': 'edit',
        'data-id': detectId(course)
      }, 'Edit'), h('span', {
        text: ' '
      }), showingArchived.courses ? h('button', {
        "class": 'st-btn st-small',
        style: 'background:#4caf50',
        'data-action': 'restore',
        'data-id': detectId(course)
      }, 'Restore') : h('button', {
        "class": 'st-btn st-small',
        style: 'background:#d32f2f',
        'data-action': 'archive',
        'data-id': detectId(course)
      }, 'Archive')])]);
      tbody.appendChild(tr);

      // Wire buttons
      tr.querySelectorAll('button[data-action]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          return handleRowAction(e, 'course', course);
        });
      });
    });
  }
  function renderDepartments(departments) {
    var tbody = rootEl.querySelector('#st-body-departments');
    tbody.innerHTML = '';
    if (!departments.length) {
      tbody.appendChild(h('tr', {}, [h('td', {
        colspan: 3,
        text: 'No departments found'
      })]));
      return;
    }
    departments.forEach(function (dept) {
      var _short = makeAcronym(dept.department_name || '');
      var label = _short ? "".concat(dept.department_name, " (").concat(_short, ")") : dept.department_name || '';
      var tr = h('tr', {}, [h('td', {
        text: label
      }), h('td', {}, [h('span', {
        "class": 'st-pill st-small',
        text: dept.deleted_at ? 'Archived' : 'Active'
      })]), h('td', {}, [h('button', {
        "class": 'st-btn st-small',
        'data-action': 'edit',
        'data-id': detectId(dept)
      }, 'Edit'), h('span', {
        text: ' '
      }), showingArchived.departments ? h('button', {
        "class": 'st-btn st-small',
        style: 'background:#4caf50',
        'data-action': 'restore',
        'data-id': detectId(dept)
      }, 'Restore') : h('button', {
        "class": 'st-btn st-small',
        style: 'background:#d32f2f',
        'data-action': 'archive',
        'data-id': detectId(dept)
      }, 'Archive')])]);
      tbody.appendChild(tr);
      tr.querySelectorAll('button[data-action]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          return handleRowAction(e, 'department', dept);
        });
      });
    });
  }
  function renderAcademicYears(years) {
    var tbody = rootEl.querySelector('#st-body-academic-years');
    tbody.innerHTML = '';
    if (!years.length) {
      tbody.appendChild(h('tr', {}, [h('td', {
        colspan: 3,
        text: 'No academic years found'
      })]));
      return;
    }
    years.forEach(function (year) {
      var tr = h('tr', {}, [h('td', {
        text: year.school_year || ''
      }), h('td', {}, [h('span', {
        "class": 'st-pill st-small',
        text: year.archived_at ? 'Archived' : 'Active'
      })]), h('td', {}, [h('button', {
        "class": 'st-btn st-small',
        'data-action': 'edit',
        'data-id': detectId(year)
      }, 'Edit'), h('span', {
        text: ' '
      }), showingArchived['academic-years'] ? h('button', {
        "class": 'st-btn st-small',
        style: 'background:#4caf50',
        'data-action': 'restore',
        'data-id': detectId(year)
      }, 'Restore') : h('button', {
        "class": 'st-btn st-small',
        style: 'background:#d32f2f',
        'data-action': 'archive',
        'data-id': detectId(year)
      }, 'Archive')])]);
      tbody.appendChild(tr);
      tr.querySelectorAll('button[data-action]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          return handleRowAction(e, 'academic-year', year);
        });
      });
    });
  }

  // Handler for row actions - unified
  function handleRowAction(e, singularType, item) {
    e.stopPropagation();
    var action = e.currentTarget.dataset.action;
    var id = e.currentTarget.dataset.id;
    if (!action) return;
    if (action === 'edit') {
      // Open the correct modal and seed item
      openModal(singularType, item);
    } else if (action === 'archive') {
      if (confirm('Archive this item?')) {
        var plural = pluralize(singularType);
        archiveItem(plural, id);
      }
    } else if (action === 'restore') {
      if (confirm('Restore this item?')) {
        var _plural = pluralize(singularType);
        restoreItem(_plural, id);
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
  function archiveItem(_x4, _x5) {
    return _archiveItem.apply(this, arguments);
  }
  function _archiveItem() {
    _archiveItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(type, id) {
      var _t4;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            _context5.p = 0;
            if (!(type === 'courses')) {
              _context5.n = 2;
              break;
            }
            _context5.n = 1;
            return api("/api/settings/courses/".concat(id, "/archive"), {
              method: 'POST'
            });
          case 1:
            _context5.n = 5;
            break;
          case 2:
            if (!(type === 'departments')) {
              _context5.n = 4;
              break;
            }
            _context5.n = 3;
            return api("/api/settings/departments/".concat(id, "/archive"), {
              method: 'POST'
            });
          case 3:
            _context5.n = 5;
            break;
          case 4:
            if (!(type === 'academic-years')) {
              _context5.n = 5;
              break;
            }
            _context5.n = 5;
            return api("/api/settings/academic-years/".concat(id, "/archive"), {
              method: 'POST'
            });
          case 5:
            loadCurrentTab();
            _context5.n = 7;
            break;
          case 6:
            _context5.p = 6;
            _t4 = _context5.v;
            rootEl.querySelector("#st-error-".concat(type)).textContent = _t4.message;
          case 7:
            return _context5.a(2);
        }
      }, _callee5, null, [[0, 6]]);
    }));
    return _archiveItem.apply(this, arguments);
  }
  function restoreItem(_x6, _x7) {
    return _restoreItem.apply(this, arguments);
  } // Initial load
  function _restoreItem() {
    _restoreItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(type, id) {
      var _t5;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            _context6.p = 0;
            if (!(type === 'courses')) {
              _context6.n = 2;
              break;
            }
            _context6.n = 1;
            return api("/api/settings/courses/".concat(id, "/restore"), {
              method: 'POST'
            });
          case 1:
            _context6.n = 5;
            break;
          case 2:
            if (!(type === 'departments')) {
              _context6.n = 4;
              break;
            }
            _context6.n = 3;
            return api("/api/settings/departments/".concat(id, "/restore"), {
              method: 'POST'
            });
          case 3:
            _context6.n = 5;
            break;
          case 4:
            if (!(type === 'academic-years')) {
              _context6.n = 5;
              break;
            }
            _context6.n = 5;
            return api("/api/settings/academic-years/".concat(id, "/restore"), {
              method: 'POST'
            });
          case 5:
            loadCurrentTab();
            _context6.n = 7;
            break;
          case 6:
            _context6.p = 6;
            _t5 = _context6.v;
            rootEl.querySelector("#st-error-".concat(type)).textContent = _t5.message;
          case 7:
            return _context6.a(2);
        }
      }, _callee6, null, [[0, 6]]);
    }));
    return _restoreItem.apply(this, arguments);
  }
  loadCurrentTab();
}

/***/ }),

/***/ "./resources/js/components/student.js":
/*!********************************************!*\
  !*** ./resources/js/components/student.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mountStudents: () => (/* binding */ mountStudents)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Students management UI (vanilla JS)
// Requires: token in localStorage key `academix_token`

function getTokenOrRedirect() {
  var token = window.localStorage.getItem('academix_token');
  if (!token) {
    window.location.href = '/';
    throw new Error('No token');
  }
  return token;
}
function api(_x) {
  return _api.apply(this, arguments);
}
function _api() {
  _api = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(path) {
    var options,
      token,
      res,
      data,
      _args0 = arguments;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          options = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
          token = getTokenOrRedirect();
          _context0.n = 1;
          return fetch(path, _objectSpread({
            headers: _objectSpread({
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(token)
            }, options.headers || {})
          }, options));
        case 1:
          res = _context0.v;
          if (!(res.status === 401)) {
            _context0.n = 2;
            break;
          }
          window.location.href = '/';
          return _context0.a(2, Promise.reject(new Error('Unauthorized')));
        case 2:
          _context0.n = 3;
          return res.json()["catch"](function () {
            return {};
          });
        case 3:
          data = _context0.v;
          if (res.ok) {
            _context0.n = 4;
            break;
          }
          throw new Error(data.message || 'Request failed');
        case 4:
          return _context0.a(2, data);
      }
    }, _callee0);
  }));
  return _api.apply(this, arguments);
}
function h(tag) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var el = document.createElement(tag);
  Object.entries(attrs).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];
    if (k === 'class') el.className = v;else if (k === 'text') el.textContent = v;else el.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(function (c) {
    if (c == null) return;
    if (typeof c === 'string') el.appendChild(document.createTextNode(c));else el.appendChild(c);
  });
  return el;
}
function mountStudents(rootEl) {
  if (!rootEl) throw new Error('mountStudents: root element is required');
  rootEl.innerHTML = "\n        <style>\n            .f-wrap{padding:18px;color:var(--ink);font-family:Inter,Segoe UI,Arial,Helvetica,sans-serif}\n            .f-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}\n            .f-title{margin:0;font-size:20px;font-weight:800;letter-spacing:.2px}\n            .f-actions{display:flex;gap:8px;align-items:center}\n            .f-input{padding:8px 12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--ink);font-size:14px}\n            .f-btn{padding:8px 14px;background:var(--primary);color:#0b1020;border:none;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700}\n            .f-btn:hover{filter:brightness(1.05)}\n            .f-btn-outline{background:transparent;border:1px solid var(--border);color:var(--ink)}\n            .f-btn-outline:hover{background:rgba(148,163,184,.08)}\n            .f-card{background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));border:1px solid var(--border);border-radius:14px;box-shadow:var(--shadow);overflow:hidden}\n            .f-tablebar{display:flex;justify-content:flex-end;gap:8px;padding:10px 12px;background:rgba(255,255,255,.02);border-bottom:1px solid var(--border)}\n            .f-table{width:100%;border-collapse:collapse;background:transparent}\n            .f-table th{background:transparent;padding:12px;text-align:left;font-weight:700;border-bottom:1px solid var(--border);color:var(--muted);font-size:12px;letter-spacing:.3px;text-transform:uppercase}\n            .f-table td{padding:12px;border-bottom:1px solid var(--border)}\n            .f-table tr:hover{background:rgba(255,255,255,.02)}\n            .f-pill{padding:4px 8px;border-radius:12px;background:#1f2937;border:1px solid #283241;font-size:12px;color:#cbd5e1}\n            .f-small{font-size:12px}\n            .f-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;z-index:2000}\n            .f-modal{width:960px;max-width:96vw;background:#f9fafb;color:#0f172a;border-radius:12px;padding:28px;box-shadow:0 24px 72px rgba(0,0,0,.55)}\n            .f-modal h3{margin:0 0 18px;font-size:22px;font-weight:700;color:#0b1340}\n            .f-modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px 24px;align-items:start}\n            .f-modal-field{margin-bottom:12px}\n            .f-modal-label{display:block;font-size:13.5px;margin-bottom:6px;font-weight:600;color:#0b1340}\n            .f-modal-input{width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;color:#0f172a;font-size:14px}\n            .f-modal-buttons{display:flex;gap:12px;justify-content:flex-end;margin-top:22px}\n            .f-modal-btn{padding:10px 20px;border:none;border-radius:4px;cursor:pointer;font-size:14px;font-weight:500}\n            .f-modal-cancel{background:#64748b;color:#fff}\n            .f-modal-save{background:#2563eb;color:#fff}\n        </style>\n        <div class=\"f-wrap\">\n            <div class=\"f-topbar\">\n                <h2 class=\"f-title\">Students</h2>\n                <div class=\"f-actions\">\n                    <input id=\"s-q\" class=\"f-input\" placeholder=\"Search name or email\" style=\"width:200px\" />\n                    <button id=\"s-search\" class=\"f-btn\">Search</button>\n                    <button id=\"s-add\" class=\"f-btn\">Add Student</button>\n                </div>\n            </div>\n            <div id=\"s-error\" class=\"f-small\" style=\"color:#ffb3b3;min-height:16px;margin-bottom:12px\"></div>\n            <div class=\"f-card\">\n              <div class=\"f-tablebar\">\n                <select id=\"s-filter-department\" class=\"f-input\" style=\"width:200px\">\n                  <option value=\"\">All Departments</option>\n                </select>\n                <select id=\"s-filter-course\" class=\"f-input\" style=\"width:200px\">\n                  <option value=\"\">All Courses</option>\n                </select>\n                <button id=\"s-archived\" class=\"f-btn f-btn-outline\">Archived</button>\n              </div>\n                            <table class=\"f-table\">\n                                <thead>\n                                        <tr><th style=\"width:48px\">#</th><th>Name</th><th>Department</th><th>Course</th><th>Year</th><th>Status</th><th>Action</th></tr>\n                                </thead>\n                                <tbody id=\"s-body\"><tr><td colspan=\"7\" class=\"f-small\">Loading\u2026</td></tr></tbody>\n                            </table>\n            </div>\n            <div id=\"s-modal\" class=\"f-modal-overlay\">\n              <div class=\"f-modal\">\n                <h3 id=\"sm-title\">Add Student</h3>\n                <div class=\"f-modal-grid\">\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Student ID</label><input id=\"sm-student_id\" class=\"f-modal-input\" placeholder=\"optional\" /></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Date of Birth</label><input id=\"sm-dob\" type=\"date\" class=\"f-modal-input\" /></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">First Name</label><input id=\"sm-f_name\" class=\"f-modal-input\" /></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Sex</label><select id=\"sm-sex\" class=\"f-modal-input\"><option value=\"\">Select</option><option>Male</option><option>Female</option></select></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Middle Name</label><input id=\"sm-m_name\" class=\"f-modal-input\" /></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Phone Number</label><input id=\"sm-phone\" class=\"f-modal-input\" maxlength=\"11\" inputmode=\"numeric\" placeholder=\"11 digits\" /></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Last Name</label><input id=\"sm-l_name\" class=\"f-modal-input\" /></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Email Address</label><input id=\"sm-email\" type=\"email\" class=\"f-modal-input\" /></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Suffix</label><input id=\"sm-suffix\" class=\"f-modal-input\" /></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Address</label><input id=\"sm-address\" class=\"f-modal-input\" /></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Department</label><select id=\"sm-department\" class=\"f-modal-input\"><option value=\"\">Loading\u2026</option></select></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Course</label><select id=\"sm-course\" class=\"f-modal-input\"><option value=\"\">Loading\u2026</option></select></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Academic Year</label><select id=\"sm-ay\" class=\"f-modal-input\"><option value=\"\">Loading\u2026</option></select></div>\n                  <div class=\"f-modal-field\"><label class=\"f-modal-label\">Year Level</label><input id=\"sm-year\" class=\"f-modal-input\" placeholder=\"e.g., 1st, 2nd, 3rd\" /></div>\n                </div>\n                <div id=\"sm-error\" style=\"color:#b00020;font-size:12px;min-height:16px;margin-top:8px;text-align:center\"></div>\n                <div class=\"f-modal-buttons\">\n                  <button id=\"sm-cancel\" class=\"f-modal-btn f-modal-cancel\">Cancel</button>\n                  <button id=\"sm-save\" class=\"f-modal-btn f-modal-save\">Add</button>\n                </div>\n              </div>\n            </div>\n        </div>\n    ";
  var errorBox = rootEl.querySelector('#s-error');
  var qEl = rootEl.querySelector('#s-q');
  var archivedBtn = rootEl.querySelector('#s-archived');
  var filterCourseEl = rootEl.querySelector('#s-filter-course');
  var filterDepartmentEl = rootEl.querySelector('#s-filter-department');
  var showingArchived = false;
  // caches for filters
  var departmentsCache = [];
  var coursesCache = [];
  rootEl.querySelector('#s-search').addEventListener('click', function () {
    return load();
  });
  qEl.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') load();
  });
  // Real-time search as you type
  qEl.addEventListener('input', function () {
    return load();
  });
  rootEl.querySelector('#s-add').addEventListener('click', function () {
    return openModal();
  });
  archivedBtn.addEventListener('click', function () {
    showingArchived = !showingArchived;
    archivedBtn.textContent = showingArchived ? 'Show Active' : 'Archived';
    archivedBtn.style.background = showingArchived ? '#2d6cdf' : 'transparent';
    load();
  });

  // Filter dropdowns in tablebar
  filterCourseEl.addEventListener('change', function () {
    return load();
  });
  filterDepartmentEl.addEventListener('change', function () {
    repopulateCourseFilter();
    load();
  });
  var modal = rootEl.querySelector('#s-modal');
  var qs = function qs(id) {
    return modal.querySelector(id);
  };
  qs('#sm-cancel').addEventListener('click', function () {
    return closeModal();
  });
  qs('#sm-save').addEventListener('click', saveModal);

  // ensure phone input only accepts digits and max 11 characters
  try {
    var phoneEl = qs('#sm-phone');
    if (phoneEl) {
      phoneEl.addEventListener('input', function (e) {
        var cleaned = phoneEl.value.replace(/\D/g, '').slice(0, 11);
        if (phoneEl.value !== cleaned) phoneEl.value = cleaned;
      });
    }
  } catch (e) {/* ignore if modal not present */}

  // ensure phone input only accepts digits and max 11 characters
  try {
    var _phoneEl = qs('#sm-phone');
    if (_phoneEl) {
      _phoneEl.addEventListener('input', function (e) {
        var cleaned = _phoneEl.value.replace(/\D/g, '').slice(0, 11);
        if (_phoneEl.value !== cleaned) _phoneEl.value = cleaned;
      });
    }
  } catch (e) {/* ignore if modal not present */}
  var currentRows = [];
  function getNextStudentId() {
    return _getNextStudentId.apply(this, arguments);
  }
  function _getNextStudentId() {
    _getNextStudentId = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var res, _t2;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return api('/api/students/next-id');
          case 1:
            res = _context3.v;
            if (!(res && res.next_id)) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2, String(res.next_id));
          case 2:
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t2 = _context3.v;
          case 4:
            return _context3.a(2, String(2310001));
        }
      }, _callee3, null, [[0, 3]]);
    }));
    return _getNextStudentId.apply(this, arguments);
  }
  function openModal() {
    return _openModal.apply(this, arguments);
  }
  function _openModal() {
    _openModal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var init,
        nextId,
        idEl,
        _args4 = arguments,
        _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            init = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
            errorBox.textContent = '';
            _context4.n = 1;
            return ensureOptions();
          case 1:
            modal.style.display = 'flex';
            qs('#sm-title').textContent = init ? 'Edit Student' : 'Add Student';
            qs('#sm-save').textContent = init ? 'Save' : 'Add';
            ['#sm-student_id', '#sm-f_name', '#sm-m_name', '#sm-l_name', '#sm-suffix', '#sm-dob', '#sm-sex', '#sm-phone', '#sm-email', '#sm-address', '#sm-department', '#sm-course', '#sm-ay', '#sm-year'].forEach(function (sel) {
              var el = qs(sel);
              el.value = '';
            });
            if (!init) {
              _context4.n = 2;
              break;
            }
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
            qs('#sm-department').value = init.department_id != null ? String(init.department_id) : '';
            // ensure course list matches department before setting the selected course
            try {
              qs('#sm-department').dispatchEvent(new Event('change'));
            } catch (e) {}
            qs('#sm-course').value = init.course_id != null ? String(init.course_id) : '';
            qs('#sm-ay').value = init.academic_year_id != null ? String(init.academic_year_id) : '';
            qs('#sm-year').value = init.year_level || '';
            modal.dataset.editId = init.student_id;
            _context4.n = 6;
            break;
          case 2:
            delete modal.dataset.editId;
            // Pre-fill next student display id when adding a new student
            _context4.p = 3;
            _context4.n = 4;
            return getNextStudentId();
          case 4:
            nextId = _context4.v;
            idEl = qs('#sm-student_id');
            idEl.value = nextId;
            idEl.readOnly = true;
            idEl.placeholder = '(auto-generated)';
            _context4.n = 6;
            break;
          case 5:
            _context4.p = 5;
            _t3 = _context4.v;
          case 6:
            return _context4.a(2);
        }
      }, _callee4, null, [[3, 5]]);
    }));
    return _openModal.apply(this, arguments);
  }
  function closeModal() {
    modal.style.display = 'none';
  }
  function saveModal() {
    return _saveModal.apply(this, arguments);
  }
  function _saveModal() {
    _saveModal = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var err, rawPhone, digits, payload, isEdit, s, curr, _t4;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            err = qs('#sm-error');
            err.textContent = '';
            // sanitize phone number: only digits and must be exactly 11 digits
            rawPhone = qs('#sm-phone').value.trim() || '';
            digits = rawPhone.replace(/\D/g, '');
            if (!(digits.length !== 11)) {
              _context5.n = 1;
              break;
            }
            err.textContent = 'Phone number is required and must be exactly 11 digits.';
            return _context5.a(2);
          case 1:
            payload = {
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
            if (!(!payload.f_name || !payload.l_name)) {
              _context5.n = 2;
              break;
            }
            err.textContent = 'First and Last name are required.';
            return _context5.a(2);
          case 2:
            if (!(!payload.department_id || !payload.course_id || !payload.academic_year_id)) {
              _context5.n = 3;
              break;
            }
            err.textContent = 'Please select Department, Course, and Academic Year.';
            return _context5.a(2);
          case 3:
            _context5.p = 3;
            isEdit = Boolean(modal.dataset.editId);
            if (!isEdit) {
              _context5.n = 5;
              break;
            }
            _context5.n = 4;
            return api("/api/students/".concat(modal.dataset.editId), {
              method: 'PUT',
              body: JSON.stringify(payload)
            });
          case 4:
            _context5.n = 6;
            break;
          case 5:
            _context5.n = 6;
            return api('/api/students', {
              method: 'POST',
              body: JSON.stringify(payload)
            });
          case 6:
            // Dispatch global event for dashboard counters and notifications
            // Update local persistent counters for robustness
            try {
              s = JSON.parse(window.localStorage.getItem('academix_stats') || '{}');
              curr = {
                students: Number(s.students) || 0,
                faculty: Number(s.faculty) || 0
              };
              if (!isEdit) curr.students = Math.max(0, curr.students + 1);
              window.localStorage.setItem('academix_stats', JSON.stringify(curr));
            } catch (_) {}
            window.dispatchEvent(new CustomEvent('academix:entity', {
              detail: {
                entity: 'student',
                action: isEdit ? 'updated' : 'created',
                delta: isEdit ? 0 : 1,
                details: "".concat(payload.f_name, " ").concat(payload.l_name).trim()
              }
            }));
            window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
            closeModal();
            _context5.n = 7;
            return load();
          case 7:
            _context5.n = 9;
            break;
          case 8:
            _context5.p = 8;
            _t4 = _context5.v;
            errorBox.textContent = _t4.message;
          case 9:
            return _context5.a(2);
        }
      }, _callee5, null, [[3, 8]]);
    }));
    return _saveModal.apply(this, arguments);
  }
  var optionsLoaded = false;
  function ensureOptions() {
    return _ensureOptions.apply(this, arguments);
  }
  function _ensureOptions() {
    _ensureOptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var departments, courses, years, fill, modalDept, modalCourse, repopulateModalCourse, _t5, _t6, _t7;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            if (!optionsLoaded) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            departments = [], courses = [], years = [];
            _context6.p = 2;
            _context6.n = 3;
            return api('/api/settings/departments');
          case 3:
            departments = _context6.v;
            _context6.n = 5;
            break;
          case 4:
            _context6.p = 4;
            _t5 = _context6.v;
          case 5:
            _context6.p = 5;
            _context6.n = 6;
            return api('/api/settings/courses');
          case 6:
            courses = _context6.v;
            _context6.n = 8;
            break;
          case 7:
            _context6.p = 7;
            _t6 = _context6.v;
          case 8:
            _context6.p = 8;
            _context6.n = 9;
            return api('/api/settings/academic-years');
          case 9:
            years = _context6.v;
            _context6.n = 11;
            break;
          case 10:
            _context6.p = 10;
            _t7 = _context6.v;
          case 11:
            departmentsCache = Array.isArray(departments) ? departments : [];
            coursesCache = Array.isArray(courses) ? courses : [];
            fill = function fill(sel, rows, id, label) {
              var el = qs(sel);
              el.innerHTML = '<option value="">Select</option>' + rows.map(function (r) {
                return "<option value=\"".concat(r[id], "\">").concat(r[label], "</option>");
              }).join('');
            };
            if (departmentsCache.length) fill('#sm-department', departmentsCache, 'department_id', 'department_name');
            if (coursesCache.length) fill('#sm-course', coursesCache, 'course_id', 'course_name');
            if (Array.isArray(years) && years.length) fill('#sm-ay', years, 'academic_year_id', 'school_year');

            // Populate filter dropdowns in tablebar
            if (departmentsCache.length) {
              filterDepartmentEl.innerHTML = '<option value="">All Departments</option>' + departmentsCache.map(function (d) {
                return "<option value=\"".concat(d.department_id, "\">").concat(d.department_name, "</option>");
              }).join('');
            }
            repopulateCourseFilter();

            // Hook modal department -> course dependency so the Course select only shows
            // courses that belong to the selected department in the Add/Edit modal.
            try {
              modalDept = qs('#sm-department');
              modalCourse = qs('#sm-course');
              repopulateModalCourse = function repopulateModalCourse() {
                var sel = modalDept.value ? Number(modalDept.value) : null;
                var list = sel ? coursesCache.filter(function (c) {
                  return Number(c.department_id) === sel;
                }) : coursesCache;
                modalCourse.innerHTML = '<option value="">Select</option>' + list.map(function (c) {
                  return "<option value=\"".concat(c.course_id, "\">").concat(c.course_name, "</option>");
                }).join('');
              };
              modalDept.addEventListener('change', repopulateModalCourse);
              // initialize modal course options according to current department value
              repopulateModalCourse();
            } catch (e) {
              // ignore if modal elements not present
            }
            optionsLoaded = true;
          case 12:
            return _context6.a(2);
        }
      }, _callee6, null, [[8, 10], [5, 7], [2, 4]]);
    }));
    return _ensureOptions.apply(this, arguments);
  }
  function repopulateCourseFilter() {
    var selectedDept = filterDepartmentEl.value ? Number(filterDepartmentEl.value) : null;
    var list = selectedDept ? coursesCache.filter(function (c) {
      return Number(c.department_id) === selectedDept;
    }) : coursesCache;
    filterCourseEl.innerHTML = '<option value="">All Courses</option>' + list.map(function (c) {
      return "<option value=\"".concat(c.course_id, "\">").concat(c.course_name, "</option>");
    }).join('');
  }
  function load() {
    return _load.apply(this, arguments);
  }
  function _load() {
    _load = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var page,
        params,
        qVal,
        courseId,
        deptId,
        data,
        _args7 = arguments,
        _t8;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            page = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : 1;
            errorBox.textContent = '';
            params = new URLSearchParams();
            qVal = qEl.value.trim();
            if (qVal) params.set('q', qVal);

            // Add filter parameters from tablebar
            courseId = filterCourseEl.value;
            deptId = filterDepartmentEl.value;
            if (courseId) params.set('course_id', courseId);
            if (deptId) params.set('department_id', deptId);
            params.set('page', String(page));
            if (showingArchived) params.set('archived', '1');
            _context7.p = 1;
            window.dispatchEvent(new CustomEvent('academix:notify', {
              detail: {
                entity: 'student',
                action: 'fetch:start',
                details: params.toString()
              }
            }));
            _context7.n = 2;
            return api("/api/students?".concat(params.toString()));
          case 2:
            data = _context7.v;
            currentRows = data.data || [];
            renderRows(currentRows);
            window.dispatchEvent(new CustomEvent('academix:notify', {
              detail: {
                entity: 'student',
                action: 'fetch:end',
                details: "rows=".concat(currentRows.length)
              }
            }));
            _context7.n = 4;
            break;
          case 3:
            _context7.p = 3;
            _t8 = _context7.v;
            errorBox.textContent = _t8.message;
            window.dispatchEvent(new CustomEvent('academix:notify', {
              detail: {
                entity: 'student',
                action: 'fetch:error',
                details: _t8.message
              }
            }));
          case 4:
            return _context7.a(2);
        }
      }, _callee7, null, [[1, 3]]);
    }));
    return _load.apply(this, arguments);
  }
  function renderRows(rows) {
    var tbody = rootEl.querySelector('#s-body');
    tbody.innerHTML = '';
    if (!rows.length) {
      tbody.appendChild(h('tr', {}, [h('td', {
        colspan: 6,
        text: 'No students found'
      })]));
      return;
    }
    rows.forEach(function (stu, idx) {
      var _stu$department, _stu$course, _stu$academic_year;
      var number = idx + 1;
      var cells = [h('td', {
        text: String(number)
      }), h('td', {
        text: "".concat(stu.f_name || '', " ").concat(stu.l_name || '').trim()
      }), h('td', {
        text: ((_stu$department = stu.department) === null || _stu$department === void 0 ? void 0 : _stu$department.department_name) || stu.department_name || ''
      }), h('td', {
        text: ((_stu$course = stu.course) === null || _stu$course === void 0 ? void 0 : _stu$course.course_name) || stu.course_name || ''
      }), h('td', {
        text: ((_stu$academic_year = stu.academic_year) === null || _stu$academic_year === void 0 ? void 0 : _stu$academic_year.school_year) || ''
      }), h('td', {}, [h('span', {
        "class": 'f-pill f-small',
        text: stu.status && String(stu.status).toLowerCase() !== 'active' ? String(stu.status).charAt(0).toUpperCase() + String(stu.status).slice(1) : stu.archived_at ? 'Archived' : 'Active'
      })])];
      var actions = [];
      if (!showingArchived) {
        actions.push(h('button', {
          "class": 'f-btn f-small',
          'data-action': 'edit',
          'data-id': stu.student_id
        }, 'Edit'));
        actions.push(h('span', {
          text: ' '
        }));
        actions.push(h('button', {
          "class": 'f-btn f-small',
          style: 'background:#d32f2f',
          'data-action': 'delete',
          'data-id': stu.student_id
        }, 'Archive'));
      } else {
        // Archived view: show Restore and permanent Delete (no Edit)
        actions.push(h('button', {
          "class": 'f-btn f-small',
          style: 'background:#4caf50',
          'data-action': 'restore',
          'data-id': stu.student_id
        }, 'Restore'));
        actions.push(h('span', {
          text: ' '
        }));
        actions.push(h('button', {
          "class": 'f-btn f-small',
          style: 'background:#c62828',
          'data-action': 'permanent-delete',
          'data-id': stu.student_id
        }, 'Delete'));
      }
      cells.push(h('td', {}, actions));
      var tr = h('tr', {}, cells);
      tbody.appendChild(tr);
    });
    tbody.onclick = function (e) {
      var id = e.target.dataset.id;
      if (!id) return;
      var action = e.target.dataset.action;
      var student = rows.find(function (s) {
        return s.student_id == id;
      });
      if (!student) return;
      if (action === 'edit') {
        openModal(student);
      } else if (action === 'delete') {
        onArchive(student);
      } else if (action === 'restore') {
        onRestore(student);
      } else if (action === 'permanent-delete') {
        onPermanentDelete(student);
      }
    };
    function onPermanentDelete(_x2) {
      return _onPermanentDelete.apply(this, arguments);
    }
    function _onPermanentDelete() {
      _onPermanentDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(stu) {
        var s, curr, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (confirm("Permanently delete ".concat(stu.f_name, " ").concat(stu.l_name, "? This cannot be undone."))) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.p = 1;
              _context.n = 2;
              return api("/api/students/".concat(stu.student_id, "/delete"), {
                method: 'POST'
              });
            case 2:
              try {
                s = JSON.parse(window.localStorage.getItem('academix_stats') || '{}');
                curr = {
                  students: Number(s.students) || 0,
                  faculty: Number(s.faculty) || 0
                };
                curr.students = Math.max(0, curr.students - 1);
                window.localStorage.setItem('academix_stats', JSON.stringify(curr));
              } catch (_) {}
              window.dispatchEvent(new CustomEvent('academix:entity', {
                detail: {
                  entity: 'student',
                  action: 'deleted',
                  delta: 0,
                  details: "".concat(stu.f_name || '', " ").concat(stu.l_name || '').trim()
                }
              }));
              window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
              _context.n = 3;
              return load();
            case 3:
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              errorBox.textContent = _t.message;
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[1, 4]]);
      }));
      return _onPermanentDelete.apply(this, arguments);
    }
  }

  // ARCHIVE uses POST to /archive, not DELETE
  function onArchive(_x3) {
    return _onArchive.apply(this, arguments);
  }
  function _onArchive() {
    _onArchive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(stu) {
      var s, curr, _t9;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            if (confirm("Archive ".concat(stu.f_name, " ").concat(stu.l_name, "?"))) {
              _context8.n = 1;
              break;
            }
            return _context8.a(2);
          case 1:
            _context8.p = 1;
            _context8.n = 2;
            return api("/api/students/".concat(stu.student_id, "/archive"), {
              method: 'POST'
            });
          case 2:
            try {
              s = JSON.parse(window.localStorage.getItem('academix_stats') || '{}');
              curr = {
                students: Number(s.students) || 0,
                faculty: Number(s.faculty) || 0
              };
              curr.students = Math.max(0, curr.students - 1);
              window.localStorage.setItem('academix_stats', JSON.stringify(curr));
            } catch (_) {}
            window.dispatchEvent(new CustomEvent('academix:entity', {
              detail: {
                entity: 'student',
                action: 'archived',
                delta: -1,
                details: "".concat(stu.f_name || '', " ").concat(stu.l_name || '').trim()
              }
            }));
            window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
            _context8.n = 3;
            return load();
          case 3:
            _context8.n = 5;
            break;
          case 4:
            _context8.p = 4;
            _t9 = _context8.v;
            errorBox.textContent = _t9.message;
          case 5:
            return _context8.a(2);
        }
      }, _callee8, null, [[1, 4]]);
    }));
    return _onArchive.apply(this, arguments);
  }
  function onRestore(_x4) {
    return _onRestore.apply(this, arguments);
  }
  function _onRestore() {
    _onRestore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(stu) {
      var s, curr, _t0;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            if (confirm("Restore ".concat(stu.f_name, " ").concat(stu.l_name, "?"))) {
              _context9.n = 1;
              break;
            }
            return _context9.a(2);
          case 1:
            _context9.p = 1;
            _context9.n = 2;
            return api("/api/students/".concat(stu.student_id, "/restore"), {
              method: 'POST'
            });
          case 2:
            try {
              s = JSON.parse(window.localStorage.getItem('academix_stats') || '{}');
              curr = {
                students: Number(s.students) || 0,
                faculty: Number(s.faculty) || 0
              };
              curr.students = Math.max(0, curr.students + 1);
              window.localStorage.setItem('academix_stats', JSON.stringify(curr));
            } catch (_) {}
            window.dispatchEvent(new CustomEvent('academix:entity', {
              detail: {
                entity: 'student',
                action: 'restored',
                delta: +1,
                details: "".concat(stu.f_name || '', " ").concat(stu.l_name || '').trim()
              }
            }));
            window.dispatchEvent(new CustomEvent('academix:stats:refresh'));
            _context9.n = 3;
            return load();
          case 3:
            _context9.n = 5;
            break;
          case 4:
            _context9.p = 4;
            _t0 = _context9.v;
            errorBox.textContent = _t0.message;
          case 5:
            return _context9.a(2);
        }
      }, _callee9, null, [[1, 4]]);
    }));
    return _onRestore.apply(this, arguments);
  }
  (function () {
    var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return ensureOptions();
          case 1:
            _context2.n = 2;
            return load();
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    function init() {
      return _init.apply(this, arguments);
    }
    return init;
  })()();
}

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/sass/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;