migrate(
  (app) => {
    const groupsCol = app.findCollectionByNameOrId('groups')

    let group1 = null
    let group2 = null

    try {
      group1 = app.findFirstRecordByData('groups', 'name', 'Grupo Chile Março 2025')
    } catch (_) {}
    try {
      group2 = app.findFirstRecordByData('groups', 'name', 'Grupo Atacama Abril 2025')
    } catch (_) {}

    if (group1 && !group1.getString('departure_airport')) {
      group1.set('departure_airport', 'Galeão (GIG)')
      group1.set('arrival_airport', 'Santiago (SCL)')
      app.save(group1)
    }

    if (group2 && !group2.getString('departure_airport')) {
      group2.set('departure_airport', 'Guarulhos (GRU)')
      group2.set('arrival_airport', 'Santiago (SCL)')
      app.save(group2)
    }

    const quotesCol = app.findCollectionByNameOrId('airline_quotes')

    const sampleQuotes = [
      {
        group: group1,
        airline_name: 'LATAM Airlines',
        departure_airport: 'Galeão (GIG)',
        arrival_airport: 'Santiago (SCL)',
        departure_date: '2025-03-15 10:00:00.000Z',
        return_date: '2025-03-22 20:00:00.000Z',
        price_cents: 320000,
        notes: 'Voo direto, bagagem despachada inclusa',
      },
      {
        group: group1,
        airline_name: 'Gol Linhas Aéreas',
        departure_airport: 'Galeão (GIG)',
        arrival_airport: 'Santiago (SCL)',
        departure_date: '2025-03-15 14:00:00.000Z',
        return_date: '2025-03-22 18:00:00.000Z',
        price_cents: 285000,
        notes: 'Conexão em São Paulo, sem bagagem despachada',
      },
      {
        group: group2,
        airline_name: 'LATAM Airlines',
        departure_airport: 'Guarulhos (GRU)',
        arrival_airport: 'Santiago (SCL)',
        departure_date: '2025-04-10 08:00:00.000Z',
        return_date: '2025-04-20 22:00:00.000Z',
        price_cents: 380000,
        notes: 'Voo direto ida e volta, bagagem inclusa',
      },
    ]

    sampleQuotes.forEach((q) => {
      if (!q.group) return
      try {
        app.findFirstRecordByData('airline_quotes', 'group', q.group.id)
        return
      } catch (_) {
        const rec = new Record(quotesCol)
        rec.set('group', q.group.id)
        rec.set('airline_name', q.airline_name)
        rec.set('departure_airport', q.departure_airport)
        rec.set('arrival_airport', q.arrival_airport)
        rec.set('departure_date', q.departure_date)
        rec.set('return_date', q.return_date)
        rec.set('price_cents', q.price_cents)
        rec.set('notes', q.notes)
        app.save(rec)
      }
    })
  },
  (app) => {},
)
