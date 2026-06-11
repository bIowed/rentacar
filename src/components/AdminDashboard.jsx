import { useState, useEffect, useRef } from 'react'
import defaultCars from '../data/defaultCars'

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'var(--black)',
    backgroundImage: 'var(--bg-image, none)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 32px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--black)',
  },
  headerTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--text)',
  },
  headerAccent: {
    color: 'var(--gold)',
  },
  logoutBtn: {
    padding: '8px 20px',
    border: '1px solid var(--text-muted)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-display)',
    fontSize: 12,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid var(--border)',
    background: 'var(--black)',
  },
  tab: {
    padding: '16px 32px',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-display)',
    fontSize: 14,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tabActive: {
    color: 'var(--gold)',
    borderBottomColor: 'var(--gold)',
  },
  content: {
    padding: '32px',
    maxWidth: 1200,
    margin: '0 auto',
    background: 'rgba(10,10,10,0.85)',
    minHeight: 'calc(100vh - 120px)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    fontFamily: 'var(--font-display)',
    fontSize: 12,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    borderBottom: '1px solid var(--border)',
    fontWeight: 500,
  },
  td: {
    padding: '12px 16px',
    fontSize: 14,
    color: 'var(--text-secondary)',
    borderBottom: '1px solid var(--border)',
  },
  tdGold: {
    color: 'var(--gold)',
  },
  empty: {
    textAlign: 'center',
    padding: 48,
    color: 'var(--text-muted)',
    fontSize: 14,
  },
  addBtn: {
    padding: '12px 24px',
    background: 'var(--gold)',
    color: 'var(--black)',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: 13,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginBottom: 24,
  },
  carGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 20,
  },
  carCard: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    overflow: 'hidden',
  },
  carCardImg: {
    width: '100%',
    height: 160,
    objectFit: 'cover',
    background: 'var(--surface-hover)',
  },
  carCardBody: {
    padding: 16,
  },
  carCardName: {
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    color: 'var(--text)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 4,
  },
  carCardPrice: {
    fontSize: 14,
    color: 'var(--gold)',
    marginBottom: 12,
  },
  carCardActions: {
    display: 'flex',
    gap: 8,
  },
  carCardBtn: {
    padding: '8px 16px',
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: 12,
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    flex: 1,
  },
  carCardBtnDanger: {
    border: '1px solid var(--danger)',
    color: 'var(--danger)',
  },
  form: {
    background: 'var(--surface)',
    border: '1px solid var(--gold)',
    padding: 32,
    marginBottom: 32,
  },
  formTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--text)',
    marginBottom: 20,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  formField: {
    marginBottom: 16,
  },
  formLabel: {
    display: 'block',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--text-muted)',
    marginBottom: 6,
    fontFamily: 'var(--font-display)',
  },
  formInput: {
    width: '100%',
    padding: '12px 14px',
    background: 'var(--black)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    fontSize: 14,
    outline: 'none',
  },
  formActions: {
    display: 'flex',
    gap: 12,
    marginTop: 16,
  },
  formBtn: {
    padding: '12px 28px',
    background: 'var(--gold)',
    color: 'var(--black)',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: 13,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  formBtnCancel: {
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
  },
  dropzone: {
    border: '2px dashed var(--border)',
    padding: '40px 24px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
    marginBottom: 16,
    gridColumn: '1 / -1',
  },
  dropzoneActive: {
    borderColor: 'var(--gold)',
  },
  toast: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    padding: '16px 24px',
    background: 'var(--surface)',
    border: '1px solid var(--success)',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    zIndex: 3000,
    animation: 'slideUp 0.3s ease',
  },
}

function SaveToast({ message }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(t)
  }, [])
  if (!visible) return null
  return <div style={styles.toast}>{message}</div>
}

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('reservations')
  const [reservations, setReservations] = useState([])
  const [cars, setCars] = useState(defaultCars)
  const [showForm, setShowForm] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({
    name: '',
    year: '',
    price_per_day: '',
    price_weekly: '',
    price_monthly: '',
    image: null,
  })
  const [dropActive, setDropActive] = useState(false)
  const fileInputRef = useRef(null)
  const [bgImage, setBgImage] = useState(() => localStorage.getItem('atapower_bg_image') || '')
  const [bgColor, setBgColor] = useState(() => localStorage.getItem('atapower_bg_color') || '#0a0a0a')
  const [bgDropActive, setBgDropActive] = useState(false)
  const bgFileInputRef = useRef(null)

  function applyBg() {
    const img = localStorage.getItem('atapower_bg_image')
    const color = localStorage.getItem('atapower_bg_color')
    const root = document.documentElement
    if (color) root.style.setProperty('--black', color)
    else root.style.removeProperty('--black')
    if (img) {
      root.style.setProperty('--bg-image', `url("${img}")`)
      root.style.setProperty('--bg-overlay', 'rgba(0,0,0,0.6)')
    } else {
      root.style.removeProperty('--bg-image')
      root.style.removeProperty('--bg-overlay')
    }
  }

  async function loadBgSettings() {
    try {
      const { supabase } = await import('../supabase/client')
      if (supabase) {
        const { data } = await supabase.from('site_settings').select('key, value')
        if (data) {
          const bgImg = data.find(d => d.key === 'background_image')?.value
          const bgClr = data.find(d => d.key === 'background_color')?.value
          if (bgImg) localStorage.setItem('atapower_bg_image', bgImg)
          if (bgClr) localStorage.setItem('atapower_bg_color', bgClr)
        }
      }
    } catch {
      /* fall back to localStorage */
    }
  }

  useEffect(() => {
    loadBgSettings().then(applyBg)
    loadReservations()
    loadCars()
  }, [])

  async function loadReservations() {
    try {
      const { supabase } = await import('../supabase/client')
      if (supabase) {
        const { data } = await supabase
          .from('reservations')
          .select('*')
          .order('created_at', { ascending: false })
        if (data) setReservations(data)
      } else {
        const local = JSON.parse(localStorage.getItem('atapower_reservations') || '[]')
        setReservations(local.reverse())
      }
    } catch {
      const local = JSON.parse(localStorage.getItem('atapower_reservations') || '[]')
      setReservations(local.reverse())
    }
  }

  async function loadCars() {
    try {
      const { supabase } = await import('../supabase/client')
      if (supabase) {
        const { data } = await supabase.from('cars').select('*').order('created_at', { ascending: false })
        if (data && data.length > 0) {
          const mapped = data.map((c) => ({
            ...c,
            image: c.image_urls?.[0] || null,
          }))
          setCars(mapped)
        }
      }
    } catch { /* ignored */ }
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function resetForm() {
    setForm({ name: '', year: '', price_per_day: '', price_weekly: '', price_monthly: '', image: null })
    setEditingCar(null)
    setShowForm(false)
  }

  function handleEdit(car) {
    setForm({
      name: car.name || '',
      year: car.year?.toString() || '',
      price_per_day: car.price_per_day?.toString() || '',
      price_weekly: car.price_weekly?.toString() || '',
      price_monthly: car.price_monthly?.toString() || '',
      image: car.image || null,
    })
    setEditingCar(car)
    setShowForm(true)
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!form.name.trim()) return

    const newCar = {
      id: editingCar ? editingCar.id : Date.now(),
      name: form.name.trim(),
      year: parseInt(form.year) || null,
      price_per_day: parseFloat(form.price_per_day) || null,
      image: form.image,
      visible: editingCar ? editingCar.visible : true,
    }

    try {
      const { supabase } = await import('../supabase/client')
      if (supabase) {
        const carData = {
          name: newCar.name,
          year: newCar.year,
          price_per_day: newCar.price_per_day,
          price_weekly: parseFloat(form.price_weekly) || null,
          price_monthly: parseFloat(form.price_monthly) || null,
        }
        if (form.image) carData.image_urls = [form.image]

        if (editingCar) {
          await supabase.from('cars').update(carData).eq('id', editingCar.id)
        } else {
          const { data } = await supabase.from('cars').insert({ ...carData, visible: true }).select()
          if (data) newCar.id = data[0].id
        }
      } else {
        const stored = JSON.parse(localStorage.getItem('atapower_cars') || '[]')
        if (editingCar) {
          const idx = stored.findIndex((c) => c.id === editingCar.id)
          if (idx >= 0) stored[idx] = newCar
        } else {
          stored.push(newCar)
        }
        localStorage.setItem('atapower_cars', JSON.stringify(stored))
      }

      showToast(editingCar ? 'Car updated' : 'Car added')
      resetForm()
      loadCars()
    } catch {
      showToast('Error saving car')
    }
  }

  async function handleDelete(car) {
    try {
      const { supabase } = await import('../supabase/client')
      if (supabase) {
        await supabase.from('cars').delete().eq('id', car.id)
      } else {
        const stored = JSON.parse(localStorage.getItem('atapower_cars') || '[]')
        localStorage.setItem('atapower_cars', JSON.stringify(stored.filter((c) => c.id !== car.id)))
      }
      showToast('Car deleted')
      loadCars()
    } catch {
      showToast('Error deleting car')
    }
  }

  async function handleToggleVisibility(car) {
    try {
      const { supabase } = await import('../supabase/client')
      if (supabase) {
        await supabase.from('cars').update({ visible: !car.visible }).eq('id', car.id)
      } else {
        const stored = JSON.parse(localStorage.getItem('atapower_cars') || '[]')
        const idx = stored.findIndex((c) => c.id === car.id)
        if (idx >= 0) stored[idx].visible = !car.visible
        localStorage.setItem('atapower_cars', JSON.stringify(stored))
      }
      showToast(car.visible ? 'Car hidden' : 'Car visible')
      loadCars()
    } catch {
      showToast('Error updating car')
    }
  }

  async function uploadBgImage(file) {
    try {
      const { supabase } = await import('../supabase/client')
      if (supabase) {
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const fileName = `backgrounds/${Date.now()}-${safeName}`
        await supabase.storage.from('car images').upload(fileName, file)
        const { data: urlData } = supabase.storage.from('car images').getPublicUrl(fileName)
        const publicUrl = urlData.publicUrl
        localStorage.setItem('atapower_bg_image', publicUrl)
        setBgImage(publicUrl)
        await supabase.from('site_settings').upsert({ key: 'background_image', value: publicUrl }, { onConflict: 'key' })
        applyBg()
        showToast('Background image uploaded')
      } else {
        const url = URL.createObjectURL(file)
        localStorage.setItem('atapower_bg_image', url)
        setBgImage(url)
        showToast('Background image set')
      }
    } catch {
      showToast('Error uploading background image')
    }
  }

  async function handleDeleteReservation(reservation) {
    try {
      const { supabase } = await import('../supabase/client')
      if (supabase) {
        await supabase.from('reservations').delete().eq('id', reservation.id)
      } else {
        const stored = JSON.parse(localStorage.getItem('atapower_reservations') || '[]')
        localStorage.setItem('atapower_reservations', JSON.stringify(stored.filter((r) => r.id !== reservation.id)))
      }
      showToast('Reservation deleted')
      loadReservations()
    } catch {
      showToast('Error deleting reservation')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDropActive(true)
  }

  const handleDragLeave = () => setDropActive(false)

  const handleDrop = async (e) => {
    e.preventDefault()
    setDropActive(false)
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter((f) => f.type.startsWith('image/'))
    if (imageFiles.length > 0) {
      const file = imageFiles[0]
      try {
        const { supabase } = await import('../supabase/client')
        if (supabase) {
          const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
          const fileName = `uploads/${Date.now()}-${safeName}`
          await supabase.storage.from('car images').upload(fileName, file)
          const { data: urlData } = supabase.storage.from('car images').getPublicUrl(fileName)
          setForm((prev) => ({ ...prev, image: urlData.publicUrl }))
          showToast('Image uploaded')
        } else {
          setForm((prev) => ({ ...prev, image: URL.createObjectURL(file) }))
        }
      } catch {
        setForm((prev) => ({ ...prev, image: URL.createObjectURL(file) }))
      }
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          ATA<span style={styles.headerAccent}>POWER</span> Admin
        </div>
        <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
      </div>

      <div style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(tab === 'reservations' ? styles.tabActive : {}) }}
          onClick={() => setTab('reservations')}
        >
          Reservations
        </button>
        <button
          style={{ ...styles.tab, ...(tab === 'cars' ? styles.tabActive : {}) }}
          onClick={() => setTab('cars')}
        >
          Cars
        </button>
        <button
          style={{ ...styles.tab, ...(tab === 'settings' ? styles.tabActive : {}) }}
          onClick={() => setTab('settings')}
        >
          Settings
        </button>
      </div>

      <div style={styles.content} className="admin-content-r">
        {tab === 'reservations' && (
          <>
            <h3 style={{ ...styles.formTitle, marginBottom: 16 }}>All Reservations</h3>
            {reservations.length === 0 ? (
              <div style={styles.empty}>No reservations yet</div>
            ) : (
              <div className="admin-table-wrap-r" style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Car</th>
                    <th style={styles.th}>Duration</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Fingerprint</th>
                    <th style={styles.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => {
                    const fp = r.fingerprint || {}
                    const fpParts = [fp.ip, fp.platform, fp.language, fp.timezone].filter(Boolean)
                    return (
                      <tr key={r.id}>
                        <td style={styles.td}>{r.name}</td>
                        <td style={styles.td}>{r.phone}</td>
                        <td style={{ ...styles.td, ...styles.tdGold }}>{r.car_name}</td>
                        <td style={styles.td}>
                          {r.rental_type
                            ? `${r.rental_qty || 1} ${r.rental_type}${(r.rental_qty || 1) > 1 ? 's' : ''}${r.rental_total ? ` — ${r.rental_total} AED` : ''}`
                            : '—'}
                        </td>
                        <td style={styles.td}>
                          {r.created_at ? new Date(r.created_at).toLocaleString() : '—'}
                        </td>
                        <td style={{ ...styles.td, fontSize: 11, color: 'var(--text-muted)', maxWidth: 200 }}>
                          {fpParts.length > 0 ? (
                            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              {fp.ip && <span>IP: {fp.ip}</span>}
                              {fp.platform && <span>{fp.platform}{fp.language ? ` / ${fp.language}` : ''}</span>}
                              {fp.timezone && <span>{fp.timezone}</span>}
                              {fp.screen && <span>{fp.screen}{fp.touch ? ' touch' : ''}</span>}
                            </span>
                          ) : '—'}
                        </td>
                        <td style={styles.td}>
                          <button
                            onClick={() => handleDeleteReservation(r)}
                            style={{ ...styles.carCardBtn, ...styles.carCardBtnDanger, padding: '4px 12px', fontSize: 11 }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>
            )}
          </>
        )}

        {tab === 'settings' && (
          <>
            <h3 style={styles.formTitle}>Site Settings</h3>

            <div style={styles.form}>
              <h4 style={styles.formTitle}>Background Image</h4>
              <div
                style={{ ...styles.dropzone, ...(bgDropActive ? styles.dropzoneActive : {}) }}
                onDragOver={(e) => { e.preventDefault(); setBgDropActive(true) }}
                onDragLeave={() => setBgDropActive(false)}
                onDrop={async (e) => {
                  e.preventDefault()
                  setBgDropActive(false)
                  const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'))
                  if (!files.length) return
                  await uploadBgImage(files[0])
                }}
                onClick={() => bgFileInputRef.current?.click()}
              >
                <input
                  ref={bgFileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) await uploadBgImage(file)
                  }}
                />
                {bgImage ? (
                  <img src={bgImage} alt="Background preview" style={{ maxHeight: 160, margin: '0 auto' }} />
                ) : (
                  <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                    Drop a background image here or click to browse
                  </span>
                )}
              </div>
              {bgImage && (
                <button
                  onClick={async () => {
                    localStorage.removeItem('atapower_bg_image')
                    setBgImage('')
                    try {
                      const { supabase } = await import('../supabase/client')
                      if (supabase) await supabase.from('site_settings').delete().eq('key', 'background_image')
                    } catch { /* fallback */ }
                    applyBg()
                    showToast('Background image removed')
                  }}
                  style={{ ...styles.formBtn, ...styles.formBtnCancel, marginTop: 8 }}
                >
                  Remove Background Image
                </button>
              )}
            </div>

            <div style={styles.form}>
              <h4 style={styles.formTitle}>Background Color</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <input
                  type="color"
                  value={bgColor}
                  onChange={async (e) => {
                    const val = e.target.value
                    setBgColor(val)
                    localStorage.setItem('atapower_bg_color', val)
                    try {
                      const { supabase } = await import('../supabase/client')
                      if (supabase) await supabase.from('site_settings').upsert({ key: 'background_color', value: val }, { onConflict: 'key' })
                    } catch { /* fallback */ }
                    showToast('Background color saved')
                  }}
                  style={{ width: 48, height: 48, border: '1px solid var(--border)', background: 'none', cursor: 'pointer', padding: 0 }}
                />
                <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{bgColor}</span>
                <button
                  onClick={async () => {
                    localStorage.removeItem('atapower_bg_color')
                    setBgColor('#0a0a0a')
                    try {
                      const { supabase } = await import('../supabase/client')
                      if (supabase) await supabase.from('site_settings').delete().eq('key', 'background_color')
                    } catch { /* fallback */ }
                    showToast('Reset to default')
                  }}
                  style={{ ...styles.formBtn, ...styles.formBtnCancel }}
                >
                  Reset
                </button>
              </div>
            </div>
          </>
        )}

        {tab === 'cars' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={styles.formTitle}>Car Fleet</h3>
              <button style={styles.addBtn} onClick={() => { resetForm(); setShowForm(true) }}>
                + Add Car
              </button>
            </div>

            {showForm && (
              <div style={styles.form}>
                <h4 style={styles.formTitle}>
                  {editingCar ? 'Edit Car' : 'New Car'}
                </h4>
                <form onSubmit={handleSave}>
                  <div style={styles.formGrid} className="admin-form-grid-r">
                    <div style={styles.formField}>
                      <label style={styles.formLabel}>Car Name</label>
                      <input
                        style={styles.formInput}
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Nissan Patrol"
                      />
                    </div>
                    <div style={styles.formField}>
                      <label style={styles.formLabel}>Year</label>
                      <input
                        style={styles.formInput}
                        value={form.year}
                        onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
                        placeholder="e.g. 2026"
                      />
                    </div>
                    <div style={styles.formField}>
                      <label style={styles.formLabel}>Price per Day (AED)</label>
                      <input
                        style={styles.formInput}
                        value={form.price_per_day}
                        onChange={(e) => setForm((p) => ({ ...p, price_per_day: e.target.value }))}
                        placeholder="e.g. 350"
                      />
                    </div>
                    <div style={styles.formField}>
                      <label style={styles.formLabel}>Price Weekly (AED)</label>
                      <input
                        style={styles.formInput}
                        value={form.price_weekly}
                        onChange={(e) => setForm((p) => ({ ...p, price_weekly: e.target.value }))}
                        placeholder="e.g. 3700"
                      />
                    </div>
                    <div style={styles.formField}>
                      <label style={styles.formLabel}>Price Monthly (AED)</label>
                      <input
                        style={styles.formInput}
                        value={form.price_monthly}
                        onChange={(e) => setForm((p) => ({ ...p, price_monthly: e.target.value }))}
                        placeholder="e.g. 13000"
                      />
                    </div>
                    <div style={styles.formField}>
                      <label style={styles.formLabel}>Image</label>
                      <div
                        style={{ ...styles.dropzone, ...(dropActive ? styles.dropzoneActive : {}) }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            try {
                              const { supabase } = await import('../supabase/client')
                              if (supabase) {
                                 const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
                                 const fileName = `uploads/${Date.now()}-${safeName}`
                                await supabase.storage.from('car images').upload(fileName, file)
                                const { data: urlData } = supabase.storage.from('car images').getPublicUrl(fileName)
                                setForm((p) => ({ ...p, image: urlData.publicUrl }))
                                showToast('Image uploaded')
                              } else {
                                setForm((p) => ({ ...p, image: URL.createObjectURL(file) }))
                              }
                            } catch {
                              setForm((p) => ({ ...p, image: URL.createObjectURL(file) }))
                            }
                          }}
                        />
                        {form.image ? (
                          <img src={form.image} alt="Preview" style={{ maxHeight: 120, margin: '0 auto' }} />
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                            Drop an image here or click to browse
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={styles.formActions}>
                    <button type="submit" style={styles.formBtn}>
                      {editingCar ? 'Update' : 'Add Car'}
                    </button>
                    <button type="button" style={{ ...styles.formBtn, ...styles.formBtnCancel }} onClick={resetForm}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div style={styles.carGrid} className="admin-car-grid-r">
              {cars.map((car) => (
                <div key={car.id} style={styles.carCard}>
                  {car.image ? (
                    <img src={car.image} alt={car.name} style={styles.carCardImg} />
                  ) : (
                    <div style={{ ...styles.carCardImg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      No Image
                    </div>
                  )}
                  <div style={styles.carCardBody}>
                    <div style={styles.carCardName}>
                      {car.name} {car.visible ? '' : '(hidden)'}
                    </div>
                    <div style={styles.carCardPrice}>
                      {car.price_per_day ? `${car.price_per_day} AED/day` : '—'}
                      {car.price_weekly && <span style={{ color: 'var(--text-muted)', fontSize: 12, display: 'block' }}>{car.price_weekly} AED/week</span>}
                      {car.price_monthly && <span style={{ color: 'var(--text-muted)', fontSize: 12, display: 'block' }}>{car.price_monthly} AED/month</span>}
                    </div>
                    <div style={styles.carCardActions}>
                      <button
                        style={styles.carCardBtn}
                        onClick={() => handleEdit(car)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.carCardBtn}
                        onClick={() => handleToggleVisibility(car)}
                      >
                        {car.visible ? 'Hide' : 'Show'}
                      </button>
                      <button
                        style={{ ...styles.carCardBtn, ...styles.carCardBtnDanger }}
                        onClick={() => handleDelete(car)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {toast && <SaveToast message={toast} />}
    </div>
  )
}
