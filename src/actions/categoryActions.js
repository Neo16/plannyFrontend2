export function getCategoriesAction(categories) {
    return {
        type: 'GET_CATEGORIES_SUCCESS',
        categories
    };
}
