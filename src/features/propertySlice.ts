import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

type Property = {
  id: number | null
  fullProperty: any
}

const initialState: Property = {
  id: null,
  fullProperty: null,
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
      state.fullProperty = action.payload.selectedProperty
    })
  },
})

export const selectPropertyId = (state: RootState) => state.property.id

export const selectProperty = (state: RootState) => state.property.fullProperty

export default propertySlice
