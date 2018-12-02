import { HeaderHelper } from '../headerHelper';
import { getMyPlannies, pictureUpload, approveParticipation, declineParticipation, deleteProposal}
 from '../actionCreators/managePlannyActionCreators';
import {stopLoading, startLoading} from '../actionCreators/globalActionCreators';

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
            .then((response) => response.json());            
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

            fetch("https://localhost:44378/api/plannies/my", {
                method: "GET",
                headers: requestHeaders,
            })
            //.then(handleErrors)
            .then((response) => response.json())
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
                dispatch(approveParticipation());
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
                dispatch(declineParticipation());
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