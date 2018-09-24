
import { loginAction, logoutAction, registerAction } from '../actions/accountActions';
import {
    approveParticipationAction, cancelParticipationAction, declineParticipationAction, deleteProposalAction, geoCodeAction, getMainCategoriesAction,
    getMyParticiapationsAction, getMyPlanniesAction, getSubCategoriesAction, getPlannyAction, joinPlannyAction, pictureUploadAction, searchPlanniesAction
} from '../actions/plannyActions';
import {startLoadingAction, stopLoadingAction} from '../actions/appStatusActions'
import {getCategoriesAction} from '../actions/categoryActions'
import { HeaderHelper } from './headerHelper';


export const acountActionCreators = (dispatch) => {
    return {
        login: (loginData) => {
            let requestHeaders = HeaderHelper.getJsonHeader();

            fetch("https://localhost:44378/api/Account/login", {
                method: "POST",
                body: String(loginData),
                headers: requestHeaders,
            })
            .then(handleErrors)
            .then((response) => response.json())
            .then(function (data) {
                dispatch(loginAction(data));
            })
            .catch(function (error) {
                console.log("request failed.");
            });
        },
        logout: () => {
            dispatch(logoutAction());
        },
        register: (data) => {
            let requestHeaders = HeaderHelper.getJsonHeader();

            fetch("https://localhost:44378/api/Account/Register", {
                method: "POST",
                body: String(data),
                headers: requestHeaders,
            })
            .then((response) => response.json())
            .then(function (data) {
                console.log(data);
                dispatch(registerAction(data));
            })
            .catch(function (error) {
                console.log("Registration failed.");
            });
        },
    }
};

export const plannyActionCreators = (dispatch) => {
    return {
        createPlannyProposal: (planny) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();

            fetch("https://localhost:44378/api/plannies", {
                method: "POST",
                body: String(planny),
                headers: requestHeaders,
            })
            .then((response) => response.json());            
        },
        uploadPlannyPicture: (picture) => {
            dispatch({
                type: 'UPLOAD_PIC_REQUEST'
            });

            let requestHeaders = HeaderHelper.getAuthorizedHeader();

            const formData = new FormData();
            formData.append("Picture", picture);

            fetch("https://localhost:44378/api/files", {
                method: "POST",
                body: formData,
                headers: requestHeaders,
            })
                .then((response) => response.json())
                .then(function (data) {
                    {
                        dispatch({
                            type: 'UPLOAD_PIC_SUCCESS',
                            picName: data
                            // todo result                        
                        });
                    }
                });
        },
        getCategories: () => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();

            fetch("https://localhost:44378/api/categories", {
                method: "GET",
                headers: requestHeaders,
            })
            .then((response) => response.json())
            .then(function (data) {            
                dispatch(getCategoriesAction(data));            
            });
        },
        getMyPlannies: () => {
            dispatch(startLoadingAction());

            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();

            fetch("https://localhost:44378/api/plannies/myproposals", {
                method: "GET",
                headers: requestHeaders,
            })
            .then(handleErrors)
            .then((response) => response.json())
            .then(function (plannies) {               
                dispatch(getMyPlanniesAction(plannies));
                dispatch(stopLoadingAction());    
            }).catch(function (error) {
                console.log("getMyPlannies failed.");
            });
        },
        getPlannies: (query) => {
            dispatch(startLoadingAction());
            let requestHeaders = HeaderHelper.getJsonHeader();       

            fetch("https://localhost:44378/api/plannies/proposals",
             {
                method: "POST",
                headers: requestHeaders,
                body: String(query)
             })
            .then((response) => response.json())
            .then(function (plannies) {               
                dispatch(searchPlanniesAction(plannies));
                dispatch(stopLoadingAction());    
            });
        },
        getPlanny: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
            dispatch({
                type: 'GET_PLANNY_REQUEST',
            });
            fetch("https://localhost:44378/api/plannies/proposals/" + id,
            {
                method: "GET",
                headers: requestHeaders
            })
            .then((response) => response.json())
            .then(function (data) {                   
                dispatch(getPlannyAction(data));                                  
            });
        },
        joinPlanny: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();           

            fetch("https://localhost:44378/api/plannies/joinproposal/" + id,
            {
                method: "GET",
                headers: requestHeaders
            })
            .then((response) => response.json())
            .then(function (data) {
                dispatch(joinPlannyAction(data)); 
            });
        },
        cancelParticipation: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();         

            fetch("https://localhost:44378/api/plannies/cancelparticipation/",
            {
                method: "POST",
                headers: requestHeaders,
                body: String(id)
            })
            .then((response) => response.json())
            .then(function (data) {              
                dispatch(cancelParticipationAction(id));       
            });
        },
        approveParticipation: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
        
            fetch("https://localhost:44378/api/plannies/approveparticipation",
            {
                method: "POST",
                headers: requestHeaders,
                body: String(id)
            })
            .then((response) => response.json())
            .then(function (data) {
                dispatch(approveParticipationAction());
            });
        },
        declineParticipation: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();

            fetch("https://localhost:44378/api/plannies/declineparticipation",
            {
                method: "POST",
                headers: requestHeaders,
                body: String(id)
            })
            .then((response) => response.json())
            .then(function (data) {                
                dispatch(declineParticipationAction());
            });
        },
        getMainCategories: () => {
            dispatch(startLoadingAction());
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
            fetch("https://localhost:44378/api/categories/main", {
                method: "GET",
                headers: requestHeaders,
            })
            .then((response) => response.json())
            .then(function (data) {
                dispatch(getMainCategoriesAction(data));
                dispatch(stopLoadingAction());    
            });
        },
        getSubCategories: () => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
            dispatch(startLoadingAction());

            fetch("https://localhost:44378/api/categories/sub", {
                method: "GET",
                headers: requestHeaders,
            })
            .then((response) => response.json())
            .then(function (data) {
                dispatch(getSubCategoriesAction(data));
                dispatch(stopLoadingAction());    
            });
        },
        geoCode: (address) => {
            fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyD2JkejS3AyjhdLpPnD-tRM6MLJnX6oYQc", {
                method: "GET",
            })
            .then((response) => response.json())
            .then(function (data) {                
                if (data != null && data.results != null && data.results.length > 0) {
                    dispatch(geoCodeAction(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng));
                }            
            });
        },
        deleteProposal: (id) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();

            fetch("https://localhost:44378/api/plannies/proposals/" + id,
            {
                method: "DELETE",
                headers: requestHeaders
            })
            .then((response) => response.json())
            .then(function (data) {                
                dispatch(deleteProposalAction(id));                
            });
        },

        getMyParticipations: () => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();          
            fetch("https://localhost:44378/api/plannies/myparticipations" +
            " ", {
                method: "GET",
                headers: requestHeaders,

            })
            .then((response) => response.json())
            .then(function (data) {            
                dispatch(getMyParticiapationsAction(data));
            });
        },
    };
};

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response);
    }
    return response;
}

