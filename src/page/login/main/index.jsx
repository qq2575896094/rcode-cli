import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    Form, Input, Radio, Button,
} from 'antd'
import classNames from 'classnames'
import CustomIcon from '@components/custom-icon'
import particlesJs from '@/plugins/particles'
import particlesJson from '@/plugins/particlesjs-config'

import { loginAction } from '@page/login/api'

import './scss/index.scss'

function Login() {
    const [isSignIn, setIsSignIn] = React.useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const signIn = () => {
        setIsSignIn(false)
    }

    const handleSignIn = async (data) => {
        dispatch(loginAction(data)).then(({ payload: response }) => {
            if (response.statusCode === 200) navigate('/app')
        })
    }

    const signUp = () => {
        setIsSignIn(true)
    }

    const onFinish = (values) => {
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo)
    }

    const userTypeChange = () => {

    }

    React.useEffect(() => {
        particlesJs('particles', particlesJson)
    }, [])

    return (
        <div className="login-page">
            <div className={classNames('container', { 'right-panel-active': isSignIn })}>
                <div className="container-form container-signup">
                    <Form
                        name="basic-sign-in"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h2 className="system-header">Sign Up</h2>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                prefix={<CustomIcon type="icon-yonghuming" />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<CustomIcon type="icon-password" />}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="form-button">注 册</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="container-form container-signin">
                    <Form
                        name="basic-sign-up"
                        initialValues={{
                            userType: 'User',
                        }}
                        onFinish={handleSignIn}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h2 className="system-header">WELCOME</h2>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                prefix={<CustomIcon type="icon-yonghuming" />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<CustomIcon type="icon-password" />}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item name="userType" className="user-type-form-item">
                            <Radio.Group onChange={userTypeChange}>
                                <Radio value="User">用户</Radio>
                                <Radio value="Admin">管理员</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="form-button">登 录</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="container-overlay">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <button type="button" className="toggle-btn hidden" onClick={signIn}>去 注 册</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <button type="button" className="toggle-btn hidden" onClick={signUp}>去 登 录</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="particles" />
        </div>
    )
}

export default Login
