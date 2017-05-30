import { combineReducers } from 'redux';
import auth from './authReducer';
import search from './searchReducer';



export default combineReducers({
    auth,
    search
});
