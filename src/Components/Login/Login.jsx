import React, { Component } from 'react';
import './Login.scss';
import { Link, Redirect } from 'react-router-dom';
import firebase, { auth } from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const fbUiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
}

class Login extends Component {
  constructor(...args) {
    super(...args);

    this.state = {user: null}
    this.initAuthListener = this.initAuthListener.bind(this);
  }

  componentDidMount() {
      this.initAuthListener();
  }

  initAuthListener() {
    var header = this;
    auth.onAuthStateChanged(function(user) {
      if (user) { // User
        header.setState({user: user});
      }
    });
  }

  anonAuth(){
    auth.signInAnonymously().catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      this.state.user
      ?
        <Redirect to="/" />
      :
      <div id="login-wrapper">
        <div id="login">
          <StyledFirebaseAuth uiConfig={fbUiConfig} firebaseAuth={auth} className="test"/>
          {/* <Link id="guest-button" to='/' className="button">
            Play as guest
          </Link> */}
          <button id='guest-button' className='button' onClick={() => this.anonAuth()}>
            Play as guest
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
