migrate(
  (app) => {
    const packagesCol = app.findCollectionByNameOrId('packages')
    const groupsCol = app.findCollectionByNameOrId('groups')
    const dailyCol = app.findCollectionByNameOrId('daily_schedules')

    let adminId = ''
    try {
      adminId = app.findAuthRecordByEmail('_pb_users_auth_', 'laura@lauraturismo.com.br').id
    } catch (_) {
      try {
        adminId = app.findAuthRecordByEmail('_pb_users_auth_', 'william@korenambiental.com').id
      } catch (_) {}
    }

    // 1. Criar ou atualizar os pacotes
    const packageDefs = [
      {
        title: 'Rota dos Vinhedos – Vale Central',
        description:
          'Uma imersão completa e sofisticada na alta gastronomia e nas mais conceituadas vinícolas do Vale Central chileno (Vales de Maipo e Casablanca). Visitas guiadas com enólogos, degustações de safras premium e ícones mundiais (Don Melchor, 120 Reserva Especial, EQ Syrah), almoços harmonizados em restaurantes de alta gastronomia e passeios pelos jardins históricos das famílias fundadoras da vitivinicultura chilena.',
        duration_days: 6,
        price_cents: 320000,
      },
      {
        title: 'Vinhos e Neve no Chile 2026',
        description:
          'A combinação perfeita entre o charme da alta enologia e a emoção da neve nos Andes chilenos. Conheça as prestigiadas vinícolas Concha y Toro, Santa Rita e Undurraga no Vale do Maipo, viva dias inesquecíveis deslizando nas pistas de Valle Nevado (3.025m) e no clássico resort Portillo às margens da mítica Laguna del Inca, com equipamento completo incluso e assistência especializada.',
        duration_days: 8,
        price_cents: 420000,
      },
      {
        title: 'Aventura na Patagônia',
        description:
          'Uma expedição inesquecível pelo extremo sul do mundo, unindo a Cordilheira dos Andes em Santiago, os glaciares milenares e a imponência do Parque Nacional Torres del Paine. Inclui navegação exclusiva até as paredes de gelo do Glaciar Grey, safári fotográfico da fauna patagônica, gastronomia magalhânica com cordeiro ao palo e tour pelas vinícolas mais tradicionais do Vale Central.',
        duration_days: 9,
        price_cents: 580000,
      },
      {
        title: 'Esqui em Portillo + Santiago',
        description:
          'Experiência exclusiva para quem deseja unir o melhor da neve nos Andes com a vibrante cultura e gastronomia da capital chilena. Dias inteiros aproveitando as lendárias pistas de Portillo em frente à icônica Laguna del Inca, esqui em Valle Nevado e Farellones, além de city tour completo pelos bairros históricos de Santiago e degustação privativa de vinhos.',
        duration_days: 7,
        price_cents: 460000,
      },
      {
        title: 'Chile Essential - 7 Dias',
        description:
          'O roteiro clássico e indispensável para vivenciar a alma do Chile pela primeira vez. Conheça o centro histórico de Santiago, suba de teleférico e funicular aos mirantes dos Cerros San Cristóbal e Santa Lucía, maravilhe-se com a arquitetura colorida de Valparaíso e as praias de Viña del Mar, e desfrute de degustações na lendária Vinícola Concha y Toro e no Vale de Casablanca.',
        duration_days: 7,
        price_cents: 350000,
      },
      {
        title: 'Chile Aventura & Atacama - 10 Dias',
        description:
          'Uma jornada mística de Santiago ao deserto mais árido do planeta. Explore os mistérios geológicos do Vale da Lua e da Morte, contemple o nascer do sol nos Géiseres del Tatio a 4.300m de altitude, flutue nas águas hipersalinas da Laguna Cejar, maravilhe-se com os flamingos no Salar do Atacama e viva uma sessão de tour astronômico com os céus mais límpidos do mundo.',
        duration_days: 10,
        price_cents: 550000,
      },
    ]

    const pkgMap = {}
    packageDefs.forEach((p) => {
      let rec
      try {
        rec = app.findFirstRecordByData('packages', 'title', p.title)
        rec.set('description', p.description)
        rec.set('duration_days', p.duration_days)
        rec.set('price_cents', p.price_cents)
        app.save(rec)
      } catch (_) {
        rec = new Record(packagesCol)
        rec.set('title', p.title)
        rec.set('description', p.description)
        rec.set('duration_days', p.duration_days)
        rec.set('price_cents', p.price_cents)
        app.save(rec)
      }
      pkgMap[p.title] = rec
    })

    // 2. Criar ou atualizar os grupos para datas a partir de setembro de 2026
    const groupDefs = [
      {
        name: 'Grupo Rota dos Vinhedos Setembro 2026',
        packageTitle: 'Rota dos Vinhedos – Vale Central',
        start_date: '2026-09-12 00:00:00.000Z',
        end_date: '2026-09-17 00:00:00.000Z',
        capacity: 20,
        current_members: 0,
        status: 'em_formacao',
        departure_airport: 'Guarulhos (GRU)',
        arrival_airport: 'Santiago (SCL)',
      },
      {
        name: 'Grupo Vinhos e Neve Outubro 2026',
        packageTitle: 'Vinhos e Neve no Chile 2026',
        start_date: '2026-10-10 00:00:00.000Z',
        end_date: '2026-10-17 00:00:00.000Z',
        capacity: 20,
        current_members: 0,
        status: 'em_formacao',
        departure_airport: 'Galeão (GIG)',
        arrival_airport: 'Santiago (SCL)',
      },
      {
        name: 'Grupo Patagonia Novembro 2026',
        packageTitle: 'Aventura na Patagônia',
        start_date: '2026-11-05 00:00:00.000Z',
        end_date: '2026-11-13 00:00:00.000Z',
        capacity: 15,
        current_members: 0,
        status: 'em_formacao',
        departure_airport: 'Guarulhos (GRU)',
        arrival_airport: 'Santiago (SCL)',
      },
      {
        name: 'Grupo Esqui Portillo & Santiago Julho 2026',
        packageTitle: 'Esqui em Portillo + Santiago',
        start_date: '2026-07-18 00:00:00.000Z',
        end_date: '2026-07-24 00:00:00.000Z',
        capacity: 16,
        current_members: 0,
        status: 'em_formacao',
        departure_airport: 'Guarulhos (GRU)',
        arrival_airport: 'Santiago (SCL)',
      },
      {
        name: 'Grupo Chile Essential Outubro 2026',
        packageTitle: 'Chile Essential - 7 Dias',
        start_date: '2026-10-24 00:00:00.000Z',
        end_date: '2026-10-30 00:00:00.000Z',
        capacity: 18,
        current_members: 0,
        status: 'em_formacao',
        departure_airport: 'Guarulhos (GRU)',
        arrival_airport: 'Santiago (SCL)',
      },
      {
        name: 'Grupo Atacama Mágico Novembro 2026',
        packageTitle: 'Chile Aventura & Atacama - 10 Dias',
        start_date: '2026-11-15 00:00:00.000Z',
        end_date: '2026-11-24 00:00:00.000Z',
        capacity: 14,
        current_members: 0,
        status: 'em_formacao',
        departure_airport: 'Guarulhos (GRU)',
        arrival_airport: 'Calama / Santiago (CJC)',
      },
    ]

    const groupMap = {}
    groupDefs.forEach((g) => {
      const pkg = pkgMap[g.packageTitle]
      if (!pkg) return
      let rec
      try {
        rec = app.findFirstRecordByData('groups', 'name', g.name)
        rec.set('package', pkg.id)
        rec.set('start_date', g.start_date)
        rec.set('end_date', g.end_date)
        rec.set('capacity', g.capacity)
        rec.set('departure_airport', g.departure_airport)
        rec.set('arrival_airport', g.arrival_airport)
        if (adminId) rec.set('admin', adminId)
        app.save(rec)
      } catch (_) {
        rec = new Record(groupsCol)
        rec.set('package', pkg.id)
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
      }
      groupMap[g.name] = rec
    })

    // 3. Roteiros diários super detalhados por grupo
    const detailedSchedules = [
      // ==========================================
      // 1. ROTA DOS VINHEDOS - VALE CENTRAL (6 DIAS)
      // ==========================================
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 1,
        date: '2026-09-12 00:00:00.000Z',
        title: 'Boas-Vindas a Santiago & Jantar Harmonizado em Bellavista',
        description:
          '• Manhã / Tarde: Desembarque no Aeroporto Internacional Arturo Merino Benítez (SCL). Recepção calorosa e privativa pela equipe Laura Turismo no desembarque internacional, auxílio com bagagens e transfer executivo ao Hotel Plaza El Bosque Ebro (bairro Las Condes / El Golf).\n• Tarde: Check-in, tempo livre para descanso e breve caminhada de ambientação pelo charmoso bairro gastronômico Isidora Goyenechea.\n• Noite (19h30): Saída em van privativa para o boêmio Bairro Bellavista. Jantar de boas-vindas com menu confiança em 4 tempos harmonizado com vinhos chilenos selecionados no aclamado restaurante Como Agua Para Chocolate.\n• Incluso: Traslado aeroporto-hotel privativo com guia bilíngue, hospedagem 4 estrelas superior e jantar completo harmonizado.',
        breakfast: 'No voo / Livre',
        lunch: 'Livre de acordo com o horário do voo',
        dinner: 'Incluso: Menu harmonizado no Como Agua Para Chocolate',
        reminders: [
          'Apresentar RG original em ótimo estado (expedido em até 10 anos) ou Passaporte válido',
          'Guardar com cuidado o comprovante PDI (tarjeta única de turismo recebida na imigração)',
          'Casaco leve para a noite fresca de Santiago',
          'Trocar apenas quantia mínima de pesos no aeroporto (o guia indicará casa de câmbio no centro com melhor cotação)',
        ],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 2,
        date: '2026-09-13 00:00:00.000Z',
        title: 'Vale do Maipo Clássico: Vinícola Concha y Toro (Don Melchor) & Vinícola Santa Rita',
        description:
          '• Manhã (08h30): Saída em direção a Pirque no Vale do Maipo. Visita guiada exclusiva pela lendária Vinícola Concha y Toro: passeio pelos jardins do séc. XIX da antiga residência da família Concha y Toro, visita ao vinhedo de variedades nobres e descida à misteriosa adega do Casillero del Diablo com degustação conduzida por sommelier de 4 rótulos premium e taça de cristal gravada de brinde.\n• Almoço (12h30): Almoço harmonizado de 3 passos no histórico Restaurante Doña Paula, tombado pelo patrimônio chileno, dentro do parque da Vinícola Santa Rita em Alto Jahuel.\n• Tarde (14h30): Tour patrimonial pela Vinícola Santa Rita: visita às adegas históricas onde se refugiaram os 120 soldados da independência chilena, degustação da linha Reserva Especial e Medalla Real, finalizando com visitação ao fascinante Museu Andino (acervo pré-colombiano com mais de 3.000 peças em ouro e cerâmica).\n• Incluso: Transporte executivo o dia todo, ingressos de tours premium Concha y Toro e Santa Rita, 8 degustações de vinhos, almoço completo e entrada no Museu Andino.',
        breakfast: 'Incluso no buffet do hotel',
        lunch: 'Incluso: Almoço harmonizado no Restaurante Doña Paula (Santa Rita)',
        dinner: 'Livre — sugestão da Laura: Restaurante Mestizo no Parque Bicentenario',
        reminders: [
          'Sapatos confortáveis e fechados para caminhada nos vinhedos e paralelepípedos',
          'Levar casaco leve para as caves subterrâneas climatizadas a 14°C',
          'Protetor solar, óculos escuros e chapéu para o passeio externo nos vinhedos',
        ],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 3,
        date: '2026-09-14 00:00:00.000Z',
        title: 'Vale de Casablanca: Vinhos Orgânicos na Vinícola Matetic & Casas del Bosque',
        description:
          '• Manhã (08h45): Viagem rumo ao Vale de Casablanca, região consagrada pelos vinhos de clima frio (Sauvignon Blanc, Chardonnay e Pinot Noir). Parada na pioneira e biodinâmica Vinícola Matetic (Valle del Rosario): passeio pelas vinhas com explicação sobre agricultura regenerativa e degustação técnica da linha ultra-premium EQ (Equilibrio) em sala de barricas com arquitetura de vanguarda.\n• Almoço (13h00): Almoço gastronômico de alta gastronomia no prestigiado Restaurante Tanino da Vinícola Casas del Bosque, eleito um dos melhores restaurantes de vinícola do mundo pela revista Wine Access.\n• Tarde (15h30): Tour sensorial na Vinícola Casas del Bosque com visita à sala de aromas, adegas subterrâneas e degustação orientada de vinhos ícones com tábua de queijos artesanais e charcutaria chilena.\n• Noite (18h30): Retorno a Santiago com pôr do sol na Cordilheira da Costa.\n• Incluso: Traslados privativos, tours completos e degustações nas vinícolas Matetic e Casas del Bosque, e almoço harmonizado.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço harmonizado no Restaurante Tanino (Casas del Bosque)',
        dinner: 'Livre — sugestão: Bairro Vitacura (Restaurante Cava Furtiva ou La Mar)',
        reminders: [
          'Levar protetor labial e hidratante (clima do vale tem baixa umidade)',
          'Espaço reservado nas malas ou caixa de vinho especial para compras com desconto de adega',
        ],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 4,
        date: '2026-09-15 00:00:00.000Z',
        title: 'Vale do Maipo Tradicional: Vinícola Undurraga & Vinícola Cousiño Macul',
        description:
          '• Manhã (09h00): Visita à charmosa e centenária Vinícola Undurraga em Talagante. Passeio pelo Parque dos Fundadores desenhado pelo paisagista George Dubois, visita ao jardim de variedades com mais de 10 cepas, adega subterrânea de 1885 e degustação premium de 4 vinhos incluindo a famosa linha TH (Terroir Hunter) e espumante Brut.\n• Almoço (12h30): Almoço típico chileno e carnes nobres no tradicional restaurante El Manso de Velasco em Buin.\n• Tarde (14h30): Tour na histórica Vinícola Cousiño Macul em Peñalolén, a única vinícola fundada no séc. XIX que permanece 100% nas mãos da família original. Visita aos vinhedos urbanos aos pés da Cordilheira dos Andes, cavas de pedra e cal construídas por arquitetos franceses em 1870 e degustação comentada dos rótulos Finis Terrae e Lota.\n• Incluso: Transporte privativo, ingressos e degustações nas 2 vinícolas e almoço tradicional chileno.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no tradicional restaurante El Manso de Velasco',
        dinner: 'Livre no vibrante Bairro Lastarria (Bocanáriz Wine Bar)',
        reminders: [
          'Excelente oportunidade para provar vinhos da uva Carménère, redescoberta no Chile',
          'Câmera ou celular com bateria cheia para fotos das cavas centenárias iluminadas à luz de velas',
        ],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 5,
        date: '2026-09-16 00:00:00.000Z',
        title: 'Sky Costanera, Cerro Santa Lucía & Jantar de Gala de Despedida',
        description:
          '• Manhã (09h30): Caminhada cultural guiada pelo histórico Cerro Santa Lucía (local de fundação de Santiago em 1541 por Pedro de Valdivia com castelos neoclássicos e jardins suspensos). Em seguida, visita ao bairro nobre de Providencia.\n• Almoço (12h30): Almoço livre no charmoso Pátio Bellavista ou no Bairro Italia com dezenas de bistrôs de autor e antiquários.\n• Tarde (15h00): Subida ao mirante do Sky Costanera no 61º e 62º andares (o edifício mais alto da América do Sul, a 300 metros de altura) para uma visão panorâmica espetacular de 360° de toda a capital chilena e da monumental Cordilheira dos Andes.\n• Noite (20h00): Jantar de gala de encerramento do grupo no prestigiado Restaurante Giratorio ou Aquí está Coco, com frutos do mar frescos chilenos (centolla magalhânica, locos, salmão) e brinde especial de despedida.\n• Incluso: Entrada no mirante Sky Costanera, acompanhamento de guia e jantar de gala completo.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre no Bairro Italia ou Patio Bellavista',
        dinner: 'Incluso: Jantar de gala com frutos do mar e brinde com vinho chileno',
        reminders: [
          'Levar roupa esporte fino / elegante para o jantar de gala',
          'Óculos de sol para a plataforma aberta do mirante Sky Costanera',
        ],
      },
      {
        groupName: 'Grupo Rota dos Vinhedos Setembro 2026',
        day_number: 6,
        date: '2026-09-17 00:00:00.000Z',
        title: 'Despedida de Santiago & Voo de Retorno ao Brasil',
        description:
          '• Manhã: Café da manhã relaxante no hotel. Manhã livre para últimas compras de vinhos, lembranças de lápis-lazúli e doces de leite chileno (manjar) no shopping Costanera Center ou Parque Arauco.\n• 12h00: Check-out no hotel.\n• Tarde: Transfer executivo privativo do hotel para o Aeroporto Internacional de Santiago (SCL), assistência no despacho de bagagens (com as caixas especiais de vinho lacradas) e procedimentos de embarque rumo ao Brasil.\n• Incluso: Transfer hotel-aeroporto privativo com assistência da equipe Laura Turismo.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre antes do transfer / no aeroporto',
        dinner: 'No voo de regresso',
        reminders: [
          'Limite da Receita Federal: até 12 litros de bebidas alcoólicas (16 garrafas de 750ml) por passageiro sem impostos',
          'Vinhos devem ser transportados na mala despachada ou em caixas de papelão reforçadas com divisórias de isopor',
          'Chegar ao aeroporto com 3 horas de antecedência ao horário do voo internacional',
        ],
      },

      // ==========================================
      // 2. VINHOS E NEVE NO CHILE 2026 (8 DIAS)
      // ==========================================
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 1,
        date: '2026-10-10 00:00:00.000Z',
        title: 'Chegada em Santiago & Jantar de Boas-Vindas em Bellavista',
        description:
          '• Manhã / Tarde: Chegada no Aeroporto Internacional de Santiago (SCL). Recepção personalizada pela equipe Laura Turismo com placa do grupo, auxílio de malas e transfer privativo para o Hotel Novotel Santiago Las Condes.\n• Tarde: Check-in, tempo livre para descanso ou passeio pelo Parque Araucano.\n• Noite (19h30): Saída para jantar de recepção no famoso restaurante Como Agua Para Chocolate, com pratos da alta gastronomia chilena e degustação de vinho Carménère de boas-vindas.\n• Incluso: Transfer privativo in, hospedagem e jantar de boas-vindas completo.',
        breakfast: 'No voo / Livre',
        lunch: 'Livre',
        dinner: 'Incluso: Jantar de boas-vindas no Como Agua Para Chocolate',
        reminders: [
          'Passaporte ou RG original com menos de 10 anos de emissão',
          'Guardar a filipeta de entrada da PDI para isenção do IVA chileno no hotel',
          'Trazer casaco corta-vento para a noite',
        ],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 2,
        date: '2026-10-11 00:00:00.000Z',
        title: 'Vale do Maipo: Tour Marques de Casa Concha na Vinícola Concha y Toro',
        description:
          '• Manhã (09h00): Saída em direção a Pirque. Tour exclusivo Marques de Casa Concha na centenária Vinícola Concha y Toro: caminhada pelos jardins históricos e casarão de verão da família Concha y Toro, visitação aos parreirais de Cabernet Sauvignon, adega histórica da lenda do Casillero del Diablo e masterclass de degustação de 7 vinhos harmonizados com seleção de queijos nobres conduzida por sommelier.\n• Almoço (13h00): Almoço gourmet no Restaurante Bodega 1883 da própria vinícola.\n• Tarde (15h30): Tempo livre na loja oficial para compra de safras especiais com taça personalizada inclusa.\n• Noite: Noite livre em Santiago para passear pelo shopping Costanera Center ou Parque Arauco.\n• Incluso: Transporte privativo, tour Marques de Casa Concha com 7 vinhos e queijos, e almoço gourmet.',
        breakfast: 'Incluso no buffet do hotel',
        lunch: 'Incluso: Almoço no Restaurante Bodega 1883',
        dinner: 'Livre em Santiago (sugestão: Bairro Vitacura)',
        reminders: [
          'Casaco para o subsolo da adega (temperatura controlada a 14°C)',
          'Calçados confortáveis para caminhada nos vinhedos',
        ],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 3,
        date: '2026-10-12 00:00:00.000Z',
        title: 'Cultura e Vinhos na Vinícola Santa Rita & Museu Andino',
        description:
          '• Manhã (09h00): Traslado a Buin no Vale do Maipo. Tour Premium na histórica Vinícola Santa Rita: exploração das cavas subterrâneas tombadas como monumento nacional onde 120 patriotas da independência do Chile se abrigaram, visita aos jardins desenhados pelo paisagista francês Guillermo Renner e degustação guiada de 4 vinhos das linhas Medalla Real e Floresta com taça de cristal de presente.\n• Almoço (12h30): Almoço típico chileno e carnes grelhadas no aclamado Restaurante Doña Paula.\n• Tarde (14h30): Visita guiada ao Museu Andino da Fundação Claro Vial, que reúne um acervo incomparável de arte pré-colombiana andina.\n• Final de Tarde: Retorno ao hotel e parada em loja especializada para prova e ajuste antecipado de roupas de neve para o dia seguinte.\n• Incluso: Transfer privativo, tour completo com 4 degustações, almoço no Doña Paula e ingresso no Museu Andino.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no Restaurante Doña Paula',
        dinner: 'Livre em Santiago (sugestão: Bairro Lastarria)',
        reminders: [
          'Levar meias térmicas e roupas leves de segunda pele para a prova dos equipamentos de neve',
          'Máquina fotográfica para registrar os belos jardins centenários',
        ],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 4,
        date: '2026-10-13 00:00:00.000Z',
        title: 'Dia Completo de Esqui e Neve em Valle Nevado & Vila de Farellones',
        description:
          '• Manhã (07h30): Subida da espetacular rota curva dos Andes até a estação de Valle Nevado (3.025m de altitude). Parada panorâmica nos mirantes das curvas da cordilheira.\n• Manhã / Tarde: Dia livre na neve no maior centro de esqui da América do Sul! Incluso ticket de gôndola panorâmica e área de lazer da neve, com tempo para quem desejar esquiar nas mais de 40 pistas ou curtir a vila de montanha com DJ e terraço ensolarado.\n• Almoço (13h00): Almoço com vista panorâmica para a cordilheira nevada no restaurante La Fourchette ou Mirador del Plomo.\n• Tarde (15h30): Visita à pitoresca vila alpina de Farellones com suas cabanas de madeira e mirante do pôr do sol nos Andes.\n• Noite (18h30): Descida com retorno ao hotel em Santiago.\n• Incluso: Transporte especializado para neve 4x4, assistência da equipe Laura Turismo, ticket de teleférico / acesso Valle Nevado e almoço de montanha.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no restaurante do resort em Valle Nevado',
        dinner: 'Livre para descanso no hotel',
        reminders: [
          'Obrigatório: óculos escuros com filtro UV400 (a neve reflete 80% da radiação solar)',
          'Protetor solar FPS 50+ e protetor labial',
          'Roupas impermeáveis (casaco, calça, luvas térmicas e gorro)',
          'Tomar bastante água durante o dia para aclimatação à altitude (3.000m)',
        ],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 5,
        date: '2026-10-14 00:00:00.000Z',
        title: 'Aulas de Esqui & Aventura na Neve nos Andes',
        description:
          '• Manhã (08h00): Segundo dia nas montanhas andinas com foco em prática esportiva e diversão na neve. Aula coletiva de 2 horas de esqui ou snowboard para iniciantes e intermediários com instrutores profissionais credenciados da escola de esqui dos Andes.\n• Incluso: Equipamento completo de esqui (esquis, botas, bastões e capacete) ou snowboard por todo o dia.\n• Almoço (13h00): Almoço revigorante no refúgio de montanha com chocolate quente e fondue de queijo.\n• Tarde: Prática livre nas pistas verdes (iniciantes) e azuis (intermediárias) com auxílio dos monitores.\n• Fim de tarde: Retorno ao hotel em Santiago e noite livre para massagem e spa no hotel.\n• Incluso: Transporte montanha, 2h de aula de esqui/snowboard, aluguel de equipamentos completos para o dia todo e almoço no refúgio.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no refúgio de montanha com chocolate quente',
        dinner: 'Livre em Santiago (sugestão: Bairro Isidora Goyenechea)',
        reminders: [
          'Seguir rigorosamente as instruções de segurança do instrutor',
          'Meias térmicas grossas de cano alto para melhor conforto com as botas de esqui',
        ],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 6,
        date: '2026-10-15 00:00:00.000Z',
        title: 'Expedição a Portillo & A Mística Laguna del Inca nos Andes Centrais',
        description:
          '• Manhã (07h00): Saída pela histórica Rota Internacional dos Caracoles até Portillo, o mais antigo e lendário centro de esqui da América do Sul (2.880m), localizado junto à fronteira com a Argentina.\n• Manhã / Tarde: Contemplação da impressionante Laguna del Inca, com suas águas verde-esmeralda cercadas pelos picos nevados dos Andes. Tour histórico pelo clássico Hotel Portillo (famoso hotel amarelo), tempo para fotos nos mirantes e caminhada pelas margens da lagoa congelada.\n• Almoço (12h30): Almoço completo no icônico Restaurante do Hotel Portillo com vista panorâmica para a Laguna del Inca.\n• Tarde: Tempo para desfrutar da atmosfera única de montanha, fotos e passeio nos arredores do monumento ao Cristo Redentor dos Andes.\n• Noite (19h00): Chegada a Santiago.\n• Incluso: Transporte privativo de alta montanha, taxa de entrada em Portillo, almoço panorâmico completo e acompanhamento de guia.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço panorâmico no clássico Restaurante do Hotel Portillo',
        dinner: 'Livre em Santiago',
        reminders: [
          'Levar documento original (RG ou Passaporte), pois a rota passa por posto de controle fronteiriço',
          'Câmera com cartão de memória livre: um dos cenários mais fotografados de toda a América do Sul!',
        ],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 7,
        date: '2026-10-16 00:00:00.000Z',
        title: 'City Tour Cultural em Santiago & Vinícola Undurraga com Jantar de Despedida',
        description:
          '• Manhã (09h00): City tour panorâmico e histórico por Santiago: Palácio de La Moneda (sede presidencial com troca de guarda conforme calendário cívico), Plaza de Armas, Catedral Metropolitana de Santiago, Mercado Central e subida de funicular ao Cerro San Cristóbal no Parque Metropolitano para avistar a cordilheira.\n• Almoço (13h00): Almoço no requintado Bairro Lastarria no restaurante Liguria ou Bocanáriz.\n• Tarde (15h00): Visita à Vinícola Undurraga com tour pelas caves subterrâneas do séc. XIX e degustação da coleção de espumantes e vinhos finos.\n• Noite (20h00): Jantar de confraternização e despedida do grupo com brinde especial em restaurante de renome internacional.\n• Incluso: City tour com funicular, tour Undurraga com degustações e jantar de despedida completo.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre no Bairro Lastarria',
        dinner: 'Incluso: Jantar especial de encerramento do grupo',
        reminders: [
          'Tênis confortável para a caminhada no centro histórico',
          'Traje esporte fino para o jantar de encerramento',
        ],
      },
      {
        groupName: 'Grupo Vinhos e Neve Outubro 2026',
        day_number: 8,
        date: '2026-10-17 00:00:00.000Z',
        title: 'Check-out & Retorno ao Brasil com Memórias Inesquecíveis',
        description:
          '• Manhã: Café da manhã no hotel. Manhã livre para últimas compras no Parque Arauco ou Bairro Italia.\n• 12h00: Check-out e traslado privativo ao Aeroporto Internacional de Santiago (SCL) com assistência no despacho de bagagens e equipamentos esportivos.\n• Tarde / Noite: Voo de retorno ao Brasil.\n• Incluso: Transfer privativo hotel-aeroporto com equipe Laura Turismo.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre antes do transfer',
        dinner: 'No voo de regresso',
        reminders: [
          'Checar franquia de bagagem e selo de segurança nas caixas de vinhos',
          'Apresentar-se com 3 horas de antecedência ao balcão da companhia aérea',
        ],
      },

      // ==========================================
      // 3. AVENTURA NA PATAGÔNIA (9 DIAS)
      // ==========================================
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 1,
        date: '2026-11-05 00:00:00.000Z',
        title: 'Chegada em Santiago & Encontro do Grupo de Expedição',
        description:
          '• Manhã / Tarde: Desembarque no Aeroporto de Santiago (SCL), recepção pela Laura Turismo e transfer executivo para o hotel em Santiago.\n• Tarde: Reunião de briefing técnico da expedição à Patagônia com o guia especialista: conferência de equipamentos de trilha, vestuário de montanha e clima austral.\n• Noite (19h30): Jantar de boas-vindas com menu harmonizado e degustação de boas-vindas.\n• Incluso: Transfer privativo in, hospedagem, briefing e jantar de boas-vindas.',
        breakfast: 'No voo / Livre',
        lunch: 'Livre',
        dinner: 'Incluso: Jantar de recepção do grupo de expedição',
        reminders: [
          'Passaporte ou RG original em perfeito estado',
          'Mochila pequena de ataque (20 a 30L) para os passeios na Patagônia',
          'Jaqueta impermeável tipo Anorak (corta-vento e chuva) e calça impermeável',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 2,
        date: '2026-11-06 00:00:00.000Z',
        title: 'Cordilheira dos Andes: Valle Nevado & Mirantes de Altitude',
        description:
          '• Manhã (08h00): Subida da Cordilheira dos Andes até o complexo de Valle Nevado (3.025m). Caminhada contemplativa pelos mirantes com vista espetacular para os picos El Plomo e La Parva.\n• Almoço (12h30): Almoço de montanha no resort com gastronomia andina.\n• Tarde: Visita à vila histórica de Farellones e contemplação da fauna andina (condores e águias-morcegos chilenas).\n• Fim de tarde: Retorno ao hotel em Santiago e organização de bagagens para o voo austral do dia seguinte.\n• Incluso: Transporte privativo para a cordilheira, guia e almoço no resort.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no resort Valle Nevado',
        dinner: 'Livre em Santiago',
        reminders: [
          'Protetor solar FPS 50+ e óculos escuros com proteção UV',
          'Separar bagagem principal e mochila de mão para o voo doméstico para Punta Arenas',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 3,
        date: '2026-11-07 00:00:00.000Z',
        title: 'Voo Austral para Punta Arenas & O Histórico Estreito de Magalhães',
        description:
          '• Manhã: Transfer ao aeroporto de Santiago e voo panorâmico rumo ao sul sobre os campos de gelo até Punta Arenas (a cidade continental mais austral do planeta).\n• Tarde: Recepção no aeroporto de Punta Arenas (PUQ) e city tour histórico: visita à Plaza Muñoz Gamero (com a tradição de beijar o pé do índio Fueguino para dar sorte), Mirante Cerro de la Cruz com vista aberta para a Terra do Fogo e margens do lendário Estreito de Magalhães.\n• Fim de tarde: Viagem cênica de van executiva pela estepe patagônica até a aconchegante cidade de Puerto Natales, às margens do Canal Señoret (aprox. 3 horas de viagem com avistamento de emas selvagens / ñandús e guanacos).\n• Noite: Jantar de recepção com o tradicional Cordeiro Patagônico ao Palo no restaurante La Luna ou Asador Patagónico.\n• Incluso: Transfers privativos, city tour em Punta Arenas, viagem a Puerto Natales, hospedagem e jantar típico de cordeiro.',
        breakfast: 'Incluso no hotel em Santiago',
        lunch: 'Livre em Punta Arenas',
        dinner: 'Incluso: Tradicional Cordeiro Patagônico ao Palo no restaurante La Luna',
        reminders: [
          'Vento patagônico muito forte: gorro bem justo, luvas e corta-vento essencial',
          'Hidratante labial e colírio lubrificante',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 4,
        date: '2026-11-08 00:00:00.000Z',
        title: 'Parque Nacional Torres del Paine: Mirante dos Cuernos e Salto Grande',
        description:
          '• Manhã (07h30): Saída rumo ao majestoso Parque Nacional Torres del Paine (Reserva da Biosfera da UNESCO). Parada na emblemática Caverna do Milodonte (sítio paleontológico onde foram encontrados restos do milodonte pré-histórico).\n• Tarde: Entrada no Parque pelo setor Laguna Amarga (com vistas panorâmicas das três Torres de granito refletidas na água). Trilha leve até a imponente cachoeira Salto Grande e caminhada até o Mirante dos Cuernos del Paine com vista frontal para as formações rochosas bicolores e o Lago Nordenskjöld.\n• Almoço: Box lunch gourmet completo com produtos artesanais servido em mirante do parque.\n• Final de Tarde: Check-in no hotel dentro/próximo ao Parque Nacional com vista para os picos andinos.\n• Incluso: Transporte 4x4/van privativa, ingresso oficial CONAF para o Parque Torres del Paine, ingresso na Cueva del Milodón, guia naturalista bilíngue, box lunch e jantar no hotel.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Box lunch gourmet no Parque Nacional',
        dinner: 'Incluso: Jantar no hotel em Torres del Paine',
        reminders: [
          'Bota de trilha amaciada com solado aderente',
          'Vestir-se em 3 camadas (segunda pele térmica + fleece + anorak impermeável)',
          'Bastões de caminhada (opcional, mas recomendados)',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 5,
        date: '2026-11-09 00:00:00.000Z',
        title: 'Lago Grey, Praia de Icebergs & Mirante dos Glaciares',
        description:
          '• Manhã (08h30): Caminhada pela floresta nativa de lengas até a Praia do Lago Grey. Contemplação dos gigantescos blocos de gelo azul flutuantes que se desprendem da geleira e encalham nas areias negras vulcânicas.\n• Tarde: Caminhada até o Mirante da Península do Lago Grey com vista panorâmica frontal das línguas de gelo do Campo de Gelo Sul da Patagônia.\n• Almoço: Box lunch gourmet do parque.\n• Tarde (15h30): Safári fotográfico pela Laguna de los Cisnes e Mirante do Lago Pehoé, considerado um dos lagos mais bonitos do planeta por suas águas azul-turquesa cristalinas.\n• Noite: Jantar gastronômico no lodge com brinde de Calafate Sour.\n• Incluso: Transporte no parque, trilhas guiadas, box lunch, entrada e jantar com Calafate Sour.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Box lunch gourmet',
        dinner: 'Incluso: Jantar no lodge com drink Calafate Sour',
        reminders: [
          'Lente zoom / câmera para fotos de aves e guanacos',
          'Garrafa térmica com água ou chá quente para a caminhada',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 6,
        date: '2026-11-10 00:00:00.000Z',
        title: 'Navegação Exclusiva ao Glaciar Grey & Retorno a Puerto Natales',
        description:
          '• Manhã (09h00): Embarque no catamarã especial Grey III para uma inesquecível navegação de 3 horas pelo Lago Grey até as monumentais paredes de gelo de mais de 30 metros de altura do Glaciar Grey. Aproximação segura das frentes leste e oeste da geleira com brinde de whisky com gelo milenar colhido na hora.\n• Almoço (13h00): Almoço no Hotel Lago Grey com janelões panorâmicos.\n• Tarde (15h30): Retorno panorâmico em van privativa para Puerto Natales. Tempo livre para caminhar pela orla marítima do Canal Señoret, visitar o monumento histórico da Mão e as feirinhas de artesanato local em lã de ovelha.\n• Noite: Jantar em Puerto Natales com frutos do mar magalhânicos (centolla e merluza negra).\n• Incluso: Ticket de navegação no catamarã Grey III com brinde de gelo glacial, transfer privativo, almoço e jantar completo de frutos do mar.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no Restaurante Lago Grey',
        dinner: 'Incluso: Jantar de Centolla Magalhânica no restaurante Santolla ou Cangrejo Rojo',
        reminders: [
          'Casaco 100% corta-vento e touca para o convés externo do barco (temperatura aparente baixa)',
          'Medicamento preventivo para enjoo se tiver sensibilidade em embarcações',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 7,
        date: '2026-11-11 00:00:00.000Z',
        title: 'Voo de Retorno a Santiago & Pôr do Sol no Sky Costanera',
        description:
          '• Manhã (08h30): Transfer privativo de Puerto Natales ao Aeroporto de Punta Arenas (PUQ) e voo de regresso a Santiago.\n• Tarde: Chegada em Santiago, transfer para o hotel em Las Condes e check-in.\n• Fim de tarde (17h30): Subida ao mirante Sky Costanera (300m) para apreciar o pôr do sol dourado refletindo na Cordilheira dos Andes iluminada.\n• Noite: Noite livre para passear e jantar no Bairro Vitacura ou Bellavista.\n• Incluso: Transfer em Puerto Natales e Santiago, ingresso Sky Costanera e hospedagem.',
        breakfast: 'Incluso no hotel em Puerto Natales',
        lunch: 'Livre no aeroporto / trânsito',
        dinner: 'Livre em Santiago (sugestão: Bairro Vitacura)',
        reminders: [
          'Apresentar documento nos embarques',
          'Roupas mais leves e confortáveis para o clima ameno de Santiago',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 8,
        date: '2026-11-12 00:00:00.000Z',
        title: 'Vale do Maipo: Vinícola Concha y Toro & Grande Jantar de Despedida',
        description:
          '• Manhã (09h30): Saída para o Vale do Maipo para encerrar a viagem em grande estilo. Tour completo pelos jardins e caves da Vinícola Concha y Toro com degustação de 4 rótulos premiados e taça de presente.\n• Almoço (13h00): Almoço festivo de confraternização no Restaurante da Vinícola Concha y Toro ou em tradicional casa de carnes em Pirque.\n• Tarde: Tarde livre no centro gastronômico Patio Bellavista e compras de lembrancinhas artesanais.\n• Noite (20h00): Jantar de encerramento da expedição patagônica com brinde oficial da Laura Turismo.\n• Incluso: Transporte privativo, tour na Concha y Toro com degustações, almoço festivo e jantar de gala de despedida.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço harmonizado na Vinícola Concha y Toro',
        dinner: 'Incluso: Jantar de gala de encerramento do grupo',
        reminders: [
          'Última oportunidade para comprar vinhos com desconto na loja oficial da vinícola',
          'Traje especial para o jantar de encerramento',
        ],
      },
      {
        groupName: 'Grupo Patagonia Novembro 2026',
        day_number: 9,
        date: '2026-11-13 00:00:00.000Z',
        title: 'Despedida do Chile & Voo de Retorno ao Brasil',
        description:
          '• Manhã: Café da manhã no hotel, check-out e tempo para últimas compras.\n• 11h30: Traslado executivo privativo ao Aeroporto Internacional de Santiago (SCL) com assistência completa da equipe no check-in internacional.\n• Tarde / Noite: Voo de retorno ao Brasil com o coração repleto de memórias da Patagônia e dos Andes.\n• Incluso: Transfer privativo hotel-aeroporto.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre no aeroporto',
        dinner: 'No voo internacional',
        reminders: [
          'Conferir passaporte / RG e itens da bagagem de mão',
          'Chegada no aeroporto com 3h de antecedência',
        ],
      },

      // ==========================================
      // 4. ESQUI EM PORTILLO + SANTIAGO (7 DIAS)
      // ==========================================
      {
        groupName: 'Grupo Esqui Portillo & Santiago Julho 2026',
        day_number: 1,
        date: '2026-07-18 00:00:00.000Z',
        title: 'Chegada a Santiago & Fitting de Roupas e Equipamentos de Neve',
        description:
          '• Manhã / Tarde: Desembarque no Aeroporto de Santiago (SCL). Recepção privativa pela equipe Laura Turismo e transfer para o hotel em Las Condes.\n• Tarde (16h00): Sessão privativa de fitting e prova de roupas térmicas de neve e botas em loja especializada parceira, garantindo o tamanho perfeito e conforto para os dias de pista.\n• Noite (19h30): Jantar de boas-vindas com fondues e vinhos chilenos no Bairro Bellavista.\n• Incluso: Transfer privativo, assistência de fitting de neve e jantar de boas-vindas.',
        breakfast: 'No voo / Livre',
        lunch: 'Livre',
        dinner: 'Incluso: Jantar de boas-vindas com vinho chileno',
        reminders: [
          'Passaporte ou RG original válido',
          'Trazer meias térmicas e luvas impermeáveis',
        ],
      },
      {
        groupName: 'Grupo Esqui Portillo & Santiago Julho 2026',
        day_number: 2,
        date: '2026-07-19 00:00:00.000Z',
        title: 'Primeiro Dia de Neve: Valle Nevado & Vila de Farellones',
        description:
          '• Manhã (07h30): Subida da Cordilheira dos Andes em transporte especial 4x4 até Valle Nevado (3.025m). Entrega de passes de pista e início das atividades na neve.\n• Manhã / Tarde: Dia livre para esquiar nas pistas do resort ou passear de teleférico panorâmico com vistas inacreditáveis dos Andes.\n• Almoço (13h00): Almoço no terraço ensolarado do resort.\n• Tarde: Parada na clássica vila de Farellones para fotos do pôr do sol na montanha e retorno ao hotel em Santiago.\n• Incluso: Transporte 4x4 de montanha, passe de acesso/gôndola e almoço no resort.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no resort Valle Nevado',
        dinner: 'Livre em Santiago (sugestão: Bairro Vitacura)',
        reminders: [
          'Óculos escuros com proteção UV400 e protetor solar fator 50+',
          'Manter-se sempre hidratado devido à altitude',
        ],
      },
      {
        groupName: 'Grupo Esqui Portillo & Santiago Julho 2026',
        day_number: 3,
        date: '2026-07-20 00:00:00.000Z',
        title: 'Aulas Práticas de Esqui e Snowboard em Valle Nevado',
        description:
          '• Manhã (08h00): Subida aos Andes para aula coletiva de 2 horas com instrutor profissional certificado para aprimoramento de técnicas nas pistas.\n• Equipamento incluso: Esquis, bastões, botas e capacete por todo o dia.\n• Almoço (13h00): Almoço com fondue e chocolate quente no refúgio de altitude.\n• Tarde: Prática livre orientada nas pistas com assistência dos monitores e retorno a Santiago.\n• Incluso: Transporte, 2h de aula de esqui, equipamento completo por todo o dia e almoço.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no refúgio de montanha',
        dinner: 'Livre em Santiago',
        reminders: ['Seguir as orientações de postura do instrutor', 'Roupas térmicas em camadas'],
      },
      {
        groupName: 'Grupo Esqui Portillo & Santiago Julho 2026',
        day_number: 4,
        date: '2026-07-21 00:00:00.000Z',
        title: 'Expedição a Portillo: Esqui em frente à Laguna del Inca',
        description:
          '• Manhã (07h00): Viagem pela lendária rota dos Andes Centrais até a mítica estação de Portillo (2.880m). Visual espetacular da Laguna del Inca de águas cristalinas cercada por paredões de neve.\n• Manhã / Tarde: Dia de esqui nas pistas históricas de Portillo com passe de teleférico incluso ou contemplação e fotos na varanda panorâmica do Hotel Portillo.\n• Almoço (13h00): Almoço completo no salão nobre do Hotel Portillo com vista privilegiada para o lago.\n• Fim de tarde: Retorno a Santiago.\n• Incluso: Transporte de alta montanha, passe de acesso a Portillo, almoço panorâmico e guia especializado.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no clássico Restaurante do Hotel Portillo',
        dinner: 'Livre em Santiago',
        reminders: [
          'Levar documento original (RG ou Passaporte) para os postos de controle da rota internacional',
          'Bateria extra para o celular / câmera fotográfica',
        ],
      },
      {
        groupName: 'Grupo Esqui Portillo & Santiago Julho 2026',
        day_number: 5,
        date: '2026-07-22 00:00:00.000Z',
        title: 'City Tour Histórico em Santiago, Cerro San Cristóbal & Vinícola Concha y Toro',
        description:
          '• Manhã (09h00): City tour cultural pelos pontos mais famosos de Santiago: Palácio de La Moneda, Plaza de Armas, subida de teleférico ao Cerro San Cristóbal para visão de toda a cidade com a cordilheira nevada ao fundo.\n• Almoço (12h30): Almoço no charmoso Bairro Lastarria.\n• Tarde (14h30): Tour na Vinícola Concha y Toro no Vale do Maipo: jardins históricos, adega do Casillero del Diablo e degustação de 4 vinhos finos com taça de brinde.\n• Noite: Noite livre em Santiago.\n• Incluso: City tour com teleférico, tour com degustação na Concha y Toro e guia.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre no Bairro Lastarria',
        dinner: 'Livre em Santiago',
        reminders: [
          'Calçado confortável para caminhadas urbanas',
          'Casaco leve para a adega subterrânea',
        ],
      },
      {
        groupName: 'Grupo Esqui Portillo & Santiago Julho 2026',
        day_number: 6,
        date: '2026-07-23 00:00:00.000Z',
        title: 'Mirante Sky Costanera & Jantar de Gala de Encerramento',
        description:
          '• Manhã: Manhã livre para compras no Costanera Center ou no charmoso Bairro Italia.\n• Tarde (16h00): Subida ao mirante Sky Costanera no 62º andar para assistir ao entardecer iluminando os Andes.\n• Noite (20h00): Jantar de encerramento do grupo com menu de 3 passos harmonizado com vinhos chilenos e brinde de comemoração.\n• Incluso: Ingresso Sky Costanera e jantar de encerramento completo.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre',
        dinner: 'Incluso: Jantar de gala com harmonização de vinhos',
        reminders: [
          'Traje esporte fino para o jantar de confraternização',
          'Organizar malas e acomodar vinhos nas proteções adequadas',
        ],
      },
      {
        groupName: 'Grupo Esqui Portillo & Santiago Julho 2026',
        day_number: 7,
        date: '2026-07-24 00:00:00.000Z',
        title: 'Despedida de Santiago & Voo de Volta ao Brasil',
        description:
          '• Manhã: Café da manhã no hotel e check-out.\n• Tarde: Transfer privativo ao Aeroporto Internacional de Santiago (SCL) com assistência completa no embarque internacional.\n• Incluso: Transfer privativo hotel-aeroporto.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre antes do voo',
        dinner: 'No voo de retorno',
        reminders: [
          'Chegar ao aeroporto com 3h de antecedência',
          'Revisar passaporte e comprovantes de despacho de bagagem',
        ],
      },

      // ==========================================
      // 5. CHILE ESSENTIAL - 7 DIAS
      // ==========================================
      {
        groupName: 'Grupo Chile Essential Outubro 2026',
        day_number: 1,
        date: '2026-10-24 00:00:00.000Z',
        title: 'Chegada em Santiago & Jantar de Boas-Vindas no Bairro Bellavista',
        description:
          '• Manhã / Tarde: Desembarque no Aeroporto de Santiago (SCL). Recepção calorosa no desembarque internacional e transfer privativo ao hotel em Las Condes / Providencia.\n• Tarde: Check-in, tempo livre para descanso e breve orientação sobre a cidade.\n• Noite (19h30): Jantar de boas-vindas no consagrado restaurante Como Agua Para Chocolate no Bairro Bellavista com menu em 3 tempos e vinho chileno.\n• Incluso: Transfer privativo in, hospedagem e jantar de boas-vindas completo.',
        breakfast: 'No voo / Livre',
        lunch: 'Livre',
        dinner: 'Incluso: Jantar de boas-vindas no Como Agua Para Chocolate',
        reminders: [
          'Passaporte ou RG original com menos de 10 anos de emissão',
          'Guardar o papel da PDI entregue na imigração',
          'Casaco leve para a noite fresca de Santiago',
        ],
      },
      {
        groupName: 'Grupo Chile Essential Outubro 2026',
        day_number: 2,
        date: '2026-10-25 00:00:00.000Z',
        title: 'City Tour Histórico em Santiago, Cerro Santa Lucía & Funicular San Cristóbal',
        description:
          '• Manhã (09h00): Caminhada guiada pelo centro histórico: Palácio de La Moneda, Praça da Constituição, Plaza de Armas, Catedral Metropolitana e o imponente Cerro Santa Lucía com seus mirantes e terraços em estilo neoclássico.\n• Almoço (12h30): Almoço no Mercado Central ou no charmoso Bairro Lastarria.\n• Tarde (14h30): Subida de funicular e teleférico ao topo do Cerro San Cristóbal (Santuário da Imaculada Conceição) no Parque Metropolitano para contemplar a vista panorâmica da cidade e da Cordilheira dos Andes.\n• Noite: Noite livre para explorar o Pátio Bellavista.\n• Incluso: Transporte, guia bilíngue, ingressos de funicular e teleférico.',
        breakfast: 'Incluso no buffet do hotel',
        lunch: 'Livre no Bairro Lastarria',
        dinner: 'Livre no Patio Bellavista',
        reminders: ['Tênis confortável para caminhadas', 'Protetor solar e garrafinha de água'],
      },
      {
        groupName: 'Grupo Chile Essential Outubro 2026',
        day_number: 3,
        date: '2026-10-26 00:00:00.000Z',
        title: 'Vale do Maipo: Tour na Vinícola Concha y Toro & Vinícola Santa Rita',
        description:
          '• Manhã (09h00): Saída para Pirque. Tour na Vinícola Concha y Toro: jardins da família fundadora, vinhedo de demonstração de cepas nobres, câmara secreta do Casillero del Diablo com projeção de luzes e degustação de 4 rótulos finos com taça gravada de presente.\n• Almoço (12h30): Almoço típico chileno no Restaurante Doña Paula dentro do parque da Vinícola Santa Rita.\n• Tarde (14h30): Visita guiada às adegas históricas dos 120 patriotas na Vinícola Santa Rita, degustação de vinhos Medalha Real e tour cultural no Museu Andino.\n• Retorno a Santiago e noite livre.\n• Incluso: Transfer privativo, tours completos nas 2 vinícolas com degustações, almoço no Doña Paula e entrada no museu.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no Restaurante Doña Paula (Santa Rita)',
        dinner: 'Livre em Santiago',
        reminders: [
          'Casaco leve para as adegas subterrâneas',
          'Espaço na mala para compra de garrafas com preço de produtor',
        ],
      },
      {
        groupName: 'Grupo Chile Essential Outubro 2026',
        day_number: 4,
        date: '2026-10-27 00:00:00.000Z',
        title: 'Costa Chilena: Valparaíso, Viña del Mar & Degustação em Casablanca',
        description:
          '• Manhã (08h30): Viagem rumo ao Oceano Pacífico cruzando a Cordilheira da Costa. Parada na Vinícola Indómita ou Veramonte no Vale de Casablanca para breve degustação de vinhos brancos (Sauvignon Blanc / Chardonnay).\n• Almoço (12h30): Almoço com peixes frescos e frutos do mar com vista para o mar em Viña del Mar.\n• Tarde: Visita a Valparaíso (Patrimônio Mundial da UNESCO): caminhada pelos coloridos Cerros Alegre e Concepción, murais de arte de rua, elevadores históricos e casa La Sebastiana de Pablo Neruda (externa). Em seguida, tour panorâmico por Viña del Mar com parada no famoso Relógio de Flores, orla de Reñaca e Castelo Wulff.\n• Retorno a Santiago no final da tarde.\n• Incluso: Transporte privativo de turismo, degustação no vale de Casablanca, guia bilíngue e almoço com frutos do mar.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço com vista para o Oceano Pacífico em Viña del Mar',
        dinner: 'Livre em Santiago',
        reminders: [
          'Vento costeiro: casaco corta-vento recomendado para o litoral',
          'Calçados firmes para subir as ladeiras e escadarias artísticas de Valparaíso',
        ],
      },
      {
        groupName: 'Grupo Chile Essential Outubro 2026',
        day_number: 5,
        date: '2026-10-28 00:00:00.000Z',
        title: 'Cordilheira dos Andes: Mirantes de Farellones e Valle Nevado',
        description:
          '• Manhã (08h30): Subida cênica da Cordilheira dos Andes através da famosa estrada de curvas. Paradas fotográficas com paisagens majestosas das montanhas andinas.\n• Manhã / Tarde: Visita ao complexo de montanha de Valle Nevado (3.025m) e à charmosa vila de Farellones. Tempo para passear, respirar o ar puro da montanha e tirar fotos incríveis nos mirantes naturais.\n• Almoço (13h00): Almoço revigorante de montanha em Farellones.\n• Tarde: Tempo para descanso e retorno a Santiago no final da tarde.\n• Incluso: Transporte privativo para montanha, guia e almoço em Farellones.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço em restaurante de montanha em Farellones',
        dinner: 'Livre em Santiago (sugestão: Bairro Vitacura)',
        reminders: [
          'Óculos escuros e protetor solar com fator alto',
          'Casaco quente para a altitude da cordilheira',
        ],
      },
      {
        groupName: 'Grupo Chile Essential Outubro 2026',
        day_number: 6,
        date: '2026-10-29 00:00:00.000Z',
        title: 'Mirante Sky Costanera, Bairro Italia & Jantar de Gala de Despedida',
        description:
          '• Manhã (10h00): Passeio cultural pelo charmoso Bairro Italia com suas galerias de design, cafés artesanais e lojas de artesanato local.\n• Almoço (12h30): Almoço livre no Bairro Italia.\n• Tarde (15h30): Subida ao mirante Sky Costanera no 61º e 62º andares para avistar Santiago a 300 metros de altura com o pôr do sol na Cordilheira.\n• Noite (20h00): Jantar de gala de despedida do grupo com menu especial e brinde comemorativo.\n• Incluso: Entrada no Sky Costanera, transfers e jantar de gala completo.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre no Bairro Italia',
        dinner: 'Incluso: Jantar de gala de confraternização do grupo',
        reminders: [
          'Traje especial para o jantar de encerramento',
          'Organizar as malas e guardar souvenirs com proteção',
        ],
      },
      {
        groupName: 'Grupo Chile Essential Outubro 2026',
        day_number: 7,
        date: '2026-10-30 00:00:00.000Z',
        title: 'Check-out & Voo de Retorno ao Brasil',
        description:
          '• Manhã: Café da manhã no hotel, check-out e tempo livre para últimas compras.\n• 12h00: Transfer executivo privativo ao Aeroporto Internacional de Santiago (SCL) com assistência no despacho de bagagens e embarque.\n• Incluso: Transfer privativo hotel-aeroporto.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre antes do voo',
        dinner: 'No voo de volta',
        reminders: [
          'Chegar com 3h de antecedência ao aeroporto',
          'Revisar passaporte ou RG e documentos de viagem',
        ],
      },

      // ==========================================
      // 6. CHILE AVENTURA & ATACAMA - 10 DIAS
      // ==========================================
      {
        groupName: 'Grupo Atacama Mágico Novembro 2026',
        day_number: 1,
        date: '2026-11-15 00:00:00.000Z',
        title: 'Chegada em Santiago & Encontro do Grupo',
        description:
          '• Manhã / Tarde: Chegada em Santiago (SCL), recepção pela Laura Turismo e transfer ao hotel em Las Condes.\n• Tarde: Briefing sobre a expedição ao Atacama, hidratação e aclimatação.\n• Noite: Jantar de boas-vindas no Bairro Bellavista.\n• Incluso: Transfer privativo, hospedagem e jantar de boas-vindas.',
        breakfast: 'No voo / Livre',
        lunch: 'Livre',
        dinner: 'Incluso: Jantar de boas-vindas em Santiago',
        reminders: [
          'Passaporte ou RG original válido',
          'Mochila pequena para os passeios no deserto',
        ],
      },
      {
        groupName: 'Grupo Atacama Mágico Novembro 2026',
        day_number: 2,
        date: '2026-11-16 00:00:00.000Z',
        title: 'City Tour Santiago & Vale do Maipo com Vinícola Concha y Toro',
        description:
          '• Manhã (09h00): City tour histórico pelos principais monumentos de Santiago (La Moneda, Plaza de Armas e Cerro Santa Lucía).\n• Almoço (12h30): Almoço no Bairro Lastarria.\n• Tarde (14h30): Visita à Vinícola Concha y Toro com tour pelas caves do Casillero del Diablo e degustação de 4 vinhos finos.\n• Incluso: Transporte, city tour guiado, tour na vinícola com degustação e almoço.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço no Bairro Lastarria',
        dinner: 'Livre em Santiago',
        reminders: ['Separar mala de mão para o voo do dia seguinte para o Atacama'],
      },
      {
        groupName: 'Grupo Atacama Mágico Novembro 2026',
        day_number: 3,
        date: '2026-11-17 00:00:00.000Z',
        title: 'Voo ao Deserto do Atacama & Pôr do Sol no Vale da Lua',
        description:
          '• Manhã: Transfer ao aeroporto de Santiago e voo para Calama (CJC). Transfer privativo pelo deserto até o pitoresco vilarejo de San Pedro de Atacama (2.400m de altitude).\n• Tarde (15h30): Expedição à Cordilheira de Sal e ao misterioso Vale da Lua: caminhada pelas dunas gigantes, cavernas de sal mineral, formação Três Marias e o espetacular pôr do sol na Pedra do Coyote tingindo a Cordilheira dos Andes de tons avermelhados e violetas com coquetel de boas-vindas no deserto.\n• Noite: Jantar no centrinho de San Pedro de Atacama.\n• Incluso: Transfers privativos, voo interno, ingressos no Vale da Lua, coquetel de pôr do sol e jantar.',
        breakfast: 'Incluso no hotel em Santiago',
        lunch: 'Livre em San Pedro de Atacama',
        dinner: 'Incluso: Jantar no restaurante Adobe ou La Casona em San Pedro',
        reminders: [
          'Protetor solar FPS 50+, chapéu de abas largas, óculos de sol',
          'Levar garrafa de água mínima de 1,5L para a caminhada no Vale da Lua',
          'Casaco para o momento em que o sol se põe (a temperatura cai rapidamente no deserto)',
        ],
      },
      {
        groupName: 'Grupo Atacama Mágico Novembro 2026',
        day_number: 4,
        date: '2026-11-18 00:00:00.000Z',
        title: 'Lagunas Altiplânicas (Miscanti e Miñiques), Salar de Talar & Piedras Rojas',
        description:
          '• Manhã (07h00): Expedição ao Altiplano Atacamenho (4.200m). Visita ao povoado indígena atacamenho de Socaire e subida às deslumbrantes Lagunas Altiplânicas Miscanti e Miñiques com suas águas azul-cobalto cercadas por vulcões imponentes.\n• Tarde: Visita ao cinematográfico Salar de Talar e às famosas Piedras Rojas (formações de rochas avermelhadas contornando um lago esmeralda de beleza sem igual).\n• Almoço: Almoço campestre completo com vista para a Cordilheira dos Andes.\n• Retorno a San Pedro de Atacama no final da tarde.\n• Incluso: Transporte 4x4 especializado, taxas de comunidades indígenas, guia nativo, café da manhã campestre e almoço.',
        breakfast: 'Incluso: Café da manhã campestre no altiplano',
        lunch: 'Incluso: Almoço com gastronomia andina no povoado de Socaire',
        dinner: 'Livre em San Pedro de Atacama',
        reminders: [
          'Roupas em camadas: muito frio pela manhã (próximo de 0°C) e calor à tarde',
          'Bastante água e doces de folha de coca para aclimatação à altitude',
        ],
      },
      {
        groupName: 'Grupo Atacama Mágico Novembro 2026',
        day_number: 5,
        date: '2026-11-19 00:00:00.000Z',
        title: 'Salar do Atacama, Laguna Chaxa (Flamingos) & Flutuação na Laguna Cejar',
        description:
          '• Manhã (08h30): Visita à Reserva Nacional Los Flamencos na Laguna Chaxa, situada no coração do Salar do Atacama. Observação de três espécies de flamingos andinos que se alimentam nas lagoas salinas.\n• Almoço (12h30): Almoço no vilarejo de San Pedro.\n• Tarde (15h00): Experiência única de flutuação nas águas hipersalinas da Laguna Cejar e Laguna Piedra (onde é impossível afundar devido à concentração de sal superior à do Mar Morto). Visita aos impressionantes Ojos del Salar (duas crateras de água doce no meio do deserto) e pôr do sol na Laguna Tebinquiche com coquetel de pisco sour.\n• Incluso: Transporte, entradas nas reservas, coquetel de pôr do sol e acompanhamento de guia.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre em San Pedro',
        dinner: 'Incluso: Jantar no centrinho de San Pedro',
        reminders: [
          'Traje de banho, toalha e chinelo para a Laguna Cejar',
          'Tomar banho de ducha doce imediatamente após a flutuação para retirar o sal',
        ],
      },
      {
        groupName: 'Grupo Atacama Mágico Novembro 2026',
        day_number: 6,
        date: '2026-11-20 00:00:00.000Z',
        title: 'Géiseres del Tatio ao Amanhecer & Povoado Histórico de Machuca',
        description:
          '• Madrugada (04h30): Saída antes do amanhecer para o campo geotérmico dos Géiseres del Tatio (4.320m), o 3º maior do mundo. Espetáculo emocionante de dezenas de colunas de vapor e água fervente jorrando da terra contra o nascer do sol.\n• Café da manhã: Café da manhã quente servido ao lado das fumarolas termais preparado pelo guia.\n• Manhã (09h30): Parada no pitoresco povoado atacamenho de Machuca (casinhas de adobe com teto de palha e a clássica igrejinha andina de San Santiago). Degustação de empanadas artesanais de queijo de cabra e espetinho de lhama.\n• Tarde: Tarde livre em San Pedro para descanso, massagem ou compras na Calle Caracoles.\n• Incluso: Transporte 4x4, ingresso CONAF nos Géiseres, café da manhã especial e guia.',
        breakfast: 'Incluso: Café da manhã quente no campo de géiseres',
        lunch: 'Livre em San Pedro de Atacama',
        dinner: 'Livre em San Pedro',
        reminders: [
          'Obrigatório roupa térmica pesada: a temperatura nos Géiseres ao amanhecer varia de -5°C a -12°C',
          'Luvas, gorro e meias de lã essenciais',
        ],
      },
      {
        groupName: 'Grupo Atacama Mágico Novembro 2026',
        day_number: 7,
        date: '2026-11-21 00:00:00.000Z',
        title: 'Termas de Puritama & Tour Astronômico com Telescópios no Deserto',
        description:
          '• Manhã (09h00): Manhã de relaxamento nas exclusivas Termas de Puritama: oito piscinas naturais de águas termais cristalinas a 33°C no fundo de um cânion rochoso verdejante com propriedades medicinais.\n• Almoço (13h00): Almoço relaxante em San Pedro.\n• Tarde: Tarde livre para passear pela feira de artesanato e museus locais.\n• Noite (21h00): Incrível Tour Astronômico no deserto com o céu mais limpo e estrelado da Terra: observação a olho nu conduzida por astrônomo com laser pointer ensinando as constelações do hemisfério sul e observação através de potentes telescópios profissionais de planetas, nebulosas e aglomerados estelares, finalizando com vinho quente e foto profissional do grupo com a Via Láctea.\n• Incluso: Ingresso nas Termas de Puritama, Tour Astronômico completo com telescópios e astro-fotografia.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre em San Pedro',
        dinner: 'Incluso: Jantar especial em San Pedro',
        reminders: [
          'Roupa de banho e toalha para as Termas de Puritama',
          'Casaco bem quente para a sessão astronômica noturna a céu aberto',
        ],
      },
      {
        groupName: 'Grupo Atacama Mágico Novembro 2026',
        day_number: 8,
        date: '2026-11-22 00:00:00.000Z',
        title: 'Voo de Volta a Santiago & Pôr do Sol no Sky Costanera',
        description:
          '• Manhã: Transfer privativo de San Pedro de Atacama ao Aeroporto de Calama (CJC) e voo de retorno a Santiago.\n• Tarde: Chegada em Santiago, transfer ao hotel e check-in.\n• Fim de tarde: Subida ao mirante Sky Costanera (300m) para contemplar o pôr do sol nos Andes.\n• Noite: Noite livre em Santiago para curtir a gastronomia do Bairro Vitacura.\n• Incluso: Transfers em Calama e Santiago, ingresso Sky Costanera e hospedagem.',
        breakfast: 'Incluso no hotel em San Pedro',
        lunch: 'Livre no aeroporto',
        dinner: 'Livre em Santiago',
        reminders: ['Documentos de viagem à mão para o voo doméstico'],
      },
      {
        groupName: 'Grupo Atacama Mágico Novembro 2026',
        day_number: 9,
        date: '2026-11-23 00:00:00.000Z',
        title: 'Vale de Casablanca: Vinhos Premium na Vinícola Matetic & Jantar de Gala',
        description:
          '• Manhã (09h00): Passeio ao Vale de Casablanca com tour na sofisticada Vinícola Matetic ou Casas del Bosque: visitação às vinhas biodinâmicas e degustação de 4 vinhos finos.\n• Almoço (13h00): Almoço harmonizado de 3 tempos no restaurante da vinícola.\n• Tarde: Retorno a Santiago e tempo livre para compras no Costanera Center.\n• Noite (20h00): Jantar de gala de encerramento da expedição Atacama com brinde de vinhos ícones chilenos.\n• Incluso: Transporte executivo, tour e degustações na vinícola, almoço harmonizado e jantar de gala completo.',
        breakfast: 'Incluso no hotel',
        lunch: 'Incluso: Almoço harmonizado no restaurante da vinícola',
        dinner: 'Incluso: Jantar de gala de despedida com harmonização',
        reminders: [
          'Traje esporte fino para o jantar de gala',
          'Embalar vinhos e artesanatos com cuidado nas malas',
        ],
      },
      {
        groupName: 'Grupo Atacama Mágico Novembro 2026',
        day_number: 10,
        date: '2026-11-24 00:00:00.000Z',
        title: 'Despedida do Chile & Retorno ao Brasil',
        description:
          '• Manhã: Café da manhã no hotel, check-out e transfer privativo ao Aeroporto Internacional de Santiago (SCL) com assistência completa da equipe Laura Turismo no despacho das malas e caixas de vinho.\n• Voo de regresso ao Brasil.\n• Incluso: Transfer privativo hotel-aeroporto com suporte da equipe.',
        breakfast: 'Incluso no hotel',
        lunch: 'Livre no aeroporto',
        dinner: 'No voo internacional',
        reminders: [
          'Chegar com 3h de antecedência ao balcão da companhia aérea',
          'Verificar todas as caixas de vinhos e bagagens despachadas',
        ],
      },
    ]

    // 4. Salvar ou atualizar todos os roteiros diários
    detailedSchedules.forEach((s) => {
      const groupRecord = groupMap[s.groupName]
      if (!groupRecord) return

      let existing = []
      try {
        existing = app.findRecordsByFilter(
          'daily_schedules',
          'group = "' + groupRecord.id + '" && day_number = ' + s.day_number,
          '',
          1,
          0,
        )
      } catch (_) {}

      let rec
      if (existing.length > 0) {
        rec = existing[0]
      } else {
        rec = new Record(dailyCol)
      }

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
    // down migration
  },
)
