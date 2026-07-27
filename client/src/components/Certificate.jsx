import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLayout from "./AppLayout";
import "./Dashboard.css";

export default function Certificate() {
  const { courseId } = useParams();
  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const [coursesRes, meRes] = await Promise.all([
          fetch("http://localhost:8080/api/dashboard/enrollments", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:8080/api/account/me", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        if (!coursesRes.ok || !meRes.ok) throw new Error("Failed to load");
        const enrollments = await coursesRes.json();
        const me = await meRes.json();
        const found = enrollments.enrolledCourses?.find((c) => String(c.courseId ?? c.id) === String(courseId));
        if (!found) throw new Error("Course not found in your enrollments");
        setCourse(found);
        setUser(me);
      } catch {
        setError("Could not load your certificate.");
      }
    })();
  }, [token, courseId]);

  if (error) {
    return (
      <AppLayout>
        <div className="ss-dashboard">{error}</div>
      </AppLayout>
    );
  }

  if (!course || !user) {
    return (
      <AppLayout>
        <div className="ss-dashboard">Preparing your certificate...</div>
      </AppLayout>
    );
  }

  const dateStr = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <AppLayout>
      <div className="ss-dashboard" style={{ maxWidth: 900 }}>
        <Link to="/my-learning" className="ss-cd-back">&larr; My Learning</Link>

        <div className="ss-cert">
          <div className="ss-cert-inner">
            <div className="ss-cert-mark" />
            <p className="ss-cert-eyebrow">Certificate of Completion</p>
            <h1 className="ss-cert-name">{user.name}</h1>
            <p className="ss-cert-line">has successfully completed</p>
            <h2 className="ss-cert-course">{course.title}</h2>
            <p className="ss-cert-line">{course.unitsTotal} units &middot; awarded {dateStr}</p>
            <div className="ss-cert-footer">
              <div>
                <p className="ss-cert-sig">SkillSphere</p>
                <p className="ss-cert-sig-label">Issuing platform</p>
              </div>
              <div className="ss-cert-seal">SS</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button className="ss-resume-btn" onClick={() => window.print()}>Print / Save as PDF</button>
        </div>
      </div>

      <style>
        {`
          .ss-cert { margin-top: 20px; padding: 3px; border-radius: 24px; background: linear-gradient(135deg, #7C6CF6, #22D3EE); }
          .ss-cert-inner { background: var(--st-forest-deep); border-radius: 22px; padding: 60px 50px; text-align: center; position: relative; overflow: hidden; }
          .ss-cert-inner::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(124,108,246,0.16), transparent 60%); pointer-events: none; }
          .ss-cert-mark { width: 46px; height: 46px; border-radius: 50%; margin: 0 auto 18px; background: linear-gradient(135deg, #7C6CF6, #A78BFA 50%, #22D3EE); box-shadow: 0 0 24px rgba(124,108,246,0.6); }
          .ss-cert-eyebrow { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--st-sage); margin-bottom: 18px; }
          .ss-cert-name { font-family: var(--font-display); font-weight: 800; font-size: 34px; margin-bottom: 8px; }
          .ss-cert-line { color: var(--st-text-muted); font-size: 13px; margin-bottom: 6px; }
          .ss-cert-course { font-family: var(--font-display); font-weight: 700; font-size: 22px; margin: 10px 0 14px; background: linear-gradient(135deg, #A78BFA, #22D3EE); -webkit-background-clip: text; background-clip: text; color: transparent; }
          .ss-cert-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 44px; padding-top: 20px; border-top: 1px solid var(--st-border); text-align: left; }
          .ss-cert-sig { font-family: var(--font-display); font-weight: 700; font-size: 15px; }
          .ss-cert-sig-label { font-size: 11px; color: var(--st-text-muted); margin-top: 2px; }
          .ss-cert-seal { width: 46px; height: 46px; border-radius: 50%; border: 2px solid var(--st-sage); color: var(--st-sage); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; font-family: var(--font-display); }
          @media print {
            .ss-shell aside, .ss-shell button { display: none !important; }
            .ss-content { margin-left: 0 !important; }
          }
        `}
      </style>
    </AppLayout>
  );
}
