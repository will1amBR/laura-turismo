migrate(
  (app) => {
    const groupsId = app.findCollectionByNameOrId('groups').id

    const checklistCol = new Collection({
      name: 'trip_checklist_items',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'group', type: 'relation', required: true, collectionId: groupsId, maxSelect: 1 },
        { name: 'item', type: 'text', required: true },
        { name: 'is_required', type: 'bool' },
        { name: 'order', type: 'number', onlyInt: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_checklist_group ON trip_checklist_items (`group`)'],
    })

    app.save(checklistCol)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('trip_checklist_items'))
    } catch (_) {}
  },
)
