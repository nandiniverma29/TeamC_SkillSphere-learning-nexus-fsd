import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "./AppLayout";
import "./Dashboard.css";

// Illustrative schedule data. In a future iteration this would come from
// something like GET /api/schedule, keyed off enrolled courses' pacing.
const UPCOMING = [
  {
    id: 1,
    day: "Today",
    time: "6:00 PM",
    title: "Live session: Spring Security deep dive",
    course: "Java Backend Developer",
    type: "Live session",
  },
  {
    id: 2,
    day: "Today",
    time: "8:30 PM",
    title: "Quiz: React Hooks fundamentals",
    course: "React Frontend Engineering",
    type: "Quiz due",
  },
  {
    id: 3,
    day: "Tomorrow",
    time: "9:00 AM",
    title: "Assignment due: JPA & Hibernate mapping",
    course: "Java Backend Developer",
    type: "Assignment",
  },
  {
    id: 4,
    day: "Wed",
    time: "7:00 PM",
    title: "Study group: Data Structures basics",
    course: "Data Science Foundations",
    type: "Study group",
  },
  {
    id: 5,
    day: "Fri",
    time: "5:30 PM",
    title: "Milestone check-in with mentor",
    course: "REST API Design",
    type: "Mentor call",
  },
];

const WEEK = [
  { d: "Mon", date: 20, hasEvent: false },
  { d: "Tue", date: 21, hasEvent: true },
  { d: "Wed", date: 22, hasEvent: true },
  { d: "Thu", date: 23, hasEvent: true, isToday: true },
  { d: "Fri", date: 24, hasEvent: true },
  { d: "Sat", date: 25, hasEvent: false },
  { d: "Sun", date: 26, hasEvent: false },
];

const TYPE_COLORS = {
  "Live session": "#7C6CF6",
  "Quiz due": "#F97316",
  Assignment: "#F97316",
  "Study group": "#22D3EE",
  "Mentor call": "#C084FC",
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("Today");

  const filtered = useMemo(
    () => (activeDay === "All" ? UPCOMING : UPCOMING.filter((e) => e.day === activeDay)),
    [activeDay]
  );

  return (
    <AppLayout>
      <div className="ss-dashboard">
        <h1 className="ss-welcome" style={{ marginBottom: "0.4rem" }}>Schedule</h1>
        <p style={{ color: "var(--st-text-muted)", marginBottom: "1.75rem", fontSize: "14px" }}>
          Live sessions, deadlines, and study groups across your enrolled routes.
        </p>

        <section className="ss-section">
          <div className="ss-week-strip">
            {WEEK.map((w) => (
              <div key={w.d} className={`ss-week-day ${w.isToday ? "is-today" : ""}`}>
                <span className="ss-week-day-name">{w.d}</span>
                <span className="ss-week-day-num">{w.date}</span>
                {w.hasEvent && <span className="ss-week-dot" />}
              </div>
            ))}
          </div>
        </section>

        <section className="ss-section">
          <div className="ss-schedule-tabs">
            {["All", "Today", "Tomorrow", "Wed", "Fri"].map((d) => (
              <button
                key={d}
                className={`ss-learn-tab ${activeDay === d ? "is-active" : ""}`}
                onClick={() => setActiveDay(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="ss-agenda">
            {filtered.length === 0 ? (
              <p style={{ color: "var(--st-text-muted)", fontSize: "14px" }}>Nothing scheduled — clear trail ahead.</p>
            ) : (
              filtered.map((e) => (
                <div className="ss-agenda-row" key={e.id}>
                  <div className="ss-agenda-time">
                    <span>{e.day}</span>
                    <span className="ss-agenda-clock">{e.time}</span>
                  </div>
                  <div className="ss-agenda-bar" style={{ background: TYPE_COLORS[e.type] }} />
                  <div className="ss-agenda-body">
                    <span className="ss-agenda-type" style={{ color: TYPE_COLORS[e.type] }}>{e.type}</span>
                    <h4 className="ss-continue-title">{e.title}</h4>
                    <p className="ss-agenda-course">{e.course}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="ss-section">
          <h2 className="ss-section-title">Keep your streak alive</h2>
          <div className="ss-continue-card" style={{ maxWidth: 480 }}>
            <p style={{ fontSize: 13, color: "var(--st-text-muted)", marginBottom: 12 }}>
              You haven't logged a session today yet. A quick 15-minute unit keeps the streak going.
            </p>
            <Link to="/my-learning" className="ss-resume-btn" style={{ textDecoration: "none" }}>
              Resume trail
            </Link>
          </div>
        </section>
      </div>

      <style>
        {`
          .ss-week-strip { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
          .ss-week-day { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 6px; background: var(--st-forest-card); border: 1px solid var(--st-border); border-radius: 14px; position: relative; }
          .ss-week-day.is-today { border-color: rgba(124, 108, 246, 0.55); background: rgba(124, 108, 246, 0.12); }
          .ss-week-day-name { font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--st-text-muted); }
          .ss-week-day-num { font-family: var(--font-display); font-weight: 700; font-size: 17px; color: var(--st-cream); }
          .ss-week-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--st-sage); }
          .ss-schedule-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
          .ss-agenda { display: flex; flex-direction: column; gap: 10px; }
          .ss-agenda-row { display: grid; grid-template-columns: 74px 3px 1fr; gap: 14px; align-items: stretch; background: var(--st-forest-card); border: 1px solid var(--st-border); border-radius: 14px; padding: 14px 16px; backdrop-filter: blur(20px) saturate(140%); box-shadow: 0 8px 30px rgba(6, 8, 30, 0.4), inset 0 1px 0 rgba(255,255,255,0.06); transition: transform 0.18s ease, border-color 0.18s ease; }
          .ss-agenda-row:hover { transform: translateY(-2px); border-color: rgba(124, 108, 246, 0.35); }
          .ss-agenda-time { display: flex; flex-direction: column; font-size: 12px; color: var(--st-text-muted); }
          .ss-agenda-clock { font-family: var(--font-mono); color: var(--st-cream); margin-top: 2px; }
          .ss-agenda-bar { border-radius: 4px; }
          .ss-agenda-type { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
          .ss-agenda-course { font-size: 12px; color: var(--st-text-muted); margin-top: 2px; }
        `}
      </style>
    </AppLayout>
  );
}
