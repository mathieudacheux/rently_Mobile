import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import propertySlice from '../features/propertySlice'

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [propertySlice.name]: propertySlice.reducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
