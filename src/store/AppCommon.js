export class AppCommonState {
    isLoading;
    mainCategories;
    subCategories;
}

export const appCommonReducer = (state, action) => {
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
        default: return state || { isLoading: false }
    }
}
