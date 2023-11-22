import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

type Calendar = {
  appointmentId: number | null
}

const initialState: Calendar = {
  appointmentId: null,
}

export const setSelectedAppointment = createAsyncThunk(
  'calendar/setSelectedAppointment',
  (args: { selectedAppointmentId: number | null }) => {
    const { selectedAppointmentId } = args

    return {
      selectedAppointmentId,
    }
  },
)

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedAppointment.fulfilled, (state, action) => {
      state.appointmentId = action.payload.selectedAppointmentId
    })
  },
})

export const selectedAppointmentId = (state: RootState) =>
  state.calendar.appointmentId

export default calendarSlice
