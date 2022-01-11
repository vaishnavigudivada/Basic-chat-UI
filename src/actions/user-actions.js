import * as ActionTypes from '../action-types';

export function changeStatus(userId){
    return {
        type:ActionTypes.CHANGE_STATUS,
        payload:{userId}
    }
}