import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import LongMenu from "./MenuIcon";
import {mergeClass} from "../../helpers/styles";
import BusinessSearchAutoComplete from './BusinessSearchAutoComplete'

const styles = {
    header: {
        height: 65,
    },
    tableRow: {
    },
    innerWrapper: {
        padding: 4,
        width: "100%",
    },
    left: {
        float: "left",
    },
    right: {
        float: "right",
    }
};

function AppBar(props) {
    const {classes} = props;

    return (
        <header className={mergeClass(classes.header, "container-fluid mx-sm-4 mx-lg-5 mx-2")}>

            <div className={classes.tableRow}>
                <div className="row">
                    <div className={classes.innerWrapper}>
                        <div className={classes.left}>
                            <BusinessSearchAutoComplete/>
                        </div>

                        <div className={classes.right}>
                            <Typography align={"right"} variant="body2">
                                <Link to={"/register"}>Register Your Business</Link>
                                <LongMenu/>
                            </Typography>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);