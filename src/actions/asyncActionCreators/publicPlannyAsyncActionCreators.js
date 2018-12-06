import { searchPlannies, getPlanny, joinedPlanny, canceledParticipation, getMyParticiapations } from '../actionCreators/publicPlannyActionCreators';
import { makeApiAction } from '../apiAsyncActionCreatorFactory';

export const publicPlannyAsyncActionCreators = (dispatch) => {
    return {
        getPlanniesAsync: (query) => {
            makeApiAction({
                url: 'plannies/search',
                method: 'POST',
                onSuccess: searchPlannies,
                data: String(query)
            }, dispatch);
        },
        getPlannyAsync: (id) => {
            makeApiAction({
                url: 'plannies/' + id,
                onSuccess: getPlanny,
            }, dispatch);
        },
        joinPlannyAsync: (id) => {
            makeApiAction({
                url: 'plannies/join/' + id,
                onSuccess: joinedPlanny,
            }, dispatch);
        },
        cancelParticipationAsync: (id) => {
            makeApiAction({
                url: 'plannies/cancelparticipation',
                method: 'POST',
                onSuccess: canceledParticipation,
                data: String(id)
            }, dispatch);
        },
        getMyParticipationsAsync: () => {
            makeApiAction({
                url: 'plannies/myparticipations',
                onSuccess: getMyParticiapations,
            }, dispatch);
        },
    };
};