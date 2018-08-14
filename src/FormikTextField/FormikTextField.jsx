import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik'; // eslint-disable-line import/no-extraneous-dependencies
import TextField from '@material-ui/core/TextField'; // eslint-disable-line import/no-extraneous-dependencies

const FormikTextField = ({ name, helperText, ...props }) => (
  <Field name={name}>
    {({ field, form }) => {
      const error = form.errors[name];
      const touched = form.touched[name];
      const showError = touched && !!error;

      return (
        <TextField
          name={name}
          {...props}
          {...field}
          error={showError}
          helperText={showError ? error : helperText}
        />
      );
    }}
  </Field>
);

FormikTextField.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
};

FormikTextField.defaultProps = {
  helperText: '',
};

export default FormikTextField;
