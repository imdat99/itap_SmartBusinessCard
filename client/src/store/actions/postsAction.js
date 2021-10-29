import axios from "axios"
import { apiUrl } from "../constantsValue"

export const UPDATE_POST = 'UPDATE_POST'
export const POST_lOADED = 'POST_LOADED'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const initPost = {
    posts: [],
    postsLoading: true
}
export const getPosts = () => async dispatch => {
    try {
        const response = await axios.get(`${apiUrl}/links`)
        if (response.data.success) {
            // console.log(response)
            dispatch({
                type: POST_lOADED,
                payload: response.data.allLinks
            })
        }
    }
    catch (err) {
        console.log(err)
        dispatch({
            type: POST_lOADED,
            payload: []
        })
        return err.response
    }
}
export const addPost = newPost => async dispatch => {
    try {
        const response = await axios.post(`${apiUrl}/Links`, newPost)
        if (response.data.success) {
            // console.log(response)
            dispatch({
                type: ADD_POST,
                payload: response.data.link
            })
            return response.data
        }
    } catch (err) {
        console.log(err)
        return err.response
    }
}

export const deletePost = id => async dispatch => {
    try {
        const response = await axios.delete(`${apiUrl}/links/${id}`)
        if (response.data.success)
            dispatch({ type: DELETE_POST, payload: id })
    }
    catch (err) {
        console.log(err)
    }
}
export const updatePost = updateData => async dispatch => {
    try {
        const response = await axios.put(
            `${apiUrl}/links/${updateData._id}`,
            updateData
        )
        if (response.data.success) {
            dispatch({ type: UPDATE_POST, payload: response.data.link })
            return response.data
        }
    } catch (error) {
        return error.response.data
            ? error.response.data
            : { success: false, message: 'Server error' }
    }
}
