import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/ui/ToastContainer';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Write } from './pages/Write';
import { Archive } from './pages/Archive';
import { About } from './pages/About';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, openAuthModal } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      openAuthModal('signin');
    }
  }, [user, loading, openAuthModal]);

  if (loading) {
    return <div className="loading-spinner">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <AuthModal />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/write"
          element={
            <Layout hideFooter>
              <Write />
            </Layout>
          }
        />
        <Route
          path="/archive"
          element={
            <Layout>
              <ProtectedRoute>
                <Archive />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}
