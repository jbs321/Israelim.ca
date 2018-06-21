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
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
        contrastThreshold: 3,
    },
    // breakpoints: {
    //     keys: ['xs', 'sm', 'md', 'lg'],
    //     values: [0, 768, 992, 1200],
    // },
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

