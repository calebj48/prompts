const features = [
  {
    icon: '◈',
    title: 'Daily prompts',
    desc: 'A new prompt every day, rotated across 10 genres. Never a writing-class cliché.',
  },
  {
    icon: '▲',
    title: 'Streak tracking',
    desc: 'One session a day keeps the streak alive. Miss a day and it resets. Simple.',
  },
  {
    icon: '◫',
    title: 'Genre filters',
    desc: 'Not feeling horror today? Switch to Slice of Life, Noir, Fantasy, and more.',
  },
  {
    icon: '◻',
    title: 'Personal archive',
    desc: 'Every session saved. Browse by genre, filter by date, read what you wrote.',
  },
];

export function FeatureList() {
  return (
    <section className="feature-list">
      <div className="label-caps">Why this exists</div>
      <div className="feature-grid">
        {features.map((f) => (
          <div className="feature-item" key={f.title}>
            <div className="feature-icon" aria-hidden="true">
              {f.icon}
            </div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
