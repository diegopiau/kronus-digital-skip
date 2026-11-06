import React, { useState } from 'react'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Sparkles,
} from 'lucide-react'
import { contactsService, type ContactNeed, NEED_LABELS } from '@/services/contacts'

const NEED_OPTIONS: { id: ContactNeed; label: string }[] = [
  { id: 'site', label: 'Sites & Landing Pages' },
  { id: 'aplicacao', label: 'Aplicações Web' },
  { id: 'automacao', label: 'Automação' },
  { id: 'trafico', label: 'Tráfego Pago' },
  { id: 'redes', label: 'Redes Sociais' },
  { id: 'crm', label: 'CRM Kronus' },
  { id: 'dashboards', label: 'Dashboards & BI' },
  { id: 'diagnostico', label: 'Diagnóstico Grátis' },
  { id: 'outro', label: 'Outro' },
]

export function ContactSection() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [need, setNeed] = useState<ContactNeed>('site')
  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; contact?: string; general?: string }>({})

  const validate = () => {
    const errs: { name?: string; contact?: string } = {}
    if (!name.trim()) {
      errs.name = 'Por favor indique o seu nome ou o da sua empresa.'
    } else if (name.trim().length < 2) {
      errs.name = 'O nome deve ter pelo menos 2 caracteres.'
    }

    const contactVal = contact.trim()
    if (!contactVal) {
      errs.contact = 'Indique um email ou número de telemóvel para podermos responder.'
    } else {
      // Validate email or phone (accepts PT phones or standard international / generic emails)
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal)
      const isPhone = /^(\+?[0-9\s\-()]{7,20})$/.test(contactVal)
      if (!isEmail && !isPhone) {
        errs.contact = 'Formato inválido. Indique um email válido ou número de telemóvel.'
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setErrors({})
    try {
      await contactsService.create({
        name,
        contact,
        need,
        message,
      })
      setSuccess(true)
      setName('')
      setContact('')
      setNeed('site')
      setMessage('')
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro ao enviar. Tente novamente ou use o WhatsApp.'
      setErrors({ general: errorMsg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className="py-24 relative overflow-hidden bg-[#06060B]">
      {/* Background glow halos */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#8767FF]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#46E6FF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D0D17] border border-[#1E1E2E] text-xs font-semibold text-[#8767FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Primeiro passo sem compromisso</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#F4F4F6] tracking-tight">
            Peça o seu orçamento
          </h2>
          <p className="text-[#9CA3B4] text-base sm:text-lg">
            Diga-nos o que procura. Respondemos no próprio dia com proposta à medida da sua PME.
          </p>
        </div>

        {/* 2-Column layout: Form + Alternative Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Form (8 cols on lg) */}
          <div className="lg:col-span-7 bg-[#0D0D17] border border-[#1E1E2E] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative">
            {success ? (
              <div className="py-12 text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-heading font-bold text-[#F4F4F6]">
                    Pedido recebido com sucesso!
                  </h3>
                  <p className="text-[#9CA3B4] max-w-md mx-auto text-sm sm:text-base">
                    Obrigado pelo seu contacto. Um especialista da Kronus Digital vai analisar o seu
                    pedido e responder nas próximas horas.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 rounded-full bg-[#1E1E2E] hover:bg-white/10 text-sm font-medium text-[#F4F4F6] transition-colors"
                  >
                    Enviar outro pedido
                  </button>
                  <a
                    href="https://wa.me/351912345678?text=Ol%C3%A1%2C%20acabei%20de%20enviar%20um%20pedido%20pelo%20site%20da%20Kronus%20Digital."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-sm font-semibold text-white inline-flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Avisar no WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {errors.general && (
                  <div className="p-4 rounded-2xl bg-destructive/15 border border-destructive/30 text-destructive text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errors.general}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-[#F4F4F6]">
                    Nome ou Empresa <span className="text-[#8767FF]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) setErrors({ ...errors, name: undefined })
                    }}
                    placeholder="Ex.: Dr. António Silva ou Barbearia Clássica"
                    className={`w-full px-5 py-3 rounded-full bg-[#06060B] border text-[#F4F4F6] placeholder:text-[#9CA3B4]/50 focus:outline-none focus:ring-2 focus:ring-[#8767FF] transition-all text-sm ${
                      errors.name
                        ? 'border-destructive ring-1 ring-destructive'
                        : 'border-[#1E1E2E]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive flex items-center gap-1.5 pl-3">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <label htmlFor="contact" className="block text-sm font-medium text-[#F4F4F6]">
                    Contacto (Telemóvel ou Email) <span className="text-[#8767FF]">*</span>
                  </label>
                  <input
                    id="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value)
                      if (errors.contact) setErrors({ ...errors, contact: undefined })
                    }}
                    placeholder="Ex.: 912 345 678 ou contacto@empresa.pt"
                    className={`w-full px-5 py-3 rounded-full bg-[#06060B] border text-[#F4F4F6] placeholder:text-[#9CA3B4]/50 focus:outline-none focus:ring-2 focus:ring-[#8767FF] transition-all text-sm ${
                      errors.contact
                        ? 'border-destructive ring-1 ring-destructive'
                        : 'border-[#1E1E2E]'
                    }`}
                  />
                  {errors.contact && (
                    <p className="text-xs text-destructive flex items-center gap-1.5 pl-3">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* What do you need? (Pills) */}
                <div className="space-y-2.5">
                  <label className="block text-sm font-medium text-[#F4F4F6]">
                    O que precisa? <span className="text-[#8767FF]">*</span>
                  </label>
                  <p className="text-xs text-[#9CA3B4]">Selecione a área principal de interesse:</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {NEED_OPTIONS.map((opt) => {
                      const isSelected = need === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setNeed(opt.id)}
                          className={`text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#8767FF] to-[#9A80FF] text-white shadow-[0_0_15px_rgba(135,103,255,0.4)] scale-105'
                              : 'bg-[#06060B] text-[#9CA3B4] border border-[#1E1E2E] hover:border-[#8767FF]/50 hover:text-[#F4F4F6]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Optional Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-[#F4F4F6]">
                    Detalhes do projeto{' '}
                    <span className="text-xs text-[#9CA3B4] font-normal">(opcional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Conte-nos um pouco sobre os seus objetivos, prazos ou problemas que quer resolver..."
                    className="w-full px-5 py-3 rounded-2xl bg-[#06060B] border border-[#1E1E2E] text-[#F4F4F6] placeholder:text-[#9CA3B4]/50 focus:outline-none focus:ring-2 focus:ring-[#8767FF] transition-all text-sm resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#8767FF] to-[#46E6FF] hover:opacity-95 text-white font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(135,103,255,0.4)] hover:shadow-[0_0_35px_rgba(135,103,255,0.6)] transition-all duration-200 active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>A enviar o pedido...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Pedir Orçamento Gratuito</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#9CA3B4]">
                  🔒 Sem compromisso. Os seus dados são tratados com total confidencialidade.
                </p>
              </form>
            )}
          </div>

          {/* Alternative Channels (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#0D0D17] border border-[#1E1E2E] rounded-3xl p-6 sm:p-7 space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#F4F4F6] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#46E6FF]" />
                Prefere resposta imediata?
              </h3>
              <p className="text-sm text-[#9CA3B4] leading-relaxed">
                Fale diretamente connosco através dos canais rápidos. A nossa equipa está disponível
                nos dias úteis das 9h às 19h.
              </p>

              <div className="space-y-3 pt-2">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/351912345678?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista%20da%20Kronus%20Digital."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#06060B] border border-[#1E1E2E] hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#9CA3B4]">Conversa direta</div>
                      <div className="text-sm font-semibold text-[#F4F4F6] group-hover:text-[#25D366] transition-colors">
                        WhatsApp (+351 912 345 678)
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#25D366]/20 text-[#25D366]">
                    Rápido
                  </span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+351210000000"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#06060B] border border-[#1E1E2E] hover:border-[#46E6FF]/50 hover:bg-[#46E6FF]/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#46E6FF]/15 flex items-center justify-center text-[#46E6FF] group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#9CA3B4]">Chamada telefónica</div>
                      <div className="text-sm font-semibold text-[#F4F4F6] group-hover:text-[#46E6FF] transition-colors">
                        +351 210 000 000
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-[#9CA3B4]">9h – 19h</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:contacto@kronusdigital.pt"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#06060B] border border-[#1E1E2E] hover:border-[#8767FF]/50 hover:bg-[#8767FF]/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8767FF]/15 flex items-center justify-center text-[#8767FF] group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#9CA3B4]">Email institucional</div>
                      <div className="text-sm font-semibold text-[#F4F4F6] group-hover:text-[#8767FF] transition-colors">
                        contacto@kronusdigital.pt
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-[#9CA3B4]">24h</span>
                </a>
              </div>
            </div>

            {/* Guarantee badge */}
            <div className="bg-gradient-to-r from-[#8767FF]/10 to-[#46E6FF]/10 border border-[#8767FF]/30 rounded-3xl p-5 space-y-2">
              <div className="text-sm font-heading font-semibold text-[#F4F4F6] flex items-center gap-2">
                <span className="text-[#46E6FF]">✦</span> Compromisso Kronus
              </div>
              <p className="text-xs text-[#9CA3B4] leading-relaxed">
                Sem orçamentos surpresa nem taxas escondidas. Apresentamos sempre prazos claros,
                contratos transparentes e entregas faseadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
