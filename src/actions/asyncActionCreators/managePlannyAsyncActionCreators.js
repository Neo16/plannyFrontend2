import { getMyPlannies, pictureUpload, approvedParticipation, declinedParticipation, deleteProposal }
    from '../actionCreators/managePlannyActionCreators';
import { push } from 'connected-react-router';
import { makeApiAction } from '../apiAsyncActionCreatorFactory';

export const managePlannyAsyncActionCreators = (dispatch) => {
    return {
        createPlannyAsync: (planny) => {
            makeApiAction({
                url: 'plannies',
                method: 'POST',
                onSuccess: () => { push('/') },
                data: String(planny)
            }, dispatch);
        },
        updatePlannyAsync: (id, planny) => {
            makeApiAction({
                url: 'plannies/' + id,
                method: 'PUT',
                onSuccess: () => { push('/') },
                data: String(planny)
            }, dispatch);
        },
        getMyPlanniesAsync: () => {
            makeApiAction({
                url: 'plannies/myplannies',
                onSuccess: getMyPlannies,
            }, dispatch);
        },
        approveParticipationAsync: (id) => {
            makeApiAction({
                url: 'plannies/approveparticipation',
                method: 'POST',
                onSuccess: approvedParticipation,
                data: String(id)
            }, dispatch);
        },
        declineParticipationAsync: (id) => {
            makeApiAction({
                url: 'plannies/declineparticipation',
                method: 'POST',
                onSuccess: declinedParticipation,
                data: String(id)
            }, dispatch);
        },
        deleteAsync: (id) => {
            makeApiAction({
                url: 'api/plannies/' + id,
                method: 'DELETE',
                onSuccess: deleteProposal,
                data: String(id)
            }, dispatch);
        }
    };
};