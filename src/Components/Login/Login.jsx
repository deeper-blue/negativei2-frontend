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

  render() {
    return (
      this.state.user
      ?
        <Redirect to="/" />
      :
        <div className="App">
          <header className="App-header">
            <img src='/assets/logo.svg' className="App-logo" alt="logo" />
            <StyledFirebaseAuth uiConfig={fbUiConfig} firebaseAuth={auth} />
            <Link to='/'>
              Play as guest
            </Link>
          </header>
        </div>
    );
  }
}

export default Login;
