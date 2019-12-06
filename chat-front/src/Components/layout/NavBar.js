import React from 'react'
import { Link } from 'react-router-dom'
import SignInNav from "./SignInNav";
import SignOutNav from "./SignOutNav";
import '../../Static/Navbar.css'

const NavBar = (props) => {
    return (
        <nav>
            <Link to='/'>Home</Link>
            { props.isUserLogged ? <SignOutNav /> : <SignInNav /> }
        </nav>
    )
};

export default NavBar