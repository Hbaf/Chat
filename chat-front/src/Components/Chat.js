import React, { Component } from 'react'
import { connect } from 'react-redux'

import { chatEndP} from "../Endpoints";
import store from '../store'
import Message from "../Components/Message";
import {receiveMessage} from "../Actions/ChatActions";

import '../Static/Chat.css'

class Chat extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        let message = {roomID: this.props.roomID, message: this.state.message, time: +(new Date()), userName: this.props.user };
        chatEndP.sendMessage(message);
        store.dispatch(receiveMessage(message));
        this.setState({
            message: ''
        })
    };

    handleChange = (e) =>{
        this.setState({message: e.target.value})
    };

    render() {
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
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        // scroll messages if new one appear
        let messages = document.getElementById('chat-messages');
        messages.scrollTop = messages.scrollHeight;
    }
}

const mapStateToProps = state => {
    return {
        messages: state.chatState.messages,
        user: state.authState.userName,
        roomID: state.roomState.roomID,
        users: state.roomState.users,
    };
};

export default connect(mapStateToProps)(Chat)