import axios from "axios/index";

export const onUpload = (files) => {
    const formData = new FormData();
    formData.append('count', files.length);

    files.forEach((file, key) => {
        let num = key + 1;
        formData.append(`file${num}`, files[key]);
    });

    return axios.post("/upload", formData);
};

export const onDelete = (filePath) => {
    return axios({
        method: "DELETE",
        url: "/upload/delete",
        params: {
            path: filePath
        },
    });
};
