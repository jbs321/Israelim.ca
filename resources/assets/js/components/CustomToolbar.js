import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuIcon from './MenuIcon';
import {connect} from "react-redux";
import {fetchUserDetails} from '../actions/User'
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({});

class CustomToolbar extends React.Component {
    componentDidMount() {
        this.props.fetchUserDetails();
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="MyLog"/>
                    <FontIcon className="muidocs-icon-custom-sort"/>
                    <ToolbarSeparator/>
                </ToolbarGroup>

                <ToolbarGroup>
                    <MenuIcon/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

CustomToolbar.propTypes = {
    classes: PropTypes.object,
};

export default connect(mapStateToProps, {fetchUserDetails})(withStyles(styles)(CustomToolbar));