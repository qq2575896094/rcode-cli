import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import ErrorBoundary from '@components/error-boundary'

import getRouter from '@/routers'
import store from '@/store'

import './css/index.scss'

createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <Provider store={store}>
                <RouterProvider router={getRouter()} fallbackElement={<ErrorBoundary />} />
            </Provider>
        </React.StrictMode>,
    )
