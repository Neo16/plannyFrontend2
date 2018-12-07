
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
        type: 'APPROVE_PARTICIPATION',
        id: id
    }
}

export function declinedParticipation(id) {
    return {
        type: 'DECLINE_PARTICIPATION',
        id: id
    }
}

export function deletePlanny(id) {
    return {
        type: 'DELETE_PLANNY',
        id
    }
}