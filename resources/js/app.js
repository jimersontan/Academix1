/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

// Expose mount functions for the vanilla JS UI
import { mountLogin } from './components/login';
import { mountDashboard } from './components/dashboard';
import { mountStudents } from './components/student';
import { mountFaculty } from './components/faculty';
import { mountSettings } from './components/settings';
import { mountReport } from './components/report';

window.Academix = window.Academix || {};
window.Academix.mountLogin = mountLogin;
window.Academix.mountDashboard = mountDashboard;
window.Academix.mountStudents = mountStudents;
window.Academix.mountFaculty = mountFaculty;
window.Academix.mountSettings = mountSettings;
window.Academix.mountReport = mountReport;