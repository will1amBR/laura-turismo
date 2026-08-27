import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'

import Layout from './components/Layout'
import Index from './pages/Index'
import PackageDetail from './pages/PackageDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import MyGroups from './pages/MyGroups'
import GroupDetail from './pages/GroupDetail'
import Payment from './pages/Payment'
import About from './pages/About'
import FAQ from './pages/FAQ'
import AdminDashboard from './pages/admin/AdminDashboard'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pacote/:id" element={<PackageDetail />} />
            <Route path="/entrar" element={<Login />} />
            <Route path="/cadastrar" element={<Register />} />
            <Route path="/meus-grupos" element={<MyGroups />} />
            <Route path="/grupo/:id" element={<GroupDetail />} />
            <Route path="/pagamento/:groupId" element={<Payment />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
