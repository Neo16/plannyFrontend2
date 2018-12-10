import { getMyPlannies, getMyParticipations, pictureUpload, approvedParticipation, declinedParticipation, deletePlanny }
    from '../actionCreators/managePlannyActionCreators';

import { makeApiAction } from '../apiAsyncActionCreatorFactory';
import { showInfoModal } from '../actionCreators/globalActionCreators';

export const managePlannyAsyncActionCreators = (dispatch) => {
    return {
        createPlannyAsync: (planny) => {
            makeApiAction({
                url: 'plannies',
                method: 'POST',
                onSuccessNavigation: '/plannies/my',
                data: String(planny)
            }, dispatch);
        },
        updatePlannyAsync: (id, planny) => {
            makeApiAction({
                url: 'plannies/' + id,
                method: 'PUT',
                onSuccessNavigation: '/plannies/my',
                onFailure: () => {dispatch(showInfoModal("Updating planny failed."))},
                data: String(planny)
            }, dispatch);
        },
        getMyPlanniesAsync: () => {
            makeApiAction({
                url: 'plannies/myplannies',
                onSuccess: getMyPlannies,
            }, dispatch);
        },
        getMyParticipationsAsync: () => {
            makeApiAction({
                url: 'plannies/myparticipations',
                onSuccess: getMyParticipations,
            }, dispatch);
        },
        approveParticipationAsync: (id) => {
            makeApiAction({
                url: 'plannies/approveparticipation',
                method: 'POST',
                onSuccess: approvedParticipation,
                data: String(id),
                toggleIdLoading: false
            }, dispatch);
        },
        declineParticipationAsync: (id) => {
            makeApiAction({
                url: 'plannies/declineparticipation',
                method: 'POST',
                onSuccess: declinedParticipation,
                data: String(id),
                toggleIdLoading: false
            }, dispatch);
        },
        deletePlannyAsync: (id) => {
            makeApiAction({
                url: 'plannies/' + id,
                method: 'DELETE',
                onSuccess: deletePlanny,
                data: String(id)
            }, dispatch);
        }
    };
};