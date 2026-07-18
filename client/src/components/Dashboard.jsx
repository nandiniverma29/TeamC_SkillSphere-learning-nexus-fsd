import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./Dashboard.css";

// --- Small building blocks -------------------------------------------------

function Initials({ name }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return <div className="ss-avatar">{initials}</div>;
}

function StatCard({ label, value, sublabel }) {
  return (
    <div className="ss-stat-card">
      <p className="ss-stat-value">{value}</p>
      <p className="ss-stat-label">{label}</p>
      {sublabel && <p className="ss-stat-sublabel">{sublabel}</p>}
    </div>
  );
}

function ProgressBar({ percent }) {
  return (
    <div className="ss-progress-track">
      <div className="ss-progress-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}

// Signature element: weekly activity rendered as a trail elevation profile
function ElevationChart({ data }) {
  const max = Math.max(...data.map((d) => d.units), 1);
  const width = 560;
  const height = 140;
  const padding = 20;
  const step = (width - padding * 2) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding + i * step;
    const y = height - padding - (d.units / max) * (height - padding * 2);
    return [x, y];
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1][0]} ${
    height - padding
  } L ${points[0][0]} ${height - padding} Z`;

  return (
    <div className="ss-elevation-wrap">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="ss-elevation-svg"
        role="img"
        aria-label="Weekly learning activity, shown as a trail elevation profile"
      >
        <path d={areaPath} className="ss-elevation-area" />
        <path d={linePath} className="ss-elevation-line" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" className="ss-elevation-point" />
        ))}
      </svg>
      <div className="ss-elevation-labels">
        {data.map((d) => (
          <span key={d.day}>{d.day}</span>
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div className="ss-course-card">
      <div className="ss-course-card-top">
        <span className="ss-course-tag">{course.category}</span>
        {course.percentComplete === 100 && (
          <span className="ss-course-done">Summit reached</span>
        )}
      </div>
      <h4 className="ss-course-title">{course.title}</h4>
      <ProgressBar percent={course.percentComplete} />
      <p className="ss-course-percent">{course.percentComplete}% complete</p>
    </div>
  );
}

function ContinueCard({ course }) {
  return (
    <div className="ss-continue-card">
      <div className="ss-continue-top">
        <h4 className="ss-continue-title">{course.title}</h4>
        <span className="ss-continue-last">{course.lastAccessed}</span>
      </div>
      <ProgressBar percent={course.percentComplete} />
      <div className="ss-continue-bottom">
        <span>
          {course.unitsCompleted}/{course.unitsTotal} units
        </span>
        <button className="ss-resume-btn">Resume trail</button>
      </div>
    </div>
  );
}

function AchievementBadge({ achievement }) {
  return (
    <div className={`ss-badge ${achievement.earned ? "earned" : "locked"}`}>
      <div className="ss-badge-icon">{achievement.earned ? "★" : "○"}</div>
      <p className="ss-badge-title">{achievement.title}</p>
      <p className="ss-badge-desc">{achievement.description}</p>
    </div>
  );
}

function RecommendedCard({ item }) {
  return (
    <div className="ss-rec-card">
      <span className="ss-course-tag">{item.category}</span>
      <h4 className="ss-continue-title">{item.title}</h4>
      <p className="ss-rec-reason">{item.reason}</p>
      <button className="ss-rec-btn">View course</button>
    </div>
  );
}

// --- Main dashboard ----------------------------------------------------------

export default function Dashboard() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [summaryRes, enrollmentsRes] = await Promise.all([
          fetch("http://localhost:8080/api/dashboard/summary", { headers }),
          fetch("http://localhost:8080/api/dashboard/enrollments", { headers }),
        ]);

        if (!summaryRes.ok || !enrollmentsRes.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const summary = await summaryRes.json();
        const enrollments = await enrollmentsRes.json();

        // Merge both responses into the single shape the components below expect
        setData({ ...summary, ...enrollments });
      } catch (err) {
        setError("Could not load your dashboard. Is the backend running?");
      }
    }

    if (token) loadDashboard();
  }, [token]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="ss-dashboard">{error}</div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="ss-dashboard">Loading your trail...</div>
      </>
    );
  }

  const { user, stats, weeklyActivity } = data;

  const completionPercent = Math.round(
    (stats.unitsCompleted / stats.unitsTotal) * 100
  );

  return (
    <>
      <Navbar />
      <div className="ss-dashboard">
      {/* Welcome header */}
      <div className="ss-header">
        <div className="ss-header-left">
          <Initials name={user.name} />
          <div>
            <h1 className="ss-welcome">Welcome back, {user.name.split(" ")[0]}</h1>
            <p className="ss-streak">{user.streakDays}-day streak on the trail</p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="ss-stats-grid">
        <StatCard label="Courses enrolled" value={stats.coursesEnrolled} />
        <StatCard label="Courses completed" value={stats.coursesCompleted} />
        <StatCard
          label="Units completed"
          value={`${stats.unitsCompleted}/${stats.unitsTotal}`}
          sublabel={`${completionPercent}% overall`}
        />
        <StatCard label="Hours this week" value={stats.hoursThisWeek} />
      </div>

      {/* Weekly activity */}
      <section className="ss-section">
        <h2 className="ss-section-title">This week's climb</h2>
        <ElevationChart data={weeklyActivity} />
      </section>

      {/* Continue learning */}
      <section className="ss-section">
        <h2 className="ss-section-title">Continue learning</h2>
        <div className="ss-continue-grid">
          {data.continueLearning.map((c) => (
            <ContinueCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* Enrolled courses */}
      <section className="ss-section">
        <h2 className="ss-section-title">All enrolled courses</h2>
        <div className="ss-course-grid">
          {data.enrolledCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* Skill progress */}
      <section className="ss-section">
        <h2 className="ss-section-title">Skill progress</h2>
        <div className="ss-skill-list">
          {data.skillProgress.map((s) => (
            <div key={s.skill} className="ss-skill-row">
              <span className="ss-skill-name">{s.skill}</span>
              <ProgressBar percent={s.percent} />
              <span className="ss-skill-percent">{s.percent}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="ss-section">
        <h2 className="ss-section-title">Achievements</h2>
        <div className="ss-badge-grid">
          {data.achievements.map((a) => (
            <AchievementBadge key={a.id} achievement={a} />
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="ss-section">
        <h2 className="ss-section-title">Recommended for you</h2>
        <div className="ss-rec-grid">
          {data.recommended.map((r) => (
            <RecommendedCard key={r.id} item={r} />
          ))}
        </div>
      </section>
      </div>
    </>
  );
}
