import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        height: 80,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgb(228, 228, 228) !important",
    },
    searchWrapper: {
        padding: 10,
        border: "1px solid #DBDBDB !important",
    },
    search: {
        width: '100%',
    },
};

function AppBar(props) {
    const {classes} = props;
    return (
        <div className={"container-fluid mx-sm-4 mx-lg-5 mx-2 " + classes.root}>
            <div className={"row p-0 " + classes.search}>
                <div className={"col col-xs-12 col-md-6 " + classes.searchWrapper}>
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

                <div className={"col col-xs-12 col-md-6"}
                     style={{
                         verticalAlign: "middle", display: "flex",
                         alignItems: "center",
                     }}>
                    <Typography align={"right"} variant="body2"><Link to={"/register"}>Register Your Business</Link></Typography>
                </div>
            </div>
        </div>
    );
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);