import * as ActionTypes from '../action-types';

export function getLatestChatUsers(){
    return {
        type:ActionTypes.GET_LATEST_CHATS,
        payload:{}
    }
}

export function getChatHistory(userId){
    return {
        type:ActionTypes.GET_CHAT_HISTORY,
        payload:{userId}
    }
}

export function addToChat(details){
    return {
        type:ActionTypes.ADD_TO_CHAT,
        payload:{details}
    }
}

export function removeFromChat(){
    return {
        type:ActionTypes.REMOVE_CHAT,
        payload:{}
    }
}



