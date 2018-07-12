import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles} from "@material-ui/core/styles/index";
import {compose} from 'recompose';

const ITEM_HEIGHT = 48;

const styles = {};

class LongMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleSelect = (event, option) => {
        if (option.action) {
            option.action(this.props.image);
            this.handleClose();
        }
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;
        const {icon, options} = this.props;


        return (
            <div>
                <IconButton aria-label="More"
                            aria-owns={anchorEl ? 'long-menu' : null}
                            aria-haspopup="true"
                            style={{color: "#fff"}}
                            onClick={this.handleClick}>
                    {this.renderIcon()}
                </IconButton>

                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    {options.map((option, key) => (
                        <MenuItem key={key} onClick={event => this.handleSelect(event, option)}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }

    renderIcon = () => {
        const {icon} = this.props;
        return icon ? icon : <MoreVertIcon/>;
    };
}

LongMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    image: PropTypes.object.isRequired,
};

const enhance = compose(
    withStyles(styles)
)(LongMenu);

export default enhance;