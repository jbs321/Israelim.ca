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
    hidden: {
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

    handleOnChange = (event) => {
        const {onChange} = this.props;

        this.setState({images: event.target.files});

        if(onChange !== undefined) {
            onChange(event.target.files);
        }
    };

    //remove files from state and return onDelete with removed files
    removeFile = (file) => {
        const {onDelete} = this.props;
        let {images}   = this.state;

        _.remove(images, (image) => (image.name === file.name));

        this.setState({images: images});

        if (onDelete !== undefined) {
            onDelete(file);
        }
    };

    render() {
        const {classes: {wrapper, rail, locomotive, button, hidden, label}} = this.props;

        console.log(this.state.files);

        return (
            <div className={wrapper}>
                <div className={rail + " scroll"}>
                    {this.renderImages()}

                    <div className={locomotive + " .align-middle"}>
                        <input accept="image/*"
                               className={hidden}
                               value={this.state.files}
                               id="icon-button-file"
                               onChange={this.handleOnChange}
                               type="file"
                               multiple
                        />

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

    renderImages = () => {
        const {images} = this.state;

        return images.map((image, key) => {
            let src = URL.createObjectURL(image);
            return <Wagon key={key} src={src} alt={image.name} onDelete={() => this.removeFile(image)}/>
        });
    };
}

FileUpload.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    images: PropTypes.array,
};

export default withStyles(style)(FileUpload);