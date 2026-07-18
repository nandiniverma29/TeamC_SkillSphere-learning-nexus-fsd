import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./Dashboard.css";

export default function Courses() {
  const { token } = useAuth();
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState("");
  const [enrollingId, setEnrollingId] = useState(null);

  const loadCourses = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError("Could not load courses. Is the backend running?");
    }
  };

  useEffect(() => {
    if (token) loadCourses();
  }, [token]);

  const handleEnroll = async (courseId) => {
    setEnrollingId(courseId);
    try {
      const res = await fetch(`http://localhost:8080/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Enroll failed");
      }
      await loadCourses(); // refresh so the "enrolled" flag updates
    } catch (err) {
      alert(err.message);
    } finally {
      setEnrollingId(null);
    }
  };

  if (error) {
    return (
      <>
        <Navbar />
        <div className="ss-dashboard">{error}</div>
      </>
    );
  }

  if (!courses) {
    return (
      <>
        <Navbar />
        <div className="ss-dashboard">Loading courses...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="ss-dashboard">
        <h1 className="ss-welcome" style={{ marginBottom: "1.5rem" }}>All routes</h1>
        <div className="ss-course-grid">
          {courses.map((c) => (
            <div key={c.id} className="ss-course-card">
              <div className="ss-course-card-top">
                <span className="ss-course-tag">{c.category}</span>
                {c.enrolled && <span className="ss-course-done">Enrolled</span>}
              </div>
              <h4 className="ss-course-title">{c.title}</h4>
              <p className="ss-course-percent">{c.totalUnits} units</p>
              <button
                className="ss-resume-btn"
                style={{ marginTop: "10px", width: "100%" }}
                disabled={c.enrolled || enrollingId === c.id}
                onClick={() => handleEnroll(c.id)}
              >
                {c.enrolled ? "Enrolled" : enrollingId === c.id ? "Enrolling..." : "Enroll"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
