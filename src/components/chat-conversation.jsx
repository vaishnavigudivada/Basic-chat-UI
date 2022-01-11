import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as ChatActions from '../actions/chat-actions';
import ProfileAvatar from "./avatar";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatConversation=({parentUser,selectedChat,users,addToChat})=>{
    const [message,setMessage]=useState("");
    const today = new Date();
    const [loader,setLoader]= useState(true);
    const [selectedUserDetails,setSelectedUserDetails]= useState({name:"",mail:""});

    const sendToChat=()=>{
      let details={
        // userId: selectedChat.userId,
        sentById: parentUser.id,
        message: message,
        time: today.getHours() + ":" + today.getMinutes(),
      };
      addToChat(details);
      setMessage('');
    }

    useEffect(()=>{
      if(selectedChat){
        setLoader(false);
      }
    },[selectedChat]);

    useEffect(()=>{
      if(users.length>0){
          let selcUser=users.find(user=>user.id === selectedChat.userId);
          setSelectedUserDetails(selcUser);
      }
   },[selectedChat])

    return <>
      <div className="block" >
        <div className="chat-window">
        {
          loader?
          <h4>page is loading</h4>:
              selectedChat?.history?.length>0? selectedChat?.history?.map((conv,i)=>{
                  if((conv).sentById === parentUser.id){
                        return <div className="row " key={i}>
                            <div className="col col-lg-10 col-sm-9 text-right my-message-cntr">
                              <p className="my-message">{conv.message}</p>
                            </div>
                            <div className="col col-lg-2 col-sm-3">
                              <ProfileAvatar link={parentUser.profilePic} name={parentUser.name} width={'30px'}/>
                            </div>
                          </div>
                  }
                  else{
                      return <div className="row " key={i}>
                          <div className="col col-lg-1 col-sm-2">
                            <ProfileAvatar link={selectedUserDetails?.profilePic} name={selectedUserDetails?.name} width={"30px"}/>
                          </div>
                          <div className="col col-lg-11 col-sm-10 text-left ">
                            <p className="sender-message">{conv.message}</p>
                          </div>
                      </div>
                  }
              }):<div className="f-2-0">This is the very beginning of your direct message history with {selectedUserDetails?.name}</div>
        }
        </div>

        <div className="message-box d-f">
            <span className="col col-1 p-t-7">
              <FontAwesomeIcon icon={faPaperclip} />
              </span>
              <input className="col col-8 p-l-r-10 br-5" placeholder="Enter your message here" 
                  value={message}
                  onChange={(e)=>{
                    setMessage(e.target.value);
                  }}/>
            <span className=" col col-3">
            <button type="submit" className="btn btn-primary " onClick={(e)=>{sendToChat()}}>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
            </span>
        </div>
      </div>
    
    </>
};

const mapStateToProps=(state)=>{
    return{
        parentUser:state.usersReducer.parentUserDetails,
        selectedChat:state.chatReducer.selectedChat,
        users:state.usersReducer.users,

    }
};

const mapDispatchToProps=(dispatch)=>({
  addToChat:(details)=> dispatch(ChatActions.addToChat(details)),
});

const ConnectedChatConversation=connect(mapStateToProps,mapDispatchToProps)(ChatConversation);
export default ConnectedChatConversation;
