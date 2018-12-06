export function startLoading() {
    return {
        type: 'START_LOADING'
    };
}

export function stopLoading() {
    return {
        type: 'STOP_LOADING'
    };
}

export function apiError(error) {
    return {
        type: 'API_ERROR',
        error
    };
}
