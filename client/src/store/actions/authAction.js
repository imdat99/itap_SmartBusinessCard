import axios from "axios"
import { apiUrl, TOKEN_KEY_NAME } from "../constantsValue"
import setAuthToken from "../../ultis/aetAuthHeader"
export const SET_AUTH = 'SET_AUTH'

const initAuth = {
    type: SET_AUTH,
    payload: {
        authLoading: true,
        isAuthenticated: false,
        user: null
    }
}

export const loadUser = () => async dispatch => {
    if (localStorage[TOKEN_KEY_NAME]) {
        setAuthToken(localStorage[TOKEN_KEY_NAME])
        try {
            const response = await axios.get(`${apiUrl}/auth/`)
            if (response.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        authLoading: false,
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
            else {
                localStorage.removeItem(TOKEN_KEY_NAME)
                setAuthToken(null)
                dispatch(initAuth)
            }
        }
        catch (err) {
            localStorage.removeItem(TOKEN_KEY_NAME)
            setAuthToken(null)
            dispatch(initAuth)
        }
    } else { dispatch(initAuth) }


}

export const getLogin = (loginInfo) => async dispatch => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, loginInfo)
        if (response.data.success) {
            localStorage.setItem(TOKEN_KEY_NAME, response.data.accessToken)
            setAuthToken(localStorage[TOKEN_KEY_NAME])
            try {
                const response2 = await axios.get(`${apiUrl}/auth/`)
                if (response2.data.success) {
                    dispatch({
                        type: SET_AUTH,
                        payload: {
                            authLoading: false,
                            isAuthenticated: true,
                            user: response2.data.user
                        }
                    })
                }
                else {
                    localStorage.removeItem(TOKEN_KEY_NAME)
                    setAuthToken(null)
                    dispatch(initAuth)
                }
            }
            catch (err) {
                localStorage.removeItem(TOKEN_KEY_NAME)
                setAuthToken(null)
                dispatch(initAuth)
            }
        }

    } catch (error) {
        dispatch(initAuth)
        return error.response
    }
}

export const getRegister = (regData) => async dispatch => {
    try {
        const response = await axios.post(`${apiUrl}/auth/register`, regData)
        if (response.data.success) {
            localStorage.setItem(TOKEN_KEY_NAME, response.data.accessToken)
            setAuthToken(localStorage[TOKEN_KEY_NAME])
            try {
                const response2 = await axios.get(`${apiUrl}/auth/`)
                if (response2.data.success) {
                    dispatch({
                        type: SET_AUTH,
                        payload: {
                            authLoading: false,
                            isAuthenticated: true,
                            user: response2.data.user
                        }
                    })
                }
                else {
                    localStorage.removeItem(TOKEN_KEY_NAME)
                    setAuthToken(null)
                    dispatch(initAuth)
                }
            }
            catch (err) {
                localStorage.removeItem(TOKEN_KEY_NAME)
                setAuthToken(null)
                dispatch(initAuth)
            }
        }

    } catch (error) {
        dispatch(initAuth)
        return error.response
    }
}

export const getLogout = () => dispatch => {
    localStorage.removeItem(TOKEN_KEY_NAME)
    dispatch(initAuth)
}