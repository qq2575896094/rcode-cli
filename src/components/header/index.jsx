import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import UserDropdown from '@components/user-dropdown'

import './scss/index.scss'

const noop = () => {}

function Header({
    collapsed,
    setCollapsed,
}) {
    const userInfo = useSelector((state) => state.userInfo)

    const dropdownList = [
        {
            label: '个人信息',
            key: 'userInfo',
            disabled: false,
            divider: false,
        },
        {
            label: '修改密码',
            key: 'changePassword',
            disabled: false,
            divider: false,
        },
        {
            label: '退出',
            key: 'logout',
            disabled: false,
            divider: true,
        },
    ]

    const userDropdownClick = ({ key }) => {
        console.log(key, 'userDropdownClick')
    }

    return (
        <Layout.Header className="app-header">
            <div className="slider-collapse-btn">
                {
                    collapsed
                        ? <MenuUnfoldOutlined onClick={() => setCollapsed(false)} />
                        : <MenuFoldOutlined onClick={() => setCollapsed(true)} />
                }
            </div>
            <div className="header-menu-wrapper" />
            <div className="header-action-wrapper">
                <UserDropdown
                    username={userInfo.username}
                    avatar={userInfo.avatar}
                    list={dropdownList}
                    onClick={userDropdownClick}
                />
            </div>
        </Layout.Header>
    )
}

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
}

Header.defaultProps = {
    collapsed: false,
    setCollapsed: noop,
}

export default Header
