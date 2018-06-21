import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './User';
import authReducer from './Auth';
import loginReducer from './Login';
import registrationReducer from './Registration';
import businessReducer from './Business';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    isAuth: authReducer,
    login: loginReducer,
    register: registrationReducer,
    business: businessReducer,
});

export default rootReducer;