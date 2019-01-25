import React, { Component } from 'react';
import './App.scss';
import SignIn from '../SignIn';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='/assets/logo.svg' className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <SignIn firebaseUi={this.props.firebaseUi} />
      </div>
    );
  }
}

export default App;
