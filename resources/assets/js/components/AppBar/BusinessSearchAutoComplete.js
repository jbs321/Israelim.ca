import React from 'react'
import {mergeClass} from "../../helpers/styles";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from "prop-types";

const styles = {
    searchWrapper: {
        border: "1px solid #DBDBDB",
        padding: 10,
        minWidth: 350,
        maxWidth: 450,
    },
    search: {
        width: '100%',
    },
};

class BusinessSearchAutoComplete extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={mergeClass(classes.searchWrapper)}>
                <TextField
                    className={classes.search}
                    placeholder={"Hummus, Neutron, Lawyer"}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        );
    }
}

BusinessSearchAutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BusinessSearchAutoComplete);