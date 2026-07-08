import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <header id="explore" className="hero">
      <div className="hero-contours" aria-hidden="true">
        <svg viewBox="0 0 800 800" fill="none">
          {[120, 180, 240, 300, 360, 420].map((r, i) => (
            <ellipse
              key={r}
              cx="560"
              cy="360"
              rx={r}
              ry={r * 0.8}
              stroke="#3F5B4C"
              strokeWidth="1.5"
              opacity={0.9 - i * 0.12}
            />
          ))}
          <circle cx="560" cy="360" r="4" fill="#E2762D" />
        </svg>
      </div>

      <div className="hero-content">
        <p className="eyebrow">Trailhead — expedition 04 now boarding</p>
        <h1>
          Bridge
          <br />
          learning
          <br />
          to <em>ready.</em>
        </h1>
        <p className="hero-copy">
          SkillSphere charts the route from where you are to where the workforce
          needs you — real routes, real elevation, tracked as you climb.
        </p>
        <div className="hero-actions">
          <Link to="/login" className="btn btn-primary">
            Start the climb
          </Link>
          <a href="#track" className="btn btn-outline">
            View the trail map
          </a>
        </div>
        <div className="hero-coords">40.21 N · WORKFORCE READY LINE</div>
      </div>

      <style>{`
        .hero {
          position: relative;
          padding: 6rem 6vw 7rem;
          overflow: hidden;
          min-height: 88vh;
          display: flex;
          align-items: center;
        }
        .hero-contours {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.9;
          pointer-events: none;
        }
        .hero-contours svg {
          width: 100%;
          height: 100%;
        }
        .hero-content {
          position: relative;
          max-width: 640px;
        }
        .hero h1 {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 0.92;
          letter-spacing: -0.01em;
          margin: 1.25rem 0 1.5rem;
        }
        .hero h1 em {
          font-style: normal;
          color: var(--orange);
        }
        .hero-copy {
          font-size: 1.15rem;
          color: var(--chalk-dim);
          max-width: 46ch;
          margin-bottom: 2.5rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.95rem 1.6rem;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        .btn-primary {
          background: var(--orange);
          color: var(--ink);
          font-weight: 600;
        }
        .btn-primary:hover {
          background: var(--orange-dim);
        }
        .btn-outline {
          border-color: var(--chalk-dim);
          color: var(--chalk);
        }
        .btn-outline:hover {
          border-color: var(--orange);
          color: var(--orange);
        }
        .hero-coords {
          margin-top: 3rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--contour);
        }
        @media (max-width: 720px) {
          .hero { min-height: auto; padding: 3.5rem 6vw 4rem; }
        }
      `}</style>
    </header>
  );
}
