const routes = [
  {
    tier: 'Summit',
    title: 'Java Backend Developer',
    desc: 'Build production APIs, master Spring Security, and ship authenticated services end to end.',
    gain: '48h',
    distance: '12 modules',
    rating: '4.9',
    price: '240 TC',
  },
  {
    tier: 'Ridge',
    title: 'React Frontend Engineering',
    desc: 'Component architecture, state management, and interfaces that hold up under real traffic.',
    gain: '36h',
    distance: '9 modules',
    rating: '4.8',
    price: '180 TC',
  },
  {
    tier: 'Basecamp',
    title: 'Data Science Foundations',
    desc: 'Statistics, Python tooling, and the modelling instincts every analytics role expects.',
    gain: '30h',
    distance: '8 modules',
    rating: '4.7',
    price: '160 TC',
  },
];

export default function Routes() {
  return (
    <section id="learn" className="section routes">
      <div className="section-head">
        <p className="eyebrow">Learn — charted routes</p>
        <h2>Pick your <em>route</em></h2>
        <p>Every course is a mapped route with a difficulty tier, distance, and elevation gain — no guessing how far the summit is.</p>
      </div>

      <div className="routes-grid">
        {routes.map((r) => (
          <article className="route-card" key={r.title}>
            <div className="route-card-top">
              <span className={`tier tier-${r.tier.toLowerCase()}`}>{r.tier}</span>
              <span className="rating">★ {r.rating}</span>
            </div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
            <div className="route-stats">
              <div>
                <span className="label">Elevation gain</span>
                <span className="value">{r.gain}</span>
              </div>
              <div>
                <span className="label">Distance</span>
                <span className="value">{r.distance}</span>
              </div>
            </div>
            <div className="route-card-foot">
              <span className="price">{r.price}</span>
              <span className="go">Enter route →</span>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .routes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .route-card {
          background: var(--ridge);
          border: 1px solid var(--contour);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .route-card:hover {
          border-color: var(--orange);
          transform: translateY(-4px);
        }
        .route-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .tier {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.6rem;
          border: 1px solid var(--sage);
          color: var(--sage);
        }
        .tier-summit { border-color: var(--orange); color: var(--orange); }
        .rating {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--chalk-dim);
        }
        .route-card h3 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.5rem;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }
        .route-card p {
          color: var(--chalk-dim);
          font-size: 0.92rem;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .route-stats {
          display: flex;
          gap: 2rem;
          border-top: 1px solid var(--contour);
          border-bottom: 1px solid var(--contour);
          padding: 1rem 0;
          margin-bottom: 1.25rem;
        }
        .route-stats .label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--chalk-dim);
          margin-bottom: 0.25rem;
        }
        .route-stats .value {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--chalk);
        }
        .route-card-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .price {
          font-family: var(--font-mono);
          color: var(--orange);
          font-weight: 600;
        }
        .go {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--chalk-dim);
        }
        @media (max-width: 900px) {
          .routes-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
