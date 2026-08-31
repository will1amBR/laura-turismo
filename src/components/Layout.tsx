import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="flex flex-col min-h-screen bg-white text-stone-900 font-sans overflow-x-hidden">
      <Navbar />
      <main className={`w-full max-w-full overflow-x-hidden ${isHome ? 'flex-1' : 'flex-1 pt-0'}`}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
