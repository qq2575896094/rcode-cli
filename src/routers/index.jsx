import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import Login from '@page/login'
import App from '@components/app'

// 获取routes下面的所有的路由
const routers = []
const routeContext = require.context('./routes', false, /\.jsx$/)

routeContext.keys().forEach((key) => {
    const context = routeContext(key)
    const routes = context.default || context

    routers.push(...routes)
})

const rootRouters = [
    {
        path: '/',
        element: <Navigate to="/login" />,
    },
    {
        path: '/login',
        element: <Login />, // Helper.lazyLoad(React.lazy(() => import('@page/login')))
    },
    {
        path: '/app',
        element: <App />,
        meta: {
            requireAuth: true,
            title: '',
            key: 'app',
        },
        children: [
            ...routers,
        ],
    },
    {
        path: '*',
        element: <Navigate to="/app/404" />,
    },
]

export default () => createBrowserRouter(rootRouters)
