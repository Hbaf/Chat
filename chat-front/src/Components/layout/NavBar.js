import React from 'react'
import { Link } from 'react-router-dom'
import SignInNav from "./SignInNav";
import SignOutNav from "./SignOutNav";
import '../../Static/Navbar.css'

const NavBar = (props) => {
    return (
        <nav>
            <div className='logo'>
                <Link to='/'>Home</Link>
            </div>
            { props.isUserLogged ? <SignOutNav /> : <SignInNav /> }
        </nav>
    )
};

export default NavBar