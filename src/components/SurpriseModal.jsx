import { useState, useEffect, useRef } from 'react'
import defaultCars from '../data/defaultCars'

const PHONE = '971501140034'

const SEGMENTS = [
  { label: '5%', discount: 5, color: '#2c3e50' },
  { label: '25%', discount: 25, color: '#27ae60' },
  { label: '10%', discount: 10, color: '#8e44ad' },
  { label: '30%', discount: 30, color: '#d4a853' },
  { label: '15%', discount: 15, color: '#e74c3c' },
  { label: '20%', discount: 20, color: '#3498db' },
]

const RIGGED = [25, 30]
const SEG_ANGLE = 360 / SEGMENTS.length

const RENTAL_TYPES = [
  { value: 'day', label: 'Per Day', max: 30 },
  { value: 'week', label: 'Per Week', max: 12 },
  { value: 'month', label: 'Per Month', max: 12 },
]

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 2000,
    background: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    animation: 'fadeIn 0.3s ease',
  },
  modal: {
    background: 'var(--surface)',
    border: '1px solid var(--gold)',
    width: '100%',
    maxWidth: 360,
    padding: '28px 20px',
    position: 'relative',
    animation: 'slideUp 0.3s ease',
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    top: 16,
    right: 16,
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: 24,
    lineHeight: 1,
    cursor: 'pointer',
    padding: 8,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: 4,
    letterSpacing: '2px',
  },
  subtitle: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    marginBottom: 16,
  },
  label: {
    display: 'block',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: 'var(--text-muted)',
    marginBottom: 8,
    fontFamily: 'var(--font-display)',
  },
  select: {
    width: '100%',
    maxWidth: 260,
    margin: '0 auto 16px',
    padding: '12px 16px',
    background: 'var(--black)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    fontSize: 15,
    outline: 'none',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='%23a0a0a0'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: 40,
    display: 'block',
  },
  wheelWrap: {
    position: 'relative',
    width: 170,
    height: 170,
    margin: '0 auto 16px',
  },
  wheel: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    position: 'relative',
    transition: 'transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
  },
  pointer: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '16px solid var(--gold)',
    zIndex: 10,
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
  },
  wheelLabel: {
    position: 'absolute',
    fontSize: 11,
    fontWeight: 700,
    color: '#fff',
    fontFamily: 'var(--font-display)',
    textShadow: '0 1px 3px rgba(0,0,0,0.6)',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
  },
  durSelect: {
    width: '100%',
    padding: '8px 10px',
    background: 'var(--black)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='%23a0a0a0'%3E%3Cpath d='M1 1l4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: 32,
  },
  durInput: {
    width: '100%',
    padding: '8px 10px',
    background: 'var(--black)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'var(--font-body)',
  },
  spinBtn: {
    padding: '12px 36px',
    background: 'var(--gold)',
    color: 'var(--black)',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    marginBottom: 12,
  },
  spinBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  result: {
    padding: '12px 16px',
    marginBottom: 12,
    border: '2px solid var(--gold)',
    background: 'rgba(212,168,83,0.1)',
  },
  resultTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    color: 'var(--gold)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 13,
    color: 'var(--text)',
  },
  waBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: '12px 24px',
    background: '#25D366',
    color: '#fff',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  },
  alreadyClaimed: {
    padding: 20,
    textAlign: 'center',
  },
  alreadyTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 8,
  },
  alreadyText: {
    fontSize: 13,
    color: 'var(--text-muted)',
  },
  legend: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '4px 12px',
    marginBottom: 12,
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 11,
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-body)',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
  },
}

export default function SurpriseModal({ onClose }) {
  const [cars, setCars] = useState(defaultCars)
  const [selectedCarId, setSelectedCarId] = useState(String(cars[0]?.id || ''))
  const [spinning, setSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [result, setResult] = useState(null)
  const [claimed] = useState(() => document.cookie.includes('atapower_surprise='))
  const [rentalType, setRentalType] = useState('day')
  const [rentalQtyStr, setRentalQtyStr] = useState('1')
  const wheelRef = useRef(null)
  const currentRotation = useRef(0)

  useEffect(() => {
    async function loadCars() {
      try {
        const { supabase } = await import('../supabase/client')
        if (supabase) {
          const { data } = await supabase.from('cars').select('*').eq('visible', true)
          if (data && data.length > 0) {
            setCars(data.map(c => ({ ...c, image: c.image_urls?.[0] || null })))
          }
        }
      } catch { /* fallback to defaults */ }
    }
    loadCars()
  }, [])

  useEffect(() => {
    if (cars.length > 0 && !cars.some((c) => String(c.id) === selectedCarId)) {
      setSelectedCarId(String(cars[0].id))
    }
  }, [cars])

  const selectedCar = cars.find(c => String(c.id) === selectedCarId) || cars[0]

  const rt = RENTAL_TYPES.find(t => t.value === rentalType) || RENTAL_TYPES[0]
  const parsedQty = parseInt(rentalQtyStr, 10)
  const rentalQty = isNaN(parsedQty) || parsedQty < 1 ? 1 : Math.min(parsedQty, rt.max)
  const dayPrice = selectedCar?.price_per_day || 0
  const discountedFirstDay = result ? dayPrice - (dayPrice * result / 100) : 0

  function spin() {
    if (spinning || claimed || hasSpun) return
    setSpinning(true)

    const discount = RIGGED[Math.floor(Math.random() * RIGGED.length)]
    const segIndex = SEGMENTS.findIndex(s => s.discount === discount)
    const targetAngle = 360 - (segIndex * SEG_ANGLE + SEG_ANGLE / 2)
    const jitter = (Math.random() - 0.5) * 8
    const fullRotation = 1800 + targetAngle + jitter
    currentRotation.current += fullRotation

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${currentRotation.current}deg)`
    }

    setTimeout(() => {
      setResult(discount)
      setSpinning(false)
      setHasSpun(true)
    }, 3700)
  }

  function claimWhatsApp() {
    if (!result || !selectedCar) return
    const dur = `${rentalQty} ${rentalType}${rentalQty > 1 ? 's' : ''}`
    const msg = `I won a ${result}% discount off the first day on the ${selectedCar.name} for ${dur}! First day after discount: ${discountedFirstDay} AED. I'd like to redeem this offer.`
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`
    document.cookie = 'atapower_surprise=claimed; max-age=31536000; path=/'
    window.open(url, '_blank', 'noopener')
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const wheelGradient = `conic-gradient(${SEGMENTS.map((s, i) => {
    const start = i * SEG_ANGLE
    const end = (i + 1) * SEG_ANGLE
    return `${s.color} ${start}deg ${end}deg`
  }).join(', ')})`

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal} className="modal-r">
        <button style={styles.close} onClick={onClose}>×</button>

        {claimed ? (
          <div style={styles.alreadyClaimed}>
            <div style={styles.alreadyTitle}>Already Claimed</div>
            <div style={styles.alreadyText}>
              You've already claimed your surprise discount. Only one per customer.
            </div>
          </div>
        ) : (
          <>
            <div style={styles.title}>Surprise Discount</div>
            <div style={styles.subtitle}>Spin the wheel — win a discount on your rental!</div>

              <select
                style={styles.select}
                value={selectedCarId}
                onChange={(e) => setSelectedCarId(e.target.value)}
              >
                {cars.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name} {c.year ? `(${c.year})` : ''}
                  </option>
                ))}
              </select>

            <div style={styles.legend}>
              {SEGMENTS.map((seg) => (
                <div key={seg.label} style={styles.legendItem}>
                  <div style={{ ...styles.legendDot, background: seg.color }} />
                  {seg.label}
                </div>
              ))}
            </div>

            <div style={styles.wheelWrap}>
              <div style={styles.pointer} />
              <div
                ref={wheelRef}
                style={{ ...styles.wheel, background: wheelGradient }}
              >
                {SEGMENTS.map((seg, i) => {
                  const mid = i * SEG_ANGLE + SEG_ANGLE / 2
                  const rad = (mid * Math.PI) / 180
                  const r = 56
                  const cx = 85
                  const cy = 85
                  const x = cx + r * Math.sin(rad)
                  const y = cy - r * Math.cos(rad)
                  return (
                    <span
                      key={seg.label}
                      style={{
                        ...styles.wheelLabel,
                        left: x,
                        top: y,
                      }}
                    >
                      {seg.label}
                    </span>
                  )
                })}
              </div>
            </div>

            {!hasSpun ? (
              <button
                style={{ ...styles.spinBtn, ...(spinning ? styles.spinBtnDisabled : {}) }}
                onClick={spin}
                disabled={spinning}
              >
                {spinning ? 'Spinning...' : 'Spin the Wheel'}
              </button>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
                Wheel already spun — claim your prize below
              </div>
            )}

            {result && (
              <div style={styles.result}>
                <div style={styles.resultTitle}>You Won {result}% Off!</div>
                <div style={styles.resultText}>
                  {result}% off first day on {selectedCar?.name || 'your rental'}
                  {dayPrice > 0 && <span> — first day: {discountedFirstDay} AED</span>}
                </div>
              </div>
            )}

            {result && (
              <>
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Duration</label>
                    <select
                      style={styles.durSelect}
                      value={rentalType}
                      onChange={(e) => { setRentalType(e.target.value); setRentalQtyStr('1') }}
                    >
                      {RENTAL_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Qty</label>
                    <input
                      style={styles.durInput}
                      type="number"
                      min={1}
                      max={rt.max}
                      value={rentalQtyStr}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '')
                        if (v === '' || parseInt(v) <= rt.max) setRentalQtyStr(v)
                      }}
                    />
                  </div>
                </div>

                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); claimWhatsApp() }}
                  style={styles.waBtn}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Claim via WhatsApp
                </a>
              </>
            )}
          </>
        )}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          select option {
            background: #1a1a1a;
            color: #e5e5e5;
          }
        `}</style>
      </div>
    </div>
  )
}
