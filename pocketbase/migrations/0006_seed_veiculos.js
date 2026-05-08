migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('veiculos')
    const veiculos = [
      {
        placa: 'GAJ9218',
        modelo: 'FIAT/FIORINO HD WK E',
        categoria: 'Campo Móvel',
        condutor_responsavel: '',
      },
      {
        placa: 'FFK9717',
        modelo: 'VW/SAVEIRO CD CROSS MA',
        categoria: 'Campo Móvel',
        condutor_responsavel: '',
      },
      {
        placa: 'GIT6C55',
        modelo: 'FIAT/STRADA ENDURANCE CD',
        categoria: 'Campo Fixo',
        condutor_responsavel: 'Jaci Dantas',
      },
      {
        placa: 'FEJ1A74',
        modelo: 'FIAT/TORO FREED TURB AT6',
        categoria: 'Campo Móvel',
        condutor_responsavel: '',
      },
      {
        placa: 'FPG1G97',
        modelo: 'JEEP/RENEGADE',
        categoria: 'Campo Fixo',
        condutor_responsavel: 'Daniel Bellato',
      },
      {
        placa: 'FPY2F82',
        modelo: 'FIAT/TORO FREED T270 AT6',
        categoria: 'Diretoria',
        condutor_responsavel: 'Antonio Sergio A. Moreno',
      },
      {
        placa: 'FJI7H47',
        modelo: 'IVECO/DAILY 65-170CD',
        categoria: 'Campo Fixo',
        condutor_responsavel: '',
      },
      {
        placa: 'GAD0334',
        modelo: 'CHEV/SPIN 1.8L AT LTZ',
        categoria: 'Diretoria',
        condutor_responsavel: 'Ana Paula Dantas Rameh',
      },
      {
        placa: 'GCI6D77',
        modelo: 'JEEP/COMPASS LONGITUDE F',
        categoria: 'Diretoria',
        condutor_responsavel: 'Antonio Sergio E. Rameh',
      },
    ]

    for (const v of veiculos) {
      try {
        app.findFirstRecordByData('veiculos', 'placa', v.placa)
      } catch (_) {
        const record = new Record(col)
        record.set('placa', v.placa)
        record.set('modelo', v.modelo)
        record.set('categoria', v.categoria)
        record.set('condutor_responsavel', v.condutor_responsavel)
        app.save(record)
      }
    }
  },
  (app) => {
    app.db().newQuery('DELETE FROM veiculos').execute()
  },
)
