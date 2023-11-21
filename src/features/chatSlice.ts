import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

type Chat = {
  id: number | null
}

const initialState: Chat = {
  id: null,
}

export const setSelectedChatId = createAsyncThunk(
  'chat/setSelectedChatId',
  (args: { selectedChatId: number | null }) => {
    const { selectedChatId } = args

    return {
      selectedChatId,
    }
  },
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedChatId.fulfilled, (state, action) => {
      state.id = action.payload.selectedChatId
    })
  },
})

export const selectChatId = (state: RootState) => state.chat.id

export default chatSlice
