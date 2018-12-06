
import { AppCommonState } from '../store/appCommonState';

export const appCommonReducer = (state = new AppCommonState(), action) => {
    switch (action.type) {
        case 'GET_MAINCATEGORIES':
            return {
                ...state,
                mainCategories: action.categories
            }
        case 'GET_SUBCATEGORIESS':
            return {
                ...state,
                subCategories: action.categories
            }
        case 'START_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'STOP_LOADING':
            return {
                ...state,
                isLoading: false
            }
            return state;

        default:
            return state;
    }
}
