
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

export function deleteProposal(id) {
    return {
        type: 'DELETE_PROPOSALS',
        id
    }
}