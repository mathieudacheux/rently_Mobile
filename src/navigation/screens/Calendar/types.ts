type Appointment = {
  dateStart: string
  appointments: {
    appointment_id: number
    tag_id: number
    date_start: Date
    date_end: Date | null
    note: string | null
    reminder: Date | null
    created_at: Date
    updated_at: Date | null
    deleted_at: Date | null
    property_id: number | null
    user_id_1: number
    user_id_2: number | null
  }[]
}

type Tag = {
  appointment_tag_id: number
  label: string
}

type Property = {
  property_id: number
  name: string
  description: string
  signature_date: Date | null
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
  created_at: Date
  updated_at: Date | null
  deleted_at: Date | null
  owner_id: number
  status_id: number
  tenant_id: number | null
  address_id: number
  city?: string
  zipcode?: string
  way?: string
  latitude?: number
  longitude?: number
  dpe: number
  agency_id: number
  agent_id: number | null
  agent_firstname?: string | null
  agent_name?: string | null
  agent_phone?: string | null
  agent_mail?: string
}

export { Appointment, Tag, Property }
