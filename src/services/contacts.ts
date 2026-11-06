import pb from '@/lib/pocketbase/client'
import type { RecordModel } from 'pocketbase'

export type ContactNeed =
  | 'site'
  | 'aplicacao'
  | 'automacao'
  | 'trafico'
  | 'redes'
  | 'crm'
  | 'dashboards'
  | 'diagnostico'
  | 'outro'

export type ContactStatus = 'novo' | 'em_contato' | 'ganho' | 'perdido'

export interface ContactRecord extends RecordModel {
  name: string
  contact: string
  need: ContactNeed
  message?: string
  status: ContactStatus
  created: string
  updated: string
}

export interface CreateContactInput {
  name: string
  contact: string
  need: ContactNeed
  message?: string
}

export const NEED_LABELS: Record<ContactNeed, string> = {
  site: 'Sites e Landing Pages',
  aplicacao: 'Aplicações Web',
  automacao: 'Automação de Processos',
  trafico: 'Gestão de Tráfego (Google & Meta)',
  redes: 'Redes Sociais',
  crm: 'CRM Kronus',
  dashboards: 'Dashboards e BI',
  diagnostico: 'Diagnóstico Gratuito',
  outro: 'Outro',
}

export const STATUS_LABELS: Record<ContactStatus, string> = {
  novo: 'Novo',
  em_contato: 'Em contacto',
  ganho: 'Ganho',
  perdido: 'Perdido',
}

export const contactsService = {
  /**
   * Submit a contact request from public form (createRule: public)
   */
  async create(input: CreateContactInput): Promise<ContactRecord> {
    return (await pb.collection('contacts').create({
      name: input.name.trim(),
      contact: input.contact.trim(),
      need: input.need,
      message: input.message?.trim() || '',
      status: 'novo',
    })) as ContactRecord
  },

  /**
   * List contacts with optional status filter (requires auth)
   */
  async list(filterStatus?: ContactStatus | 'todos'): Promise<ContactRecord[]> {
    let filter = ''
    if (filterStatus && filterStatus !== 'todos') {
      filter = `status = '${filterStatus}'`
    }
    return (await pb.collection('contacts').getFullList({
      sort: '-created',
      filter,
      requestKey: null,
    })) as ContactRecord[]
  },

  /**
   * Update contact status (requires auth)
   */
  async updateStatus(id: string, status: ContactStatus): Promise<ContactRecord> {
    return (await pb.collection('contacts').update(id, {
      status,
    })) as ContactRecord
  },
}
