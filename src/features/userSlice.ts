import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

type User = {
  id: number | null
  token: string | null
  fullUser: any
}

const initialState: User = {
  id: null,
  token: null,
  fullUser: null,
}

export const setSelectedUserId = createAsyncThunk(
  'user/setSelectedUserId',
  (args: { selectedUserId: number | null }) => {
    const { selectedUserId } = args

    return {
      selectedUserId,
    }
  },
)

export const setSelectedUser = createAsyncThunk(
  'user/setSelectedUser',
  (args: { selectedUser: any }) => {
    const { selectedUser } = args

    return {
      selectedUser,
    }
  },
)

export const setSelectedUserToken = createAsyncThunk(
  'user/setSelectedUserToken',
  (args: { selectedUserToken: string | null }) => {
    const { selectedUserToken } = args

    return {
      selectedUserToken,
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSelectedUserId.fulfilled, (state, action) => {
      state.id = action.payload.selectedUserId
    })
    builder.addCase(setSelectedUser.fulfilled, (state, action) => {
      state.fullUser = action.payload.selectedUser
    })
    builder.addCase(setSelectedUserToken.fulfilled, (state, action) => {
      state.token = action.payload.selectedUserToken
    })
  },
})

export const selectedUserId = (state: RootState) => state.user.id

export const selectedUser = (state: RootState) => state.user.fullUser

export const selectedUserToken = (state: RootState) => state.user.token

export default userSlice
