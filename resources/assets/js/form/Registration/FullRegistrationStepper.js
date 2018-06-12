import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {stepBack, stepForward} from '../../actions/Registration';
import {connect} from 'react-redux';
import {submit} from 'redux-form';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Register from "./Register";
import RegisterBusinessInformation from "./RegisterBusinessInformation";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import {FORM__REGISTER_USER} from './Register';
import {FORM__REGISTER_BUSINESS_INFO} from './RegisterBusinessInformation';

const styles = theme => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    cardContainer: {
        margin: 5,
        height: 600,
        padding: 5,
    },
});

class FullRegistrationStepper extends React.Component {

    handleNext = () => {
        const {register: {activeStep}, stepForward, submit} = this.props;

        switch (activeStep) {
            case 0:
                submit(FORM__REGISTER_USER);
                break;
            case 1:
                submit(FORM__REGISTER_BUSINESS_INFO);
                break;
            default:
                stepForward();
                break;
        }
    };

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Register/>;
            case 1:
                return <RegisterBusinessInformation/>;
        }
    };


    renderStepper = () => {
        const {activeStep, steps} = this.props.register;

        return (
            <Stepper activeStep={activeStep} className={"hidden-xs-down"}>
                {steps.map((label) => {
                    const props = {};
                    const labelProps = {};

                    return (
                        <Step key={label} {...props}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        );
    };

    renderControls = () => {
        const {classes, register: {activeStep, steps}, stepBack, submit} = this.props;

        return (
            <div>
                <Button disabled={activeStep === 0} onClick={() => stepBack()} className={classes.button}>
                    Back
                </Button>

                <Button color="primary" onClick={this.handleNext} className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        );
    };

    renderStepperContent = () => {
        const {classes, register: {activeStep, steps}} = this.props;

        return (
            <div>
                <div className={classes.instructions}>
                    <Card className={classes.cardContainer}>
                        <div className={"hidden-sm-up"}>
                            <CardHeader subheader={(activeStep + 1) + ". " + steps[activeStep]}/>
                        </div>

                        {this.getStepContent(activeStep)}
                    </Card>
                </div>

                {this.renderControls()}
            </div>
        );
    };

    render() {
        const {classes: {root}} = this.props;

        return (
            <div className={root + " container"}>
                {this.renderStepper()}
                <div>
                    {this.renderStepperContent()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

FullRegistrationStepper.propTypes = {
    register: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {stepBack, submit, stepForward})(withStyles(styles)(FullRegistrationStepper));