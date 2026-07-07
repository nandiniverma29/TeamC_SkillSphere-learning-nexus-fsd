const instruments = [
  { icon: '◉', name: 'Skill Tracking', reading: '12 SKILLS ACTIVE', desc: 'Every module logged against a live skill inventory.' },
  { icon: '▤', name: 'Analytics Dashboard', reading: '82% COMPLETION', desc: 'A instrument-panel view of pace, gaps, and momentum.' },
  { icon: '⬡', name: 'Certificates', reading: 'VERIFIED ON ISSUE', desc: 'Signed proof of route completion, ready to share.' },
  { icon: '➤', name: 'AI Recommendations', reading: 'NEXT: RIDGE TIER', desc: 'Suggests the next route based on where you stand.' },
];

export default function Instruments() {
  return (
    <section id="track" className="section instruments">
      <div className="section-head">
        <p className="eyebrow">Track — basecamp instruments</p>
        <h2>Read your <em>progress</em></h2>
        <p>Four instruments, always mounted at basecamp, telling you exactly where you stand on the climb.</p>
      </div>

      <div className="instruments-grid">
        {instruments.map((inst) => (
          <div className="instrument" key={inst.name}>
            <div className="instrument-dial" aria-hidden="true">{inst.icon}</div>
            <h3>{inst.name}</h3>
            <p>{inst.desc}</p>
            <span className="reading">{inst.reading}</span>
          </div>
        ))}
      </div>

      <style>{`
        .instruments-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--contour);
          border: 1px solid var(--contour);
        }
        .instrument {
          background: var(--ink);
          padding: 2.25rem 1.75rem;
          transition: background 0.2s ease;
        }
        .instrument:hover {
          background: var(--ridge);
        }
        .instrument-dial {
          width: 3rem;
          height: 3rem;
          border: 1px solid var(--sage);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--sage);
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }
        .instrument h3 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin-bottom: 0.6rem;
        }
        .instrument p {
          color: var(--chalk-dim);
          font-size: 0.88rem;
          margin-bottom: 1.5rem;
          min-height: 3.4em;
        }
        .reading {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: var(--orange);
          border-top: 1px solid var(--contour);
          padding-top: 0.9rem;
        }
        @media (max-width: 900px) {
          .instruments-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .instruments-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
