import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField.component';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails.js';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'recipients' },
];
class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        {FIELDS.map((field) => {
          return (
            <div key={field.label}>
              <Field
                label={field.label}
                type="text"
                name={field.name}
                component={SurveyField}
              />
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys">Cancel</Link>
          <button type="submit">Next</button>
        </form>
      </div>
    );
  }
}
const validate = (values) => {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You need to enter a ${name}`;
    }
  });

  return errors;
};
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
