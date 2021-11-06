import { combineReducers } from 'redux'

import postReducer from './postReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    posts: postReducer

})

export default rootReducer;
