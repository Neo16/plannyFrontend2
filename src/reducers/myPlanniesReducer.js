import { MyPlanniesState } from '../store/myPlanniesState';

export const myPlanniesReducer = (state = new MyPlanniesState(), action) => {
    switch (action.type) {
        case 'GET_MY_PLANNIES':
            return {
                ...state,
                plannies: action.plannies
            };
        case 'DELETE_PLANNY':
        console.log('ddddddd');
        console.log(action.id);
            return {
                ...state,
                plannies: state.plannies.filter(p => p.id != action.id)
            }
        default:
            return state;
    }
};
