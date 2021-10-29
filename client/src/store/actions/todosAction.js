import axios from "axios"

export const getTodos = () => async dispatch => {
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/todos?_limit=6'
        )
        dispatch({
            type: 'GET_TODOS',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const addTodo = (todo) => dispatch => {
    dispatch({
        type: 'ADD_TODO',
        payload: todo
    })
}

export const deleteTodo = (todo) => dispatch => {
    dispatch({
        type: 'DELETE_TODO',
        payload: todo
    })
}