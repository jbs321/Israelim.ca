import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = (themes) => ({
    outerWrapper: {
        color: "rgb(72, 72, 72)",
        position: "relative",
        height: 200,
        minWidth: 250,
        background: "grey",//"rgb(255, 255, 255)",
    },

    imageWrapper: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "left center",
        backgroundSize: "cover",
        minWidth: 100,
    },
});

class Card extends React.Component {
    render() {
        const {classes, city, province} = this.props;
        return (
            <div className={classes.outerWrapper + " m-2 my-4"}>
                <div className={classes.imageWrapper} style={{backgroundImage: 'url("https://material-ui.com/static/images/grid-list/camera.jpg")'}}></div>

                <div><Typography align="left" variant="caption">{`${province} - ${city}`}</Typography></div>
                <div><Typography gutterBottom align="left" variant="body2">{this.props.name}</Typography></div>
            </div>
        );
    }
}

export default withStyles(styles)(Card);