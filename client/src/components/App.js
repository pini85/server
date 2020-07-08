import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

import Header from './Header.component';
import DashBoard from './DashBoard.component';
import SurveyNew from './SurveyNew.component';
import Landing from './Landing.component';
import HelloWorld from './HelloWorld.component';
class App extends Component {
  async componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={DashBoard} />
            <Route exact path="/hello-world/" component={HelloWorld} />
            <Route path="/survey/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
