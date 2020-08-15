import React from 'react';
const SurveyField = ({ input, label, meta }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {meta.touched && meta.error}
    </div>
  );
};
export default SurveyField;
