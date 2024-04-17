import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

type Chat = {
  id: number | null
  name: string
}

const initialState: Chat = {
  id: null,
  name: '',
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

export const setSelectedChatName = createAsyncThunk(
  'chat/setSelectedChatName',
  (args: { selectedChatName: string }) => {
    const { selectedChatName } = args

    return {
      selectedChatName,
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
    builder.addCase(setSelectedChatName.fulfilled, (state, action) => {
      state.name = action.payload.selectedChatName
    })
  },
})

export const selectChatId = (state: RootState) => state.chat.id
export const selectChatName = (state: RootState) => state.chat.name

export default chatSlice
