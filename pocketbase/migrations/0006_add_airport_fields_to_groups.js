migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('groups')
    if (!col.fields.getByName('departure_airport')) {
      col.fields.add(new TextField({ name: 'departure_airport' }))
    }
    if (!col.fields.getByName('arrival_airport')) {
      col.fields.add(new TextField({ name: 'arrival_airport' }))
    }
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('groups')
    const dep = col.fields.getByName('departure_airport')
    if (dep) {
      col.fields.remove(dep)
    }
    const arr = col.fields.getByName('arrival_airport')
    if (arr) {
      col.fields.remove(arr)
    }
    app.save(col)
  },
)
