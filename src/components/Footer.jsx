const styles = {
  footer: {
    borderTop: '1px solid var(--border)',
    padding: '60px 24px 32px',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: 48,
  },
  brand: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: '3px',
    color: 'var(--text)',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  brandAccent: {
    color: 'var(--gold)',
  },
  desc: {
    fontSize: 14,
    color: 'var(--text-muted)',
    lineHeight: 1.7,
    maxWidth: 320,
  },
  columnTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 13,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--text)',
    marginBottom: 16,
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  link: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  bottom: {
    maxWidth: 1200,
    margin: '48px auto 0',
    paddingTop: 24,
    borderTop: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  copyright: {
    fontSize: 13,
    color: 'var(--text-muted)',
  },
}

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner} className="footer-inner-r">
        <div>
          <div style={styles.brand}>
            ATA<span style={styles.brandAccent}>POWER</span>
          </div>
          <p style={styles.desc}>
            Premium car rental in Dubai. We deliver comfort, reliability,
            and a premium driving experience across the city.
          </p>
        </div>
        <div>
          <div style={styles.columnTitle}>Quick Links</div>
          <ul style={styles.links}>
            <li><a href="#fleet" style={styles.link}>Our Fleet</a></li>
            <li><a href="#about" style={styles.link}>About Us</a></li>
            <li><a href="#why-us" style={styles.link}>Why Choose Us</a></li>
          </ul>
        </div>
        <div>
          <div style={styles.columnTitle}>Contact</div>
          <ul style={styles.links}>
            <li><span style={styles.link}>Dubai, UAE</span></li>
            <li><span style={styles.link}>+971 50 114 0034</span></li>
          </ul>
        </div>
      </div>
      <div style={styles.bottom} className="footer-bottom-r">
        <span style={styles.copyright}>
          &copy; {new Date().getFullYear()} Atapower Rent a Car. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
