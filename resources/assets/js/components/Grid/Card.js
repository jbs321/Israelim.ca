import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

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
        const {classes, city, province, images, idx} = this.props;

        let backgroundImage = 'url("https://material-ui.com/static/images/grid-list/camera.jpg")';

        if (images[0] !== undefined) {
            let imageId = images[0].id;

            if (imageId !== undefined) {
                backgroundImage = `url("file/${imageId}"), url("http://backgroundcheckall.com/wp-content/uploads/2017/12/animated-loading-bar-gif-transparent-background-2.gif")`;
            }
        }

        return (
            <Link to={`/business/${idx}`} target="_blank">
                <div className={classes.outerWrapper + " m-2 my-4"} style={{background: "radial-gradient(circle, rgb(255, 255, 255), #8080b9, #d29b9b)"}}>
                    <div className={classes.imageWrapper} style={{backgroundImage, backgroundPosition: "center center"}}></div>
                    {/*<div className={classes.imageWrapper} style={{backgroundImage, backgroundPosition: "center center"}}></div>*/}
                    {/*<div className={classes.imageWrapper} style={{backgroundColor: "#f3f3f3",backgroundImage, backgroundPosition: "center center"}}></div>*/}

                    <div><Typography align="left" variant="caption">{`${province} - ${city}`}</Typography></div>
                    <div><Typography gutterBottom align="left" variant="body2">{this.props.name}</Typography></div>
                </div>
            </Link>
        );
    }
}

export default withStyles(styles)(Card);