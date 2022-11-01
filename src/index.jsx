import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import getRouter from '@/routers'
import ErrorBoundary from '@components/error-boundary'

import './css/index.scss'

createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <RouterProvider router={getRouter()} fallbackElement={<ErrorBoundary />} />
        </React.StrictMode>,
    )
