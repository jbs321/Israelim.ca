import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './User';
import authReducer from './Auth';
import loginReducer from './Login';
import registrationReducer from './Registration';
import businessReducer from './Business';
import businessViewReducer from './BusinessView';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    login: loginReducer,
    isAuth: authReducer,
    register: registrationReducer,
    business: businessReducer,
    businessView: businessViewReducer,
});

export default rootReducer;