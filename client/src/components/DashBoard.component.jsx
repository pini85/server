import React from 'react';
import SurveyList from './surveys/SurveyList.component';

import { Link } from 'react-router-dom';

const DashBoard = () => {
  return (
    <div>
      <SurveyList></SurveyList>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" href="" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};
export default SurveyList;
