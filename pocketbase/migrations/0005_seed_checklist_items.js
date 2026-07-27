migrate(
  (app) => {
    const checklistCol = app.findCollectionByNameOrId('trip_checklist_items')

    const sampleItems = [
      { item: 'Passaporte válido (validade mínima 6 meses)', is_required: true, order: 1 },
      { item: 'Seguro viagem internacional', is_required: true, order: 2 },
      { item: 'Carregadores e adaptadores de tomada', is_required: false, order: 3 },
      { item: 'Medicamentos de uso pessoal', is_required: false, order: 4 },
      { item: 'Comprovante de vacinação (se aplicável)', is_required: true, order: 5 },
      { item: 'Roupas para clima variado', is_required: false, order: 6 },
    ]

    let groups = []
    try {
      groups = app.findRecordsByFilter('groups', '', '-created', 100, 0)
    } catch (_) {}

    groups.forEach((group) => {
      let existingItems = []
      try {
        existingItems = app.findRecordsByFilter(
          'trip_checklist_items',
          'group = "' + group.id + '"',
          'order',
          100,
          0,
        )
      } catch (_) {}

      if (existingItems.length > 0) return

      sampleItems.forEach((sample) => {
        const rec = new Record(checklistCol)
        rec.set('group', group.id)
        rec.set('item', sample.item)
        rec.set('is_required', sample.is_required)
        rec.set('order', sample.order)
        app.save(rec)
      })
    })
  },
  (app) => {},
)
