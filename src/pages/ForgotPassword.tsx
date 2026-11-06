import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { requestPasswordReset } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim()) {
      setError('Por favor indique o seu endereço de email.')
      return
    }

    setLoading(true)
    try {
      await requestPasswordReset(email)
      setSuccess(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Não foi possível processar o pedido.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#06060B]">
      {/* Background glow halos */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#8767FF]/20 via-[#46E6FF]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#9CA3B4] hover:text-[#F4F4F6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao login
          </Link>
        </div>

        <div className="bg-[#0D0D17] border border-[#1E1E2E] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-heading font-bold text-[#F4F4F6] tracking-tight">
              Recuperar Palavra-passe
            </h1>
            <p className="text-xs text-[#9CA3B4]">
              Indique o email da sua conta de administrador para receber o link de recuperação.
            </p>
          </div>

          {success ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-heading font-semibold text-[#F4F4F6]">
                  Email Enviado!
                </h3>
                <p className="text-xs text-[#9CA3B4]">
                  Se o endereço <strong className="text-white">{email}</strong> corresponder a uma
                  conta registada, receberá um link com instruções para redefinir a palavra-passe.
                </p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#1E1E2E] hover:bg-white/10 text-xs font-semibold text-[#F4F4F6] transition-colors mt-2"
              >
                Voltar à página de login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <div className="p-3.5 rounded-2xl bg-destructive/15 border border-destructive/30 text-destructive text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-medium text-[#F4F4F6]">
                  Email registado
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#9CA3B4] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="diegopiau91@gmail.com"
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-[#06060B] border border-[#1E1E2E] text-[#F4F4F6] placeholder:text-[#9CA3B4]/50 focus:outline-none focus:ring-2 focus:ring-[#8767FF] transition-all text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-[#8767FF] to-[#9A80FF] hover:opacity-95 text-white font-semibold text-sm shadow-[0_0_20px_rgba(135,103,255,0.4)] transition-all duration-200 active:scale-95 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>A enviar email...</span>
                  </>
                ) : (
                  <span>Enviar Link de Recuperação</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
