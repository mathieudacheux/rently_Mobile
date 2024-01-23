import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import calendarSlice from '../features/calendarSlice'
import chatSlice from '../features/chatSlice'
import propertySlice from '../features/propertySlice'
import userSlice from '../features/userSlice'

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [calendarSlice.name]: calendarSlice.reducer,
    [propertySlice.name]: propertySlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
