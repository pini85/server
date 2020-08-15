import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';

class SurveyFormReview extends Component {
  render() {
    return (
      <div>
        {this.props.form.title}
        {this.props.form.body}
        {this.props.form.body}
        <button onClick={this.props.onCancel}>Back</button>
        <button
          onClick={() =>
            this.props.submitSurvey(this.props.form, this.props.history)
          }
        >
          Send Survey
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  form: state.form.surveyForm.values,
});

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
