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

export function showInfoModal(message) {
    return {
        type: 'SHOW_INFO_MODAL',
        message
    };
}

export function hideInfoModal() {
    return {
        type: 'HIDE_INFO_MODAL'
    };
}
