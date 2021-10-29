import { SET_AUTH } from "../actions/authAction";

const initialState = {
    authLoading: true,
    isAuthenticated: false,
    user: null
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH: {
            return { ...state, ...action.payload }
        }
        default:
            return state
    }
}
export default authReducer