
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
            console.log(data);
            onSuccess(data);
        })
        .catch(error => {
            console.log('asd');
            alert('upload failed');
        });
}