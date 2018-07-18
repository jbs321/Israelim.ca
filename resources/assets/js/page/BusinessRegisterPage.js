import React from 'react';
import {compose} from 'recompose';
import {submit} from 'redux-form';
import {reLoadRegistration} from '../actions/BusinessRegistration/RegisterBusinessInfo';
import withPageWrapper from "./withPageWrapper";
import {LinearDeterminateStepper} from "../components/Stepper/LinearDeterminateStepper";
import RegisterBusinessInformation, {FORM__REGISTER_BUSINESS_INFO} from "../form/Registration/RegisterBusinessInformationForm";
import RegisterBusinessLocationForm, {FORM__REGISTER_BUSINESS_LOCATION} from "../form/Registration/RegisterBusinessLocationForm";
import RegisterLocationConfirmationForm, {FORM__REGISTER_BUSINESS_LOCATION_CONFIRMATION} from "../form/Registration/RegisterBusinessLocationConfirmationForm";
import {connect} from "react-redux";

const STEP__GENERAL_INFORMATION = 1;
const STEP__LOCATION = 2;
const STEP__LOCATION_CONFIRMATION = 3;
const STEP__OPEN_HOURS = 4;
const STEP__BUSINESS_DESCRIPTION = 5;
const STEP__PAYMENT = 6;

class BusinessRegisterPage extends React.Component {
    componentDidMount() {
        const that = this;
        this.props.reLoadRegistration((data) => {
            if(data && data.status) {
                that.setState({activeStep: data.status + 1});
            }
        });
    }

    handleFormSubmit = (data) => {
        const nextStep = this.state.activeStep + 1;
        this.setState({activeStep: nextStep});
    };

    state = {
        activeStep: STEP__GENERAL_INFORMATION,
        steps: {
            [STEP__GENERAL_INFORMATION]: {
                label: "General Information",
                formId: FORM__REGISTER_BUSINESS_INFO,
                content: <RegisterBusinessInformation onSubmit={this.handleFormSubmit.bind(this)}/>,
            },
            [STEP__LOCATION]: {
                label: "Location",
                formId: FORM__REGISTER_BUSINESS_LOCATION,
                content: <RegisterBusinessLocationForm onSubmit={this.handleFormSubmit.bind(this)}/>,
            },
            [STEP__LOCATION_CONFIRMATION]: {
                label: "Location Confirmation",
                formId: FORM__REGISTER_BUSINESS_LOCATION_CONFIRMATION,
                content: <RegisterLocationConfirmationForm onSubmit={this.handleFormSubmit.bind(this)}/>,
                buttonNextText: "Confirm Location",
            },
            [STEP__OPEN_HOURS]: {
                label: "Open Hours",
                formId: "",
                content: <div>Location</div>,
            },
            [STEP__BUSINESS_DESCRIPTION]: {
                label: "Business Description",
                formId: "",
                content: <div>Location</div>,
            },
            [STEP__PAYMENT]: {
                label: "Payment",
                formId: "",
                content: <div>Location</div>,
            },
        },
    };

    render() {
        let {activeStep, steps} = this.state;
        const that = this;

        return (
            <div className={"stepper-wrapper"}>
                <LinearDeterminateStepper steps={steps}
                                          activeStep={activeStep}
                                          stepForward={() => that.props.submit(steps[activeStep].formId)}
                                          stepBack={() => {
                                              let previous = activeStep - 1;
                                              this.setState({activeStep: previous})
                                          }} />
            </div>
        );
    }
}

const enhance = compose(
    connect(state => state, {submit, reLoadRegistration}),
    withPageWrapper
)(BusinessRegisterPage);

export default enhance;