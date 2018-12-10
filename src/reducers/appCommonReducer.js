
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
        case 'SHOW_INFO_MODAL':
            return {
                ...state,
                showInfoModal: true,
                infoModalMessage: action.message
            }
        case 'HIDE_INFO_MODAL':
            return {
                ...state,
                showInfoModal: false
            }
        default:
            return state;
    }
}
