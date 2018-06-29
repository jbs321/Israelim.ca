import React from 'react';
import {compose} from 'recompose';
import {submit} from 'redux-form';
import withPageWrapper from "../HOC/withPageWrapper";
import {LinearDeterminateStepper} from "../components/Stepper/LinearDeterminateStepper";
import RegisterBusinessInformation, {FORM__REGISTER_BUSINESS_INFO} from "../form/Registration/RegisterBusinessInformation";
import {connect} from "react-redux";

const STEP__GENERAL_INFORMATION = 1;
const STEP__LOCATION = 2;
const STEP__OPEN_HOURS = 3;
const STEP__BUSINESS_DESCRIPTION = 4;
const STEP__PAYMENT = 5;

class BusinessRegisterPage extends React.Component {
    state = {
        activeStep: STEP__GENERAL_INFORMATION,
        steps: {
            [STEP__GENERAL_INFORMATION]: {
                label: "General Information",
                formId: FORM__REGISTER_BUSINESS_INFO,
                content: <RegisterBusinessInformation onSubmit={(data) => this.handleFormSubmit(data)}/>,
            },
            [STEP__LOCATION]: {
                label: "Location",
                formId: "",
                content: <div>Location</div>,
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

    handleFormSubmit = (data) => {
        let {activeStep} = this.state;
        let next = activeStep + 1;
        this.setState({activeStep: next});
    };

    render() {
        let {activeStep, steps} = this.state;

        return (
            <div className={"stepper-wrapper"}>
                <LinearDeterminateStepper steps={steps}
                                          activeStep={activeStep}
                                          stepForward={() => {
                                              this.props.submit(steps[activeStep].formId);
                                          }}
                                          stepBack={() => {
                                              let previous = activeStep - 1;
                                              this.setState({activeStep: previous})
                                          }}
                />
            </div>
        );
    }
}

const enhance = compose(
    connect(state => state, {submit}),
    withPageWrapper
)(BusinessRegisterPage);

export default enhance;