import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import AppLayout from "./AppLayout";
import "./Dashboard.css";

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`ss-toggle ${checked ? "is-on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="ss-toggle-knob" />
    </button>
  );
}

function SettingsRow({ title, desc, control }) {
  return (
    <div className="ss-settings-row">
      <div>
        <p className="ss-settings-row-title">{title}</p>
        {desc && <p className="ss-settings-row-desc">{desc}</p>}
      </div>
      {control}
    </div>
  );
}

export default function Settings() {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();

  const [emailDigest, setEmailDigest] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [liveSessionAlerts, setLiveSessionAlerts] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  const [publicProfile, setPublicProfile] = useState(true);
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);

  const [autoplay, setAutoplay] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [language, setLanguage] = useState("English");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    showToast?.("Settings saved", "success");
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <AppLayout>
      <div className="ss-dashboard">
        <h1 className="ss-welcome" style={{ marginBottom: "0.4rem" }}>Settings</h1>
        <p style={{ color: "var(--st-text-muted)", marginBottom: "1.75rem", fontSize: "14px" }}>
          Tune how SkillSphere talks to you and what others see.
        </p>

        <section className="ss-section">
          <h2 className="ss-section-title">Notifications</h2>
          <div className="ss-settings-card">
            <SettingsRow
              title="Weekly progress digest"
              desc="A Monday email summarizing your streak, hours, and what's next."
              control={<Toggle checked={emailDigest} onChange={setEmailDigest} />}
            />
            <SettingsRow
              title="Lesson reminders"
              desc="Gentle nudges if you haven't logged a session in a day."
              control={<Toggle checked={reminders} onChange={setReminders} />}
            />
            <SettingsRow
              title="Live session alerts"
              desc="Notify me 15 minutes before a scheduled live session."
              control={<Toggle checked={liveSessionAlerts} onChange={setLiveSessionAlerts} />}
            />
            <SettingsRow
              title="Product updates"
              desc="Occasional emails about new courses and features."
              control={<Toggle checked={productUpdates} onChange={setProductUpdates} />}
            />
          </div>
        </section>

        <section className="ss-section">
          <h2 className="ss-section-title">Privacy</h2>
          <div className="ss-settings-card">
            <SettingsRow
              title="Public profile"
              desc="Let other learners see your badges and completed routes."
              control={<Toggle checked={publicProfile} onChange={setPublicProfile} />}
            />
            <SettingsRow
              title="Show on leaderboard"
              desc="Include your streak and hours on course leaderboards."
              control={<Toggle checked={showOnLeaderboard} onChange={setShowOnLeaderboard} />}
            />
          </div>
        </section>

        <section className="ss-section">
          <h2 className="ss-section-title">Appearance</h2>
          <div className="ss-settings-card">
            <SettingsRow
              title="Theme"
              desc="Switch between a bright workspace and the default dark trail."
              control={
                <div className="ss-theme-switch">
                  <button
                    className={`ss-theme-btn ${theme === "dark" ? "is-active" : ""}`}
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </button>
                  <button
                    className={`ss-theme-btn ${theme === "light" ? "is-active" : ""}`}
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </button>
                </div>
              }
            />
          </div>
        </section>

        <section className="ss-section">
          <h2 className="ss-section-title">Learning experience</h2>
          <div className="ss-settings-card">
            <SettingsRow
              title="Autoplay next lesson"
              desc="Automatically start the next unit when one finishes."
              control={<Toggle checked={autoplay} onChange={setAutoplay} />}
            />
            <SettingsRow
              title="Reduced motion"
              desc="Minimize animations across the app."
              control={<Toggle checked={reducedMotion} onChange={setReducedMotion} />}
            />
            <SettingsRow
              title="Language"
              desc="Interface language for menus and prompts."
              control={
                <select className="ss-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Telugu</option>
                  <option>Spanish</option>
                </select>
              }
            />
          </div>
        </section>

        <section className="ss-section">
          <h2 className="ss-section-title">Account</h2>
          <div className="ss-settings-card">
            <SettingsRow
              title="Sign out of SkillSphere"
              desc="You'll need to sign back in to continue any route."
              control={
                <button className="ss-danger-btn" onClick={logout}>
                  Sign out
                </button>
              }
            />
          </div>
        </section>

        <button className="ss-resume-btn" onClick={handleSave} style={{ padding: "10px 22px" }}>
          {saved ? "Saved ✓" : "Save changes"}
        </button>
      </div>

      <style>
        {`
          .ss-settings-card { background: var(--st-forest-card); border: 1px solid var(--st-border); border-radius: 18px; padding: 6px 22px; backdrop-filter: blur(20px) saturate(140%); box-shadow: 0 8px 30px rgba(6, 8, 30, 0.4), inset 0 1px 0 rgba(255,255,255,0.06); }
          .ss-settings-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 16px 0; border-bottom: 1px solid var(--st-border); }
          .ss-settings-row:last-child { border-bottom: none; }
          .ss-settings-row-title { font-size: 14px; color: var(--st-cream); font-weight: 600; }
          .ss-settings-row-desc { font-size: 12px; color: var(--st-text-muted); margin-top: 3px; max-width: 46ch; }
          .ss-toggle { width: 42px; height: 24px; border-radius: 999px; border: none; background: var(--st-track); position: relative; flex-shrink: 0; transition: background 0.2s ease; }
          .ss-toggle.is-on { background: linear-gradient(135deg, #7C6CF6, #22D3EE); }
          .ss-toggle-knob { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform 0.2s ease; }
          .ss-toggle.is-on .ss-toggle-knob { transform: translateX(18px); }
          .ss-select { background: rgba(255,255,255,0.06); border: 1px solid var(--st-border); color: var(--st-cream); border-radius: 10px; padding: 8px 12px; font-size: 13px; font-family: var(--font-body); }
          .ss-theme-switch { display: flex; gap: 4px; background: var(--st-track); border-radius: 999px; padding: 3px; }
          .ss-theme-btn { border: none; background: transparent; color: var(--st-text-muted); font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 999px; transition: all 0.18s ease; }
          .ss-theme-btn.is-active { color: #fff; background: linear-gradient(135deg, #7C6CF6, #22D3EE); }
          .ss-danger-btn { background: transparent; border: 1px solid rgba(248, 113, 113, 0.5); color: #fca5a5; border-radius: 999px; padding: 8px 16px; font-size: 12px; font-weight: 600; transition: all 0.2s ease; }
          .ss-danger-btn:hover { background: rgba(248, 113, 113, 0.12); }
        `}
      </style>
    </AppLayout>
  );
}
