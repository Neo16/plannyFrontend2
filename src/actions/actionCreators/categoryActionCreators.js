export function getCategoriesResult(categories) {
    return {
        type: 'GET_CATEGORIES_SUCCESS',
        categories
    };
}

export function getMainCategoriesResult(categories) {
    return {
        type: 'GET_MAINCATEGORIES',
        categories
    }
}