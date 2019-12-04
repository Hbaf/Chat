import React, { Component } from 'react'
import Message from "../Components/Message";
import * as actions from '../Actions/ChatActions'
import { connect } from 'react-redux'
import '../Static/Chat.css'
import { chatEndP, roomEndP } from "../Endpoints";
import store from '../store'

class Chat extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        let message = {roomID: this.props.roomID, message: this.state.message, time: +(new Date()), userName: this.props.user }
        chatEndP.sendMessage(message);
        store.dispatch(actions.receiveMessage(message));
        this.setState({
            message: ''
        })
    };

    handleChange = (e) =>{
        this.setState({message: e.target.value})
    };

    render() {
        if (this.props.roomEntered)
            return (
                <div id='chat'>
                    <div id='chat-messages'>
                        {this.props.messages.map(message => { return <Message message={message} key={message.time}/> })}
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' id='message-input'
                               value={this.state.message} onChange={this.handleChange}/>
                        <button>Send</button>
                    </form>
                    <div>
                        <a href={ this.props.url + '/chat?room=' + this.props.roomID}> Current room </a>
                    </div>
                </div>
            );
        if (this.props.roomIsFull)
            return (
                <div id='notification'>
                    <h3>Room is Full</h3>
                    <h4>Try later :3</h4>
                </div>
            );
        if (this.props.roomExist)
            return (
                <div id='notification'>
                    <h3>Room doesn't exist</h3>
                    <h4>Check your link</h4>
                </div>
            )
    }
    componentDidUpdate(prevProps, prevState) {
        //прокрутка чата вниз, если было добавленно сообщение
        if (prevProps.messages.length !== this.props.messages.length) {
            let messages = document.getElementsByClassName('messages')[0];
            if (messages) {
                messages.scrollTop = messages.scrollHeight;
            }
        }
        window.onbeforeunload = this.handleExit;
    }

    handleExit = () => {
        roomEndP.leaveRoom();
    }
}

const mapStateToProps = state => {
    return {
        messages: state.chatState.messages,
        user: state.authState.userName,
        users: state.roomState.users,
        roomExist: state.roomState.roomExist,
        roomIsFull: state.roomState.roomIsFull,
        roomEntered: state.roomState.roomEntered,
        roomID: state.roomState.roomID,
        url: state.appState.url,
    }
};

export default connect(mapStateToProps)(Chat)