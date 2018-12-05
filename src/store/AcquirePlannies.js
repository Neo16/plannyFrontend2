export class AcquirePlanniesState {
    plannies;
    query;
    plannyDetail;
    searchGeocode;
    ownerProfile;
}

export const acquirePlanniesReducer = (state, action) => {
    switch (action.type) {   
        case 'SEARCH_PLANNIES':
            return {
                ...state,
                plannies: action.plannies               
            };
        case 'GET_PLANNY':
            return {
                ...state,
                plannyDetail: action.planny
            };
        case 'CANCEL_PARTICIPATION':
            return {
                ...state,
                plannyDetail: {
                    ...state.plannyDetail,
                    joinStatus: '1'
                }
            }
        case 'JOIN_PLANNY':
            return {
                ...state,
                plannyDetail: {
                    ...state.plannyDetail,
                    joinStatus: '2'
                }
            }       
        case 'GET_GEOCODES':
            return {
                ...state,
                searchGeocode: {
                    longitude: action.longitude,
                    latitude: action.latitude
                }
            }
        default:
            return state || new AcquirePlanniesState();
    }
}