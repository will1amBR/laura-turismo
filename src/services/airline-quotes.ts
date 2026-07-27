import pb from '@/lib/pocketbase/client'

export interface AirlineQuoteRecord {
  id: string
  group: string
  airline_name: string
  departure_airport: string
  arrival_airport: string
  departure_date: string
  return_date: string
  price_cents: number
  notes: string
  created: string
  updated: string
}

export const getGroupQuotes = (groupId: string) =>
  pb.collection('airline_quotes').getFullList<AirlineQuoteRecord>({
    filter: `group = "${groupId}"`,
    sort: 'departure_date',
  })

export const createQuote = (data: Partial<AirlineQuoteRecord>) =>
  pb.collection('airline_quotes').create<AirlineQuoteRecord>(data)

export const updateQuote = (id: string, data: Partial<AirlineQuoteRecord>) =>
  pb.collection('airline_quotes').update<AirlineQuoteRecord>(id, data)

export const deleteQuote = (id: string) => pb.collection('airline_quotes').delete(id)
