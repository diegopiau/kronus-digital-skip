import { Star, Quote, Building2, Scissors, Stethoscope, CheckCircle2 } from 'lucide-react'

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  segment: string
  quote: string
  rating: number
  icon: React.ElementType
  metric: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'clinica',
    name: 'Dra. Sofia Matos',
    role: 'Diretora Clínica',
    company: 'Clínica Dentária Matos & Filhos (Lisboa)',
    segment: 'Saúde & Bem-Estar',
    quote:
      'O novo website e o sistema de marcações com lembretes automáticos por WhatsApp reduziram as faltas dos pacientes em mais de 40%. A equipa da Kronus foi impecável no prazo e suporte.',
    rating: 5,
    icon: Stethoscope,
    metric: '-42% faltas a consultas',
  },
  {
    id: 'barbearia',
    name: 'Gonçalo Neves',
    role: 'Fundador & Barbeiro Chefe',
    company: 'The Gentleman Cut (Porto & Gaia)',
    segment: 'Barbearia & Estética',
    quote:
      'Com as campanhas de Google e Meta Ads geridas pela Kronus, preenchemos os horários mortos de terça a quinta-feira em menos de três semanas. Investimento com retorno comprovado.',
    rating: 5,
    icon: Scissors,
    metric: '+65 novos clientes/mês',
  },
  {
    id: 'imobiliaria',
    name: 'Eduardo Bettencourt',
    role: 'Sócio-Gerente',
    company: 'Bettencourt Imóveis Prime (Cascais)',
    segment: 'Mediação Imobiliária',
    quote:
      'O CRM Kronus centralizou todos os leads do Idealista e do Imovirtual. Agora os nossos consultores respondem em menos de 5 minutos diretamente pelo WhatsApp. As conversões subiram logo no primeiro mês.',
    rating: 5,
    icon: Building2,
    metric: '3.2x velocidade de resposta',
  },
]

export function SocialProofSection() {
  return (
    <section id="depoimentos" className="py-24 relative overflow-hidden bg-[#06060B]">
      {/* Background glow halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#8767FF]/10 via-[#46E6FF]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D0D17] border border-[#1E1E2E] text-xs font-semibold text-[#8767FF]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
            <span>Resultados Comprovados em PMEs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#F4F4F6] tracking-tight">
            Quem confia na Kronus Digital
          </h2>
          <p className="text-[#9CA3B4] text-base sm:text-lg">
            Veja como empresas portuguesas de diversos setores transformaram a sua operação e
            aumentaram o volume de clientes com as nossas soluções.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="bg-[#0D0D17] border border-[#1E1E2E] hover:border-[#8767FF]/50 rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] group relative overflow-hidden"
              >
                {/* Subtle top quote background */}
                <Quote className="absolute top-6 right-6 w-16 h-16 text-[#1E1E2E]/40 pointer-events-none group-hover:text-[#8767FF]/15 transition-colors" />

                <div>
                  {/* Rating Stars + Metric pill */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-[#FBBF24]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FBBF24]" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30">
                      {item.metric}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-sm sm:text-base text-[#F4F4F6] leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 border-t border-[#1E1E2E] flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8767FF] to-[#46E6FF] p-[2px] shrink-0">
                    <div className="w-full h-full bg-[#06060B] rounded-full flex items-center justify-center text-[#46E6FF]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-[#F4F4F6] group-hover:text-[#8767FF] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#9CA3B4]">
                      {item.role} · <span className="text-[#F4F4F6]/90">{item.company}</span>
                    </p>
                    <span className="text-[10px] text-[#46E6FF] font-medium">{item.segment}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Sectors ribbon */}
        <div className="mt-16 pt-10 border-t border-[#1E1E2E]/60 text-center">
          <p className="text-xs uppercase tracking-wider text-[#9CA3B4] mb-4">
            Especialistas no ecossistema de PMEs em Portugal
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              'Clínicas & Consultórios',
              'Barbearias & Estética',
              'Imobiliárias & Mediação',
              'Corretoras de Seguros',
              'Restauração & Hotelaria',
              'Gabinetes de Contabilidade & Advocacia',
            ].map((sector) => (
              <span
                key={sector}
                className="px-4 py-1.5 rounded-full bg-[#0D0D17] border border-[#1E1E2E] text-xs text-[#F4F4F6] font-medium"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
