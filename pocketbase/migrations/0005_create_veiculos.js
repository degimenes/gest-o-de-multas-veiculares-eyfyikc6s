migrate(
  (app) => {
    const collection = new Collection({
      name: 'veiculos',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'placa', type: 'text', required: true },
        { name: 'modelo', type: 'text', required: true },
        { name: 'categoria', type: 'text', required: true },
        { name: 'condutor_responsavel', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_veiculos_placa ON veiculos (placa)'],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('veiculos')
    app.delete(collection)
  },
)
