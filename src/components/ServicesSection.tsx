import {
  Globe,
  Code2,
  Workflow,
  TrendingUp,
  Share2,
  Users2,
  BarChart3,
  SearchCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

export interface ServiceItem {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
  tag: string
  highlight?: boolean
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'site',
    title: 'Sites e Landing Pages',
    subtitle: 'Conversão em alta velocidade',
    description:
      'Sites modernos, ultra-rápidos e otimizados para telemóveis que transformam visitantes em clientes e pedidos de contacto.',
    icon: Globe,
    tag: 'Presença & Vendas',
  },
  {
    id: 'aplicacao',
    title: 'Aplicações Web',
    subtitle: 'Sistemas à medida',
    description:
      'Portais de clientes, catálogos interativos e ferramentas digitais personalizadas para as necessidades operacionais da sua empresa.',
    icon: Code2,
    tag: 'Sob Medida',
  },
  {
    id: 'automacao',
    title: 'Automação de Processos',
    subtitle: 'Menos tarefas repetitivas',
    description:
      'Integre WhatsApp, email, faturas e calendários. Acabe com o trabalho manual e ganhe horas de produtividade na equipa.',
    icon: Workflow,
    tag: 'Produtividade',
  },
  {
    id: 'trafico',
    title: 'Gestão de Tráfego',
    subtitle: 'Google e Meta Ads',
    description:
      'Campanhas orientadas a retorno sobre investimento (ROI). Atraia clientes qualificados que procuram ativamente pelo seu negócio.',
    icon: TrendingUp,
    tag: 'Resultados',
  },
  {
    id: 'redes',
    title: 'Redes Sociais',
    subtitle: 'Autoridade e comunidade',
    description:
      'Estratégia de conteúdo, design e gestão de Instagram, LinkedIn e Facebook para consolidar a presença da sua marca no mercado.',
    icon: Share2,
    tag: 'Branding',
  },
  {
    id: 'crm',
    title: 'CRM Kronus',
    subtitle: 'Clientes e WhatsApp unificados',
    description:
      'Centralize pedidos de clientes, propostas comerciais, agendamentos e conversas de WhatsApp numa única ferramenta intuitiva.',
    icon: Users2,
    tag: 'Exclusivo',
    highlight: true,
  },
  {
    id: 'dashboards',
    title: 'Dashboards e BI',
    subtitle: 'Decisões com base em dados',
    description:
      'Painéis executivos claros com as métricas que importam: vendas diárias, margem, custo por lead e desempenho das equipas.',
    icon: BarChart3,
    tag: 'Inteligência',
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico Gratuito',
    subtitle: 'Análise sem compromisso',
    description:
      'Auditoria de 360° à presença digital do seu negócio: velocidade do site, posicionamento no Google e pontos de fuga de leads.',
    icon: SearchCheck,
    tag: 'Sem Custo',
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="py-24 relative overflow-hidden bg-[#06060B]">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-gradient-to-r from-[#8767FF]/10 via-[#46E6FF]/10 to-[#8767FF]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D0D17] border border-[#1E1E2E] text-xs font-semibold text-[#46E6FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ecossistema Digital Completo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#F4F4F6] tracking-tight">
            Serviços focados no crescimento da sua PME
          </h2>
          <p className="text-[#9CA3B4] text-base sm:text-lg">
            Combinamos engenharia de software moderna, automação e estratégias de marketing digital
            para acelerar o seu negócio em Portugal.
          </p>
        </div>

        {/* 8 Services Grid (4 columns on lg, 2 on md, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className={`group relative rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between ${
                  service.highlight
                    ? 'bg-gradient-to-b from-[#141226] to-[#0D0D17] border border-[#8767FF]/50 shadow-[0_10px_30px_rgba(135,103,255,0.2)] hover:shadow-[0_15px_40px_rgba(135,103,255,0.35)] hover:border-[#8767FF]'
                    : 'bg-[#0D0D17] border border-[#1E1E2E] hover:border-[#8767FF]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                } hover:-translate-y-1`}
              >
                {/* Glow corner accent on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8767FF]/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Top Bar: Icon + Pill Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        service.highlight
                          ? 'bg-gradient-to-tr from-[#8767FF] to-[#46E6FF] text-white shadow-[0_0_20px_rgba(135,103,255,0.4)]'
                          : 'bg-[#1E1E2E] text-[#8767FF] group-hover:bg-[#8767FF]/20 group-hover:text-[#46E6FF]'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                        service.highlight
                          ? 'bg-[#8767FF]/30 text-white border border-[#8767FF]/40'
                          : 'bg-[#06060B] text-[#9CA3B4] border border-[#1E1E2E]'
                      }`}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-heading font-bold text-[#F4F4F6] mb-1 group-hover:text-[#46E6FF] transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs font-medium text-[#8767FF] mb-3">{service.subtitle}</div>

                  {/* Description */}
                  <p className="text-sm text-[#9CA3B4] leading-relaxed">{service.description}</p>
                </div>

                {/* Bottom link to form */}
                <div className="pt-6 mt-4 border-t border-[#1E1E2E]/60 flex items-center justify-between">
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4F4F6] hover:text-[#46E6FF] transition-colors"
                  >
                    Saber mais
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                  {service.highlight && (
                    <span className="text-[10px] text-[#46E6FF] font-medium tracking-wide">
                      ★ Mais procurado
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
