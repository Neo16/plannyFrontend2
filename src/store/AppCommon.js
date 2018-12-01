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
        default: return state || { isLoading: false }
    }
}
