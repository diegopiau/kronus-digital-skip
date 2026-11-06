migrate(
  (app) => {
    const collection = new Collection({
      name: 'contacts',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: '',
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'contact', type: 'text', required: true },
        {
          name: 'need',
          type: 'select',
          required: true,
          maxSelect: 1,
          values: [
            'site',
            'aplicacao',
            'automacao',
            'trafico',
            'redes',
            'crm',
            'dashboards',
            'diagnostico',
            'outro',
          ],
        },
        { name: 'message', type: 'text', required: false },
        {
          name: 'status',
          type: 'select',
          required: true,
          maxSelect: 1,
          values: ['novo', 'em_contato', 'ganho', 'perdido'],
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_contacts_status ON contacts (status)',
        'CREATE INDEX idx_contacts_created ON contacts (created DESC)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('contacts')
      app.delete(collection)
    } catch (_) {}
  },
)
