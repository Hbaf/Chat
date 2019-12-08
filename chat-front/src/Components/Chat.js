import React, { Component } from 'react'
import { connect } from 'react-redux'

import { chatEndP} from "../Endpoints";
import store from '../store'
import Message from "../Components/Message";
import {receiveMessage} from "../Actions/ChatActions";

import '../Static/css/Chat.css'

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
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' autoComplete='off' placeholder='Write a message...' required
                               value={this.state.message} onChange={this.handleChange}/>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 12l-4.5 4.5 1.527 1.5 5.973-6-5.973-6-1.527 1.5 4.5 4.5z"/>
                            </svg>
                        </button>
                    </form>
                </div>
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