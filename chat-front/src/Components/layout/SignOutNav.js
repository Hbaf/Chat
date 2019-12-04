import React from 'react'
import { Link } from 'react-router-dom'

const SignOutNav = (props) =>{
    return (
        <ul className='nav-links'>
            <li><Link to='/chat'>Chat</Link></li>
            <li><Link to='/signout' onClick={props.logOut}>Sign Out</Link></li>
        </ul>
    )
};


export default SignOutNav