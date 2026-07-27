import { Plane, Mail, Phone, MapPin, Instagram, Facebook, Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 mt-auto border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-teal-400 mb-4">
              <Plane className="h-6 w-6" />
              <span>Laura Turismo</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sua especialistas em grupos de turismo para o Chile. Proporcionamos viagens
              organizadas, com segurança, conforto e memórias inesquecíveis.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-4">Contato</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-400" />
                <span>contato@lauraturismo.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-400" />
                <span>+55 (11) 99888-7766</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-400" />
                <span>Santiago (Chile) & São Paulo (Brasil)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-4">Redes Sociais</h3>
            <p className="text-sm text-slate-400 mb-4">
              Acompanhe nossos grupos em tempo real e fique por dentro de dicas exclusivas sobre o
              Chile!
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-800 hover:bg-teal-700 text-slate-300 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-800 hover:bg-teal-700 text-slate-300 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://lauraturismo.com.br"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-slate-800 hover:bg-teal-700 text-slate-300 hover:text-white transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Laura Turismo. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
