import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plane, Menu, User, LogOut, ShieldCheck, Compass } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
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

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md text-stone-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-stone-900 transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-sky-600 text-white shadow transition-colors">
            <Plane className="h-5 w-5" />
          </div>
          <span>Laura Turismo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/sobre"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-amber-600"
          >
            Sobre a Laura
          </Link>
          <a
            href="/#pacotes"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-amber-600"
          >
            Pacotes
          </a>
          <a
            href="/#como-funciona"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-amber-600"
          >
            Como Funciona
          </a>
          <Link
            to="/faq"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-amber-600"
          >
            Dúvidas (FAQ)
          </Link>

          {isAuthenticated && (
            <Link
              to="/meus-grupos"
              className="flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline"
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
                  className="gap-2 border-stone-300 transition-colors hover:bg-stone-50"
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
                className="text-stone-700 transition-colors hover:text-stone-900"
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
              <Button variant="outline" size="icon" className="border-stone-300 transition-colors">
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
                <Link
                  to="/sobre"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium py-2 border-b"
                >
                  Sobre a Laura
                </Link>
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
                <Link
                  to="/faq"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium py-2 border-b"
                >
                  Dúvidas (FAQ)
                </Link>

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
