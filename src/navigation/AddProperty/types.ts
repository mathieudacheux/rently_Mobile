type PropertyAddFormik = {
  name: string
  description: string
  signature_date: string
  property_type: number
  price: number
  surface: string
  land_size: string
  bathroom: number
  kitchen: number
  toilet: number
  bedroom: number
  elevator: boolean
  balcony: boolean
  terrace: boolean
  cellar: boolean
  parking: boolean
  number_room: number
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
  year_construction: number
  owner_id: number
  status_id: number
  tenant_id: number
  dpe: number
  agency_id: number
  agent_id: number
  agent_mail: string
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
