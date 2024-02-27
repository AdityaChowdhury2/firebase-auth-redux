import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    user: null,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        authLoading: (state) => {
            state.loading = true
        },
        login: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        loginError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.loading = false
            state.user = null
        }

    }
})

export const { login, logout, authLoading, loginError } = authSlice.actions
export default authSlice.reducer