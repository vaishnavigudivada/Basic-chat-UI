import { CHANGE_STATUS } from "../action-types"

const initialState = {
    parentUserDetails:{
            id:2,
            name:'Bill Bardford',
            status:true,
            mail:'billbardford@gmail.com',
            profilePic:'https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg',
            role:'Lead UX/UI Designer',
        
    },
    users:[
        {
            id:1,
            name:'Nidhi',
            status:true,
            mail:'nidhit@gmail.com',
            profilePic:'https://dieteticallyspeaking.com/wp-content/uploads/2017/01/profile-square.jpg',
            role:'manager',
        },
        {
            id:2,
            name:'Bill Bardford',
            status:true,
            mail:'billbardford@gmail.com',
            profilePic:'https://m.media-amazon.com/images/M/MV5BZGI4YTQ5ZmEtMzllOC00NjlhLTg2ODMtN2I0MzVkYWQzZDI5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY1200_CR120,0,630,1200_AL_.jpg',
            role:'Lead UX/UI Designer',

        },
        {
            id:3,
            name:'Sunny',
            status:true,
            mail:'sunny@gmail.com',
            profilePic:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
            role:'manager',

        },
        {
            id:4,
            name:'Kiki',
            status:false,
            mail:'kiki@gmail.com',
            profilePic:'https://viterbischool.usc.edu/wp-content/uploads/2020/05/Lily-Profile-Square.jpeg',
            role:'manager',

        },
        {
            id:5,
            name:'Amrutha',
            status:false,
            mail:'amrutha@gmail.com',
            profilePic:'https://c0.wallpaperflare.com/preview/265/617/103/square-woman-black-and-white-person.jpg',
            role:'manager',

        },
        {
            id:6,
            name:'Deepthi',
            status:false,
            mail:'deepthi@gmail.com',
            profilePic:'https://www.stepstherapy.com.au/wp-content/uploads/2018/10/Yazmin-profile-picture-square.jpg',
            role:'manager',

        },
        {
            id:7,
            name:'Vaishu',
            status:true,
            mail:'vaishu@gmail.com',
            profilePic:'https://dieteticallyspeaking.com/wp-content/uploads/2017/01/profile-square.jpg',
            role:'manager',

        },
        {
            id:8,
            name:'Joy',
            status:false,
            mail:'joy@gmail.com',
            profilePic:'',
            role:'manager',

        },
        {
            id:9,
            name:'john',
            status:false,
            mail:'jhon@gmail.com',
            profilePic:'https://viterbischool.usc.edu/wp-content/uploads/2020/05/Lily-Profile-Square.jpeg',
            role:'manager',

        },
        {
            id:10,
            name:'zuhe',
            status:false,
            mail:'zuhe@gmail.com',
            profilePic:'',
            role:'manager',

        },
    ],
}

function changeStatusOfUser(state,action){
    let newUsers=state.users.map(user=>{return {...user,status: !user.status}})
    return {
        ...state,
        users: newUsers,
    }
}

export const usersReducer=(state=initialState,action)=>{
    switch(action.type){
        case CHANGE_STATUS:{
            
            return changeStatusOfUser(state,action)
        }
        
        default: return state;
    }
}


export default usersReducer;
