
import { PublicPlanniesState } from "../store/publicPlanniesState";

export const publicPlanniesReducer = (state = new PublicPlanniesState(), action) => {
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
        default:
            return state;
    }
}