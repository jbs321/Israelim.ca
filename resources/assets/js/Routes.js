import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from "./form/Login";
import WelcomePage from "./page/WelcomePage";
import BusinessViewPage from "./page/BusinessViewPage";
import BusinessRegisterPage from './page/BusinessRegisterPage'
import NotFound from './page/NotFound'

//Routes that belong to protected and not-protected routes
export const Shared = () => (
    <Switch>
        <Route exact path="/business/:id" component={BusinessViewPage}/>
        <Route exact path="/" component={WelcomePage}/>
        <Route path="/" component={NotFound}/>
    </Switch>
);

export const ProtectedRoutes = () => (
    <Switch>
        <Route exact path="/register/business" component={BusinessRegisterPage}/>
        <Shared/>
    </Switch>
);

export const NotProtectedRoutes = () => (
    <Switch>
        {/*<Route path="/test" component={FileUploadPageTest}/>*/}
        <Route exact path="/login" component={Login}/>
        <Shared/>
    </Switch>
);
