import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pagini
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import PlannerPage from './pages/PlannerPage';
import ItineraryPage from './pages/ItineraryPage';
import EventsPage from './pages/EventsPage';

// Wrapper pentru rutele protejate
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirecționare în funcție de statusul autentificării
  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/' || location.pathname === '/login')) {
      navigate('/home', { replace: true });
    } else if (!isAuthenticated && location.pathname === '/') {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />

      <Route path="/city/:cityId" element={
        <ProtectedRoute>
          <CityPage />
        </ProtectedRoute>
      } />

      <Route path="/planner" element={
        <ProtectedRoute>
          <PlannerPage />
        </ProtectedRoute>
      } />

      <Route path="/planner/:cityId" element={
        <ProtectedRoute>
          <PlannerPage />
        </ProtectedRoute>
      } />

      <Route path="/planner/:cityId/:days" element={
        <ProtectedRoute>
          <PlannerPage />
        </ProtectedRoute>
      } />

      <Route path="/itinerary/:itineraryId" element={
        <ProtectedRoute>
          <ItineraryPage />
        </ProtectedRoute>
      } />

      <Route path="/events" element={
        <ProtectedRoute>
          <EventsPage />
        </ProtectedRoute>
      } />

      <Route path="/events/:cityId" element={
        <ProtectedRoute>
          <EventsPage />
        </ProtectedRoute>
      } />

      {/* Rute necunoscute -> redirect către /home sau /login */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
    </Routes>
  );
}

export default App;
