migrate(
  (app) => {
    const collection = new Collection({
      name: 'multas',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'placa', type: 'text', required: true },
        { name: 'veiculo', type: 'text', required: true },
        { name: 'condutor', type: 'text', required: true },
        { name: 'valor', type: 'number', required: true },
        { name: 'data_infracao', type: 'date', required: true },
        { name: 'tipo', type: 'text', required: true },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['Pendente', 'Pago', 'Em Recurso'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_multas_placa ON multas (placa)',
        'CREATE INDEX idx_multas_status ON multas (status)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('multas')
    app.delete(collection)
  },
)
