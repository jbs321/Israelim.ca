import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';

const style = theme => ({
    wagon: {
        width: 80,
        height: 80,
        margin: 5,
        minWidth: 80,
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%"
    },
    button: {
        position: "absolute",
        margin: theme.spacing.unit,
    },
    fade: {
        width: "100%",
        height: "100%",
        position: "absolute",
        background: "#767476"
    },
    remove: {
        top: 5,
        right: 5,
        width: 12,
        zIndex: 20,
        height: 12,
        border: "0 none",
        cursor: "pointer",
        display: "inline-block",
        position: "absolute",
        backgroundColor: "transparent",
        backgroundSize: "auto",
        backgroundImage: "url(/img/buttons.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "-184px -172px",

        "&::hover": {
            border: "0 none",
            cursor: "pointer",
            padding: 0,
            fontSize: "0 !important",
            overflow: "hidden",
            verticalAlign: "middle",
            backgroundSize: "auto",
            textDecoration: "none",
            backgroundColor: "transparent",
            backgroundImage: "url(/img/buttons.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "-197px -172px",
        }
    }
});

class Wagon extends React.Component {
    state = {
        isHovered: false,
    };

    onHover = (isHovered) => {
        this.setState({isHovered: isHovered});
    };

    render() {
        const {classes, src, alt} = this.props;
        const {isHovered} = this.state;

        if (isHovered) {
            return (
                <div className={classes.wagon}
                     onMouseOver={this.onHover.bind(this, true)}
                     onMouseLeave={this.onHover.bind(this, false)}
                     onMouseOut={this.onHover.bind(this, false)}>

                    <div className={"fade-in"}></div>
                    <button className={classes.remove} onClick={this.props.onDelete}></button>

                    <img className={classes.image} src={src} alt={alt}/>
                </div>
            );
        }


        return (
            <div className={classes.wagon}
                 onMouseOver={this.onHover.bind(this, true)}
                 onMouseLeave={this.onHover.bind(this, false)}
                 onMouseOut={this.onHover.bind(this, false)}>
                <img className={classes.image} src={src} alt={alt}/>

            </div>
        );
    }
}

Wagon.propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Wagon);