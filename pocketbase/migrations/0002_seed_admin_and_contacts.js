migrate(
  (app) => {
    // 1. Seed admin user: diegopiau91@gmail.com / Skip@Pass
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'diegopiau91@gmail.com')
    } catch (_) {
      const admin = new Record(users)
      admin.setEmail('diegopiau91@gmail.com')
      admin.setPassword('Skip@Pass')
      admin.setVerified(true)
      admin.set('name', 'Diego Piau')
      app.save(admin)
    }

    // 2. Seed 6 realistic demo contacts from Portuguese SMEs
    const contacts = app.findCollectionByNameOrId('contacts')
    const demoContacts = [
      {
        name: 'Dr. Miguel Ramos (Clínica Sorriso Saudável)',
        contact: 'miguel.ramos@sorrisosaudavel.pt',
        need: 'site',
        message:
          'Precisamos de renovar o website da clínica em Lisboa com integração de marcações online e apresentação da equipa médica.',
        status: 'ganho',
      },
      {
        name: 'Rui Ferreira (Barbearia O Navalha)',
        contact: '+351 912 345 678',
        need: 'trafico',
        message:
          'Queremos atrair novos clientes na zona do Porto através de anúncios Google e Meta para preencher as manhãs de terça a quinta.',
        status: 'em_contato',
      },
      {
        name: 'Marta Silveira (Litoral Prime Imobiliária)',
        contact: 'marta@litoralprime.pt',
        need: 'crm',
        message:
          'Procuramos uma solução para centralizar contactos do Idealista e Imovirtual com resposta rápida via WhatsApp e distribuição automática pelos consultores.',
        status: 'novo',
      },
      {
        name: 'Pedro Alentejano (Seguros Confiança)',
        contact: '+351 968 765 432',
        need: 'trafico',
        message:
          'Campanha para seguro de saúde PME e seguro automóvel focado no distrito de Setúbal.',
        status: 'em_contato',
      },
      {
        name: 'Inês Carmo (Restaurante O Cais)',
        contact: 'geral@restauranteocais.pt',
        need: 'redes',
        message:
          'Gestão do Instagram e Facebook para mostrar pratos diários, eventos de fim de semana e recolher reservas diretas.',
        status: 'novo',
      },
      {
        name: 'António Henriques (FisioCorpo Cascais)',
        contact: '+351 934 112 233',
        need: 'automacao',
        message:
          'Automação de lembretes de consulta por SMS e WhatsApp e envio automático de faturas para o software de contabilidade.',
        status: 'perdido',
      },
    ]

    for (const item of demoContacts) {
      try {
        // Check idempotency by contact value
        const existing = app.findRecordsByFilter(
          'contacts',
          `contact = '${item.contact}'`,
          '',
          1,
          0,
        )
        if (existing.length === 0) {
          const record = new Record(contacts)
          record.set('name', item.name)
          record.set('contact', item.contact)
          record.set('need', item.need)
          record.set('message', item.message)
          record.set('status', item.status)
          app.save(record)
        }
      } catch (err) {
        console.log('Error seeding contact:', err)
      }
    }
  },
  (app) => {
    try {
      const emails = [
        'miguel.ramos@sorrisosaudavel.pt',
        '+351 912 345 678',
        'marta@litoralprime.pt',
        '+351 968 765 432',
        'geral@restauranteocais.pt',
        '+351 934 112 233',
      ]
      for (const c of emails) {
        const records = app.findRecordsByFilter('contacts', `contact = '${c}'`, '', 10, 0)
        for (const r of records) {
          app.delete(r)
        }
      }
    } catch (_) {}
  },
)
