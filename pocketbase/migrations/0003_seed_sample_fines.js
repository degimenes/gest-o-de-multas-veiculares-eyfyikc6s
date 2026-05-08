migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('multas')

    const seeds = [
      {
        placa: 'ABC-1234',
        veiculo: 'VW Gol',
        condutor: 'João Silva',
        valor: 130.16,
        data_infracao: '2026-05-01 10:00:00.000Z',
        tipo: 'Excesso de Velocidade',
        status: 'Pendente',
      },
      {
        placa: 'XYZ-5678',
        veiculo: 'Fiat Uno',
        condutor: 'Maria Oliveira',
        valor: 195.23,
        data_infracao: '2026-05-02 14:30:00.000Z',
        tipo: 'Estacionamento Irregular',
        status: 'Pago',
      },
      {
        placa: 'KJG-9900',
        veiculo: 'Ford Ka',
        condutor: 'Ricardo Santos',
        valor: 880.41,
        data_infracao: '2026-05-03 08:15:00.000Z',
        tipo: 'Avanço de Sinal Vermelho',
        status: 'Em Recurso',
      },
    ]

    for (const s of seeds) {
      try {
        app.findFirstRecordByData('multas', 'placa', s.placa)
      } catch (_) {
        const record = new Record(col)
        record.set('placa', s.placa)
        record.set('veiculo', s.veiculo)
        record.set('condutor', s.condutor)
        record.set('valor', s.valor)
        record.set('data_infracao', s.data_infracao)
        record.set('tipo', s.tipo)
        record.set('status', s.status)
        app.save(record)
      }
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('multas')
    const records = app.findRecordsByFilter(
      'multas',
      "placa = 'ABC-1234' || placa = 'XYZ-5678' || placa = 'KJG-9900'",
      '',
      10,
    )
    for (const r of records) {
      app.delete(r)
    }
  },
)
