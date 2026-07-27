import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./AppLayout.css";

// --- Icon set --------------------------------------------------------------
// Minimal line icons, 20x20, stroke-based so they inherit color via CSS.

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const IconMenu = () => (
  <svg {...iconProps}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const IconHome = () => (
  <svg {...iconProps}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.5 9.5V20a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V9.5" />
  </svg>
);

const IconBook = () => (
  <svg {...iconProps}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M4 4.5v15A2.5 2.5 0 0 1 6.5 17H20V4a1 1 0 0 0-1-1H6.5A2.5 2.5 0 0 0 4 5.5" />
  </svg>
);

const IconCompass = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z" />
  </svg>
);

const IconChart = () => (
  <svg {...iconProps}>
    <line x1="5" y1="20" x2="5" y2="12" />
    <line x1="12" y1="20" x2="12" y2="6" />
    <line x1="19" y1="20" x2="19" y2="15" />
    <line x1="3" y1="20" x2="21" y2="20" />
  </svg>
);

const IconCalendar = () => (
  <svg {...iconProps}>
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <line x1="3.5" y1="10" x2="20.5" y2="10" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="16" y1="3" x2="16" y2="7" />
  </svg>
);

const IconUser = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
  </svg>
);

const IconSettings = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V19a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.2.6.7 1.1 1.5 1.1h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
  </svg>
);

const IconLogout = () => (
  <svg {...iconProps}>
    <path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" />
    <polyline points="15 17 20 12 15 7" />
    <line x1="20" y1="12" x2="9" y2="12" />
  </svg>
);

const IconChevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 6 9 12 15 18" />
  </svg>
);

const IconSun = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="2.5" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="21.5" />
    <line x1="4.2" y1="4.2" x2="6" y2="6" />
    <line x1="18" y1="18" x2="19.8" y2="19.8" />
    <line x1="2.5" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="21.5" y2="12" />
    <line x1="4.2" y1="19.8" x2="6" y2="18" />
    <line x1="18" y1="6" x2="19.8" y2="4.2" />
  </svg>
);

const IconMoon = () => (
  <svg {...iconProps}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
  </svg>
);

const IconBell = () => (
  <svg {...iconProps}>
    <path d="M6 9.5a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13.5 6 9.5Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

// --- Nav config --------------------------------------------------------

const STUDENT_NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: IconHome },
  { to: "/courses", label: "Courses", icon: IconBook },
  { to: "/my-learning", label: "My Learning", icon: IconCompass },
  { to: "/analytics", label: "Analytics", icon: IconChart },
  { to: "/schedule", label: "Schedule", icon: IconCalendar },
  { to: "/profile", label: "Profile", icon: IconUser },
  { to: "/settings", label: "Settings", icon: IconSettings },
];

const INSTRUCTOR_NAV_ITEMS = [
  { to: "/instructor", label: "Dashboard", icon: IconHome },
  { to: "/profile", label: "Profile", icon: IconUser },
  { to: "/settings", label: "Settings", icon: IconSettings },
];

const NOTIFICATIONS = [
  { id: 1, text: "New live session added: Spring Security deep dive", time: "2h ago" },
  { id: 2, text: "You earned the \"7-Day Streak\" achievement", time: "1d ago" },
  { id: 3, text: "Assignment due tomorrow: JPA & Hibernate mapping", time: "1d ago" },
  { id: 4, text: "React Frontend Engineering has a new unit", time: "3d ago" },
];

export default function AppLayout({ children }) {
  const { logout, isInstructor } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const navItems = isInstructor ? INSTRUCTOR_NAV_ITEMS : STUDENT_NAV_ITEMS;
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sp_sidebar_collapsed") === "1";
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("sp_sidebar_collapsed", collapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  // Close the mobile drawer on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (to) =>
    location.pathname === to || location.pathname.startsWith(`${to}/`);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={`ss-shell ${collapsed ? "is-collapsed" : ""}`}>
      {mobileOpen && (
        <div className="ss-scrim" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`ss-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="ss-side-top">
          <button
            className="ss-hamburger"
            aria-label="Toggle menu"
            onClick={() => {
              if (window.matchMedia("(max-width: 900px)").matches) {
                setMobileOpen((v) => !v);
              } else {
                setCollapsed((v) => !v);
              }
            }}
          >
            <IconMenu />
          </button>
          <Link to={isInstructor ? "/instructor" : "/dashboard"} className="ss-side-brand">
            <span className="ss-side-mark" aria-hidden="true" />
            <span className="ss-side-brand-text">SkillSphere</span>
          </Link>
          <div className="ss-notif-wrap">
            <button
              className="ss-hamburger ss-notif-btn"
              aria-label="Notifications"
              onClick={() => setNotifOpen((v) => !v)}
            >
              <IconBell />
              <span className="ss-notif-dot" />
            </button>
            {notifOpen && (
              <>
                <div className="ss-notif-scrim" onClick={() => setNotifOpen(false)} />
                <div className="ss-notif-dropdown">
                  <p className="ss-notif-title">Notifications</p>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className="ss-notif-row">
                      <p>{n.text}</p>
                      <span>{n.time}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <nav className="ss-side-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`ss-side-link ${isActive(to) ? "is-active" : ""}`}
              title={label}
            >
              <span className="ss-side-icon">
                <Icon />
              </span>
              <span className="ss-side-label">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="ss-side-bottom">
          <button
            className="ss-side-link"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="ss-side-icon">
              {theme === "dark" ? <IconSun /> : <IconMoon />}
            </span>
            <span className="ss-side-label">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>

          <button className="ss-side-link ss-side-logout" onClick={handleLogout} title="Logout">
            <span className="ss-side-icon">
              <IconLogout />
            </span>
            <span className="ss-side-label">Logout</span>
          </button>

          <button
            className="ss-side-collapse-btn"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className={`ss-side-collapse-icon ${collapsed ? "is-flipped" : ""}`}>
              <IconChevron />
            </span>
            <span className="ss-side-label">Collapse</span>
          </button>
        </div>
      </aside>

      <main className="ss-content">{children}</main>
    </div>
  );
}
