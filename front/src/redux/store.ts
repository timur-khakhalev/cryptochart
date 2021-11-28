import { configureStore } from '@reduxjs/toolkit'
import getWsSliceReducer from './slice'

export const store = configureStore({
    reducer: {
        getWsSlice: getWsSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
