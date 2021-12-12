import { configureStore } from '@reduxjs/toolkit'
import getWsSliceReducer from './slice'

export const store = configureStore({
    reducer: {
        getWsSlice: getWsSliceReducer,
        setSortBy: getWsSliceReducer,
        setCoins: getWsSliceReducer,
        getData: getWsSliceReducer,
        searchField: getWsSliceReducer,
        pagination: getWsSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
