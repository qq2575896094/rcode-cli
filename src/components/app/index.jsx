import React from 'react'
import { Layout } from 'antd'
import Header from '@components/header'
import Footer from '@components/footer'
import Slider from '@components/slider'

import { useDispatch } from 'react-redux'

import './scss/index.scss'
import { getUserInfoAction } from '@page/login/api'

function App() {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getUserInfoAction())
    }, [])

    return (
        <Layout className="app-container">
            <Slider />
            <Layout>
                <Header systemName="WELCOME" />
                <Layout.Content>
                    content
                </Layout.Content>
                <Footer />
            </Layout>
        </Layout>
    )
}

export default App
