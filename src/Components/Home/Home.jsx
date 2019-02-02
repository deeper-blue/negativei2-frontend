import React from 'react';
import './Home.scss';

function Home (props) {
    return (
      <div className="App">
        <header className="App-header">
          <img src='/assets/logo.svg' className="App-logo" alt="logo" />
          <a className="App-link" href="/profile">
            Test Profile Page
          </a>
          <a className="App-link" href="/page2">
            Test Page 2
          </a>
          <a className="App-link" href="/page3">
            Test Page 3
          </a>
        </header>
      </div>
    );
}

export default Home;