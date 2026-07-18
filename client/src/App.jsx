import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Routes from './components/Routes';
import Instruments from './components/Instruments';
import TrailLog from './components/TrailLog';
import Connect from './components/Connect';
import OAuthSuccess from './components/OAuthSuccess';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import ProtectedRoute from './components/ProtectedRoute';

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Routes />
      <Instruments />
      <TrailLog />
      <Connect />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouterRoutes>
          <Route path="/" element={<Landing />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
        </RouterRoutes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;