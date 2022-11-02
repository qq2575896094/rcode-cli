import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    language: '', // 当前系统语言
    theme: '', // 当前系统主题
}

const reducers = {
    /**
     * 更新系统主题
     * @param state
     * @param action
     */
    updateTheme: (state, action) => ({
        ...state,
        theme: action.payload,
    }),

    /**
     * 更新系统语言
     * @param state
     * @param action
     */
    updateLanguage: (state, action) => ({
        ...state,
        language: action.payload,
    }),
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers,
})

export const globalAction = globalSlice.actions

export default globalSlice.reducer
