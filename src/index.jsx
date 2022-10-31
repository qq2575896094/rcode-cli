import React from 'react'
import { createRoot } from 'react-dom/client'
import Login from './page/login'

import './css/index.scss'

createRoot(document.getElementById('root'))
    .render(<Login />)
