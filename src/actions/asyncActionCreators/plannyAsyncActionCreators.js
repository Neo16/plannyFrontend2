import { HeaderHelper } from '../headerHelper';
import { getMyPlannies, searchPlannies, pictureUpload, getPlanny, joinPlanny, cancelParticipation,
    approveParticipation, declineParticipation, getSubCategories, geoCode, 
    deleteProposal, getMyParticiapations} from '../actionCreators/plannyActionCreators';
import {stopLoading, startLoading} from '../actionCreators/globalActionCreators';


export const plannyAsyncActionCreators = (dispatch) => {
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
        getPlanniesAsync: (query) => {
            console.log('planny search action fired');
            dispatch(startLoading());
            let requestHeaders = HeaderHelper.getJsonHeader();                   

            fetch("https://localhost:44378/api/plannies/search",
             {
                method: "POST",
                headers: requestHeaders,
                body: String(query)
             })
            .then((response) => response.json())
            .then(function (plannies) {               
                dispatch(searchPlannies(plannies));
                dispatch(stopLoading());    
            });
        },
        getPlannyAsync: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
            dispatch({
                type: 'GET_PLANNY_REQUEST',
            });
            fetch("https://localhost:44378/api/plannies/" + id,
            {
                method: "GET",
                headers: requestHeaders
            })
            .then((response) => response.json())
            .then(function (data) {                   
                dispatch(getPlanny(data));                                  
            });
        },
        joinPlannyAsync: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();           

            fetch("https://localhost:44378/api/plannies/join/" + id,
            {
                method: "GET",
                headers: requestHeaders
            })
            .then((response) => response.json())
            .then(function (data) {
                dispatch(joinPlanny(data)); 
            });
        },
        cancelParticipationAsync: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();         

            fetch("https://localhost:44378/api/plannies/cancelparticipation/",
            {
                method: "POST",
                headers: requestHeaders,
                body: String(id)
            })
            .then((response) => response.json())
            .then(function (data) {              
                dispatch(cancelParticipation(id));       
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
        getSubCategoriesAsync: () => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
            dispatch(startLoading());

            fetch("https://localhost:44378/api/categories/sub", {
                method: "GET",
                headers: requestHeaders,
            })
            .then((response) => response.json())
            .then(function (data) {
                dispatch(getSubCategories(data));
                dispatch(stopLoading());    
            });
        },
        geoCodeAsync: (address) => {
            fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyD2JkejS3AyjhdLpPnD-tRM6MLJnX6oYQc", {
                method: "GET",
            })
            .then((response) => response.json())
            .then(function (data) {                
                if (data != null && data.results != null && data.results.length > 0) {
                    dispatch(geoCode(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng));
                }            
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
        getMyParticipationsAsync: () => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();          
            fetch("https://localhost:44378/api/plannies/myparticipations" +
            " ", {
                method: "GET",
                headers: requestHeaders,

            })
            .then((response) => response.json())
            .then(function (data) {            
                dispatch(getMyParticiapations(data));
            });
        },
    };
};