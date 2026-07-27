migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      const existing = app.findAuthRecordByEmail('_pb_users_auth_', 'laura@lauraturismo.com.br')
      existing.set('role', 'admin')
      existing.set('name', 'Laura Turismo')
      app.save(existing)
    } catch (_) {
      const record = new Record(users)
      record.setEmail('laura@lauraturismo.com.br')
      record.setPassword('Laura@Skip')
      record.setVerified(true)
      record.set('name', 'Laura Turismo')
      record.set('role', 'admin')
      app.save(record)
    }
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'laura@lauraturismo.com.br')
      app.delete(record)
    } catch (_) {}
  },
)
