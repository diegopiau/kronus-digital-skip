import { ArrowRight, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#06060B]">
      {/* Background Gradient Halos & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E1E2E_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Primary Electric Violet Glow Halo */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[450px] bg-gradient-to-b from-[#8767FF]/25 via-[#46E6FF]/15 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#8767FF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#46E6FF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top badge in pill format */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D0D17] border border-[#1E1E2E] hover:border-[#8767FF]/50 transition-all duration-300 shadow-[0_0_20px_rgba(135,103,255,0.2)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#46E6FF] animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-[#F4F4F6]">
            Diagnóstico gratuito para PMEs em Portugal — sem compromisso
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#8767FF]" />
        </div>

        {/* Hero Main Heading with Space Grotesk */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-[#F4F4F6] tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          Venda mais e trabalhe menos com{' '}
          <span className="bg-gradient-to-r from-[#8767FF] via-[#B8A4FF] to-[#46E6FF] bg-clip-text text-transparent">
            tecnologia e dados
          </span>
        </h1>

        {/* Subtitle / Value proposition */}
        <p className="text-base sm:text-xl text-[#9CA3B4] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Desenvolvemos websites de alta conversão, aplicações web à medida, automações inteligentes
          e gestão de tráfego (Google & Meta Ads) para pequenas e médias empresas em Portugal.
        </p>

        {/* CTAs (Buttons in pill format) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#contacto"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8767FF] to-[#9A80FF] hover:from-[#9A80FF] hover:to-[#8767FF] text-white font-semibold text-base shadow-[0_0_30px_rgba(135,103,255,0.45)] hover:shadow-[0_0_40px_rgba(135,103,255,0.7)] transition-all duration-200 active:scale-95"
          >
            Pedir Orçamento
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/351912345678?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20um%20or%C3%A7amento%20para%20a%20minha%20empresa."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0D0D17] hover:bg-[#25D366]/10 text-[#F4F4F6] hover:text-[#25D366] border border-[#1E1E2E] hover:border-[#25D366]/50 font-semibold text-base transition-all duration-200 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            Falar no WhatsApp
          </a>
        </div>

        {/* Demo Numbers Row (Bloco 1 & 3) */}
        <div id="resultados" className="pt-4 scroll-mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-[#0D0D17]/80 backdrop-blur-sm border border-[#1E1E2E] rounded-3xl p-5 sm:p-6 text-center hover:border-[#8767FF]/40 transition-colors">
              <div className="text-3xl sm:text-4xl font-heading font-bold bg-gradient-to-r from-[#8767FF] to-[#46E6FF] bg-clip-text text-transparent mb-1">
                +40
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#F4F4F6]">
                Projetos Entregues
              </div>
              <div className="text-[11px] text-[#9CA3B4] mt-0.5">Sites, apps e automação</div>
            </div>

            <div className="bg-[#0D0D17]/80 backdrop-blur-sm border border-[#1E1E2E] rounded-3xl p-5 sm:p-6 text-center hover:border-[#8767FF]/40 transition-colors">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-[#46E6FF] mb-1">
                +25
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#F4F4F6]">PMEs Atendidas</div>
              <div className="text-[11px] text-[#9CA3B4] mt-0.5">Norte a Sul de Portugal</div>
            </div>

            <div className="bg-[#0D0D17]/80 backdrop-blur-sm border border-[#1E1E2E] rounded-3xl p-5 sm:p-6 text-center hover:border-[#8767FF]/40 transition-colors">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-[#34D399] mb-1">
                98%
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#F4F4F6]">Satisfação</div>
              <div className="text-[11px] text-[#9CA3B4] mt-0.5">Taxa de renovação alta</div>
            </div>

            <div className="bg-[#0D0D17]/80 backdrop-blur-sm border border-[#1E1E2E] rounded-3xl p-5 sm:p-6 text-center hover:border-[#8767FF]/40 transition-colors">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-[#8767FF] mb-1">
                &lt; 24h
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#F4F4F6]">Resposta Média</div>
              <div className="text-[11px] text-[#9CA3B4] mt-0.5">Proposta sem demora</div>
            </div>
          </div>
        </div>

        {/* Small trust banner */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#9CA3B4]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
            Sem fidelização obrigatória
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
            Código 100% da sua empresa
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
            Suporte direto em Português
          </span>
        </div>
      </div>
    </section>
  )
}
