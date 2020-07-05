import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header.component';
import DashBoard from './DashBoard.component';
import SurveyNew from './SurveyNew.component';
import Landing from './Landing.component';
const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={DashBoard} />
          <Route path="/survey/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};
export default App;
