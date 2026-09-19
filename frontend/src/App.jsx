import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateRFQ from './pages/CreateRFQ';
import MyRFQs from './pages/MyRFQs';
import RFQDetail from './pages/RFQDetail';
import BrowseRFQs from './pages/BrowseRFQs';
import SubmitQuotation from './pages/SubmitQuotation';
import MyQuotations from './pages/MyQuotations';
import Navbar from './components/Navbar';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-3 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['buyer', 'supplier']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rfqs/create"
            element={
              <ProtectedRoute allowedRoles={['buyer']}>
                <CreateRFQ />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-rfqs"
            element={
              <ProtectedRoute allowedRoles={['buyer']}>
                <MyRFQs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rfqs/:id"
            element={
              <ProtectedRoute allowedRoles={['buyer', 'supplier']}>
                <RFQDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/browse-rfqs"
            element={
              <ProtectedRoute allowedRoles={['supplier']}>
                <BrowseRFQs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rfqs/:id/quote"
            element={
              <ProtectedRoute allowedRoles={['supplier']}>
                <SubmitQuotation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-quotations"
            element={
              <ProtectedRoute allowedRoles={['supplier']}>
                <MyQuotations />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
          B2B RFQ Marketplace • Built with React + FastAPI
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}