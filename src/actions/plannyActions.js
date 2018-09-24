
export function getMyPlanniesAction(plannies) {
    return {
        type: 'GET_MY_PLANNIES',
        plannies
    }
}

export function searchPlanniesAction(plannies) {
    return {
        type: 'SEARCH_PLANNIES',
        plannies
    }
}

export function pictureUploadAction(picName) {
    return {
        type: 'UPLOAD_PICS',
        picName
    }
}

export function getPlannyAction(planny) {
    return {
        type: 'GET_PLANNY_SUCCES',
        planny
    }
}

export function joinPlannyAction() {
    return {
        type: 'JOIN_PLANNYS'
    }
}

export function cancelParticipationAction(participationId) {
    return {
        type: 'CANCEL_PARTICIPATIONS',
        participationId
    }
}

export function approveParticipationAction() {
    return {
        type: 'APPROVE_PARTICIPATIONS'
    }
}

export function declineParticipationAction() {
    return {
        type: 'DECLINE_PARTICIPATIONS'
    }
}

export function getMainCategoriesAction(categories) {
    return {
        type: 'GET_MAINCATEGORIES',
        categories
    }
}

export function getSubCategoriesAction(categories) {
    return {
        type: 'GET_SUBCATEGORIESS',
        categories
    }
}

export function geoCodeAction(latitude, longitude) {
    return {
        type: 'GET_GEOCODES',
        latitude,
        longitude
    }
}

export function deleteProposalAction(id) {
    return {
        type: 'DELETE_PROPOSALS',
        id
    }
}

export function getMyParticiapationsAction(participations) {
    return {
        type: 'GET_MYPARTICIPATIONSS',
        participations
    }
}