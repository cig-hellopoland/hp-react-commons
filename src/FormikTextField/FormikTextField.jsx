import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik'; // eslint-disable-line import/no-extraneous-dependencies
import TextField from '@material-ui/core/TextField'; // eslint-disable-line import/no-extraneous-dependencies

/**
 * material-ui TextField wrapper for Formik forms.
 *
 * @example
import React from 'react';
import { Formik } from 'formik';
import FormikTextField from '@hello-poland/commons/FormikTextField';
import Button from '@material-ui/core/Button';
import yupObject from 'yup/lib/object';
import yupString from 'yup/lib/string';
import setLocale from 'yup/lib/setLocale';
import plLocale from '@hello-poland/commons/utils/yupLocalePl';

// set yup locale to pl
setLocale(plLocale);

// use yup for validation
const schema = yupObject().shape({
  email: yupString().email().required(),
  password: yupString().min(8).max(40).required(),
});

const Form = () => (
 <Formik
   initialValues={{
      email: '',
      password: '',
    }}
   validationSchema={schema}
   onSubmit={(
     values,
     { setSubmitting, setErrors }
   ) => {
      setTimeout((ok = true, errors) => {
        setSubmitting(false);

        // handle errors
        if (!ok) {
          let transformedErrors;
          // transformedErrors = transformMyApiErrors(errors)
          setErrors(transformedErrors);
        }
      }, 1000);
   }}
   >
   {({ handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <FormikTextField name="email" fullWidth label="E-mail" helperText="john@doe.com" required />
        <FormikTextField name="password" type="password" fullWidth label="Password" required />
        <Button type="submit" disabled={isSubmitting}>Login</Button>
      </form>
    )}
 </Formik>
);


export default Form;
 */

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
