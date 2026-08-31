import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Plane,
  Menu,
  X,
  User,
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.isRouter ? (
              <Link
                key={link.title}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  location.pathname === link.href
                    ? 'text-amber-600 font-semibold'
                    : 'text-stone-600'
                }`}
              >
                {link.title}
              </Link>
            ) : (
              <a
                key={link.title}
                href={link.href}
                className="text-sm font-medium text-stone-600 transition-colors hover:text-amber-600"
              >
                {link.title}
              </a>
            ),
          )}

          {isAuthenticated && (
            <Link
              to="/meus-grupos"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-amber-700 ${
                location.pathname === '/meus-grupos'
                  ? 'text-amber-600 font-bold underline'
                  : 'text-amber-600 font-medium'
              }`}
            >
              <Compass className="h-4 w-4" /> Meus Grupos
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors shadow-sm"
            >
              <ShieldCheck className="h-4 w-4 text-amber-600" /> Painel Admin
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-stone-300 transition-colors hover:bg-stone-50 max-w-[200px]"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                    {(user?.name || user?.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="truncate">{user?.name || user?.email}</span>
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
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/entrar')}
                className="text-stone-700 transition-colors hover:text-stone-900 font-medium"
              >
                Entrar
              </Button>
              <Button
                className="bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
                onClick={() => navigate('/cadastrar')}
              >
                Cadastre-se
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu (Clean & Intuitive) */}
        <div className="flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Abrir Menu de Navegação"
                className="h-10 w-10 border-stone-300 text-stone-800 hover:bg-stone-100 rounded-xl transition-colors"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm p-0 flex flex-col justify-between bg-white border-l border-stone-200"
            >
              <div>
                <SheetHeader className="p-5 border-b border-stone-100 bg-stone-50/70">
                  <SheetTitle className="flex items-center gap-2.5 text-stone-900 text-lg font-bold text-left">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-sky-600 text-white shadow">
                      <Plane className="h-4 w-4" />
                    </div>
                    <span>Laura Turismo</span>
                  </SheetTitle>
                </SheetHeader>

                {/* User status card on top of menu */}
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
                    Navegação
                  </p>
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    return link.isRouter ? (
                      <Link
                        key={link.title}
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
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
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-stone-500 shrink-0" />
                        <span>{link.title}</span>
                      </a>
                    )
                  })}

                  {isAuthenticated && (
                    <Link
                      to="/meus-grupos"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors mt-2"
                    >
                      <Compass className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>Área do Cliente (Meus Grupos)</span>
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors mt-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Painel Admin</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-stone-200 bg-stone-50/50 space-y-2">
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
