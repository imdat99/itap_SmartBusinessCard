const todoReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO': {
            return [...state, ...action.payload]

        }
        case 'GET_TODOS': {
            return [...state, ...action.payload]

        }
        case 'DELETE_TODO': {
            const newTodo = [...state]
            const index = newTodo.indexOf(action.payload)
            if (index > -1) {
                newTodo.splice(index, 1)
            }
            return newTodo
        }
        default:
            return state
    }
}

export default todoReducer
