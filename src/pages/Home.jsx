import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import WhyChooseUs from '../components/WhyChooseUs'
import Footer from '../components/Footer'
import ReservationModal from '../components/ReservationModal'

export default function Home() {
  const [cars, setCars] = useState([])
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
    </>
  )
}
