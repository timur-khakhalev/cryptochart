import { configureStore } from '@reduxjs/toolkit'
import getWsSliceReducer, { getWsSlice } from './slice'

export const store = configureStore({
    reducer: {
        getWsSlice: getWsSliceReducer,
        setSortBy: getWsSliceReducer,
        pairFiltering: getWsSliceReducer,
        searchField: getWsSliceReducer,
        pagination: getWsSliceReducer,
        getKlineFromDb: getWsSliceReducer,
        snackToggle: getWsSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
