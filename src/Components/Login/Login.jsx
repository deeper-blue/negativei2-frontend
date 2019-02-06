import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const fbUiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
}

function Login (props) {
    return (
      <div id="login-wrapper">
        <div id="login">
          <StyledFirebaseAuth uiConfig={fbUiConfig} firebaseAuth={firebase.auth()} className="test"/>
          <Link id="guest-button" to='/' class="button">
            Play as guest
          </Link>
        </div>
      </div>
    );
}

export default Login;
