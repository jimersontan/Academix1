import { mountLogin } from './components/login';
import { mountDashboard } from './components/dashboard';
import { mountStudents } from './components/student';
import { mountFaculty } from './components/faculty';
import { mountSettings } from './components/settings';
import { mountReport } from './components/report';
import { mountMyProfile } from './components/myprofile';

window.Academix = window.Academix || {};
window.Academix.mountLogin = mountLogin;
window.Academix.mountDashboard = mountDashboard;
window.Academix.mountStudents = mountStudents;
window.Academix.mountFaculty = mountFaculty;
window.Academix.mountSettings = mountSettings;
window.Academix.mountReport = mountReport;
window.Academix.mountMyProfile = mountMyProfile;