migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')
    if (!usersCol.fields.getByName('role')) {
      usersCol.fields.add(new TextField({ name: 'role', required: false }))
      app.save(usersCol)
    }

    const packagesCol = new Collection({
      name: 'packages',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        { name: 'duration_days', type: 'number', required: true, onlyInt: true },
        { name: 'price_cents', type: 'number', required: true, onlyInt: true },
        {
          name: 'cover_image',
          type: 'file',
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_packages_created ON packages (created DESC)'],
    })
    app.save(packagesCol)

    const packagesId = app.findCollectionByNameOrId('packages').id
    const groupsCol = new Collection({
      name: 'groups',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'package',
          type: 'relation',
          required: true,
          collectionId: packagesId,
          maxSelect: 1,
        },
        { name: 'name', type: 'text', required: true },
        { name: 'start_date', type: 'date' },
        { name: 'end_date', type: 'date' },
        { name: 'capacity', type: 'number', required: true, onlyInt: true },
        { name: 'current_members', type: 'number', onlyInt: true },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['em_formacao', 'confirmado', 'em_andamento', 'finalizado'],
          maxSelect: 1,
        },
        { name: 'admin', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_groups_status ON groups (status)'],
    })
    app.save(groupsCol)

    const groupsId = app.findCollectionByNameOrId('groups').id
    const groupMembersCol = new Collection({
      name: 'group_members',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'group', type: 'relation', required: true, collectionId: groupsId, maxSelect: 1 },
        {
          name: 'user',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          maxSelect: 1,
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['pendente', 'aprovado', 'recusado'],
          maxSelect: 1,
        },
        {
          name: 'payment_status',
          type: 'select',
          required: true,
          values: ['pendente', 'pago'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(groupMembersCol)

    const dailySchedulesCol = new Collection({
      name: 'daily_schedules',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'group', type: 'relation', required: true, collectionId: groupsId, maxSelect: 1 },
        { name: 'day_number', type: 'number', required: true, onlyInt: true },
        { name: 'date', type: 'date' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'breakfast', type: 'text' },
        { name: 'lunch', type: 'text' },
        { name: 'dinner', type: 'text' },
        { name: 'reminders', type: 'json' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(dailySchedulesCol)

    const leadsCol = new Collection({
      name: 'leads',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: '',
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'phone', type: 'text' },
        {
          name: 'origem',
          type: 'select',
          values: ['indicacao', 'instagram', 'site', 'outros'],
          maxSelect: 1,
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['novo', 'contatado', 'qualificado', 'convertido', 'perdido'],
          maxSelect: 1,
        },
        { name: 'notes', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(leadsCol)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('leads'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('daily_schedules'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('group_members'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('groups'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('packages'))
    } catch (_) {}
  },
)
