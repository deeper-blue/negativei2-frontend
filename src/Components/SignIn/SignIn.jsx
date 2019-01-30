import React, { Component } from 'react';
import * as FB from '../Firebase';

class SignIn extends Component {
    render() {
        var doSignIn = () => {
            FB.ui.start('#firebaseui-auth-container', {
                signInOptions: [
                    FB.auth.EmailAuthProvider.PROVIDER_ID,
                    FB.auth.GoogleAuthProvider.PROVIDER_ID
                ]
            });
        };

        return (
            <div id="sign-in">
              <div id="sign-in-button" onClick={doSignIn}>
                Sign in
              </div>
              <div id="firebaseui-auth-container"></div>
            </div>
        );
    }
}

export default SignIn;
