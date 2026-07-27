migrate(
  (app) => {
    const packagesCol = app.findCollectionByNameOrId('packages')
    const groupsCol = app.findCollectionByNameOrId('groups')
    const dailyCol = app.findCollectionByNameOrId('daily_schedules')

    var adminId = ''
    try {
      adminId = app.findAuthRecordByEmail('_pb_users_auth_', 'laura@lauraturismo.com.br').id
    } catch (_) {
      try {
        adminId = app.findAuthRecordByEmail('_pb_users_auth_', 'william@korenambiental.com').id
      } catch (_) {}
    }

    var newPackages = [
      {
        title: 'Vinhos e Neve no Chile 2026',
        description:
          'Combine a elegancia dos vinhos chilenos com a adrenalina do esqui nos Andes. Visite vinicolas renomadas como Concha y Toro e Santa Rita, e deslize nas pistas de Valle Nevado e Portillo. Uma jornada inesquecivel para apaixonados por vinho e aventura.',
        duration_days: 8,
        price_cents: 420000,
      },
      {
        title: 'Rota dos Vinhedos \u2013 Vale Central',
        description:
          'Um mergulho profundo na cultura vinicola do Chile. Visite as melhores vinicolas do Vale Central: Concha y Toro, Santa Rita, Matetic, Undurraga e Cousino Macul. Degustacoes exclusivas, almocos gourmet e hospedagem em vinicolas boutique.',
        duration_days: 6,
        price_cents: 320000,
      },
      {
        title: 'Aventura na Patagonia',
        description:
          'Uma expedicao epica pela Patagonia chilena e argentina. Esquie em Valle Nevado, explore Torres del Paine, navegue ate o Glaciar Grey e visite Vinicola Concha y Toro. Aventura, natureza e vinho em uma so viagem.',
        duration_days: 9,
        price_cents: 580000,
      },
    ]

    var pkgMap = {}
    newPackages.forEach(function (p) {
      try {
        pkgMap[p.title] = app.findFirstRecordByData('packages', 'title', p.title)
      } catch (_) {
        var rec = new Record(packagesCol)
        rec.set('title', p.title)
        rec.set('description', p.description)
        rec.set('duration_days', p.duration_days)
        rec.set('price_cents', p.price_cents)
        app.save(rec)
        pkgMap[p.title] = rec
      }
    })

    var newGroups = [
      {
        name: 'Grupo Vinhos e Neve Outubro 2026',
        packageTitle: 'Vinhos e Neve no Chile 2026',
        start_date: '2026-10-10 00:00:00.000Z',
        end_date: '2026-10-17 00:00:00.000Z',
        capacity: 20,
        current_members: 0,
        status: 'em_formacao',
        departure_airport: 'Galeao (GIG)',
        arrival_airport: 'Santiago (SCL)',
      },
      {
        name: 'Grupo Rota dos Vinhedos Setembro 2026',
        packageTitle: 'Rota dos Vinhedos \u2013 Vale Central',
        start_date: '2026-09-12 00:00:00.000Z',
        end_date: '2026-09-17 00:00:00.000Z',
        capacity: 20,
        current_members: 0,
        status: 'em_formacao',
        departure_airport: 'Guarulhos (GRU)',
        arrival_airport: 'Santiago (SCL)',
      },
      {
        name: 'Grupo Patagonia Novembro 2026',
        packageTitle: 'Aventura na Patagonia',
        start_date: '2026-11-05 00:00:00.000Z',
        end_date: '2026-11-13 00:00:00.000Z',
        capacity: 15,
        current_members: 0,
        status: 'em_formacao',
        departure_airport: 'Guarulhos (GRU)',
        arrival_airport: 'Santiago (SCL)',
      },
    ]

    var groupMap = {}
    newGroups.forEach(function (g) {
      try {
        groupMap[g.name] = app.findFirstRecordByData('groups', 'name', g.name)
      } catch (_) {
        var rec = new Record(groupsCol)
        rec.set('package', pkgMap[g.packageTitle].id)
        rec.set('name', g.name)
        rec.set('start_date', g.start_date)
        rec.set('end_date', g.end_date)
        rec.set('capacity', g.capacity)
        rec.set('current_members', g.current_members)
        rec.set('status', g.status)
        rec.set('departure_airport', g.departure_airport)
        rec.set('arrival_airport', g.arrival_airport)
        if (adminId) rec.set('admin', adminId)
        app.save(rec)
        groupMap[g.name] = rec
      }
    })

    var schedules = [
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 1,
        date: '2026-10-10 00:00:00.000Z',
        title: 'Dia 1: Chegada em Santiago',
        description:
          'Recepcao no aeroporto de Santiago, traslado privativo ao hotel e jantar festivo de boas-vindas.',
        breakfast: 'No aviao',
        lunch: 'Livre no aeroporto',
        dinner: 'Jantar de boas-vindas no restaurante Como Agua Para Chocolate',
        reminders: [
          'Passaporte ou RG original',
          'Preencher declaracao de entrada no Chile',
          'Trocar pesos chilenos no aeroporto',
        ],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 2,
        date: '2026-10-11 00:00:00.000Z',
        title: 'Dia 2: Visita a Vinicola Concha y Toro',
        description:
          'Tour pela Vinicola Concha y Toro, a maior exportadora de vinhos da America Latina. Degustacao de rotulos premium e almoco no restaurante da vinicola.',
        breakfast: 'Incluso no hotel',
        lunch: 'Restaurante da Vinicola Concha y Toro',
        dinner: 'Livre em Santiago',
        reminders: ['Sapato confortavel para caminhada', 'Protetor solar'],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 3,
        date: '2026-10-12 00:00:00.000Z',
        title: 'Dia 3: Tour na Vinicola Santa Rita',
        description:
          'Visita a Vinicola Santa Rita, fundada em 1880. Tour pelas caves historicas, degustacao de vinhos premiados e almoco no restaurante Dona Paula.',
        breakfast: 'Incluso no hotel',
        lunch: 'Restaurante Dona Paula na Vinicola Santa Rita',
        dinner: 'Livre em Santiago',
        reminders: ['Casaco leve para as caves', 'Camera fotografica'],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 4,
        date: '2026-10-13 00:00:00.000Z',
        title: 'Dia 4: Dia de esqui em Valle Nevado',
        description:
          'Dia completo de esqui em Valle Nevado, um dos principais resorts de esqui da America do Sul, a 3.025 metros de altitude nos Andes.',
        breakfast: 'Incluso no hotel',
        lunch: 'Almoco no restaurante do resort Valle Nevado',
        dinner: 'Incluso no hotel',
        reminders: [
          'Roupa de neve e luvas',
          'Oculos de sol com protecao UV',
          'Protetor solar fator alto',
        ],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 5,
        date: '2026-10-14 00:00:00.000Z',
        title: 'Dia 5: Aula de esqui em Valle Nevado',
        description:
          'Aula de esqui para iniciantes e intermediarios em Valle Nevado com instrutores certificados. A tarde, tempo livre nas pistas.',
        breakfast: 'Incluso no hotel',
        lunch: 'Lanche nas pistas de Valle Nevado',
        dinner: 'Livre em Santiago',
        reminders: ['Hidratacao constante', 'Seguir instrucoes do instrutor'],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 6,
        date: '2026-10-15 00:00:00.000Z',
        title: 'Dia 6: Esqui em Portillo',
        description:
          'Dia de esqui em Portillo, um dos resorts mais tradicionais do Chile, com vista para a Lagoa Inca. Experiencia unica nas pistas andinas.',
        breakfast: 'Incluso no hotel',
        lunch: 'Almoco no Hotel Portillo',
        dinner: 'Livre em Santiago',
        reminders: ['Roupa de neve completa', 'Camera a prova dagua para fotos na neve'],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 7,
        date: '2026-10-16 00:00:00.000Z',
        title: 'Dia 7: City Tour Santiago e Vinicola Undurraga',
        description:
          'Pela manha, city tour pelo centro historico de Santiago. A tarde, visita a Vinicola Undurraga para degustacao de espumantes e vinhos premium.',
        breakfast: 'Incluso no hotel',
        lunch: 'Bairro Lastarria',
        dinner: 'Despedida no restaurante Astrid y Gaston',
        reminders: ['Sapato confortavel para caminhada', 'Garrafa de agua'],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 8,
        date: '2026-10-17 00:00:00.000Z',
        title: 'Dia 8: Retorno ao Brasil',
        description: 'Cafe da manha, traslado ao aeroporto e voo de retorno ao Brasil.',
        breakfast: 'Incluso no hotel',
        lunch: 'No aeroporto',
        dinner: 'No aviao',
        reminders: ['Confirmar bagagem despachada', 'Chegar com 3h de antecedencia'],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 1,
        date: '2026-09-12 00:00:00.000Z',
        title: 'Dia 1: Chegada em Santiago',
        description:
          'Recepcao no aeroporto, traslado ao hotel e jantar de boas-vindas com degustacao de vinhos chilenos.',
        breakfast: 'No aviao',
        lunch: 'Livre no aeroporto',
        dinner: 'Jantar de boas-vindas com degustacao',
        reminders: ['Passaporte ou RG original', 'Declaracao de entrada no Chile'],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 2,
        date: '2026-09-13 00:00:00.000Z',
        title: 'Dia 2: Visita a Vinicola Concha y Toro',
        description:
          'Tour completo pela Vinicola Concha y Toro. Visita as caves, jardins e degustacao de vinhos Casillero del Diablo e Don Melchor.',
        breakfast: 'Incluso no hotel',
        lunch: 'Restaurante da vinicola',
        dinner: 'Livre em Santiago',
        reminders: ['Sapato confortavel', 'Protetor solar'],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 3,
        date: '2026-09-14 00:00:00.000Z',
        title: 'Dia 3: Tour na Vinicola Santa Rita',
        description:
          'Visita a Vinicola Santa Rita no Vale do Maipo. Tour pelo museu andino, caves centenarias e degustacao de vinhos Premium e Reserva.',
        breakfast: 'Incluso no hotel',
        lunch: 'Restaurante Dona Paula',
        dinner: 'Livre em Santiago',
        reminders: ['Casaco leve para as caves', 'Camera fotografica'],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 4,
        date: '2026-09-15 00:00:00.000Z',
        title: 'Dia 4: Vinicola Matetic no Vale de Casablanca',
        description:
          'Tour pela Vinicola Matetic, pioneira em vitivinicultura sustentavel no Vale de Casablanca. Degustacao de vinhos organicos e almoco gourmet.',
        breakfast: 'Incluso no hotel',
        lunch: 'Restaurante Equilibrio na Vinicola Matetic',
        dinner: 'Livre em Santiago',
        reminders: ['Apreciar os vinhedos de clima frio', 'Protetor solar'],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 5,
        date: '2026-09-16 00:00:00.000Z',
        title: 'Dia 5: Vinicola Undurraga e Vinicola Cousino Macul',
        description:
          'Pela manha, visita a Vinicola Undurraga para degustacao de espumantes. A tarde, tour pela historica Vinicola Cousino Macul, fundada em 1856.',
        breakfast: 'Incluso no hotel',
        lunch: 'Bairro Providencia',
        dinner: 'Jantar de despedida em Santiago',
        reminders: ['Comparar os estilos de vinho', 'Anotar os vinhos favoritos'],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 6,
        date: '2026-09-17 00:00:00.000Z',
        title: 'Dia 6: Retorno ao Brasil',
        description: 'Cafe da manha, traslado ao aeroporto e voo de retorno ao Brasil.',
        breakfast: 'Incluso no hotel',
        lunch: 'No aeroporto',
        dinner: 'No aviao',
        reminders: ['Confirmar voo', 'Chegar com 3h de antecedencia'],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 1,
        date: '2026-11-05 00:00:00.000Z',
        title: 'Dia 1: Chegada em Santiago',
        description:
          'Recepcao no aeroporto de Santiago, traslado ao hotel e jantar de boas-vindas.',
        breakfast: 'No aviao',
        lunch: 'Livre no aeroporto',
        dinner: 'Jantar de boas-vindas em Santiago',
        reminders: [
          'Passaporte ou RG original',
          'Roupa de frio para a Patagonia',
          'Protetor solar',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 2,
        date: '2026-11-06 00:00:00.000Z',
        title: 'Dia 2: Dia de esqui em Valle Nevado',
        description:
          'Dia de esqui em Valle Nevado, nas montanhas dos Andes. Pistas para todos os niveis com vista deslumbrante da cordilheira.',
        breakfast: 'Incluso no hotel',
        lunch: 'Restaurante do resort Valle Nevado',
        dinner: 'Incluso no hotel',
        reminders: [
          'Roupa de neve e luvas',
          'Oculos de sol com protecao UV',
          'Protetor solar fator alto',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 3,
        date: '2026-11-07 00:00:00.000Z',
        title: 'Dia 3: Voo para Punta Arenas',
        description:
          'Voo matinal de Santiago para Punta Arenas. City tour pela cidade mais austral do Chile e visita ao Estreito de Magalhaes.',
        breakfast: 'Incluso no hotel',
        lunch: 'Em Punta Arenas',
        dinner: 'Cordero magalhanico no restaurante La Luna',
        reminders: ['Confirmar voo interno', 'Casaco impermeavel'],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 4,
        date: '2026-11-08 00:00:00.000Z',
        title: 'Dia 4: Torres del Paine',
        description:
          'Traslado ao Parque Nacional Torres del Paine. Caminhada ate o mirante das Torres, com vista para as icas formacoes graniticas.',
        breakfast: 'Incluso no hotel',
        lunch: 'Box lunch no parque',
        dinner: 'Hotel em Torres del Paine',
        reminders: ['Tenis de trilha resistente', 'Capacete de frio e luvas', 'Garrafa de agua'],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 5,
        date: '2026-11-09 00:00:00.000Z',
        title: 'Dia 5: Torres del Paine - Trilha e Lago Grey',
        description:
          'Trilha matinal pelo Parque Nacional Torres del Paine. A tarde, caminhada ate o Lago Grey para ver icebergs e o Glaciar Grey.',
        breakfast: 'Incluso no hotel',
        lunch: 'Box lunch no parque',
        dinner: 'Hotel em Torres del Paine',
        reminders: [
          'Roupa em camadas (clima instavel)',
          'Protetor solar e oculos de sol',
          'Camera a prova dagua',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 6,
        date: '2026-11-10 00:00:00.000Z',
        title: 'Dia 6: Navegacao ao Glaciar Grey',
        description:
          'Navegacao pelo Lago Grey ate a frente do Glaciar Grey. Experiencia unica de ver de perto as torres de gelo despencando no lago.',
        breakfast: 'Incluso no hotel',
        lunch: 'Lanche a bordo',
        dinner: 'Hotel em Puerto Natales',
        reminders: ['Casaco impermeavel e corta-vento', 'Remedios para enjoo se necessario'],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 7,
        date: '2026-11-11 00:00:00.000Z',
        title: 'Dia 7: Retorno a Santiago',
        description:
          'Traslado ao aeroporto de Punta Arenas e voo de volta a Santiago. Tarde livre para descanso ou compras.',
        breakfast: 'Incluso no hotel',
        lunch: 'No aeroporto',
        dinner: 'Livre em Santiago',
        reminders: ['Confirmar voo interno', 'Organizar bagagem'],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 8,
        date: '2026-11-12 00:00:00.000Z',
        title: 'Dia 8: Visita a Vinicola Concha y Toro',
        description:
          'Despedida com um tour pela Vinicola Concha y Toro. Degustacao final de vinhos premiados e almoco de despedida.',
        breakfast: 'Incluso no hotel',
        lunch: 'Restaurante da Vinicola Concha y Toro',
        dinner: 'Jantar de despedida em Santiago',
        reminders: ['Sapato confortavel', 'Camera fotografica'],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 9,
        date: '2026-11-13 00:00:00.000Z',
        title: 'Dia 9: Retorno ao Brasil',
        description: 'Cafe da manha, traslado ao aeroporto e voo de retorno ao Brasil.',
        breakfast: 'Incluso no hotel',
        lunch: 'No aeroporto',
        dinner: 'No aviao',
        reminders: ['Confirmar voo internacional', 'Chegar com 3h de antecedencia'],
      },
    ]

    schedules.forEach(function (s) {
      var groupRecord = groupMap[s.groupName]
      if (!groupRecord) return

      var existing = []
      try {
        existing = app.findRecordsByFilter(
          'daily_schedules',
          'group = "' + groupRecord.id + '" && day_number = ' + s.day_number,
          '',
          1,
          0,
        )
      } catch (_) {}
      if (existing.length > 0) return

      var rec = new Record(dailyCol)
      rec.set('group', groupRecord.id)
      rec.set('day_number', s.day_number)
      rec.set('date', s.date)
      rec.set('title', s.title)
      rec.set('description', s.description)
      rec.set('breakfast', s.breakfast)
      rec.set('lunch', s.lunch)
      rec.set('dinner', s.dinner)
      rec.set('reminders', JSON.stringify(s.reminders || []))
      app.save(rec)
    })
  },
  (app) => {
    var newGroupNames = [
      'Grupo Vinhos e Neve Outubro 2026',
      'Grupo Rota dos Vinhedos Setembro 2026',
      'Grupo Patagonia Novembro 2026',
    ]
    var newPackageTitles = [
      'Vinhos e Neve no Chile 2026',
      'Rota dos Vinhedos \u2013 Vale Central',
      'Aventura na Patagonia',
    ]

    newGroupNames.forEach(function (name) {
      try {
        var group = app.findFirstRecordByData('groups', 'name', name)
        var schedules = app.findRecordsByFilter(
          'daily_schedules',
          'group = "' + group.id + '"',
          '',
          1000,
          0,
        )
        schedules.forEach(function (s) {
          app.delete(s)
        })
        app.delete(group)
      } catch (_) {}
    })

    newPackageTitles.forEach(function (title) {
      try {
        var pkg = app.findFirstRecordByData('packages', 'title', title)
        app.delete(pkg)
      } catch (_) {}
    })
  },
)
