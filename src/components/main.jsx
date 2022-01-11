import {React} from'react';
// import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user-actions';
import ConnectedBasicInfo from './basic-info';
import ConnectedChatConversation from './chat-conversation';
import ConnectedChatInfo from './chat-info';

const ChatPanelUi=({
    users,
    onUserStatusChange
})=>{
    const onStatusChange=()=>{
        alert('onStatusChange');
        onUserStatusChange(3);
    }
    return <div className='container'>
        <div className="row">
        {/* <button type="button" className="btn btn-primary" onClick={()=>onStatusChange()}>Primary</button> */}
        <div className="col-3">
            <ConnectedBasicInfo />
        </div>
        <div className="col-6">
            <ConnectedChatConversation />
        </div>
        <div className="col-3">
            <ConnectedChatInfo />
        </div>
        </div>
    </div>
}

const mapStateToProps=(state)=>{
    return{
        users:state.usersReducer.users
    }
}

const mapDispatchToProps=(dispatch)=>({
 onUserStatusChange:(userId)=> dispatch(UserActions.changeStatus(userId))
});

const ConnectedChatPanelUi=connect(mapStateToProps,mapDispatchToProps)(ChatPanelUi);
export default ConnectedChatPanelUi;