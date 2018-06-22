import React from 'react'
import FileUpload from '../components/fileUpload/FileUpload'
import axios from 'axios'

export default class FileUploadPageTest extends React.Component {
    state = {
        data: [],
    };

    onUpload = (files) => {
        const formData = new FormData();
        formData.append('count', files.length);

        files.forEach((file, key) => {
            let num = key + 1;
            formData.append(`file${num}`, files[key]);
        });
        axios.post("/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            console.log(data);
        })
    };

    render() {
        return (
            <div>
                Upload:
                <FileUpload onChange={this.onUpload}/>
            </div>
        )
    }
}