import React from 'react'
import { Layout } from 'antd'
import Header from '@components/header'
import Footer from '@components/footer'
import Slider from '@components/slider'

import './scss/index.scss'

function App() {
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
