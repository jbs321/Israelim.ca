import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class LinearDeterminate extends React.Component {

    render() {
        const { classes, completed } = this.props;

        return (
            <div className={classes.root}>
                <LinearProgress variant="determinate" value={completed} />
            </div>
        );
    }
}

LinearDeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
    completed: PropTypes.number.isRequired,
};

export default withStyles(styles)(LinearDeterminate);