import React from 'react';
import './Home.css';

function Home (props) {
    return (
      <div className="App">
        <header className="App-header">
          <img src='/assets/logo.svg' className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="/Profile"
          >
            Test Profile Page
          </a>
          <a
            className="App-link"
            href="/page2"
          >
            Test Page 2
          </a>
          <a
            className="App-link"
            href="/page3"
          >
            Test Page 3
          </a>
          <a
            className="App-link"
            href="/page4"
          >
            Test Page 4
          </a>
          <a
            className="App-link"
            href="/page5"
          >
            Test Page 5
          </a>
          <a
            className="App-link"
            href="/page6"
          >
            Test Page 6
          </a>
        </header>
      </div>
    );
}

export default Home;