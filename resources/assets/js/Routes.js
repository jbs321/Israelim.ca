import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HomePage from "./page/home";
import ProfilePage from "./page/ProfilePage";
import RegisterBusinessInformation from "./form/RegisterBusinessInformation";
import FullRegistrationStepper from "./form/FullRegistrationStepper";

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/register" component={FullRegistrationStepper}/>
                <Route path="/register2" component={RegisterBusinessInformation}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route exact path="/" component={HomePage}/>
            </Switch>
        );
    }
}