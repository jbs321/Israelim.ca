import React from 'react'
import {compose} from 'recompose'
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const styles = {
    stepper: {
        height: "100%",
    },
    controller: {
        height: 60,
        width: "100%",
        background: '#fff',
        textAlign: "center",
        position: 'fixed',
        bottom: 0,
    },
    button: {
        margin: 10,
    }
};

const DEFAULT_START = 1;

class Stepper extends React.Component {
    state = {
        activeStep: DEFAULT_START,
    };

    stepBack = () => {
        const {stepBack} = this.props;

        if (stepBack !== undefined) {
            stepBack();
            return;
        }

        let activeStep = this.getActiveStep();
        activeStep--;
        this.setState({activeStep: activeStep});
    };

    stepForward = () => {
        const {stepForward} = this.props;

        if (stepForward !== undefined) {
            stepForward();
            return;
        }

        let activeStep = this.getActiveStep();
        activeStep++;
        this.setState({activeStep: activeStep});
        this.props.stepForward();
    };

    getActiveStep = () => {
        let {activeStep} = this.props;

        return activeStep || this.state.activeStep;
    };

    getStepContent = (step) => {
        const {steps} = this.props;
        const content = <div>{steps[step].content}</div>;

        return content;
    };

    getStepController = () => {
        const {classes, steps} = this.props;
        const activeStep = this.getActiveStep();
        const stepsCount = Object.keys(steps).length;

        return (
            <div className={classes.controller}>
                <Button disabled={activeStep <= 1} onClick={this.stepBack} className={classes.button}>
                    Back
                </Button>
                <Button variant="contained"
                        color="primary"
                        disabled={activeStep >= stepsCount + 1}
                        onClick={this.stepForward}
                        className={classes.button}>
                    {activeStep === stepsCount ? 'Finish' : 'Next'}
                </Button>
            </div>
        );
    };

    render() {
        const {classes} = this.props;
        const activeStep = this.getActiveStep();

        return (
            <div className={classes.stepper}>
                {this.getStepContent(activeStep)}
                {this.getStepController()}
            </div>
        )
    }
}

Stepper.propTypes = {
    steps: PropTypes.object.isRequired,
    stepBach: PropTypes.func,
    stepForward: PropTypes.func,
    activeStep: PropTypes.number,
};

const enhance = compose(
    withStyles(styles)
)(Stepper);

export default enhance;