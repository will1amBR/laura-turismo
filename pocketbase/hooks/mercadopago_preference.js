/**
 * Hook para criar preferência de pagamento no MercadoPago (Checkout Pro).
 *
 * Se o segredo MERCADOPAGO_ACCESS_TOKEN estiver configurado no Skip Cloud,
 * chama a API oficial do MercadoPago (/v1/checkout/preferences) e retorna
 * o init_point (URL de pagamento para o cliente).
 *
 * Instruções para produção:
 * Configure a variável MERCADOPAGO_ACCESS_TOKEN nos secrets do Skip Cloud com seu Access Token de Produção
 * ou Testes do Mercado Pago.
 */

routerAdd('POST', '/api/mercadopago/create-preference', (e) => {
  const token =
    $os.getenv('MERCADOPAGO_ACCESS_TOKEN') || $secrets.get('MERCADOPAGO_ACCESS_TOKEN') || ''
  const body = e.requestInfo().body || {}

  const title = body.title || 'Taxa de Reserva de Vaga - Laura Turismo'
  const quantity = body.quantity || 1
  const price = body.unit_price || 200.0
  const groupId = body.groupId || ''
  const userId = body.userId || ''

  // Se não houver token configurado, retorna modo simulado estruturado com instruções
  if (!token) {
    return e.json(200, {
      simulated: true,
      message:
        'MercadoPago em modo de homologação/simulação. Para ativar checkout real, configure o secret MERCADOPAGO_ACCESS_TOKEN.',
      preference_id: 'simulated_pref_' + $security.randomString(12),
      init_point: null,
    })
  }

  // Chamada oficial à API do Mercado Pago
  try {
    const siteUrl = $os.getenv('SITE_URL') || 'https://lauraturismo.com.br'

    const payload = {
      items: [
        {
          title: title,
          quantity: Number(quantity),
          unit_price: Number(price),
          currency_id: 'BRL',
        },
      ],
      metadata: {
        group_id: groupId,
        user_id: userId,
      },
      back_urls: {
        success: siteUrl + '/grupo/' + groupId + '?status=approved',
        failure: siteUrl + '/pagamento/' + groupId + '?status=failure',
        pending: siteUrl + '/grupo/' + groupId + '?status=pending',
      },
      auto_return: 'approved',
    }

    const response = $http.send({
      url: 'https://api.mercadopago.com/checkout/preferences',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(payload),
      timeout: 20,
    })

    if (response.statusCode >= 200 && response.statusCode < 300) {
      const data = response.json
      return e.json(200, {
        simulated: false,
        preference_id: data.id,
        init_point: data.init_point || data.sandbox_init_point,
      })
    } else {
      return e.json(response.statusCode, {
        error: 'Erro ao comunicar com MercadoPago',
        details: response.json,
      })
    }
  } catch (err) {
    return e.json(500, {
      error: 'Erro interno ao processar pagamento',
      message: String(err),
    })
  }
})
