import { Reducer } from 'redux';

export class MyPlanniesState {
    plannies;    
}

export const myPlanniesReducer  = (state, action) => {
    switch (action.type) {
        case 'GET_MY_PLANNIES':
            return {
                ...state,
                plannies: action.plannies
            };
        case 'DELETE_PROPOSAL':
            return {
                ...state,
                plannies: state.plannies.filter(p => p.id != action.id)
            }
        default:
            return state || {
               plannies: null
            }
    }
};
