import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import WhyChooseUs from '../components/WhyChooseUs'
import Footer from '../components/Footer'
import ReservationModal from '../components/ReservationModal'
import SurpriseModal from '../components/SurpriseModal'

export default function Home() {
  const [cars, setCars] = useState([])
  const [showSurprise, setShowSurprise] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState(null)

  useEffect(() => {
    async function loadBg() {
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
      } catch { /* fall back to localStorage */ }

      const bgImage = localStorage.getItem('atapower_bg_image')
      const bgColor = localStorage.getItem('atapower_bg_color')
      const root = document.documentElement
      if (bgColor) root.style.setProperty('--black', bgColor)
      else root.style.removeProperty('--black')
      if (bgImage) {
        root.style.setProperty('--bg-image', `url("${bgImage}")`)
        root.style.setProperty('--bg-overlay', 'rgba(0,0,0,0.6)')
      } else {
        root.style.removeProperty('--bg-image')
        root.style.removeProperty('--bg-overlay')
      }
    }
    loadBg()
  }, [])

  useEffect(() => {
    async function loadCars() {
      try {
        const { supabase } = await import('../supabase/client')
        if (supabase) {
          const { data } = await supabase
            .from('cars')
            .select('*')
            .eq('visible', true)

          if (data && data.length > 0) {
            const mapped = data.map((c) => ({
              id: c.id,
              name: c.name,
              year: c.year,
              price_per_day: c.price_per_day,
              price_weekly: c.price_weekly,
              price_monthly: c.price_monthly,
              image: c.image_urls?.[0] || null,
              visible: c.visible,
            }))
            setCars(mapped)
          }
        }
      } catch { /* ignored */ }
      setLoading(false)
    }
    loadCars()
  }, [])

  const handleReserve = (car) => {
    if (car) setSelectedCar(car)
    else setSelectedCar(cars[0] || null)
  }

  return (
    <>
      <Navbar />
      <Hero cars={cars} loading={loading} onReserve={handleReserve} />
      <About />
      <WhyChooseUs />
      <Footer />
      {selectedCar && (
        <ReservationModal
          key={selectedCar?.id || 'new'}
          car={selectedCar}
          cars={cars}
          onClose={() => setSelectedCar(null)}
        />
      )}
      {showSurprise && <SurpriseModal onClose={() => setShowSurprise(false)} />}

      <div
        onClick={() => setShowSurprise(true)}
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 999,
          background: 'linear-gradient(135deg, #d4a853, #f0c060, #d4a853)',
          backgroundSize: '200% 200%',
          color: '#0a0a0a',
          padding: '18px 24px',
          fontFamily: 'var(--font-display)',
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          border: 'none',
          writingMode: 'vertical-lr',
          borderRadius: '8px 0 0 8px',
          boxShadow: '0 0 30px rgba(212,168,83,0.6), 0 0 60px rgba(212,168,83,0.3)',
          animation: 'surprisePulse 1.5s ease-in-out infinite',
        }}
      >
        🎁 Surprise
      </div>
      <style>{`
        @keyframes surprisePulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(212,168,83,0.5), 0 0 40px rgba(212,168,83,0.2);
            background-position: 0% 50%;
          }
          50% {
            box-shadow: 0 0 40px rgba(212,168,83,0.8), 0 0 80px rgba(212,168,83,0.4);
            background-position: 100% 50%;
          }
        }
      `}</style>
    </>
  )
}
