import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Inbox,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MessageSquare,
  LogOut,
  RefreshCw,
  Search,
  ExternalLink,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import {
  contactsService,
  type ContactRecord,
  type ContactStatus,
  type ContactNeed,
  NEED_LABELS,
  STATUS_LABELS,
} from '@/services/contacts'
import { useRealtime } from '@/hooks/use-realtime'
import { toast } from '@/hooks/use-toast'

type FilterTab = 'todos' | ContactStatus

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [contacts, setContacts] = useState<ContactRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterTab>('todos')
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // Load contacts
  const fetchContacts = useCallback(async () => {
    try {
      const data = await contactsService.list('todos')
      setContacts(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao carregar contactos'
      toast({
        title: 'Erro ao carregar contactos',
        description: msg,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  // PocketBase Realtime on 'contacts' collection
  useRealtime<ContactRecord>('contacts', (e) => {
    if (e.action === 'create') {
      setContacts((prev) => [e.record, ...prev.filter((c) => c.id !== e.record.id)])
      toast({
        title: 'Novo contacto recebido!',
        description: `${e.record.name} acabou de pedir orçamento.`,
      })
    } else if (e.action === 'update') {
      setContacts((prev) => prev.map((c) => (c.id === e.record.id ? e.record : c)))
    } else if (e.action === 'delete') {
      setContacts((prev) => prev.filter((c) => c.id !== e.record.id))
    }
  })

  // Status counts
  const counts = useMemo(() => {
    const res = {
      todos: contacts.length,
      novo: 0,
      em_contato: 0,
      ganho: 0,
      perdido: 0,
    }
    for (const c of contacts) {
      if (c.status in res) {
        res[c.status as ContactStatus]++
      }
    }
    return res
  }, [contacts])

  // Filtered contacts list
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesFilter = filter === 'todos' || c.status === filter
      const matchesSearch =
        search.trim() === '' ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.contact.toLowerCase().includes(search.toLowerCase()) ||
        (c.message && c.message.toLowerCase().includes(search.toLowerCase())) ||
        NEED_LABELS[c.need]?.toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [contacts, filter, search])

  // Change contact status
  const handleStatusChange = async (contactId: string, newStatus: ContactStatus) => {
    setUpdatingId(contactId)
    // Optimistic update
    setContacts((prev) => prev.map((c) => (c.id === contactId ? { ...c, status: newStatus } : c)))
    try {
      await contactsService.updateStatus(contactId, newStatus)
      toast({
        title: 'Estado atualizado',
        description: `Contacto alterado para "${STATUS_LABELS[newStatus]}".`,
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Não foi possível atualizar o estado'
      toast({
        title: 'Erro ao atualizar',
        description: msg,
        variant: 'destructive',
      })
      // Revert with fresh data
      fetchContacts()
    } finally {
      setUpdatingId(null)
    }
  }

  const formatTimestamp = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateStr
    }
  }

  const getStatusBadgeClass = (status: ContactStatus) => {
    switch (status) {
      case 'novo':
        return 'bg-[#8767FF]/20 text-[#8767FF] border-[#8767FF]/40 shadow-[0_0_12px_rgba(135,103,255,0.3)]'
      case 'em_contato':
        return 'bg-[#FBBF24]/20 text-[#FBBF24] border-[#FBBF24]/40'
      case 'ganho':
        return 'bg-[#34D399]/20 text-[#34D399] border-[#34D399]/40 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
      case 'perdido':
        return 'bg-[#6B7280]/20 text-[#9CA3B4] border-[#6B7280]/40'
      default:
        return 'bg-[#1E1E2E] text-[#9CA3B4] border-[#1E1E2E]'
    }
  }

  return (
    <div className="min-h-screen bg-[#06060B] flex flex-col">
      {/* Dashboard Top Header */}
      <header className="bg-[#0D0D17] border-b border-[#1E1E2E] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8767FF] to-[#46E6FF] p-[2px]">
                <div className="w-full h-full bg-[#06060B] rounded-full flex items-center justify-center">
                  <span className="font-heading font-bold text-xs bg-gradient-to-r from-[#8767FF] to-[#46E6FF] bg-clip-text text-transparent">
                    K
                  </span>
                </div>
              </div>
              <span className="font-heading font-bold text-sm tracking-tight text-[#F4F4F6] hidden sm:inline">
                Kronus <span className="text-[#8767FF]">Painel</span>
              </span>
            </Link>

            <span className="h-4 w-px bg-[#1E1E2E] hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#8767FF]/15 text-[#8767FF] border border-[#8767FF]/30">
                Gestão de Contactos
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-[#34D399]">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                Em direto (Realtime)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs text-[#9CA3B4] hover:text-[#F4F4F6] px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              <span>Ver Landing</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium text-[#F4F4F6]">
                {user?.name || 'Administrador'}
              </div>
              <div className="text-[10px] text-[#9CA3B4]">{user?.email}</div>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 text-xs text-[#9CA3B4] hover:text-white px-3 py-1.5 rounded-full bg-[#1E1E2E] hover:bg-white/10 transition-colors"
              title="Terminar sessão"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title + Action row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#F4F4F6] tracking-tight">
              Contactos Recebidos
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3B4] mt-1">
              Faça a gestão dos pedidos de orçamento, responda rapidamente e acompanhe cada lead no
              funil.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setLoading(true)
                fetchContacts()
              }}
              disabled={loading}
              className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-[#0D0D17] border border-[#1E1E2E] text-[#9CA3B4] hover:text-[#F4F4F6] hover:border-[#8767FF]/40 transition-colors"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#8767FF]' : ''}`}
              />
              <span>Atualizar</span>
            </button>
          </div>
        </div>

        {/* 4 Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Novos */}
          <button
            type="button"
            onClick={() => setFilter(filter === 'novo' ? 'todos' : 'novo')}
            className={`text-left p-5 rounded-3xl border transition-all duration-200 ${
              filter === 'novo'
                ? 'bg-[#8767FF]/15 border-[#8767FF] shadow-[0_0_25px_rgba(135,103,255,0.25)]'
                : 'bg-[#0D0D17] border-[#1E1E2E] hover:border-[#8767FF]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#8767FF] flex items-center gap-1.5">
                <Inbox className="w-4 h-4" />
                Novos
              </span>
              <span className="w-2 h-2 rounded-full bg-[#8767FF]" />
            </div>
            <div className="text-3xl font-heading font-bold text-[#F4F4F6]">{counts.novo}</div>
            <div className="text-[11px] text-[#9CA3B4] mt-1">A aguardar primeiro contacto</div>
          </button>

          {/* Em contacto */}
          <button
            type="button"
            onClick={() => setFilter(filter === 'em_contato' ? 'todos' : 'em_contato')}
            className={`text-left p-5 rounded-3xl border transition-all duration-200 ${
              filter === 'em_contato'
                ? 'bg-[#FBBF24]/15 border-[#FBBF24] shadow-[0_0_25px_rgba(251,191,36,0.2)]'
                : 'bg-[#0D0D17] border-[#1E1E2E] hover:border-[#FBBF24]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#FBBF24] flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Em Contacto
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
            </div>
            <div className="text-3xl font-heading font-bold text-[#F4F4F6]">
              {counts.em_contato}
            </div>
            <div className="text-[11px] text-[#9CA3B4] mt-1">Em negociação / proposta</div>
          </button>

          {/* Ganhos */}
          <button
            type="button"
            onClick={() => setFilter(filter === 'ganho' ? 'todos' : 'ganho')}
            className={`text-left p-5 rounded-3xl border transition-all duration-200 ${
              filter === 'ganho'
                ? 'bg-[#34D399]/15 border-[#34D399] shadow-[0_0_25px_rgba(52,211,153,0.2)]'
                : 'bg-[#0D0D17] border-[#1E1E2E] hover:border-[#34D399]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#34D399] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Ganhos
              </span>
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
            </div>
            <div className="text-3xl font-heading font-bold text-[#F4F4F6]">{counts.ganho}</div>
            <div className="text-[11px] text-[#9CA3B4] mt-1">Negócios fechados</div>
          </button>

          {/* Perdidos */}
          <button
            type="button"
            onClick={() => setFilter(filter === 'perdido' ? 'todos' : 'perdido')}
            className={`text-left p-5 rounded-3xl border transition-all duration-200 ${
              filter === 'perdido'
                ? 'bg-white/10 border-white/40'
                : 'bg-[#0D0D17] border-[#1E1E2E] hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#9CA3B4] flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                Perdidos
              </span>
              <span className="w-2 h-2 rounded-full bg-[#6B7280]" />
            </div>
            <div className="text-3xl font-heading font-bold text-[#F4F4F6]">{counts.perdido}</div>
            <div className="text-[11px] text-[#9CA3B4] mt-1">Sem interesse / adiado</div>
          </button>
        </div>

        {/* Filter Pills + Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          {/* Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'todos', label: 'Todos', count: counts.todos },
                { id: 'novo', label: 'Novos', count: counts.novo },
                { id: 'em_contato', label: 'Em contacto', count: counts.em_contato },
                { id: 'ganho', label: 'Ganhos', count: counts.ganho },
                { id: 'perdido', label: 'Perdidos', count: counts.perdido },
              ] as { id: FilterTab; label: string; count: number }[]
            ).map((tab) => {
              const active = filter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-150 flex items-center gap-2 ${
                    active
                      ? 'bg-gradient-to-r from-[#8767FF] to-[#9A80FF] text-white shadow-[0_0_15px_rgba(135,103,255,0.4)]'
                      : 'bg-[#0D0D17] text-[#9CA3B4] border border-[#1E1E2E] hover:text-[#F4F4F6] hover:border-[#8767FF]/40'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active ? 'bg-white/20 text-white' : 'bg-[#1E1E2E] text-[#9CA3B4]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#9CA3B4] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por nome, contacto..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#0D0D17] border border-[#1E1E2E] text-xs text-[#F4F4F6] placeholder:text-[#9CA3B4]/50 focus:outline-none focus:ring-1 focus:ring-[#8767FF]"
            />
          </div>
        </div>

        {/* Contacts List / Responsive Cards */}
        <div className="space-y-3">
          {loading ? (
            <div className="py-20 text-center text-[#9CA3B4] bg-[#0D0D17] border border-[#1E1E2E] rounded-3xl">
              <div className="w-6 h-6 border-2 border-[#8767FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">A carregar os contactos da base de dados...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="py-20 text-center bg-[#0D0D17] border border-[#1E1E2E] rounded-3xl p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#1E1E2E] flex items-center justify-center mx-auto text-[#9CA3B4]">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="text-base font-heading font-semibold text-[#F4F4F6]">
                Nenhum contacto encontrado
              </h3>
              <p className="text-xs text-[#9CA3B4] max-w-sm mx-auto">
                {search
                  ? 'Não existem registos correspondentes à pesquisa efetuada.'
                  : filter === 'todos'
                    ? 'Ainda não foram submetidos contactos pelo formulário.'
                    : `Não existem contactos com o estado "${STATUS_LABELS[filter]}".`}
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-xs text-[#8767FF] hover:underline pt-2"
                >
                  Limpar pesquisa
                </button>
              )}
            </div>
          ) : (
            filteredContacts.map((item) => {
              const isUpdating = updatingId === item.id
              const isEmail = item.contact.includes('@')
              const cleanPhone = item.contact.replace(/[^0-9+]/g, '')

              return (
                <div
                  key={item.id}
                  className="bg-[#0D0D17] border border-[#1E1E2E] hover:border-[#8767FF]/40 rounded-3xl p-5 sm:p-6 transition-all duration-200 space-y-4 shadow-sm"
                >
                  {/* Top line: Name, Need Tag, Status Dropdown, Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading font-bold text-base text-[#F4F4F6]">
                          {item.name}
                        </h3>
                        {/* Need Tag */}
                        <span className="text-[11px] font-medium px-3 py-0.5 rounded-full bg-[#06060B] border border-[#1E1E2E] text-[#46E6FF]">
                          {NEED_LABELS[item.need as ContactNeed] || item.need}
                        </span>
                      </div>

                      {/* Contact row with direct links */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#9CA3B4]">
                        <div className="flex items-center gap-1.5 font-mono text-[#F4F4F6]">
                          {isEmail ? (
                            <Mail className="w-3.5 h-3.5 text-[#8767FF]" />
                          ) : (
                            <Phone className="w-3.5 h-3.5 text-[#34D399]" />
                          )}
                          <span>{item.contact}</span>
                        </div>

                        {/* Quick actions: WhatsApp / Call / Email */}
                        <div className="flex items-center gap-1.5">
                          {isEmail ? (
                            <a
                              href={`mailto:${item.contact}?subject=Contacto%20Kronus%20Digital`}
                              className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#1E1E2E] hover:bg-[#8767FF]/20 text-[#8767FF] transition-colors"
                            >
                              Enviar Email
                            </a>
                          ) : (
                            <>
                              <a
                                href={`https://wa.me/${cleanPhone}?text=Ol%C3%A1%20${encodeURIComponent(
                                  item.name,
                                )}%2C%20falamos%20da%20Kronus%20Digital%20sobre%20o%20seu%20pedido%20de%20or%C3%A7amento.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] transition-colors font-medium"
                              >
                                WhatsApp
                              </a>
                              <a
                                href={`tel:${cleanPhone}`}
                                className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#1E1E2E] hover:bg-white/10 text-[#46E6FF] transition-colors"
                              >
                                Ligar
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status badge & selector + date */}
                    <div className="flex items-center gap-3 self-start sm:self-auto">
                      <div className="text-right hidden md:block">
                        <div className="text-[11px] text-[#9CA3B4] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatTimestamp(item.created)}</span>
                        </div>
                      </div>

                      {/* Status Selector Pill */}
                      <div className="relative">
                        <select
                          value={item.status}
                          disabled={isUpdating}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as ContactStatus)
                          }
                          className={`text-xs font-semibold px-4 py-1.5 rounded-full border cursor-pointer focus:outline-none transition-all appearance-none pr-7 ${getStatusBadgeClass(
                            item.status,
                          )}`}
                          aria-label={`Alterar estado de ${item.name}`}
                        >
                          <option value="novo" className="bg-[#0D0D17] text-[#8767FF]">
                            ● Novo
                          </option>
                          <option value="em_contato" className="bg-[#0D0D17] text-[#FBBF24]">
                            ● Em contacto
                          </option>
                          <option value="ganho" className="bg-[#0D0D17] text-[#34D399]">
                            ● Ganho
                          </option>
                          <option value="perdido" className="bg-[#0D0D17] text-[#9CA3B4]">
                            ● Perdido
                          </option>
                        </select>
                        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] opacity-70">
                          ▼
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message (if provided) */}
                  {item.message && (
                    <div className="bg-[#06060B] rounded-2xl p-3.5 border border-[#1E1E2E]/60 text-xs text-[#9CA3B4] leading-relaxed flex items-start gap-2.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#8767FF] shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="text-[#F4F4F6] font-medium mr-1.5">Mensagem:</span>
                        <span>{item.message}</span>
                      </div>
                    </div>
                  )}

                  {/* Mobile-only date footer */}
                  <div className="md:hidden text-[11px] text-[#9CA3B4] flex items-center justify-between pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatTimestamp(item.created)}
                    </span>
                    {isUpdating && (
                      <span className="text-xs text-[#8767FF] animate-pulse">A gravar...</span>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </main>
    </div>
  )
}
