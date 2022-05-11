import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const formReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      email: action.emailValue,
      emailIsValid: action.emailValue.includes('@'),
      password : prevState.passwordIsValid,
      passwordIsValid:prevState.passwordIsValid
    };
  }
  if (action.type === 'INPUT_EMAIL_BLUR') {
    return {
      email: prevState.email,
      emailIsValid: prevState.emailIsValid,
      password : prevState.password,
      passwordIsValid: prevState.passwordIsValid
    };
  }
  if(action.type === 'PASSWORD_INPUT'){
    return {
      password : action.passwordValue,
      passwordIsValid : action.passwordValue.trim().length > 6,
      email:prevState.email,
      emailIsValid: prevState.emailIsValid,
    }
  }
  if(action.type === 'INPUT_PASSWORD_BLUR'){
    return {
      password : prevState.password,
      passwordIsValid : prevState.passwordIsValid,
      email: prevState.email,
      emailIsValid:prevState.emailIsValid
    }
  }
  return {
    email: '',
    emailIsValid: false,
    password: '',
    passwordIsValid: false,
  };
};

const Login = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, {
    email: '',
    emailIsValid: '',
    password: '',
    passwordIsValid: '',
  });

  const [formIsValid, setFormIsValid] = useState(false); 
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(formState.emailIsValid && formState.passwordIsValid);
    }, 1000);

    return () => clearTimeout(timer)

  }, [formState]);

  const emailChangeHandler = (event) => {
    dispatchForm({ type: 'USER_INPUT', emailValue: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({type: 'PASSWORD_INPUT', passwordValue: event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: 'INPUT_EMAIL_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchForm({ type: 'INPUT_PASSWORD_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.email, formState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${formState.emailIsValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${formState.passwordIsValid === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;




