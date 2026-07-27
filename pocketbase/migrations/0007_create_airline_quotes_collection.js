migrate(
  (app) => {
    const groupsId = app.findCollectionByNameOrId('groups').id

    const airlineQuotesCol = new Collection({
      name: 'airline_quotes',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'group', type: 'relation', required: true, collectionId: groupsId, maxSelect: 1 },
        { name: 'airline_name', type: 'text', required: true },
        { name: 'departure_airport', type: 'text' },
        { name: 'arrival_airport', type: 'text' },
        { name: 'departure_date', type: 'date' },
        { name: 'return_date', type: 'date' },
        { name: 'price_cents', type: 'number', required: true, onlyInt: true },
        { name: 'notes', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_airline_quotes_group ON airline_quotes (`group`)',
        'CREATE INDEX idx_airline_quotes_departure_date ON airline_quotes (departure_date)',
      ],
    })

    app.save(airlineQuotesCol)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('airline_quotes'))
    } catch (_) {}
  },
)
