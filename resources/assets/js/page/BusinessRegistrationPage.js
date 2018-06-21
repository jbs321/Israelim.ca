import React from 'react';
import FullRegistrationStepper from "../form/Registration/FullRegistrationStepper";
import AppBar from '../components/AppBar';

class BusinessRegistrationPage extends React.Component {
    render() {
        return (
            <div className={"container-fluid p-0"}>
                <header style={{width: "100%"}}>
                    <AppBar/>
                </header>

                <FullRegistrationStepper/>
            </div>
        );
    }
}

export default BusinessRegistrationPage;