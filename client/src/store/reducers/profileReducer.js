import { PROFILE_LOADED, PROFILE_UPDATED } from "../actions/profileAction"

const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_LOADED: {
            return { ...action.payload }

        }
        case PROFILE_UPDATED: {
            return { ...state, ...action.payload }

        }
        default:
            return state
    }
}

export default profileReducer
