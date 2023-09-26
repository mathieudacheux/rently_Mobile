type Appointment = {
  appointment_id: number
  tag_id: number
  date_start: string
  date_end: string
  note: string
  reminder: string
  property_id: number
  user_id_1: number
  user_id_2: number
}

type Tag = {
  appointment_tag_id: number
  label: string
}

export { Appointment, Tag }
