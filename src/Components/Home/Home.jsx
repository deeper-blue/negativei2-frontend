import React from 'react';
import { Link } from 'react-router-dom'
import './Home.scss';
import firebase from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const fbUiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/profile/1',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
}

function Home (props) {
    return (
      <div className="App">
        <header className="App-header">
          <img src='/assets/logo.svg' className="App-logo" alt="logo" />
          <StyledFirebaseAuth uiConfig={fbUiConfig} firebaseAuth={firebase.auth()} />
          <Link to='/profile/1'>
            Play as guest
          </Link>
        </header>
      </div>
    );
}

export default Home;
