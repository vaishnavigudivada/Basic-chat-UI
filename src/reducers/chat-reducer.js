import { ADD_TO_CHAT, GET_CHAT_HISTORY, GET_LATEST_CHATS, REMOVE_CHAT } from "../action-types"

const initialState = {
    chatHistory: [
        {
            userId: 3,
            history:[
            {
                message:"Hi...,Bill",
                sentById:3,
                time:'12:30'
            },
            {
                message:"Hey sunny,nice to meet you",
                sentById:2,
                time:'12:30'
            },
            {
                message:"How can I help you today",
                sentById:3,
                time:'12:31'
            },
            // {
            //     message:"Hope you are doing good",
            //     sentById:3,
            //     time:'12:31'
            // },
            {
                message:"Thanks,for asking",
                sentById:2,
                time:'12:32'
            },
            {
                message:"I'm interested to know about your prices and services you offer",
                sentById:3,
                time:'12:31'
            },
            {
                message:"Please,check our site to know about more information",
                sentById:2,
                time:'12:32'
            },
            {
                message:"Awesome, will get in touch if there's anything unclear , thanks for now",
                sentById:3,
                time:'12:31'
            },
            {
                message:"Thanks buddy,you too as well",
                sentById:2,
                time:'12:32'
            },
        ]
        },
        {
            userId: 4,
            history:[
            {
                message:"Hi... vaishu,",
                sentById:4,
                time:'12:30'
            },
            {
                message:"Helloo kiki,",
                sentById:2,
                time:'12:30'
            },
            
        ]
        },
        {
            userId: 8,
            history:[
            {
                message:"Hi... bill,",
                sentById:8,
                time:'12:30'
            },
            {
                message:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                sentById:8,
                time:'12:30'
            },
            {
                message:"Lorem ipsum dolor sit amet, ",
                sentById:8,
                time:'12:30'
            },
            {
                message:"Helloo Joy,",
                sentById:2,
                time:'12:30'
            },
            {
                message:"Lorem ipsum dolor sit amet, ",
                sentById:2,
                time:'12:30'
            },
            
        ]
        },
    ],
    latestChatUsers:[],
    selectedChat:{},
    selectedChatHistory:[],

}

function getSelectedChatHistory(state,userId){
    let selectedHistory={};
    if(state.chatHistory.find(user=>user.userId === userId)){
        selectedHistory=state.chatHistory.find(user=>user.userId === userId);
    }else{
        selectedHistory={
            userId:userId,
            history:[]
        }
    }
    return {
        ...state,
        selectedChat:selectedHistory
    }
}

function addToChat(state,details){
    let newHistory=[];
    if(state.chatHistory.find(user=>user.userId === state.selectedChat.userId)){
        newHistory =state.chatHistory.map(chat=>{
            if(chat.userId === state.selectedChat.userId){
                return {
                    ...chat,
                    history:[
                        ...chat.history,
                        details,
                    ]
                }
            }
            else{
                return {
                    ...chat
                }
            }
        })

    }
    else{
        newHistory=[...state.chatHistory,{userId:state.selectedChat.userId,history:[details]}]
    }
    return{
        ...state,
        chatHistory:newHistory,
        selectedChat:{
            ...state.selectedChat,
            history:[...state.selectedChat.history,{...details}]
        },
        latestChatUsers:newHistory.map(chat=>{return chat.userId})
    }
}

function removeFromChat(state)
{
    let newChatHistory=state.chatHistory.filter(chat=>chat.userId !== state.selectedChat.userId);
    return{
        chatHistory:newChatHistory,
        latestChatUsers:newChatHistory.map(chat=>{return chat.userId}),
        selectedChat:{
            ...newChatHistory[0]
        }

    }
}

export const chatReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_LATEST_CHATS:{
            let users=state.chatHistory.map(chat=>{return chat.userId});
            return {
                ...state,
                latestChatUsers:users,
            }
            // return changeStatusOfUser(state,action)
        }
        case GET_CHAT_HISTORY:{
            return getSelectedChatHistory(state,action.payload.userId)
        }
        case ADD_TO_CHAT:{
            return addToChat(state,action.payload.details)
        }
        
        case REMOVE_CHAT:{
            return removeFromChat(state,action.payload.userId)
        }
        default: return state;
    }
}

export default chatReducer;