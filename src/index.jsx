import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Root from '@components/root'

import store from '@/store'

import './css/index.scss'

createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <Provider store={store}>
                <Root />
            </Provider>
        </React.StrictMode>,
    )
