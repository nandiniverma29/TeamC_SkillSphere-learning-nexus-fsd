const instruments = [
  {
    icon: '◉',
    name: 'Skill Tracking',
    reading: '12 SKILLS ACTIVE',
    desc: 'Every module logged against a live skill inventory.',
    detail: 'Every lesson, quiz, and project you complete updates a live map of your abilities — so you always know exactly which skills are strong and which need more altitude.',
    stats: [ { label: 'Skills tracked', value: '12' }, { label: 'Updated', value: 'Real-time' } ],
  },
  {
    icon: '▤',
    name: 'Analytics Dashboard',
    reading: '82% COMPLETION',
    desc: 'A instrument-panel view of pace, gaps, and momentum.',
    detail: 'A single dashboard shows your pace against the route, where you\'re falling behind, and which topics are consuming the most time — like a cockpit readout for your learning.',
    stats: [ { label: 'Completion', value: '82%' }, { label: 'Weekly pace', value: '+5.2%' } ],
  },
  {
    icon: '⬡',
    name: 'Certificates',
    reading: 'VERIFIED ON ISSUE',
    desc: 'Signed proof of route completion, ready to share.',
    detail: 'Each completed route issues a signed, verifiable certificate — shareable on LinkedIn or with recruiters, with a unique ID that confirms it\'s genuine.',
    stats: [ { label: 'Verification', value: 'Instant' }, { label: 'Format', value: 'Shareable link' } ],
  },
  {
    icon: '➤',
    name: 'AI Recommendations',
    reading: 'NEXT: RIDGE TIER',
    desc: 'Suggests the next route based on where you stand.',
    detail: 'Based on your completed routes and skill gaps, the system recommends what to climb next — so you\'re never guessing which course actually moves you forward.',
    stats: [ { label: 'Suggested next', value: 'Ridge Tier' }, { label: 'Match confidence', value: '91%' } ],
  },
];

export default function Instruments() {
  return (
    <section id="track" className="section instruments">
      <div className="section-head">
        <p className="eyebrow">Track — basecamp instruments</p>
        <h2>Read your <em>progress</em></h2>
        <p>Four instruments, always mounted at basecamp, telling you exactly where you stand on the climb. Hover a dial for the full reading.</p>
      </div>

      <div className="instruments-grid">
        {instruments.map((inst) => (
          <div className="flip-card" key={inst.name}>
            <div className="flip-card-inner">

              <div className="instrument flip-front">
                <div className="instrument-dial" aria-hidden="true">{inst.icon}</div>
                <h3>{inst.name}</h3>
                <p>{inst.desc}</p>
                <span className="reading">{inst.reading}</span>
              </div>

              <div className="instrument flip-back">
                <div className="instrument-dial small" aria-hidden="true">{inst.icon}</div>
                <h3>{inst.name}</h3>
                <p className="detail-text">{inst.detail}</p>
                <div className="back-stats">
                  {inst.stats.map((s) => (
                    <div key={s.label}>
                      <span className="stat-label">{s.label}</span>
                      <span className="stat-value">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <style>
        {".instruments-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--contour); border: 1px solid var(--contour); } .flip-card { perspective: 1200px; height: 300px; } .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; } .flip-card:hover .flip-card-inner { transform: rotateY(180deg); } .instrument { position: absolute; inset: 0; backface-visibility: hidden; background: var(--ink); padding: 2.25rem 1.75rem; display: flex; flex-direction: column; } .flip-back { transform: rotateY(180deg); background: var(--ridge); border: 1px solid var(--orange); } .instrument-dial { width: 3rem; height: 3rem; border: 1px solid var(--sage); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--sage); font-size: 1.2rem; margin-bottom: 1.5rem; flex-shrink: 0; } .instrument-dial.small { width: 2.2rem; height: 2.2rem; font-size: 1rem; border-color: var(--orange); color: var(--orange); margin-bottom: 1rem; } .instrument h3 { font-family: var(--font-display); font-weight: 700; font-size: 1.15rem; text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 0.6rem; } .instrument p { color: var(--chalk-dim); font-size: 0.88rem; margin-bottom: 1.5rem; } .flip-front p { min-height: 3.4em; } .detail-text { font-size: 0.82rem; line-height: 1.5; flex-grow: 1; margin-bottom: 1rem; } .reading { display: block; font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.08em; color: var(--orange); border-top: 1px solid var(--contour); padding-top: 0.9rem; margin-top: auto; } .back-stats { display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto; border-top: 1px solid var(--contour); padding-top: 0.9rem; } .back-stats > div { display: flex; justify-content: space-between; align-items: baseline; } .stat-label { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--chalk-dim); } .stat-value { font-family: var(--font-mono); font-size: 0.85rem; color: var(--sage); font-weight: 600; } @media (max-width: 900px) { .instruments-grid { grid-template-columns: repeat(2, 1fr); } } @media (max-width: 560px) { .instruments-grid { grid-template-columns: 1fr; } .flip-card { height: 320px; } }"}
      </style>
    </section>
  );
}