import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogIn, AlertCircle, ArrowLeft, Lock, Mail, Sparkles } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Retrieve origin route if redirected by ProtectedRoute
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/painel'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError('Por favor preencha o email e a palavra-passe.')
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Credenciais inválidas. Verifique o email e a palavra-passe.'
      setError(
        msg.toLowerCase().includes('failed to authenticate') ||
          msg.toLowerCase().includes('invalid')
          ? 'Email ou palavra-passe incorretos. Verifique os dados introduzidos.'
          : 'Não foi possível iniciar sessão. Tente novamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setEmail('diegopiau91@gmail.com')
    setPassword('Skip@Pass')
    setError(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#06060B]">
      {/* Background glow halos */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#8767FF]/20 via-[#46E6FF]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Top return link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#9CA3B4] hover:text-[#F4F4F6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site público
          </Link>
          <span className="text-[11px] text-[#8767FF] font-medium px-2.5 py-0.5 rounded-full bg-[#8767FF]/10 border border-[#8767FF]/20">
            Acesso Restrito
          </span>
        </div>

        {/* Card */}
        <div className="bg-[#0D0D17] border border-[#1E1E2E] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
          {/* Logo & Heading */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8767FF] to-[#46E6FF] p-[2px] mx-auto shadow-[0_0_25px_rgba(135,103,255,0.4)]">
              <div className="w-full h-full bg-[#06060B] rounded-full flex items-center justify-center">
                <span className="font-heading font-bold text-xl bg-gradient-to-r from-[#8767FF] to-[#46E6FF] bg-clip-text text-transparent">
                  K
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-heading font-bold text-[#F4F4F6] tracking-tight">
              Acesso à Agência
            </h1>
            <p className="text-xs text-[#9CA3B4]">
              Gestão de contactos, propostas e clientes Kronus Digital
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-destructive/15 border border-destructive/30 text-destructive text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium text-[#F4F4F6]">
                Email de Acesso
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9CA3B4] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="utilizador@kronusdigital.pt"
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-[#06060B] border border-[#1E1E2E] text-[#F4F4F6] placeholder:text-[#9CA3B4]/50 focus:outline-none focus:ring-2 focus:ring-[#8767FF] transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-medium text-[#F4F4F6]">
                  Palavra-passe
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#8767FF] hover:text-[#9A80FF] transition-colors"
                >
                  Esqueceu-se?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9CA3B4] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
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
                  <span>A autenticar...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Entrar no Painel</span>
                </>
              )}
            </button>
          </form>

          {/* Demo helper */}
          <div className="pt-4 border-t border-[#1E1E2E] space-y-2">
            <div className="text-[11px] text-[#9CA3B4] text-center">
              Conta de demonstração configurada:
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full py-2 px-3 rounded-full bg-[#1E1E2E]/60 hover:bg-[#1E1E2E] text-xs text-[#46E6FF] flex items-center justify-center gap-2 transition-colors border border-[#1E1E2E]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Preencher: diegopiau91@gmail.com</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
