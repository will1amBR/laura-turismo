import { Link } from 'react-router-dom'
import {
  Plane,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Globe,
  HelpCircle,
  Info,
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 mt-auto border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold text-teal-400">
              <Plane className="h-6 w-6" />
              <span>Laura Turismo</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sua especialista em grupos de turismo para o Chile. Mais de 15 anos proporcionando
              viagens seguras, confortáveis e inesquecíveis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  to="/sobre"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5" /> Sobre a Laura
                </Link>
              </li>
              <li>
                <a href="/#pacotes" className="hover:text-teal-400 transition-colors">
                  Pacotes & Roteiros
                </a>
              </li>
              <li>
                <a href="/#como-funciona" className="hover:text-teal-400 transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Dúvidas Frequentes (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/meus-grupos" className="hover:text-teal-400 transition-colors">
                  Área do Cliente (Meus Grupos)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-4">Contato</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-400 shrink-0" />
                <span>contato@lauraturismo.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-400 shrink-0" />
                <a
                  href="https://wa.me/5511998170951?text=Ol%C3%A1%20Laura!"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors font-medium"
                >
                  +55 11 99817-0951
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-400 shrink-0" />
                <span>Santiago (Chile) & São Paulo (Brasil)</span>
              </li>
            </ul>
          </div>

          {/* Social Links with Tooltips */}
          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-2">Redes Sociais</h3>
            <p className="text-sm text-slate-400 mb-4">
              Siga nossos canais oficiais para dicas exclusivas e fotos das viagens:
            </p>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://instagram.com/lauraturismo"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram Oficial Laura Turismo"
                      className="p-2.5 rounded-full bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-600 hover:to-pink-600 text-slate-300 hover:text-white transition-all shadow"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Instagram: @lauraturismo (Página oficial)</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://facebook.com/lauraturismo"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook Oficial Laura Turismo"
                      className="p-2.5 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-all shadow"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Facebook: @lauraturismo (Página oficial)</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://lauraturismo.com.br"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Site Oficial"
                      className="p-2.5 rounded-full bg-slate-800 hover:bg-teal-700 text-slate-300 hover:text-white transition-all shadow"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Site Oficial Laura Turismo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-xs text-slate-500 mt-3 italic">
              * Redes sociais em processo de atualização para a temporada 2026/2027.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>© {new Date().getFullYear()} Laura Turismo. Todos os direitos reservados.</span>
          <span>CNPJ & Cadastur regulares para turismo receptivo e emissivo.</span>
        </div>
      </div>
    </footer>
  )
}
