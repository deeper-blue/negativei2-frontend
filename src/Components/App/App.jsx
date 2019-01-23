import React, { Component } from 'react';
import './App.css';
import Home from '../Home'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
