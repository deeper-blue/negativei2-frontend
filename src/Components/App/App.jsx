import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home'
import Header from '../Header'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
