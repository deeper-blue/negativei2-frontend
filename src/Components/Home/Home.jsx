import React from 'react';
import { Link } from 'react-router-dom'
import './Home.scss';
import * as fb from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const fbUiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/profile',
    signInOptions: [
        fb.auth.EmailAuthProvider.PROVIDER_ID,
        fb.auth.GoogleAuthProvider.PROVIDER_ID
    ]
}

function Home (props) {
    return (
      <div className="App">
        <header className="App-header">
          <img src='/assets/logo.svg' className="App-logo" alt="logo" />
          <StyledFirebaseAuth uiConfig={fbUiConfig} firebaseAuth={fb.auth()} />
          <Link to='/profile'>
            Play as guest
          </Link>
        </header>
      </div>
    );
}

export default Home;
