import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Routes from './components/Routes';
import Instruments from './components/Instruments';
import TrailLog from './components/TrailLog';
import Connect from './components/Connect';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import OAuthSuccess from './components/OAuthSuccess';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import CourseLearn from './components/CourseLearn';
import Profile from './components/Profile';
import MyLearning from './components/MyLearning';
import Analytics from './components/Analytics';
import Schedule from './components/Schedule';
import Settings from './components/Settings';
import CourseDetail from './components/CourseDetail';
import Certificate from './components/Certificate';
import NotFound from './components/NotFound';
import InstructorDashboard from './components/InstructorDashboard';
import InstructorCourseStudents from './components/InstructorCourseStudents';
import InstructorCourseLessons from './components/InstructorCourseLessons';
import ProtectedRoute from './components/ProtectedRoute';

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Routes />
      <Instruments />
      <TrailLog />
      <Testimonials />
      <FAQ />
      <Connect />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <RouterRoutes>
          <Route path="/" element={<Landing />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
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
          <Route
            path="/courses/:courseId"
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificate/:courseId"
            element={
              <ProtectedRoute>
                <Certificate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:courseId/learn"
            element={
              <ProtectedRoute>
                <CourseLearn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-learning"
            element={
              <ProtectedRoute>
                <MyLearning />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor"
            element={
              <ProtectedRoute>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/courses/:courseId/students"
            element={
              <ProtectedRoute>
                <InstructorCourseStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/courses/:courseId/lessons"
            element={
              <ProtectedRoute>
                <InstructorCourseLessons />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
        </BrowserRouter>
      </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;