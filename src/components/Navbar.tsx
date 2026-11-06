import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06060B]/85 backdrop-blur-md border-b border-[#1E1E2E]/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8767FF] to-[#46E6FF] p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(135,103,255,0.4)]">
            <div className="w-full h-full bg-[#06060B] rounded-full flex items-center justify-center">
              <span className="font-heading font-bold text-lg bg-gradient-to-r from-[#8767FF] to-[#46E6FF] bg-clip-text text-transparent">
                K
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg tracking-tight text-[#F4F4F6] flex items-center gap-1.5">
              Kronus <span className="text-[#8767FF]">Digital</span>
            </span>
            <span className="text-[10px] text-[#9CA3B4] font-medium tracking-wider uppercase">
              Tecnologia & Dados · PMEs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {isHome ? (
          <nav className="hidden md:flex items-center gap-1 bg-[#0D0D17]/80 border border-[#1E1E2E] rounded-full px-5 py-1.5 backdrop-blur-sm">
            <a
              href="#servicos"
              className="text-sm font-medium text-[#9CA3B4] hover:text-[#F4F4F6] transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
            >
              Serviços
            </a>
            <a
              href="#resultados"
              className="text-sm font-medium text-[#9CA3B4] hover:text-[#F4F4F6] transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
            >
              Resultados
            </a>
            <a
              href="#depoimentos"
              className="text-sm font-medium text-[#9CA3B4] hover:text-[#F4F4F6] transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
            >
              Depoimentos
            </a>
            <a
              href="#contacto"
              className="text-sm font-medium text-[#9CA3B4] hover:text-[#F4F4F6] transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
            >
              Contacto
            </a>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className="text-sm font-medium text-[#9CA3B4] hover:text-[#F4F4F6] transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
            >
              Página Inicial
            </Link>
          </nav>
        )}

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/painel"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-[#1E1E2E] hover:bg-[#8767FF]/20 text-[#F4F4F6] hover:text-[#8767FF] border border-[#1E1E2E] hover:border-[#8767FF]/40 transition-all duration-200"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#8767FF]" />
                Painel
              </Link>
              <button
                onClick={logout}
                className="text-xs text-[#9CA3B4] hover:text-white px-3 py-2 rounded-full hover:bg-white/5 transition-colors"
                title={`Sessão iniciada como ${user?.email || 'admin'}`}
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs font-medium text-[#9CA3B4] hover:text-[#F4F4F6] px-3 py-2 rounded-full hover:bg-white/5 transition-colors"
            >
              Entrar
            </Link>
          )}

          <a
            href={isHome ? '#contacto' : '/#contacto'}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-[#8767FF] to-[#9A80FF] hover:from-[#9A80FF] hover:to-[#8767FF] text-white shadow-[0_0_20px_rgba(135,103,255,0.4)] hover:shadow-[0_0_28px_rgba(135,103,255,0.7)] transition-all duration-200 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Pedir Orçamento
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={isHome ? '#contacto' : '/#contacto'}
            className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full bg-[#8767FF] text-white"
          >
            Orçamento
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-[#9CA3B4] hover:text-[#F4F4F6] hover:bg-white/5 focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0D17] border-b border-[#1E1E2E] px-6 py-5 flex flex-col gap-3 animate-fade-in shadow-2xl">
          {isHome ? (
            <>
              <a
                href="#servicos"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#F4F4F6] py-2 border-b border-[#1E1E2E]/60"
              >
                Serviços
              </a>
              <a
                href="#resultados"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#F4F4F6] py-2 border-b border-[#1E1E2E]/60"
              >
                Resultados
              </a>
              <a
                href="#depoimentos"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#F4F4F6] py-2 border-b border-[#1E1E2E]/60"
              >
                Depoimentos
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#F4F4F6] py-2 border-b border-[#1E1E2E]/60"
              >
                Contacto
              </a>
            </>
          ) : (
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#F4F4F6] py-2 border-b border-[#1E1E2E]/60"
            >
              Página Inicial
            </Link>
          )}

          <div className="pt-2 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/painel"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-sm font-semibold px-5 py-2.5 rounded-full bg-[#1E1E2E] text-[#8767FF] border border-[#8767FF]/30"
                >
                  Abrir Painel de Gestão
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-center text-sm text-[#9CA3B4] py-2"
                >
                  Terminar Sessão
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-medium text-[#9CA3B4] py-2 hover:text-[#F4F4F6]"
              >
                Entrar na Área Interna
              </Link>
            )}
            <a
              href="https://wa.me/351912345678?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Kronus%20Digital."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center text-sm font-semibold px-5 py-2.5 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
