export class AcquirePlanniesState {
    plannies
    query
    plannyDetail
    mainCategories
    subCategories   
    searchGeocode
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
        case 'CANCEL_PARTICIPATIONS':
            return {
                ...state,
                plannyDetail: {
                    ...state.plannyDetail,
                    participationState: 'none'
                }
            }
        case 'JOIN_PLANNYS':
            return {
                ...state,
                plannyDetail: {
                    ...state.plannyDetail,
                    participationState: 'Required'
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