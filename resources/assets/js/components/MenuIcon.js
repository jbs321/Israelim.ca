import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import {connect} from "react-redux"
import _ from "lodash"
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles';
import {logOut} from '../actions/Auth';
import history from '../history';

const styles = theme => ({
    welcomeMsg: {
        display: "table-cell",
        verticalAlign: "middle",
    },
    menuIcon: {
        display: "table",
    },
    menuIconRow: {
        display: "table-row",
    },
});

const PROFILE = 1;
const LOGOUT = 2;

class MenuIcon extends React.Component {
    constructor() {
        super();
        this.renderMenuBtn = this.renderMenuBtn.bind(this);
        this.renderWelcomeMsg = this.renderWelcomeMsg.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    renderWelcomeMsg() {
        let {user: {name}, classes: {welcomeMsg}} = this.props;

        if (name === undefined) {
            name = "Welcome";
        }

        return <div className={welcomeMsg}>Welcome {_.upperFirst(name)}</div>
    }

    onSelect(selected) {
        switch (selected) {
            case LOGOUT:
                const {logOut} = this.props;
                logOut(() => {
                    localStorage.clear();
                    history.push("/");
                });
                break;

            case PROFILE:
                history.push(`/profile`);
                break;

        }


    }

    renderMenuBtn() {
        const {classes: {welcomeMsg}} = this.props;

        return <div className={welcomeMsg}>
            <IconMenu iconButtonElement={
                <IconButton touch={true}>
                    <NavigationExpandMoreIcon/>
                </IconButton>
            }>

                <MenuItem primaryText="Profile" onClick={this.onSelect.bind(this, PROFILE)}/>
                <MenuItem primaryText="Sign Out" onClick={this.onSelect.bind(this, LOGOUT)}/>
            </IconMenu>
        </div>
    }

    render() {
        const {classes: {menuIcon, menuIconRow}} = this.props;

        return (
            <div className={menuIcon}>
                <div className={menuIconRow}>
                    {this.renderWelcomeMsg()}
                    {this.renderMenuBtn()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

MenuIcon.propTypes = {
    classes: PropTypes.object,
};


export default connect(mapStateToProps, {logOut})(withStyles(styles)(MenuIcon));