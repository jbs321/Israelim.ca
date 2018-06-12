import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {Router} from 'react-router-dom';
// import {MuiThemeProvider} from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import promise from 'redux-promise';
import reducers from './reducers';
import {createStore, applyMiddleware} from 'redux';
import history from './history';
import App from "./app";
import _ from 'lodash';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});


/**
 * Set global setting for Axios
 * https://github.com/mzabriskie/axios
 */
axios.defaults.baseURL = "/api";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (_.has(localStorage, 'token_type') && _.has(localStorage, 'access_token')) {
    axios.defaults.headers.common['Authorization']
        = localStorage.getItem('token_type') + " " + localStorage.getItem('access_token');
}


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <App/>
            </Router>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));

