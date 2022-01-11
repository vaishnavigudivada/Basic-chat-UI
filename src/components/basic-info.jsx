import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as ChatActions from '../actions/chat-actions';
import ProfileAvatar from "./avatar";


const BasicInfo=(
    {
        parentUser,
        users,
        latestUsers,
        selectedChat,
        getLatestChatUsers,
        getSelectedChat,
        // saveSelectedUser
}
    )=>{

    let [activeUsers,setActiveUsers]=useState([]);
    let [archiveUsers,setArchiveUsers]=useState([]);
    let [selectedUser,setSelectedUser]=useState(0);

    useEffect(()=>{
        getLatestChatUsers();
       
    },[]);

    const selectChat=(id)=>{
        setSelectedUser(id);
        getSelectedChat(id);
    }

    useEffect(()=>{
        let activeList=[],archiveList=[];
        users.forEach(user=>{
            if(latestUsers?.find(id=>id === user.id)){
                activeList.push({
                    ...user
                });
            }
            else{
                archiveList.push({...user});
            }
        })
        setActiveUsers(activeList);
        setArchiveUsers(archiveList);
        if(activeList.length>0){
            console.log('selectedChat',selectedChat);
            if(selectedChat?.userId !== undefined){
                console.log('selectedChat?.userId?selectedChat:activeList[0]',selectedChat?.userId?selectedChat:activeList[0]);
                selectChat(selectedChat.userId);
            }
            else{
                console.log('herer');
                selectChat(activeList[0].id);
            }
        }
    },[latestUsers,users]);

    

    return <>
    <div className="m-b-15">
        <span><ProfileAvatar link={"https://ps.w.org/fast-chat-button/assets/icon-256x256.png?rev=2300452"}  width="60px" name="QuickChat"/></span>
            {/* <img src= className="img-thumbnail" alt="..." height="60px" width="60px"/> </span> */}
        <span className="f-b p-20 heading-font">QuickChat</span>
    </div>
    <div className="userInfo block m-b-30">
        <div>
            <ProfileAvatar link={parentUser.profilePic} width={"80px"} name={parentUser?.name}/>
        </div>
        <div className="Name f-b f-1-2">
            {parentUser?.name}
            <span className="p-l-r-5"><FontAwesomeIcon icon={faCog} /></span>
        </div>
        <div className="role f-0-7">{parentUser?.role}</div>
        <div className="status f-0-7">{parentUser?.status===true?"Active":"Inactive"}</div>
    </div>
    <div className="" id="chatLists">
        <div className="">
            <div className="accordion-header">
                <div className="f-b">
                    <span className=""> Active Conversations </span>
                    <span className="chat-count"> {activeUsers.length} </span>
                </div>
            </div> 
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#chatLists" aria-labelledby="headingOne">
                {activeUsers.filter(user=> user.id !== parentUser?.id).map(user=>{
                    return <div className={`user-list-block cursor-pointer ${user.id === selectedUser?'active':''}`} key={user.id} onClick={(e)=>selectChat(user.id)}>
                        <div><ProfileAvatar link={user.profilePic} width={"30px"} name={user.name}/></div>
                        <div className="p-l-r-10" >{user.name}</div>
                        </div>
                })}
            </div>
        </div>
        <div className="">
                <div className="f-b">
                    <span> Archive Conversations </span>
                    <span className="chat-count"> {archiveUsers.length} </span>
                </div>
            {archiveUsers.filter(user=> user.id !== parentUser?.id).map(user=>{
                return <div className={`user-list-block cursor-pointer ${user.id === selectedUser?'active':''}`} key={user.id} onClick={(e)=>selectChat(user.id)}>
                    <div><ProfileAvatar link={user.profilePic} width={"30px"} name={user.name}/></div>
                    <div className="p-l-r-10" >{user.name}</div>
                    </div>
            })}
        </div>
    </div>
    </>
};

const mapStateToProps=(state)=>{
    return{
        parentUser:state.usersReducer.parentUserDetails,
        users:state.usersReducer.users,
        latestUsers:state.chatReducer.latestChatUsers,
        selectedChat:state.chatReducer.selectedChat,

    }
};

const mapDispatchToProps=(dispatch)=>({
    getLatestChatUsers:()=> dispatch(ChatActions.getLatestChatUsers()),
    getSelectedChat:(userId)=> dispatch(ChatActions.getChatHistory(userId)),
});

const ConnectedBasicInfo=connect(mapStateToProps,mapDispatchToProps)(BasicInfo);
export default ConnectedBasicInfo;
