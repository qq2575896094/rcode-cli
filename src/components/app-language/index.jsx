import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Menu } from 'antd'
import CustomIcon from '@components/custom-icon'

const languageIconMap = {
    'en-US': 'icon-zhongyingwenyingwen',
    'zh-CN': 'icon-a-zhongyingwenzhongwen'
}

function AppLanguage({
    language,
    languages
}) {
    const changeLanguage = (val) => {
        console.log(val)
    }

    const menuItems = React.useMemo(() => {
        const items = languages.map(({ name, value }) => ({
            label: name,
            key: value
        }))
        return <Menu items={items} onClick={changeLanguage} />
    }, [JSON.stringify(language)])

    return (
        <div className="user-dropdown">
            <Dropdown overlay={menuItems}>
                <CustomIcon type={languageIconMap[language]} />
            </Dropdown>
        </div>
    )
}

AppLanguage.defaultProps = {
    language: 'zh-CN'
}

AppLanguage.propTypes = {
    language: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired
}

export default AppLanguage
