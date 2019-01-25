import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

class SignIn extends Component {
    render() {
        const { firebaseUi } = this.props;

        var doSignIn = () => {
            firebaseUi.start('#firebaseui-auth-container', {
                signInOptions: [
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID
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
