import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ThreatFeed from './pages/ThreatFeed';
import IncidentResponse from './pages/IncidentResponse';
import ThreatHunting from './pages/ThreatHunting';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/threat-feed"
        element={
          <ProtectedRoute>
            <Layout>
              <ThreatFeed />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/incident-response"
        element={
          <ProtectedRoute requiredRole="analyst">
            <Layout>
              <IncidentResponse />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/threat-hunting"
        element={
          <ProtectedRoute>
            <Layout>
              <ThreatHunting />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;


