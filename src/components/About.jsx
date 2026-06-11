const styles = {
  section: {
    padding: '120px 24px',
    maxWidth: 1200,
    margin: '0 auto',
    borderTop: '1px solid var(--border)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 80,
    alignItems: 'start',
  },
  mission: {
    fontSize: 18,
    color: 'var(--text-secondary)',
    lineHeight: 1.8,
    marginBottom: 32,
  },
  quote: {
    fontFamily: 'var(--font-display)',
    fontSize: 28,
    textTransform: 'uppercase',
    color: 'var(--text)',
    lineHeight: 1.3,
    letterSpacing: '1px',
    padding: 32,
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    position: 'relative',
  },
  quoteGold: {
    color: 'var(--gold)',
  },
  quoteMark: {
    fontSize: 64,
    fontFamily: 'var(--font-display)',
    color: 'var(--gold)',
    lineHeight: 0.6,
    display: 'block',
    marginBottom: 8,
    opacity: 0.5,
  },
  advantages: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
    marginTop: 64,
  },
  advantage: {
    padding: '16px 20px',
    border: '1px solid var(--border)',
    fontSize: 14,
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  check: {
    color: 'var(--gold)',
    fontSize: 18,
    flexShrink: 0,
  },
}

const advantages = [
  'Airport Meet & Greet',
  'Delivery Anywhere in Dubai',
  'No Deposit Options',
  'New & Well-Maintained Vehicles',
  'Competitive Rates',
  'Fast Booking Process',
  'Professional Service',
  '24/7 Support',
]

export default function About() {
  return (
    <section style={styles.section} id="about">
      <div className="section-label">About</div>
      <h2 className="section-title">Atapower Rent a Car</h2>

      <div style={styles.grid} className="about-grid-r">
        <div>
          <p style={styles.mission}>
            Atapower Rent a Car is dedicated to providing more than just vehicles
            — we deliver comfort, reliability, and a premium driving experience
            across Dubai. From luxury SUVs to stylish city vehicles, our modern
            fleet meets every need.
          </p>
          <p style={styles.mission}>
            Whether you're visiting for business, leisure, or a family vacation,
            our mission is simple: to make car rental in Dubai easy, transparent,
            and hassle-free.
          </p>
        </div>

        <div style={styles.quote} className="about-quote-r">
          <span style={styles.quoteMark}>"</span>
          We treat every customer like family.<br />
          <span style={styles.quoteGold}>Premium service</span> isn't our goal
          — it's our starting point.<br /><br />
          <span style={{ fontSize: 16, fontFamily: 'var(--font-body)', textTransform: 'none', fontWeight: 300, color: 'var(--text-muted)' }}>
            — Atapower Team
          </span>
        </div>
      </div>

      <div style={styles.advantages}>
        {advantages.map((a) => (
          <div key={a} style={styles.advantage}>
            <span style={styles.check}>◆</span>
            {a}
          </div>
        ))}
      </div>
    </section>
  )
}
