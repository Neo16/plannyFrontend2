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

export function joinedPlanny() {
    return {
        type: 'JOIN_PLANNY'
    }
}

export function canceledParticipation() {
    return {
        type: 'CANCEL_PARTICIPATION'        
    }
}

export function getMyParticiapations(participations) {
    return {
        type: 'GET_MYPARTICIPATIONSS',
        participations
    }
}
