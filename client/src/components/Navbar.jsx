export default function Navbar() {
  const links = [
    { href: '#explore', label: 'Explore' },
    { href: '#learn', label: 'Learn' },
    { href: '#track', label: 'Track' },
    { href: '#analytics', label: 'Analytics' },
    { href: '#connect', label: 'Connect' },
  ];

  return (
    <nav className="navbar">
      <a href="#explore" className="navbar-brand">
        <span className="navbar-mark" aria-hidden="true">▲</span>
        SKILLSPHERE
      </a>
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <a href="#connect" className="navbar-cta">Sign in</a>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 6vw;
          background: rgba(20, 35, 29, 0.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--contour);
        }
        .navbar-brand {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .navbar-mark {
          color: var(--orange);
          font-size: 0.8rem;
        }
        .navbar-links {
          display: flex;
          gap: 2.25rem;
          list-style: none;
        }
        .navbar-links a {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--chalk-dim);
          transition: color 0.2s ease;
        }
        .navbar-links a:hover {
          color: var(--orange);
        }
        .navbar-cta {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid var(--sage);
          padding: 0.55rem 1.1rem;
          color: var(--sage);
          transition: all 0.2s ease;
        }
        .navbar-cta:hover {
          background: var(--sage);
          color: var(--ink);
        }
        @media (max-width: 860px) {
          .navbar-links { display: none; }
        }
      `}</style>
    </nav>
  );
}
