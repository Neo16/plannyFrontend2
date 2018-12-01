export function getCategoriesResult(categories) {
    return {
        type: 'GET_SUBCATEGORIESS',
        categories
    };
}

export function getMainCategoriesResult(categories) {
    return {
        type: 'GET_MAINCATEGORIES',
        categories
    }
}