import React from 'react'
import {compose} from 'recompose'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Stepper from './Stepper'
import LinearDeterminate from '../LinearDeterminate'
import Typography from '@material-ui/core/Typography'

const styles = {
    tag: {
        padding: 10
    }
};

export const WithLinearDeterminate = (Component) => {
    const WrapperComponent = class extends React.Component {
        render() {
            const {activeStep, steps} = this.props;
            const {classes, ...propsWithoutStyle} = this.props;
            const completed = activeStep / Object.keys(steps).length * 100;

            return (
                <div className={"with-linear-determinate"}>
                    <div>
                        <Typography variant={"button"}
                                    className={classes.tag}>
                            {`${activeStep}. ${steps[activeStep].label}`}
                        </Typography>

                        <LinearDeterminate completed={completed}/>
                    </div>

                    <Component {...propsWithoutStyle}/>
                </div>
            );
        }
    };

    return WrapperComponent;
};

WithLinearDeterminate.propTypes = {
    steps: PropTypes.object.isRequired,
    activeStep: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
};

export const LinearDeterminateStepper = compose(
    withStyles(styles),
    WithLinearDeterminate,
)(Stepper);