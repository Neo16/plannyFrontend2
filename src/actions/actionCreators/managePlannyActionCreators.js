
export function getMyPlannies(plannies) {
    return {
        type: 'GET_MY_PLANNIES',
        plannies
    }
}

export function pictureUpload(pictureUrl) {
    return {
        type: 'UPLOAD_PICS',
        pictureUrl
    }
}

export function approvedParticipation(id) {
    return {
        type: 'APPROVE_PARTICIPATIONS',
        id: id
    }
}

export function declinedParticipation(id) {
    return {
        type: 'DECLINE_PARTICIPATIONS',
        id: id
    }
}

export function deleteProposal(id) {
    return {
        type: 'DELETE_PROPOSALS',
        id
    }
}