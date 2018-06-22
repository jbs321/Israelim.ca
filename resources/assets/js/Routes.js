import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from "./form/Login";
import Welcome from "./page/welcome";
import BusinessRegistrationPage from "./page/BusinessRegistrationPage";
import RegisterBusinessInformation from "./form/Registration/RegisterBusinessInformation";
import FileUploadPageTest from "./page/FileUploadPageTest";

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={BusinessRegistrationPage}/>
                <Route path="/register2" component={RegisterBusinessInformation}/>
                <Route path="/test" component={FileUploadPageTest}/>
                <Route exact path="/" component={Welcome}/>
            </Switch>
        );
    }
}