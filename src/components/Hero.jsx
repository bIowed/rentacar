import { useRef, useEffect, useState } from 'react'

const styles = {
  hero: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    paddingTop: 'var(--nav-height)',
  },
  marqueeWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    padding: '40px 0',
  },
  marquee: {
    display: 'flex',
    gap: 32,
    width: 'max-content',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    userSelect: 'none',
    touchAction: 'pan-x pinch-zoom',
  },
  marqueeReverse: {
    display: 'flex',
    gap: 32,
    width: 'max-content',
    animation: 'scroll-reverse 40s linear infinite',
    marginTop: 32,
  },
  card: {
    flexShrink: 0,
    width: 240,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 140,
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
  },
  cardBody: {
    padding: '12px 14px 14px',
    borderTop: '1px solid var(--border)',
  },
  cardName: {
    fontFamily: 'var(--font-display)',
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--text)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 2,
  },
  cardYear: {
    fontSize: 11,
    color: 'var(--text-muted)',
    marginBottom: 6,
  },
  cardPrice: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--gold)',
    letterSpacing: '1px',
  },
  cardPriceUnit: {
    fontSize: 11,
    fontWeight: 400,
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-body)',
  },
  cardBtn: {
    width: '100%',
    marginTop: 8,
    padding: '7px 0',
    background: 'var(--gold)',
    color: 'var(--black)',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(212,168,83,0.15), transparent)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },
  caption: {
    textAlign: 'center',
    marginTop: 48,
    padding: '0 24px',
    position: 'relative',
    zIndex: 2,
  },
  captionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(36px, 8vw, 80px)',
    fontWeight: 700,
    color: 'var(--text)',
    textTransform: 'uppercase',
    letterSpacing: '4px',
    lineHeight: 1.05,
    marginBottom: 16,
  },
  captionGold: {
    color: 'var(--gold)',
  },
  captionText: {
    fontSize: 18,
    color: 'var(--text-secondary)',
    maxWidth: 500,
    margin: '0 auto 32px',
    lineHeight: 1.6,
  },
  scrollHint: {
    position: 'absolute',
    bottom: 32,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    color: 'var(--text-muted)',
    fontSize: 11,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-display)',
    animation: 'bob 2s ease-in-out infinite',
  },
  scrollBar: {
    width: 1,
    height: 40,
    background: 'var(--gold)',
  },
}

function CarCard({ car, onClick }) {
  const [hovered, setHovered] = useState(false)
  const imgSrc = car.image
    ? car.image.startsWith('http')
      ? car.image
      : car.image
    : null

  return (
    <div
      className="hero-card-r"
      style={{
        ...styles.card,
        ...(hovered
          ? { borderColor: 'var(--gold)', transform: 'translateY(-6px) scale(1.04)' }
          : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(car)}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={car.name}
            style={{
              ...styles.cardImage,
              ...(hovered ? { transform: 'scale(1.08)' } : {}),
            }}
          />
        ) : (
          <div
            style={{
              ...styles.cardImage,
              background: 'var(--surface-hover)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            No Image
          </div>
        )}
        <div style={{ ...styles.overlay, ...(hovered ? { opacity: 1 } : {}) }} />
      </div>
      <div style={styles.cardBody}>
        <div style={styles.cardName}>{car.name}</div>
        <div style={styles.cardYear}>{car.year || ''}</div>
        <div style={styles.cardPrice}>
          {car.price_per_day ? `${car.price_per_day} AED` : '—'}
          <span style={styles.cardPriceUnit}> /day</span>
        </div>
        <button
          style={styles.cardBtn}
          onClick={(e) => { e.stopPropagation(); onClick(car) }}
        >
          Reserve
        </button>
      </div>
    </div>
  )
}

const benefits = [
  'No Deposit Options',
  'Airport Meet & Greet',
  'Delivery Anywhere in Dubai',
  '24/7 Customer Support',
  'Transparent Pricing',
  'Flexible Rental Plans',
  'New & Well-Maintained Vehicles',
  'Fast Booking Process',
]

export default function Hero({ cars, loading, onReserve }) {
  const styleSheet = useRef(null)
  const marqueeRef = useRef(null)
  const pauseTimeoutRef = useRef(null)
  const autoIntervalRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!styleSheet.current) {
      const style = document.createElement('style')
      style.textContent = `
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        .hero-marquee-r::-webkit-scrollbar { display: none; }
      `
      document.head.appendChild(style)
      styleSheet.current = style
    }
    return () => {
      if (styleSheet.current) {
        document.head.removeChild(styleSheet.current)
        styleSheet.current = null
      }
    }
  }, [])

  useEffect(() => {
    const el = marqueeRef.current
    if (!el || cars.length === 0 || loading) return

    let intervalId
    let pauseTimerId

    function startScroll() {
      stopScroll()
      intervalId = setInterval(() => {
        el.scrollLeft += 1
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }, 30)
    }

    function stopScroll() {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }

    function pauseScroll() {
      stopScroll()
      clearTimeout(pauseTimerId)
      pauseTimerId = setTimeout(startScroll, 1000)
    }

    function handleMouseDown(e) {
      setIsDragging(true)
      pauseScroll()
      const startX = e.clientX
      const startLeft = el.scrollLeft

      function onMove(e) {
        el.scrollLeft = startLeft - (e.clientX - startX)
      }

      function onUp() {
        setIsDragging(false)
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
      }

      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    }

    startScroll()

    el.addEventListener('wheel', pauseScroll, { passive: true })
    el.addEventListener('touchstart', pauseScroll, { passive: true })
    el.addEventListener('touchmove', pauseScroll, { passive: true })
    el.addEventListener('mousedown', handleMouseDown)

    return () => {
      stopScroll()
      clearTimeout(pauseTimerId)
      el.removeEventListener('wheel', pauseScroll)
      el.removeEventListener('touchstart', pauseScroll)
      el.removeEventListener('touchmove', pauseScroll)
      el.removeEventListener('mousedown', handleMouseDown)
    }
  }, [cars, loading])

  return (
    <section style={styles.hero} id="fleet">
      <div style={styles.marqueeWrap}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '2px', textTransform: 'uppercase' }}>
              Loading fleet...
            </div>
          </div>
        ) : (
          <>
            <div
              ref={marqueeRef}
              style={{ ...styles.marquee, cursor: isDragging ? 'grabbing' : 'grab' }}
              className="hero-marquee-r"
            >
              {[...cars, ...cars].map((car, i) => (
                <CarCard key={`${car.id}-${i}`} car={car} onClick={onReserve} />
              ))}
            </div>
            <div style={styles.marqueeReverse} className="hero-marquee-r">
              {[...benefits, ...benefits].map((b, i) => (
                <div key={`b-${i}`} style={{
                  flexShrink: 0,
                  padding: '14px 32px',
                  border: '1px solid var(--gold)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  whiteSpace: 'nowrap',
                  background: 'rgba(212, 168, 83, 0.05)',
                }}>
                  {b}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={styles.caption}>
        <h1 style={styles.captionTitle}>
          Drive Dubai<br />
          <span style={styles.captionGold}>with Confidence</span>
        </h1>
        <p style={styles.captionText}>
          Premium car rental — delivered to your door.
          No deposit options available.
        </p>
        <button className="btn btn-primary" onClick={() => onReserve(cars[0] || null)}>
          Reserve Your Car
        </button>
      </div>

      <div style={styles.scrollHint}>
        <span>Scroll</span>
        <div style={styles.scrollBar} />
      </div>
    </section>
  )
}
