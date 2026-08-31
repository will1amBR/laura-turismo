import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Plane,
  Menu,
  LogOut,
  ShieldCheck,
  Compass,
  Info,
  HelpCircle,
  Package,
  Layers,
  PhoneCall,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const { user, isAuthenticated, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    signOut()
    setOpen(false)
    navigate('/')
  }

  const navLinks = [
    { title: 'Sobre a Laura', href: '/sobre', icon: Info, isRouter: true },
    { title: 'Pacotes & Roteiros', href: '/#pacotes', icon: Package, isRouter: false },
    { title: 'Como Funciona', href: '/#como-funciona', icon: Layers, isRouter: false },
    { title: 'Dúvidas (FAQ)', href: '/faq', icon: HelpCircle, isRouter: true },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md text-stone-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-stone-900 transition-colors shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-sky-600 text-white shadow transition-colors">
            <Plane className="h-5 w-5" />
          </div>
          <span className="font-extrabold tracking-tight">Laura Turismo</span>
        </Link>

        {/* Right Action Area: Auth Buttons (Entrar, Cadastre-se) + Hamburger Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-stone-300 transition-colors hover:bg-stone-50 max-w-[160px] sm:max-w-[210px] h-9 sm:h-10 px-2.5 sm:px-3 text-xs sm:text-sm font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {(user?.name || user?.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="truncate hidden xs:inline sm:inline">
                    {user?.name || user?.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1.5">
                <div className="px-3 py-2 border-b border-stone-100 mb-1">
                  <p className="text-xs font-semibold text-stone-900 truncate">
                    {user?.name || 'Cliente'}
                  </p>
                  <p className="text-[11px] text-stone-500 truncate">{user?.email}</p>
                </div>
                <DropdownMenuItem
                  onClick={() => navigate('/meus-grupos')}
                  className="cursor-pointer"
                >
                  <Compass className="mr-2 h-4 w-4 text-sky-600" /> Meus Grupos
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer">
                    <ShieldCheck className="mr-2 h-4 w-4 text-amber-600" /> Painel Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Sair da conta
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/entrar')}
                className="text-stone-700 hover:text-amber-700 hover:bg-amber-50/60 font-semibold text-xs sm:text-sm px-2.5 sm:px-3.5 h-9 sm:h-10 transition-colors"
              >
                Entrar
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-semibold shadow-sm hover:shadow-md transition-all text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10"
                onClick={() => navigate('/cadastrar')}
              >
                Cadastre-se
              </Button>
            </div>
          )}

          {/* Unified Hamburger Menu Button for all screen sizes */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Menu de Navegação"
                title="Menu"
                className="h-9 w-9 sm:h-10 sm:w-10 border-stone-300 text-stone-800 hover:bg-stone-100 hover:border-amber-400 rounded-xl transition-all shadow-xs"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm p-0 flex flex-col justify-between bg-white border-l border-stone-200"
            >
              <div>
                <SheetHeader className="p-5 border-b border-stone-100 bg-stone-50/80">
                  <SheetTitle className="flex items-center gap-2.5 text-stone-900 text-lg font-bold text-left">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-sky-600 text-white shadow">
                      <Plane className="h-4 w-4" />
                    </div>
                    <span>Laura Turismo</span>
                  </SheetTitle>
                </SheetHeader>

                {/* User status card inside menu if authenticated */}
                {isAuthenticated && (
                  <div className="m-4 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0">
                      {(user?.name || user?.email || 'U')[0].toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-amber-900 font-bold truncate">
                        {user?.name || 'Viajante'}
                      </p>
                      <p className="text-[11px] text-amber-700/80 truncate">{user?.email}</p>
                    </div>
                  </div>
                )}

                {/* Navigation links */}
                <div className="px-4 py-3 space-y-1">
                  <p className="px-3 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Menu & Roteiros
                  </p>
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    return link.isRouter ? (
                      <Link
                        key={link.title}
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                          location.pathname === link.href
                            ? 'bg-amber-50 text-amber-700 font-bold'
                            : 'text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-stone-500 shrink-0" />
                        <span>{link.title}</span>
                      </Link>
                    ) : (
                      <a
                        key={link.title}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-stone-500 shrink-0" />
                        <span>{link.title}</span>
                      </a>
                    )
                  })}

                  <div className="pt-2">
                    <p className="px-3 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Acesso Rápido
                    </p>
                    {isAuthenticated && (
                      <Link
                        to="/meus-grupos"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors mb-1.5"
                      >
                        <Compass className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>Área do Cliente (Meus Grupos)</span>
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Painel Admin</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-stone-200 bg-stone-50/60 space-y-2">
                <a
                  href="https://wa.me/5511998170951?text=Ol%C3%A1%20Laura!"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Falar com Laura no WhatsApp
                </a>

                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold text-xs py-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1.5" /> Sair da conta
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      variant="outline"
                      className="border-stone-300 text-stone-800 text-xs font-semibold"
                      onClick={() => {
                        navigate('/entrar')
                        setOpen(false)
                      }}
                    >
                      Entrar
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-semibold text-xs shadow-md"
                      onClick={() => {
                        navigate('/cadastrar')
                        setOpen(false)
                      }}
                    >
                      Cadastre-se
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
