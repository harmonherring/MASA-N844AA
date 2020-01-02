import React from 'react';
import Login from 'components/Login';
import Test from 'components/Test';
import { history } from 'utils';

import { Route, Router } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Test} />
        <Route exact path="/login" component={Login} />
      </Router>
    );
  }
}

export default App;
