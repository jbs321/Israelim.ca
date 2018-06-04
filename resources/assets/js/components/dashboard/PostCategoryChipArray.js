import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';

const styles = {
    paperClass: {
        padding: 10,
    },
    chipClass: {
        margin: 5,
    }
};

class PostCategoryChipArray extends React.Component {

    render() {
        const {chips, classes, onDelete} = this.props;

        let chipsUI = chips.map((chip, key) => {
            return (
                <Chip
                    key={key}
                    className={classes.chipClass}
                    label={chip}
                    onDelete={(elem) => onDelete(elem, chip)}
                />
            );
        });

        return (
            <div>
                {chipsUI}
            </div>
        );
    }
}

PostCategoryChipArray.propTypes = {
    chips: PropTypes.array.isRequired,
    classes: PropTypes.object,
    onDelete: PropTypes.func,
};


export default withStyles(styles)(PostCategoryChipArray);