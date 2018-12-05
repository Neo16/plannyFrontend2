import { HeaderHelper } from '../headerHelper';
import { searchPlannies, getPlanny, joinedPlanny, canceledParticipation, geoCode, getMyParticiapations } from '../actionCreators/publicPlannyActionCreators';
import {stopLoading, startLoading} from '../actionCreators/globalActionCreators';

export const publicPlannyAsyncActionCreators = (dispatch) => {
    return {        
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
                dispatch(joinedPlanny()); 
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
                dispatch(canceledParticipation());       
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