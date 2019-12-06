import React from 'react'
import { Redirect } from "react-router";
import store from "../../store";
import * as actions from "../../Actions/AuthActions";

const SignOut = () => {
    store.dispatch(actions.signOutUser());
    return <Redirect to='/'/>
};

export default SignOut