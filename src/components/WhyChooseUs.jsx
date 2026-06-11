const styles = {
  section: {
    padding: '120px 24px',
    maxWidth: 1200,
    margin: '0 auto',
    borderTop: '1px solid var(--border)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 24,
    marginTop: 48,
  },
  card: {
    padding: '40px 32px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: 'var(--gold)',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.4s ease',
  },
  icon: {
    fontSize: 32,
    marginBottom: 16,
    display: 'block',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--text)',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
  },
}

const cards = [
  {
    icon: '✈',
    title: 'Airport Meet & Greet',
    text: 'Arriving in Dubai? Our team meets you at the airport and hands over your vehicle immediately upon arrival.',
  },
  {
    icon: '⌂',
    title: 'Delivery Anywhere',
    text: 'We deliver and collect your vehicle at your hotel, villa, apartment, office — anywhere in Dubai.',
  },
  {
    icon: '◎',
    title: 'No Deposit Options',
    text: 'Selected vehicles available with no security deposit required. Simpler and more convenient.',
  },
  {
    icon: '⟐',
    title: 'Transparent Pricing',
    text: 'No hidden fees. No unexpected charges. What you see is exactly what you pay.',
  },
  {
    icon: '◷',
    title: 'Flexible Rental Plans',
    text: 'Choose from daily, weekly, or monthly packages tailored to your travel plans and budget.',
  },
  {
    icon: '◉',
    title: '24/7 Customer Support',
    text: 'Our dedicated support team is available around the clock to assist you whenever needed.',
  },
]

export default function WhyChooseUs() {
  return (
    <section style={styles.section} id="why-us">
      <div className="section-label">Why Atapower</div>
      <h2 className="section-title">Why Choose Us</h2>
      <p className="section-subtitle">
        We combine premium vehicles with exceptional service to make your
        Dubai experience effortless.
      </p>

      <div style={styles.grid} className="why-grid-r">
        {cards.map((card) => (
          <div
            key={card.title}
            style={styles.card}
            className="why-card"
          >
            <div style={styles.cardAccent} className="why-card-accent" />
            <span style={styles.icon}>{card.icon}</span>
            <h3 style={styles.title}>{card.title}</h3>
            <p style={styles.text}>{card.text}</p>
          </div>
        ))}
      </div>

      <style>{`
        .why-card:hover {
          border-color: var(--gold) !important;
          transform: translateY(-4px);
        }
        .why-card:hover .why-card-accent {
          transform: scaleX(1);
        }
      `}</style>
    </section>
  )
}
