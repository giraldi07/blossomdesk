import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectsProvider } from './context/ProjectsContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Clients from './pages/Clients';
import ClientDetails from './pages/ClientDetails';
import Reports from './pages/Reports';
import Files from './pages/Files';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ProjectsProvider>
            <NotificationsProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:id" element={<ProjectDetails />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="clients/:id" element={<ClientDetails />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="files" element={<Files />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </NotificationsProvider>
          </ProjectsProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;