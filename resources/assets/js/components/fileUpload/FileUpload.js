import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import _ from 'lodash';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import IconButton from '@material-ui/core/IconButton';
import Wagon from './Wagon'

const style = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    wrapper: {

        margin: 0,
        padding: 0,
        height: "100px",
        width: "100%",
    },
    rail: {
        width: "100%",
        height: "100%",
        background: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        overflowX: "scroll",
        overflowY: "hidden",

        "&::-webkit-scrollbar": {
            height: 10,
            width: 10,
            borderRadius: 100,
            backgroundColor: "rgba(0, 0, 0, 0)",
        },
        "&::-webkit-scrollbar:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.20)"
        },
        "&::-webkit-scrollbar-thumb:horizontal": {
            border: "2px solid rgba(0, 0, 0, 0)",
            minHeight: 10,
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: 100,
            backgroundClip: "padding-box",
        },
        "&::-webkit-scrollbar-thumb:vertical:active": {
            background: "rgba(0, 0, 0, 0.61)",
            borderRadius: 100,
        },
    },
    locomotive: {
        width: 80,
        height: 80,
        minWidth: 80,
        margin: 5,
        padding: 5,
        maxWidth: "100px",
        borderStyle: "dashed",
        borderColor: "#dddfe2",
    },

    label: {
        margin: "auto",
        display: "block",
        textAlign: "center",
    },
});

class FileUpload extends React.Component {
    state = {
        images: [],
    };

    componentDidMount() {
        const {images} = this.state;
        this.setState({images: images});
    }

    fileChangedHandler = (event) => {
        const newFiles = _.values(event.target.files);
        const {images} = this.state;
        const {onChange} = this.props;
        const merged = images.concat(newFiles);
        this.setState({images: merged});

        onChange(merged);
    };

    deleteImage = (name) => {
        const {onChange} = this.props;
        let images = this.state.images.filter((image) => {
            return image.name !== name;
        });

        this.setState({images: images});

        onChange(images);
    };

    renderImages = () => {
        const {images} = this.state;

        return images.map((image, key) => {
            let src = URL.createObjectURL(image);
            return <Wagon key={key} src={src} alt={image.name} onDelete={() => this.deleteImage(image.name)}/>
        });
    };

    clear = () => {
        this.setState({images: []});
    }

    render() {
        const {classes: {wrapper, rail, locomotive, button, input, label}} = this.props;

        return (
            <div className={wrapper}>
                <div className={rail + " scroll"}>
                    {this.renderImages()}

                    <div className={locomotive + " .align-middle"}>
                        <input accept="image/*" className={input} id="icon-button-file"
                               onChange={this.fileChangedHandler} type="file" multiple/>
                        <label htmlFor="icon-button-file" className={label}>
                            <IconButton color="primary" className={button} component="span">
                                <FileUploadIcon/>
                            </IconButton>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

FileUpload.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    images: PropTypes.array,
};

export default withStyles(style)(FileUpload);