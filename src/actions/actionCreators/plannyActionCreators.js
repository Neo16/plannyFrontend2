
export function getMyPlannies(plannies) {
    return {
        type: 'GET_MY_PLANNIES',
        plannies
    }
}

export function searchPlannies(plannies) {
    return {
        type: 'SEARCH_PLANNIES',
        plannies
    }
}

export function pictureUpload(pictureUrl) {
    return {
        type: 'UPLOAD_PICS',
        pictureUrl
    }
}

export function getPlanny(planny) {
    return {
        type: 'GET_PLANNY_SUCCES',
        planny
    }
}

export function joinPlanny() {
    return {
        type: 'JOIN_PLANNYS'
    }
}

export function cancelParticipation(participationId) {
    return {
        type: 'CANCEL_PARTICIPATIONS',
        participationId
    }
}

export function approveParticipation() {
    return {
        type: 'APPROVE_PARTICIPATIONS'
    }
}

export function declineParticipation() {
    return {
        type: 'DECLINE_PARTICIPATIONS'
    }
}

export function getSubCategories(categories) {
    return {
        type: 'GET_SUBCATEGORIESS',
        categories
    }
}

export function geoCode(latitude, longitude) {
    return {
        type: 'GET_GEOCODES',
        latitude,
        longitude
    }
}

export function deleteProposal(id) {
    return {
        type: 'DELETE_PROPOSALS',
        id
    }
}

export function getMyParticiapations(participations) {
    return {
        type: 'GET_MYPARTICIPATIONSS',
        participations
    }
}