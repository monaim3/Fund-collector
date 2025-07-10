// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'
import commonReducer from './Slice/commonSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
