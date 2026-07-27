migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    let adminRecord
    try {
      adminRecord = app.findAuthRecordByEmail('_pb_users_auth_', 'william@korenambiental.com')
      adminRecord.set('role', 'admin')
      adminRecord.set('name', 'Laura Admin')
      app.save(adminRecord)
    } catch (_) {
      adminRecord = new Record(users)
      adminRecord.setEmail('william@korenambiental.com')
      adminRecord.setPassword('Skip@Pass')
      adminRecord.setVerified(true)
      adminRecord.set('name', 'Laura Admin')
      adminRecord.set('role', 'admin')
      app.save(adminRecord)
    }

    const packagesCol = app.findCollectionByNameOrId('packages')
    let pkg1, pkg2

    try {
      pkg1 = app.findFirstRecordByData('packages', 'title', 'Chile Essential - 7 Dias')
    } catch (_) {
      pkg1 = new Record(packagesCol)
      pkg1.set('title', 'Chile Essential - 7 Dias')
      pkg1.set(
        'description',
        'Conheça o melhor de Santiago, Valparaíso, Viña del Mar e Vinícola Concha y Toro em um grupo exclusivo e acolhedor.',
      )
      pkg1.set('duration_days', 7)
      pkg1.set('price_cents', 350000)
      app.save(pkg1)
    }

    try {
      pkg2 = app.findFirstRecordByData('packages', 'title', 'Chile Aventura & Atacama - 10 Dias')
    } catch (_) {
      pkg2 = new Record(packagesCol)
      pkg2.set('title', 'Chile Aventura & Atacama - 10 Dias')
      pkg2.set(
        'description',
        'Uma expedição inesquecível combinando as maravilhas da capital Santiago com a magia do Deserto do Atacama.',
      )
      pkg2.set('duration_days', 10)
      pkg2.set('price_cents', 550000)
      app.save(pkg2)
    }

    const groupsCol = app.findCollectionByNameOrId('groups')
    let group1

    try {
      group1 = app.findFirstRecordByData('groups', 'name', 'Grupo Chile Março 2025')
    } catch (_) {
      group1 = new Record(groupsCol)
      group1.set('package', pkg1.id)
      group1.set('name', 'Grupo Chile Março 2025')
      group1.set('start_date', '2025-03-15 00:00:00.000Z')
      group1.set('end_date', '2025-03-22 00:00:00.000Z')
      group1.set('capacity', 12)
      group1.set('current_members', 3)
      group1.set('status', 'em_formacao')
      group1.set('admin', adminRecord.id)
      app.save(group1)
    }

    try {
      app.findFirstRecordByData('groups', 'name', 'Grupo Atacama Abril 2025')
    } catch (_) {
      const group2 = new Record(groupsCol)
      group2.set('package', pkg2.id)
      group2.set('name', 'Grupo Atacama Abril 2025')
      group2.set('start_date', '2025-04-10 00:00:00.000Z')
      group2.set('end_date', '2025-04-20 00:00:00.000Z')
      group2.set('capacity', 10)
      group2.set('current_members', 1)
      group2.set('status', 'confirmado')
      group2.set('admin', adminRecord.id)
      app.save(group2)
    }

    const dailyCol = app.findCollectionByNameOrId('daily_schedules')
    try {
      app.findFirstRecordByData('daily_schedules', 'group', group1.id)
    } catch (_) {
      const day1 = new Record(dailyCol)
      day1.set('group', group1.id)
      day1.set('day_number', 1)
      day1.set('date', '2025-03-15 00:00:00.000Z')
      day1.set('title', 'Dia 1: Chegada em Santiago e Boas-Vindas')
      day1.set(
        'description',
        'Recepção no aeroporto de Santiago, traslado privativo ao hotel e jantar festivo de boas-vindas.',
      )
      day1.set('breakfast', 'No avião / Livre')
      day1.set('lunch', 'Livre no aeroporto')
      day1.set('dinner', 'Incluso no restaurante Como Agua Para Chocolate')
      day1.set(
        'reminders',
        JSON.stringify([
          'Passaporte ou RG original em bom estado',
          'Preencher declaração de entrada no Chile',
          'Trocar pesos chilenos no aeroporto',
        ]),
      )
      app.save(day1)

      const day2 = new Record(dailyCol)
      day2.set('group', group1.id)
      day2.set('day_number', 2)
      day2.set('date', '2025-03-16 00:00:00.000Z')
      day2.set('title', 'Dia 2: City Tour Histórico & Cerro San Cristóbal')
      day2.set(
        'description',
        'Caminhada pelo centro histórico, Palácio La Moneda, Plaza de Armas e subida de funicular ao Cerro San Cristóbal.',
      )
      day2.set('breakfast', 'Incluso no hotel')
      day2.set('lunch', 'Bairro Lastarria')
      day2.set('dinner', 'Livre')
      day2.set(
        'reminders',
        JSON.stringify([
          'Sapato de caminhada confortável',
          'Protetor solar e garrafa de água',
          'Câmera fotográfica',
        ]),
      )
      app.save(day2)
    }

    const leadsCol = app.findCollectionByNameOrId('leads')
    const sampleLeads = [
      {
        name: 'Maria Fernanda',
        phone: '(11) 99887-1122',
        origem: 'instagram',
        status: 'novo',
        notes: 'Interessada na viagem de Março para casal',
      },
      {
        name: 'João Pedro Souza',
        phone: '(21) 98765-4321',
        origem: 'indicacao',
        status: 'contatado',
        notes: 'Aguardando orçamento em grupo de 4 amigos',
      },
      {
        name: 'Ana Clara Rossi',
        phone: '(31) 99123-8877',
        origem: 'site',
        status: 'qualificado',
        notes: 'Gostou do pacote Atacama 10 dias',
      },
      {
        name: 'Carlos Eduardo',
        phone: '(41) 98877-3344',
        origem: 'site',
        status: 'convertido',
        notes: 'Inscrito no Grupo Atacama Abril',
      },
    ]

    sampleLeads.forEach((lead) => {
      try {
        app.findFirstRecordByData('leads', 'name', lead.name)
      } catch (_) {
        const rec = new Record(leadsCol)
        rec.set('name', lead.name)
        rec.set('phone', lead.phone)
        rec.set('origem', lead.origem)
        rec.set('status', lead.status)
        rec.set('notes', lead.notes)
        app.save(rec)
      }
    })
  },
  (app) => {},
)
