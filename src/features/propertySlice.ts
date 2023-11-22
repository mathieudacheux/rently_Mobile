import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

type Property = {
  id: number | null
  fullProperty: any
  propertyImages: any
}

const initialState: Property = {
  id: null,
  fullProperty: null,
  propertyImages: null,
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

export const setSelectedPropertyImages = createAsyncThunk(
  'property/setSelectedPropertyImages',
  (args: { selectedPropertyImages: any }) => {
    const { selectedPropertyImages } = args

    return {
      selectedPropertyImages,
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
    builder.addCase(setSelectedPropertyImages.fulfilled, (state, action) => {
      state.propertyImages = action.payload.selectedPropertyImages
    })
  },
})

export const selectPropertyId = (state: RootState) => state.property.id

export const selectProperty = (state: RootState) => state.property.fullProperty

export const selectPropertyImages = (state: RootState) =>
  state.property.propertyImages

export default propertySlice
