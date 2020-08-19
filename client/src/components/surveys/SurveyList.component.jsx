import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';

class SurveyList extends React.Component {
  async componentDidMount() {
    await this.props.fetchSurveys();
  }
  render() {
    return (
      <div>
        <div>
          {this.props.surveys.reverse().map((survey) => {
            return (
              <div>
                <div>{SurveyList.title}</div>
                <div>{survey.body}</div>
                <div>
                  Sent on:{new Date(survey.dateSent).toLocaleDateString()}
                </div>
                <div>Yes:{survey.yes}</div>
                <div>No:{survey.no}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  surveys: state.surveys,
});
export default connect(mapStateToProps, {
  fetchSurveys: fetchSurveys,
})(SurveyList);
