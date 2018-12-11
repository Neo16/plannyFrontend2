
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

export const geocodeApiCall = ({
    address,
    onSuccess = (data) => { }
}) => {
    axios
        .get('https://eu1.locationiq.com/v1/search.php?key=pk.bf49ac8a854c19564292f22b679c2e21&q=' + address + '&format=json',
            {
                'Access-Control-Allow-Origin': '*',
                "async": true,
                "crossDomain": true,   
            })
        .then(({data}) => {    
            console.log(data);       
            var result = {
                latitude: data[0].lat,
                longitude: data[0].lon
            }
            console.log(result);
            onSuccess(result);           
        })
        .catch(error => {
        });
}
