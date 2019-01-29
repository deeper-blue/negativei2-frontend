import React, { Component } from 'react';
import SignIn from '../SignIn';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Header from '../Header';
import Profile from '../Profile';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Profile" component={Profile} />
          <Route component={Home} />
        </Switch>
        <SignIn firebaseUi={this.props.firebaseUi} />
      </div>
    );
  }
}

export default App;
