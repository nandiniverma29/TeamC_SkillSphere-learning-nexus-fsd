const routes = [
  {
    tier: 'Summit',
    title: 'Java Backend Developer',
    desc: 'Build production APIs, master Spring Security, and ship authenticated services end to end.',
    gain: '48h',
    distance: '12 modules',
    rating: '4.9',
    price: '240 TC',
    topics: ['Core Java & OOP', 'Spring Boot & REST APIs', 'Spring Security + JWT', 'MySQL & JPA/Hibernate', 'Testing with JUnit'],
    prereq: 'Basic programming knowledge',
    outcome: 'Ship a fully authenticated REST API from scratch',
  },
  {
    tier: 'Ridge',
    title: 'React Frontend Engineering',
    desc: 'Component architecture, state management, and interfaces that hold up under real traffic.',
    gain: '36h',
    distance: '9 modules',
    rating: '4.8',
    price: '180 TC',
    topics: ['React Fundamentals & Hooks', 'State Management', 'Routing with React Router', 'API Integration', 'Performance & Testing'],
    prereq: 'HTML, CSS, JavaScript basics',
    outcome: 'Build and deploy a production-grade React app',
  },
  {
    tier: 'Basecamp',
    title: 'Data Science Foundations',
    desc: 'Statistics, Python tooling, and the modelling instincts every analytics role expects.',
    gain: '30h',
    distance: '8 modules',
    rating: '4.7',
    price: '160 TC',
    topics: ['Python for Data Science', 'Statistics & Probability', 'Pandas & NumPy', 'Data Visualization', 'Intro to Machine Learning'],
    prereq: 'No prior experience needed',
    outcome: 'Analyze real datasets and build your first ML model',
  },
];

export default function Routes() {
  return (
    <section id="learn" className="section routes">
      <div className="section-head">
        <p className="eyebrow">Learn — charted routes</p>
        <h2>Pick your <em>route</em></h2>
        <p>Every course is a mapped route with a difficulty tier, distance, and elevation gain — no guessing how far the summit is. Hover a card to see what's inside.</p>
      </div>

      <div className="routes-grid">
        {routes.map((r) => (
          <div className="flip-card" key={r.title}>
            <div className="flip-card-inner">

              <article className="route-card flip-front">
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
                  <span className="go">Hover for details →</span>
                </div>
              </article>

              <article className="route-card flip-back">
                <span className={`tier tier-${r.tier.toLowerCase()}`}>{r.tier}</span>
                <h3>{r.title}</h3>

                <span className="back-label">What you'll cover</span>
                <ul className="topic-list">
                  {r.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                <div className="back-meta">
                  <div>
                    <span className="back-label">Prerequisites</span>
                    <p>{r.prereq}</p>
                  </div>
                  <div>
                    <span className="back-label">Outcome</span>
                    <p>{r.outcome}</p>
                tas  </div>
                </div>

                <div className="route-card-foot">
                  <span className="price">{r.price}</span>
                  <span className="go">Enter route →</span>
                </div>
              </article>

            </div>
          </div>
        ))}
      </div>

      <style>
        {".routes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; } .flip-card { perspective: 1200px; height: 420px; } .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; } .flip-card:hover .flip-card-inner { transform: rotateY(180deg); } .route-card { position: absolute; inset: 0; backface-visibility: hidden; background: var(--ridge); border: 1px solid var(--contour); padding: 1.75rem; display: flex; flex-direction: column; } .flip-front { transition: border-color 0.2s ease; } .flip-card:hover .flip-front { border-color: var(--orange); } .flip-back { transform: rotateY(180deg); border-color: var(--orange); overflow-y: auto; } .route-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; } .tier { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.3rem 0.6rem; border: 1px solid var(--sage); color: var(--sage); display: inline-block; } .tier-summit { border-color: var(--orange); color: var(--orange); } .rating { font-family: var(--font-mono); font-size: 0.85rem; color: var(--chalk-dim); } .route-card h3 { font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; text-transform: uppercase; margin-bottom: 0.6rem; margin-top: 0.75rem; } .flip-front h3 { margin-top: 0; } .route-card p { color: var(--chalk-dim); font-size: 0.92rem; margin-bottom: 1.5rem; flex-grow: 1; } .route-stats { display: flex; gap: 2rem; border-top: 1px solid var(--contour); border-bottom: 1px solid var(--contour); padding: 1rem 0; margin-bottom: 1.25rem; } .route-stats .label { display: block; font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--chalk-dim); margin-bottom: 0.25rem; } .route-stats .value { font-family: var(--font-mono); font-size: 1rem; color: var(--chalk); } .route-card-foot { display: flex; justify-content: space-between; align-items: center; margin-top: auto; } .price { font-family: var(--font-mono); color: var(--orange); font-weight: 600; } .go { font-family: var(--font-mono); font-size: 0.78rem; color: var(--chalk-dim); } .back-label { display: block; font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--orange); margin-bottom: 0.5rem; margin-top: 0.75rem; } .topic-list { list-style: none; padding: 0; margin: 0 0 0.5rem; } .topic-list li { color: var(--chalk-dim); font-size: 0.82rem; padding: 0.3rem 0; padding-left: 1rem; position: relative; } .topic-list li::before { content: '—'; position: absolute; left: 0; color: var(--sage); } .back-meta { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.75rem; } .back-meta p { color: var(--chalk-dim); font-size: 0.8rem; margin: 0; } @media (max-width: 900px) { .routes-grid { grid-template-columns: 1fr; } .flip-card { height: 460px; } }"}
      </style>
    </section>
  );
}