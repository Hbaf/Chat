import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from "./layout/NavBar";
import MainPage from "./MainPage";
import SignIn from "./Auth/SignIn";
import SignOut from "./Auth/SignOut";
import {connect} from "react-redux";
import { roomEndP } from "../Endpoints";
import Room from "./Room";

class SiteRouter extends Component{
    render() {
        return (
            <BrowserRouter>
                <NavBar isUserLogged={this.props.isUserLogged}/>
                <Switch>
                    <Route exact path='/' component={ MainPage }/>
                    <Route path='/chat' render={(match) => {
                        const params = new URLSearchParams(match.location.search);
                        const roomID = params.get('room');
                        if (!this.props.isUserLogged)
                            return <SignIn />;
                        if (roomID)
                            roomEndP.enterRoom({name: this.props.userName, roomID});
                        else
                            roomEndP.createRoom({name: this.props.userName});
                        return <Room />;
                    }}/>
                    <Route path='/signin' render={() => {
                        return (!this.props.isUserLogged)? <SignIn/> : <Redirect to='/'/>;
                    }}/>
                    <Route path='/signout' render={() => {
                        return (this.props.isUserLogged)? <SignOut /> : <Redirect to='/'/>;
                    }}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isUserLogged: state.authState.isUserLogged,
        userName: state.authState.userName,
    }
};

export default connect(mapStateToProps)(SiteRouter);