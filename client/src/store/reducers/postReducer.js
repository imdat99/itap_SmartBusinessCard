import { POST_lOADED, ADD_POST, DELETE_POST, UPDATE_POST, initPost } from "../actions/postsAction"
const postReducer = (state = initPost, action) => {
    switch (action.type) {
        case POST_lOADED: {
            return {
                ...state,
                posts: action.payload,
                postsLoading: false
            }
        }
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        }
        case UPDATE_POST:
            const newPosts = state.posts.map(post =>
                post._id === action.payload._id ? action.payload : post
            )

            return {
                ...state,
                posts: newPosts
            }
        default:
            return state
    }
}
export default postReducer