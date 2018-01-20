import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Entry from './components/Entry';
import Passwords from './components/Passwords';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect from="/" exact to="/login" />
          <Route path="/login" component={Entry} />
          <Route path="/passwords" component={Passwords} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;
