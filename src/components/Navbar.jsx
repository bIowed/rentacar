import { useState, useEffect } from 'react'
import SurpriseModal from './SurpriseModal'

const WHATSAPP_NUMBER = '971501140034'

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 'var(--nav-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    background: 'rgba(10, 10, 10, 0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
    transition: 'border-color 0.3s',
  },
  navInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  },
  logoImg: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--text)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  logoAccent: {
    color: 'var(--gold)',
  },
  desktopLinks: {
    display: 'flex',
    gap: 16,
    listStyle: 'none',
    alignItems: 'center',
  },
  link: {
    fontFamily: 'var(--font-display)',
    fontSize: 13,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  waBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 16px',
    background: '#25D366',
    color: '#fff',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: 12,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    borderRadius: 4,
  },
  surpriseBtn: {
    background: 'none',
    border: '1px solid var(--gold)',
    color: 'var(--gold)',
    fontFamily: 'var(--font-display)',
    fontSize: 10,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    padding: '6px 12px',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    borderRadius: 2,
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: 5,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
  },
  hamburgerLine: {
    width: 24,
    height: 2,
    background: 'var(--text)',
    transition: 'all 0.3s ease',
    borderRadius: 1,
  },
  overlay: {
    position: 'fixed',
    top: 'var(--nav-height)',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(10, 10, 10, 0.98)',
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    zIndex: 999,
  },
  overlayLink: {
    fontFamily: 'var(--font-display)',
    fontSize: 24,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--text)',
    textDecoration: 'none',
  },
  overlayCta: {
    padding: '14px 36px',
    border: '2px solid var(--gold)',
    background: 'transparent',
    color: 'var(--gold)',
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: 16,
  },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav style={{ ...styles.nav, borderColor: scrolled ? 'var(--gold)' : 'var(--border)' }}>
        <div style={styles.navInner}>
          <a href="/" style={styles.logo}>
            <img src="/images/logo.png" alt="Atapower" style={styles.logoImg} />
            <span style={styles.logoText}>
              ATA<span style={styles.logoAccent}>POWER</span> RENT A CAR
            </span>
          </a>

          <button style={styles.surpriseBtn} onClick={() => setShowSurprise(true)}>
            Surprise
          </button>

          <ul style={styles.desktopLinks} className="navbar-links">
            <li><a href="#fleet" style={styles.link}>Fleet</a></li>
            <li><a href="#about" style={styles.link}>About</a></li>
            <li><a href="#why-us" style={styles.link}>Why Us</a></li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.waBtn}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact
              </a>
            </li>
          </ul>

          <button
            style={styles.hamburger}
            className="navbar-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{
              ...styles.hamburgerLine,
              ...(menuOpen ? { transform: 'rotate(45deg) translateY(5px)' } : {}),
            }} />
            <span style={{
              ...styles.hamburgerLine,
              ...(menuOpen ? { opacity: 0 } : {}),
            }} />
            <span style={{
              ...styles.hamburgerLine,
              ...(menuOpen ? { transform: 'rotate(-45deg) translateY(-5px)' } : {}),
            }} />
          </button>
        </div>
      </nav>

      <div
        style={{ ...styles.overlay, display: menuOpen ? 'flex' : 'none' }}
        className={menuOpen ? 'nav-menu-open' : ''}
      >
        <a href="#fleet" style={styles.overlayLink} onClick={closeMenu}>Fleet</a>
        <a href="#about" style={styles.overlayLink} onClick={closeMenu}>About</a>
        <a href="#why-us" style={styles.overlayLink} onClick={closeMenu}>Why Us</a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.overlayCta, borderColor: '#25D366', color: '#25D366', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          onClick={closeMenu}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
      </div>
      {showSurprise && <SurpriseModal onClose={() => setShowSurprise(false)} />}
    </>
  )
}
