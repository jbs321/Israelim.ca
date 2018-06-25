import React from 'react'
import {onDelete, onUpload} from '../actions/Files'
import FileUpload from '../components/fileUpload/FileUpload'
import axios from 'axios'
import _ from 'lodash'

export default class FileUploadPageTest extends React.Component {
    state = {
        uploaded: {},
        selectedImages: [],
    };

    onUpload = (files) => {
        let that = this;

        files = files.filter((file) => {
            return !_.has(that.state.data, file.name);
        });

        if (files.length === 0) return;

        onUpload(files).then((data) => {
            let uploaded = data.data;
            this.setState({
                uploaded: _.assign(that.state.uploaded, uploaded),
                selectedImages: files.map(file => file.name),
            });
        });
    };

    onDelete = (file) => {
        let {uploaded, selectedImages} = this.state;
        const filePath = uploaded[file.name];

        onDelete(filePath).then(data => {
            _.pull(selectedImages, file.name);

            this.setState({
                uploaded: _.omit(uploaded, [file.name]),
                selectedImages: selectedImages,
            });
        });
    };

    render() {
        return (
            <div>
                Upload:
                <FileUpload onChange={this.onUpload} onDelete={this.onDelete}/>
                {JSON.stringify(this.state.uploaded)}
                {JSON.stringify(this.state.selectedImages)}
            </div>
        )
    }
}