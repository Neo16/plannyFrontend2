
import axios from 'axios';

export const uploadPictureApiCall = ({
    picture,
    onSuccess = (data) => { }
}) => {

    const formData = new FormData();
    formData.append("Picture", picture);

    axios
        .request({
            method: 'POST',
            url: 'files/upload-picture',
            headers: {                
                'Authorization': 'Bearer ' + localStorage.getItem('planny-userToken')
            },
            data: formData,
        })
        .then(({ data }) => {
            onSuccess(data);
        })
        .catch(error => {
            alert('upload failed');
        });
}