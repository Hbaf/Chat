import React, { Component } from 'react'
import '../../Static/SignIn.css'
import * as actions from '../../Actions/AuthActions'
import {connect} from "react-redux";

class SignIn extends Component{

    handleSubmit = (e)=>{
        e.preventDefault();
        let nickName = document.getElementById('nick').value;
        if (!nickName){
            return
        }
        this.props.signInUser(nickName);
    };

    render() {
        return (
            <form id='signin' onSubmit={this.handleSubmit}>
                <h3>SignIn</h3>
                <div className='input-field'>
                    <label htmlFor='nick'>Nick Name</label>
                    <input type="text" id='nick' onChange={this.handleChange}/>
                </div>
                <div className='input-field'>
                    <button>Login</button>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signInUser: (nickName) => {
            dispatch(actions.signInUser({userName: nickName}))
        }
    }
};

export default connect(null, mapDispatchToProps)(SignIn)