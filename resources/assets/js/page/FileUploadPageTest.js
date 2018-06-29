import React from 'react'
import {onDelete, onUpload} from '../actions/Files'
import FileUpload from '../components/fileUpload/FileUpload'
import _ from 'lodash'

export default class FileUploadPageTest extends React.Component {
    state = {
        images: {}
    };

    onUpload = (files) => {
        const {images} = this.state;
        let newState = {};

        let filtered = _.filter(files, (file) => {
            return !Object.keys(images).includes(file.name);
        });

        if (filtered.length === 0) {
            return;
        }

        onUpload(filtered).then((data) => {
            let uploaded = data.data;

            _.each(uploaded, (path, name) => {
                newState = _.assign(images, {
                    [name]: {
                        uploaded: true,
                        path
                    }
                })
            });

            this.setState({images: newState});
        });
    };

    onDelete = (file) => {
        let {images} = this.state;
        const filePath = _.find(images, (item, name) => name === file.name).path;

        onDelete(filePath).then(data => {
            let deletedPath = data.data;
            let filtered = _.pickBy(images, (img) => img.path !== deletedPath);
            this.setState({images: filtered});
        });
    };

    render() {
        return (
            <div>
                Upload:
                <FileUpload onChange={this.onUpload} onDelete={this.onDelete}/>
                {JSON.stringify(this.state.uploaded)}
            </div>
        )
    }
}