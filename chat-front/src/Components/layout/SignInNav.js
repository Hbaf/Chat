import React from 'react'
import { Link } from 'react-router-dom'

const SignInNav = () =>{
    return (
        <ul className='nav-links'>
            <li><Link to='/signin'>Sign In</Link></li>
        </ul>
    )
};

export default SignInNav