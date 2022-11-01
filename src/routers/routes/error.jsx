import React from 'react'
import Helper from '@/helper'

const errorRoute = [
    {
        path: '/404',
        element: Helper.lazyLoad(React.lazy(() => import('@components/error-404'))),
        meta: {
            requireAuth: false,
            title: '404页面',
            key: '404',
        },
    },
    {
        path: '/500',
        element: Helper.lazyLoad(React.lazy(() => import('@components/error-500'))),
        meta: {
            requireAuth: false,
            title: '500页面',
            key: '500',
        },
    },
]

export default errorRoute
