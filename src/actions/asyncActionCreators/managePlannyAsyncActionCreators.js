import { HeaderHelper } from '../headerHelper';
import { getMyPlannies, pictureUpload, approvedParticipation, declinedParticipation, deleteProposal}
 from '../actionCreators/managePlannyActionCreators';
import {stopLoading, startLoading} from '../actionCreators/globalActionCreators';
import { push } from 'connected-react-router';

export const managePlannyAsyncActionCreators = (dispatch) => {
    return {
        createPlannyAsync: (planny) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();

            fetch("https://localhost:44378/api/plannies", {
                method: "POST",
                body: String(planny),
                headers: requestHeaders,
            })
            .then((response) => response.json());            
        },
        updatePlannyAsync: (id, planny) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();

            fetch("https://localhost:44378/api/plannies/"+id, {
                method: "PUT",
                body: String(planny),
                headers: requestHeaders,
            })
            .then(function (response) {
                if (response.status === 200) {
                    dispatch(push('/'));   
                }
                else{
                    //todo: művelet sikertelen popup feldob 
                }
            });                      
        },
        uploadPlannyPictureAsync: (picture) => {
            //Todo fire isloading            
            let requestHeaders = HeaderHelper.getAuthorizedHeader();
            const formData = new FormData();
            formData.append("Picture", picture);

            fetch("https://localhost:44378/api/files/upload-picture", {
                method: "POST",
                body: formData,
                headers: requestHeaders,
            })
            .then((response) => response.json())
            .then((data) => dispatch(pictureUpload(data)));            
        },        
        getMyPlanniesAsync: () => {
            dispatch(startLoading());
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();

            fetch("https://localhost:44378/api/plannies/myplannies", {
                method: "GET",
                headers: requestHeaders,
            })
            .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Something went wrong');
                }
            })
            .then(function (plannies) {               
                dispatch(getMyPlannies(plannies));
                dispatch(stopLoading());                
            }).catch(function (error) {
                console.log("getMyPlannies failed.");
            });
        },     
        approveParticipationAsync: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
        
            fetch("https://localhost:44378/api/plannies/approveparticipation",
            {
                method: "POST",
                headers: requestHeaders,
                body: String(id)
            })
            .then((response) => response.json())
            .then(function (data) {
                dispatch(approvedParticipation());
            });
        },
        declineParticipationAsync: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();

            fetch("https://localhost:44378/api/plannies/declineparticipation",
            {
                method: "POST",
                headers: requestHeaders,
                body: String(id)
            })
            .then((response) => response.json())
            .then(function (data) {                
                dispatch(declinedParticipation());
            });
        },  
        deleteAsync: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();

            fetch("https://localhost:44378/api/plannies/" + id,
            {
                method: "DELETE",
                headers: requestHeaders
            })
            .then((response) => response.json())
            .then(function (data) {                
                dispatch(deleteProposal(id));                
            });
        },
    };
};