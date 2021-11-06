import axios from "axios"
import { apiUrl } from "../constantsValue"
export const PROFILE_LOADED = 'PROFILE_LOADED'
export const PROFILE_UPDATED = 'PROFILE_UPDATED'


export const getProfile = () => async dispatch => {
    try {
        const response = await axios.get(`${apiUrl}/profile`)
        if (response.data.success)
            dispatch({
                type: 'PROFILE_LOADED',
                payload: response.data.Profile
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = (updateData) => async dispatch => {
    try {
        const response = await axios.put(`${apiUrl}/profile`, updateData)
        if (response.data.success)
            dispatch({
                type: 'PROFILE_UPDATED',
                payload: response.data.Profile
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}