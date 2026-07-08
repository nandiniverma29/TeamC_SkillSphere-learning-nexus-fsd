import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CourseRoutes from "./components/Routes";
import Instruments from "./components/Instruments";
import TrailLog from "./components/TrailLog";
import Connect from "./components/Connect";
import Login from "./components/Login";
import Signup from "./components/Signup";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CourseRoutes />
      <Instruments />
      <TrailLog />
      <Connect />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
