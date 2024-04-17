type PropertyAddFormik = {
  name: string
  description: string
  signature_date: string
  property_type: number | null
  price: number | null
  surface: string
  land_size: string
  bathroom: number | null
  kitchen: number | null
  toilet: number | null
  bedroom: number | null
  elevator: boolean
  balcony: boolean
  terrace: boolean
  cellar: boolean
  parking: boolean
  number_room: number | null
  pool: boolean
  caretaker: boolean
  fiber_deployed: boolean
  duplex: boolean
  top_floor: boolean
  garage: boolean
  work_done: boolean
  life_annuity: boolean
  ground_floor: boolean
  land_size_1: string
  garden: boolean
  draft: boolean
  year_construction: number | null
  owner_id: number | null
  status_id: number | null
  tenant_id: number | null
  dpe: number | null
  agency_id: number
  agent_id: number
  agent_mail: string
  full_address: string
  address: {
    address: string
    city: string
    full_address: string
    latitude: string
    longitude: string
    post_code: string
  }
}

export type { PropertyAddFormik }
