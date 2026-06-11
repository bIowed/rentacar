import { useState, useEffect } from 'react'

const PHONE = '971501140034'

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
    maxWidth: 440,
    padding: '48px 40px',
    position: 'relative',
    animation: 'slideUp 0.3s ease',
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
    fontSize: 28,
    textTransform: 'uppercase',
    color: 'var(--text)',
    marginBottom: 4,
    letterSpacing: '1px',
  },
  subtitle: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    marginBottom: 32,
  },
  field: {
    marginBottom: 20,
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
    padding: '14px 16px',
    background: 'var(--black)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    fontSize: 16,
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
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--black)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'var(--font-body)',
  },
  submit: {
    width: '100%',
    padding: '16px 32px',
    background: '#25D366',
    color: '#fff',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    marginTop: 8,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
}

const RENTAL_TYPES = [
  { value: 'day', label: 'Per Day', priceKey: 'price_per_day', max: 30 },
  { value: 'week', label: 'Per Week', priceKey: 'price_weekly', max: 12 },
  { value: 'month', label: 'Per Month', priceKey: 'price_monthly', max: 12 },
]

export default function ReservationModal({ car, cars = [], onClose }) {
  const [selectedCarId, setSelectedCarId] = useState(String(car?.id || cars[0]?.id || ''))
  const [rentalType, setRentalType] = useState('day')
  const [rentalQtyStr, setRentalQtyStr] = useState('1')

  useEffect(() => {
    if (cars.length > 0 && !cars.some((c) => String(c.id) === selectedCarId)) {
      setSelectedCarId(String(cars[0].id))
    }
  }, [cars])

  const selectedCar = cars.find((c) => String(c.id) === selectedCarId) || car
  const rt = RENTAL_TYPES.find((t) => t.value === rentalType) || RENTAL_TYPES[0]
  const unitPrice = selectedCar?.[rt.priceKey]
  const parsedQty = parseInt(rentalQtyStr, 10)
  const rentalQty = isNaN(parsedQty) || parsedQty < 1 ? 1 : Math.min(parsedQty, rt.max)
  const total = unitPrice ? unitPrice * rentalQty : null

  const handleSubmit = (e) => {
    e.preventDefault()
    const carName = selectedCar?.name || 'a car'
    const durationLabel = rt.label.replace('Per ', '').toLowerCase()
    const msg = `${carName} — ${rentalQty} ${durationLabel}${rentalQty > 1 ? 's' : ''} : ${total} AED`
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener')
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal} className="modal-r">
        <button style={styles.close} onClick={onClose}>×</button>

        <>
          <h2 style={styles.title}>Reserve</h2>
          <p style={styles.subtitle}>Select a vehicle and duration</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>Select Car</label>
              <select
                style={styles.select}
                value={selectedCarId}
                onChange={(e) => setSelectedCarId(e.target.value)}
              >
                  {cars.map((c) => (
                    <option key={c.id} value={String(c.id)}>
                      {c.name} {c.year ? `(${c.year})` : ''} — {c.price_per_day ? `${c.price_per_day} AED/day` : ''}
                    </option>
                  ))}
              </select>
            </div>

            <div style={{ ...styles.field, display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Rental Period</label>
                <select
                  style={styles.select}
                  value={rentalType}
                  onChange={(e) => { setRentalType(e.target.value); setRentalQtyStr('1') }}
                >
                  {RENTAL_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Quantity</label>
                <input
                  style={styles.input}
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

            {unitPrice ? (
              <div style={{ textAlign: 'center', marginBottom: 20, padding: '12px', border: '1px solid var(--gold)', background: 'rgba(212,168,83,0.05)' }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>Total</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--gold)', letterSpacing: '1px' }}>
                  {total} <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-secondary)' }}>AED</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  {rentalQty} {rentalType}{rentalQty > 1 ? 's' : ''} × {unitPrice} AED/{rentalType}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', marginBottom: 20, padding: '12px', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 13 }}>
                Price not set for this rental period
              </div>
            )}

            <button type="submit" style={styles.submit}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send via WhatsApp
            </button>
          </form>
        </>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input:focus, select:focus {
            border-color: var(--gold) !important;
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
