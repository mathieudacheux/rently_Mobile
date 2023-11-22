import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import calendarSlice from '../features/calendarSlice'
import propertySlice from '../features/propertySlice'
import chatSlice from '../features/chatSlice'

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
