import React, { Component } from 'react'
import * as actions from '../../Actions/AuthActions'
import store from '../../store';

import '../../Static/css/SignIn.css'

class SignIn extends Component{

    handleSubmit = (e)=>{
        e.preventDefault();
        let nickName = document.getElementById('nick').value;
        if (!nickName){
            return
        }
        store.dispatch(actions.signInUser({userName: nickName}))
    };

    render() {
        return (
            <div className='form'>
                <p>Select your nickname</p>
                <form id='signin' onSubmit={this.handleSubmit}>
                    <input type="text" id='nick' autoComplete='off' onChange={this.handleChange} required/>
                    <label htmlFor='nick' id='label-nick'>
                        <span id='content-nick'>
                            Nick Name
                        </span>
                    </label>
                    <button>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                            <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/>
                        </svg>
                    </button>
                </form>
            </div>
        );
    }
}

export default SignIn