import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'



export const CalendarApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
