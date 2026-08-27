migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('daily_schedules')
    const existingField = col.fields.getByName('photo')
    if (existingField) {
      existingField.maxSelect = 10
      app.save(col)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('daily_schedules')
    const existingField = col.fields.getByName('photo')
    if (existingField) {
      existingField.maxSelect = 1
      app.save(col)
    }
  },
)
