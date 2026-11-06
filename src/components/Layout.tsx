/* Layout Component - A component that wraps the main content of the app
   - Use this file to add a header, footer, or other elements that should be present on every page
   - This component is used in the App.tsx file to wrap the main content of the app */

import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export default function Layout() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/painel')

  return (
    <div className="flex flex-col min-h-screen bg-[#06060B] text-[#F4F4F6] selection:bg-[#8767FF]/30 selection:text-white">
      {!isDashboard && <Navbar />}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
}
