migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('multas')

    // Add new fields
    col.fields.add(new TextField({ name: 'fornecedor' }))
    col.fields.add(new TextField({ name: 'descricao' }))
    col.fields.add(new TextField({ name: 'ait' }))
    col.fields.add(new NumberField({ name: 'valor_original' }))
    col.fields.add(new TextField({ name: 'desconto' }))
    col.fields.add(new NumberField({ name: 'valor_a_pagar' }))
    col.fields.add(new TextField({ name: 'projeto' }))
    col.fields.add(new TextField({ name: 'observacoes' }))

    // Update status values
    const statusField = col.fields.getByName('status')
    statusField.selectValues = [
      'Pendente',
      'Pago',
      'Aguardando boleto',
      'Condutor pendente',
      'Em Recurso',
      'Vencida / Urgente',
    ]

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('multas')

    const statusField = col.fields.getByName('status')
    statusField.selectValues = ['Pendente', 'Pago', 'Em Recurso']

    col.fields.removeByName('fornecedor')
    col.fields.removeByName('descricao')
    col.fields.removeByName('ait')
    col.fields.removeByName('valor_original')
    col.fields.removeByName('desconto')
    col.fields.removeByName('valor_a_pagar')
    col.fields.removeByName('projeto')
    col.fields.removeByName('observacoes')

    app.save(col)
  },
)
