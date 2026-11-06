import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#050509] border-t border-[#1E1E2E] text-[#9CA3B4] pt-16 pb-12 relative overflow-hidden">
      {/* Background glow subtle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#8767FF]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1E1E2E]">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8767FF] to-[#46E6FF] p-[2px]">
                <div className="w-full h-full bg-[#06060B] rounded-full flex items-center justify-center">
                  <span className="font-heading font-bold text-base bg-gradient-to-r from-[#8767FF] to-[#46E6FF] bg-clip-text text-transparent">
                    K
                  </span>
                </div>
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-[#F4F4F6]">
                Kronus <span className="text-[#8767FF]">Digital</span>
              </span>
            </Link>
            <p className="text-sm text-[#9CA3B4] leading-relaxed">
              Agência de serviços digitais especializada em PMEs em Portugal. Tecnologia, automação
              e tráfego focado em resultados reais de negócio.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0D17] border border-[#1E1E2E] text-xs text-[#46E6FF]">
              <MapPin className="w-3.5 h-3.5 text-[#46E6FF]" />
              Portugal · Atendimento Nacional
            </div>
          </div>

          {/* Col 2: Serviços */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#F4F4F6]">
              Serviços
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#servicos" className="hover:text-[#46E6FF] transition-colors">
                  Sites e Landing Pages
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#46E6FF] transition-colors">
                  Aplicações Web à Medida
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#46E6FF] transition-colors">
                  Automação de Processos
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#46E6FF] transition-colors">
                  Gestão de Tráfego (Google & Meta)
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#46E6FF] transition-colors">
                  CRM Kronus para PMEs
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#46E6FF] transition-colors">
                  Dashboards e Business Intelligence
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contactos */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#F4F4F6]">
              Contactos Diretos
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://wa.me/351912345678?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20um%20or%C3%A7amento%20para%20a%20minha%20empresa."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp: +351 912 345 678</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+351210000000"
                  className="flex items-center gap-2 hover:text-[#46E6FF] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#46E6FF]" />
                  <span>Telefone: +351 210 000 000</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@kronusdigital.pt"
                  className="flex items-center gap-2 hover:text-[#8767FF] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#8767FF]" />
                  <span>contacto@kronusdigital.pt</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Diagnóstico gratuito */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#F4F4F6]">
              Diagnóstico Gratuito
            </h4>
            <p className="text-sm text-[#9CA3B4]">
              Análise sem custo dos seus canais digitais, presença online e pontos de automação.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-[#1E1E2E] hover:bg-[#8767FF] text-[#F4F4F6] transition-colors duration-200"
            >
              Pedir diagnóstico grátis
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3B4]/80">
          <div>
            © {currentYear} Kronus Digital. Todos os direitos reservados. Feito para PMEs
            portuguesas.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-[#F4F4F6] transition-colors">
              Acesso da Agência (Painel)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
