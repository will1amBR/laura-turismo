import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Plane, Menu, User, LogOut, ShieldCheck, Compass } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { cn } from '@/lib/utils'
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
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const scrolled = useScrollPosition(100) || !isHome

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'bg-white shadow-md text-stone-900' : 'bg-transparent text-white',
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className={cn(
            'flex items-center gap-2 text-xl font-bold tracking-tight transition-colors',
            scrolled ? 'text-stone-900' : 'text-white',
          )}
        >
          <div
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg shadow transition-colors',
              scrolled
                ? 'bg-gradient-to-br from-amber-500 to-sky-600 text-white'
                : 'bg-white/20 backdrop-blur text-white border border-white/30',
            )}
          >
            <Plane className="h-5 w-5" />
          </div>
          <span>Laura Turismo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/#pacotes"
            className={cn(
              'text-sm font-medium transition-colors',
              scrolled ? 'text-stone-600 hover:text-amber-600' : 'text-white/90 hover:text-white',
            )}
          >
            Pacotes
          </a>
          <a
            href="/#como-funciona"
            className={cn(
              'text-sm font-medium transition-colors',
              scrolled ? 'text-stone-600 hover:text-amber-600' : 'text-white/90 hover:text-white',
            )}
          >
            Como Funciona
          </a>

          {isAuthenticated && (
            <Link
              to="/meus-grupos"
              className={cn(
                'text-sm font-medium hover:underline flex items-center gap-1',
                scrolled ? 'text-amber-600' : 'text-white',
              )}
            >
              <Compass className="h-4 w-4" /> Meus Grupos
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200"
            >
              <ShieldCheck className="h-4 w-4" /> Painel Admin
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'gap-2 transition-colors',
                    scrolled
                      ? 'border-stone-300 hover:bg-stone-50'
                      : 'border-white/40 text-white hover:bg-white/10 bg-transparent',
                  )}
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">{user?.name || user?.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/meus-grupos')}>
                  <Compass className="mr-2 h-4 w-4" /> Meus Grupos
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <ShieldCheck className="mr-2 h-4 w-4 text-amber-600" /> Painel Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/entrar')}
                className={cn(
                  'transition-colors',
                  scrolled ? 'text-stone-700 hover:text-stone-900' : 'text-white hover:bg-white/10',
                )}
              >
                Entrar
              </Button>
              <Button
                className="bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-semibold shadow-lg transition-all duration-300"
                onClick={() => navigate('/cadastrar')}
              >
                Cadastre-se
              </Button>
            </>
          )}
        </div>

        <div className="flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  'transition-colors',
                  scrolled ? 'border-stone-300' : 'border-white/40 text-white bg-white/10',
                )}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-stone-900">
                  <Plane className="h-5 w-5 text-amber-500" /> Laura Turismo
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <a
                  href="/#pacotes"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium py-2 border-b"
                >
                  Pacotes
                </a>
                <a
                  href="/#como-funciona"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium py-2 border-b"
                >
                  Como Funciona
                </a>

                {isAuthenticated && (
                  <Link
                    to="/meus-grupos"
                    onClick={() => setOpen(false)}
                    className="text-base font-medium py-2 border-b text-amber-600"
                  >
                    Meus Grupos
                  </Link>
                )}

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="text-base font-semibold py-2 border-b text-amber-600"
                  >
                    Painel Admin
                  </Link>
                )}

                <div className="pt-4 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleLogout()
                        setOpen(false)
                      }}
                    >
                      Sair
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigate('/entrar')
                          setOpen(false)
                        }}
                      >
                        Entrar
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-semibold"
                        onClick={() => {
                          navigate('/cadastrar')
                          setOpen(false)
                        }}
                      >
                        Cadastre-se
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
