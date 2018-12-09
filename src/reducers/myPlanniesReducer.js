import { MyPlanniesState } from '../store/myPlanniesState';

export const myPlanniesReducer = (state = new MyPlanniesState(), action) => {
    switch (action.type) {
        case 'GET_MY_PLANNIES':
            return {
                ...state,
                plannies: action.plannies
            };
        case 'GET_MY_PARTICIPATIONS':
            return {
                ...state,
                participations: action.participations
            };
        case 'DELETE_PLANNY':
            return {
                ...state,
                plannies: state.plannies.filter(p => p.id != action.id)
            };
        case 'APPROVE_PARTICIPATION':
            return {
                ...state,
                plannies: state.plannies.map((planny) =>
                    planny.participations.some(p => p.participationId == action.id)
                        ? {
                            ...planny,
                            participations: planny.participations.map((part) =>
                                part.participationId == action.id ? { ...part, state: 1 } : part)
                        }
                        : planny)
            };
        case 'DECLINE_PARTICIPATION': {
            return {
                ...state,
                plannies: state.plannies.map((planny) =>
                    planny.participations.some(p => p.participationId == action.id)
                        ? {
                            ...planny,
                            participations: planny.participations.map((part) =>
                                part.participationId == action.id ? { ...part, state: 0 } : part)
                        }
                        : planny)
            };
        }
        default:
            return state;
    }
};
