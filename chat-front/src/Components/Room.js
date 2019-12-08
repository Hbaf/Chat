import React, { Component } from 'react';
import { connect } from 'react-redux'
import Chat from "./Chat";
import CurrentUser from "./CurrentUser";

import '../Static/css/Room.css'
import store from "../store";
import { clearMessages } from "../Actions/ChatActions";
import { leaveTheRoom } from '../Actions/RoomActions';
import { roomEndP } from '../Endpoints';


class Room extends Component{
    render() {
        if (!this.props.roomExist)
            return (
                <div className='notification'>
                    <h3>Room doesn't exist</h3>
                    <h4>Check your link</h4>
                </div>
            );
        if (this.props.roomIsFull)
            return (
                <div className='notification'>
                    <h3>Room is Full</h3>
                    <h4>Try later :3</h4>
                </div>
            );
        if (this.props.roomEntered)
            return (
                <div id='room-panel'>
                    <Chat />
                    <div id='info-panel'>
                        <a href={ this.props.url + '/chat?room=' + this.props.roomID}> Current room </a>
                        <div className='info-panel-users'>
                            <p>Current users:</p>
                            { this.props.users.map( user => <CurrentUser userName={user.userName} key={user.userID}/>)}
                        </div>
                    </div>
                </div>
            );
    }

    componentWillUnmount() {
        store.dispatch(clearMessages());
        store.dispatch(leaveTheRoom());
        roomEndP.leaveRoom();
    }
}

const mapStateToProps = state => {
    return {
        roomExist: state.roomState.roomExist,
        roomIsFull: state.roomState.roomIsFull,
        roomEntered: state.roomState.roomEntered,
        roomID: state.roomState.roomID,
        url: state.appState.url,
        users: state.roomState.users,
    };
};

export default connect(mapStateToProps)(Room);