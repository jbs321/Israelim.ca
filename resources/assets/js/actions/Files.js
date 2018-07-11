import axios from "axios";
import qs from 'qs';
export const onUpload = (files = []) => {
    if(files.length === 0) {
        throw new Error("Missing files in array");
    }

    const formData = new FormData();
    formData.append('count', files.length);

    files.forEach((file, key) => {
        let num = key + 1;
        formData.append(`file${num}`, files[key]);
    });

    return axios.post("/upload", formData);
};

export const onDelete = (filePath) => {
    if(!filePath) {
        throw new Error("Missing file path");
    }

    const request = axios({
        method: "DELETE",
        url: "/upload/delete",
        params: {
            path: filePath
        },
    });

    return request;
};


export const deleteFile = (file, cb) => {

    const request = axios.post(`/business/register/general/image/${file.id}`);

    if(cb) {
        request.then((data) => {
            cb(data.data);
        })
    }

    return request;
};
