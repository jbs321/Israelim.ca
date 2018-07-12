import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {deleteFile} from "../../actions/Files";
import TitlebarGridList from './TitlebarGridList'
import PropTypes from "prop-types";

class UploadBusinessImages extends React.Component {
    getImageOptions = () => {
        return [
            {
                name: "Delete",
                action: (image) => this.props.deleteFile(image),
            },
            {
                name: "Make main Photo",
                action: (image) => console.log("make main photo", image),
            },
        ];
    };

    mapImages = () => {
        const {images} = this.props;
        return images.map((image) => {
            image.src = `/file/${image.id}`;
            // image.title = "Title";
            // image.subtitle = "Subtitle";

            return image;
        })
    };

    render() {
        const {images} = this.props;

        if(!images || images.length === 0) {
            return null;
        }

        return (
            <div className={"col p-0 m-0"}>
                <TitlebarGridList images={this.mapImages(images)} options={this.getImageOptions()} title={"Business Images"}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.registerBusiness.id,
        images: state.registerBusiness.images,
        business: state.registerBusiness,
    };
}

UploadBusinessImages.propTypes = {
    id: PropTypes.number,
    images: PropTypes.array,
    business: PropTypes.object.isRequired,
};

const enhance = compose(
    connect(mapStateToProps, {deleteFile}),
)(UploadBusinessImages);

export default enhance;