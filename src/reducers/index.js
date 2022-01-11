// const rootReducer=(state:any ,action: any)=>{
//     switch
// }

import { combineReducers } from "redux";
import {usersReducer} from './users-reducers';
import {chatReducer} from './chat-reducer';

const rootReducer=combineReducers({
    usersReducer,
    chatReducer
});

export default rootReducer;