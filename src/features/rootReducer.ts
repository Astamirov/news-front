import { combineReducers } from 'redux';
import applicationReducer from './applicationSlice';
import authReducer from './authSlice';
import usersReducer from './usersSlice';


const rootReducer = combineReducers({
    application: applicationReducer,
    auth: authReducer,
    user: usersReducer
  });
  
  export default rootReducer;