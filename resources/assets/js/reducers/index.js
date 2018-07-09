import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './User';
import authReducer from './Auth';
import loginReducer from './Login';
import businessReducer from './Business';
import businessViewReducer from './BusinessView';
import registerBusinessReducer from './RegisterBusiness';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    login: loginReducer,
    isAuth: authReducer,
    business: businessReducer,
    businessView: businessViewReducer,
    registerBusiness: registerBusinessReducer,
});

export default rootReducer;