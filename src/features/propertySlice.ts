import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

type Property = {
  id: number | null
  fullUser: any
}

const initialState: Property = {
  id: null,
  fullUser: null,
}

export const setSelectedPropertyId = createAsyncThunk(
  'property/setSelectedPropertyId',
  (args: { selectedPropertyId: number | null }) => {
    const { selectedPropertyId } = args

    return {
      selectedPropertyId,
    }
  },
)

export const setSelectedProperty = createAsyncThunk(
  'property/setSelectedProperty',
  (args: { selectedProperty: any }) => {
    const { selectedProperty } = args

    return {
      selectedProperty,
    }
  },
)

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedPropertyId.fulfilled, (state, action) => {
      state.id = action.payload.selectedPropertyId
    })
    builder.addCase(setSelectedProperty.fulfilled, (state, action) => {
      state.fullUser = action.payload.selectedProperty
    })
  },
})

export const selectedPropertyId = (state: RootState) => state.property.id

export const selectedProperty = (state: RootState) => state.property.fullUser

export default propertySlice
