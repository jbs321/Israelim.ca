import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Register from "./Register";
import RegisterBusinessInformation from "./RegisterBusinessInformation";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';


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

function getSteps() {
    return ['Register Personal Information', 'Register Business Information', 'Finnish'];
}

class FullRegistrationStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        const {activeStep} = this.state;

        if (getSteps().length - 1 === activeStep) {
            return;
        }

        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        const {activeStep} = this.state;

        this.setState({
            activeStep: activeStep - 1,
        });
    };

    getStepContent = (step) => {
        const {classes} = this.props;

        switch (step) {
            case 0:
                return <Register/>;
            case 1:
                return <RegisterBusinessInformation/>;
            case 2:
                return (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&quot;re finished
                        </Typography>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };


    renderStepper = () => {
        const steps = getSteps();
        const {activeStep} = this.state;

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
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;

        return (
            <div>
                <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                    Back
                </Button>

                <Button color="primary" onClick={this.handleNext} className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        );
    };

    renderStepperContent = () => {
        const {classes} = this.props;
        const {activeStep} = this.state;

        return (
            <div>
                <div className={classes.instructions}>
                    <Card className={classes.cardContainer}>
                        <div className={"hidden-sm-up"}>
                            <CardHeader subheader={(activeStep + 1) + ". " + getSteps()[activeStep]}/>
                        </div>

                        {this.getStepContent(activeStep)}
                    </Card>
                </div>

                {this.renderControls()}
            </div>
        );
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root + " container"}>
                {this.renderStepper()}

                <div>
                    {this.renderStepperContent()}
                </div>
            </div>
        );
    }
}

FullRegistrationStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(FullRegistrationStepper);