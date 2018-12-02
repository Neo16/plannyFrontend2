export function searchPlannies(plannies) {
    return {
        type: 'SEARCH_PLANNIES',
        plannies
    }
}

export function getPlanny(planny) {
    return {
        type: 'GET_PLANNY',
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

export function geoCode(latitude, longitude) {
    return {
        type: 'GET_GEOCODES',
        latitude,
        longitude
    }
}

export function getMyParticiapations(participations) {
    return {
        type: 'GET_MYPARTICIPATIONSS',
        participations
    }
}
