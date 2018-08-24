# Forms

We use `formik` library for forms, combined with `yup` for validation.

For `formik` and `material-ui` integration we use `formik-material-ui` bindings.

Simple form example: 

```jsx
import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
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

const LoginForm = () => (
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
          // transform errors from API to form errors
          // e.g. transformedErrors = transformMyApiErrors(errors)
          setErrors(transformedErrors);
        }
      }, 1000);
    }}
    >
    <Form noValidate autoComplete="off">
      <Field component={TextField} name="email" fullWidth label="E-mail" helperText="john@doe.com" required />
      <Field component={TextField} name="password" type="password" fullWidth label="Password" required />
      <Button type="submit">Login</Button>
    </Form>
  </Formik>
);


export default LoginForm;
```

See [`formik` docs](https://github.com/jaredpalmer/formik#table-of-contents) for reference.
