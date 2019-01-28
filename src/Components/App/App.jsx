import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home    from '../Home';
import Header  from '../Header';
import Profile from '../Profile';
import Game    from '../Game'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/game" component={Game} />
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
