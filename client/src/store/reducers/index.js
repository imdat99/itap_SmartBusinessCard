import { combineReducers } from 'redux'

import postReducer from './postReducer';
import authReducer from './authReducer';
import todoReducer from './todoReducer'

const rootReducer = combineReducers({
    todo: todoReducer,
    auth: authReducer,
    posts: postReducer

})

export default rootReducer;
