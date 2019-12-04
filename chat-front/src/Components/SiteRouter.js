import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from "./layout/NavBar";
import MainPage from "./MainPage";
import SignIn from "./Auth/SignIn";
import SignOut from "./Auth/SignOut";
import Chat from "./Chat";
import {connect} from "react-redux";
import * as actions from "../Actions/AuthActions";
import { roomEndP } from "../Endpoints";

class SiteRouter extends Component{
    render() {
        return (
            <BrowserRouter>
                <NavBar isUserLogged={this.props.isUserLogged} logOut={this.logOut.bind(this)}/>
                <Switch>
                    <Route exact path='/' component={ MainPage }/>
                    <Route exact path='/chat' render={(match) => {
                        const params = new URLSearchParams(match.location.search);
                        const roomID = params.get('room');
                        if (!this.props.isUserLogged)
                            return <SignIn />;
                        if (roomID)
                            roomEndP.enterRoom({name: this.props.userName, roomID});
                        else
                            roomEndP.createRoom({name: this.props.userName});
                        return <Chat />;
                    }}/>
                    <Route path='/signin' render={() => {
                        return (!this.props.isUserLogged)? <SignIn/> : <Redirect to='/'/>;
                    }}/>
                    <Route path='/signout' component={ SignOut }/>
                </Switch>
            </BrowserRouter>
        );
    }

    logOut = function (){
        this.props.signOutUser();
    }
}

const mapStateToProps = state => {
    return {
        isUserLogged: state.authState.isUserLogged,
        userName: state.authState.userName,
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        signOutUser: () => {
            dispatch(actions.signOutUser())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteRouter);