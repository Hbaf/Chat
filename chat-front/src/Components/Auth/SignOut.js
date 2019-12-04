import React, { Component } from 'react'
import '../../Static/SignIn.css'
import {Redirect} from "react-router";

class SignOut extends Component{
    render() {
        return <Redirect to='/'/>
    }
}

export default SignOut