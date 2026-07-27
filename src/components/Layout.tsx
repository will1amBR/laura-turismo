import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="flex flex-col min-h-screen bg-white text-stone-900 font-sans">
      <Navbar />
      <main className={isHome ? 'flex-1' : 'flex-1 pt-0'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
