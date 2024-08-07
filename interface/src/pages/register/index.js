import React from 'react';
import { Form, Formik } from 'formik';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import UserService from '../../services/user.service';
import Input from '../../components/Input';

import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    const submit = (values) => {
        const submitData = { ...values };
        delete submitData.confirmPassword;
        UserService.create(submitData);
        navigate('/login');
    }

    const validate = (values) => {
        const errors = {};

        if (!values.email.trim()) {
            errors.email = '*required*';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'invalid email format';
        }

        if (!values.password.trim()) {
            errors.password = 'required';
        }

        if (!values.confirmPassword.trim()) {
            errors.confirmPassword = 'required';
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'passwords don\'t match';
        }

        if (!values.userName.trim()) {
            errors.userName = 'required';
        }

        return errors;
    }

    return (
        <div className="register-container">
            <Card className="register-card">
                <CardContent>
                    <Typography variant="h5" component="div" className="register-title">
                        Register
                    </Typography>
                    <Formik
                        initialValues={{
                            userName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        onSubmit={submit}
                        validate={validate}
                    >
                        {({ errors, touched }) =>
                            <Form>
                                <div className='inputs-container'>
                                    <div className="input-container">
                                        <Input
                                            sx={{width: '300px'}}
                                            error={!!errors.userName && touched.userName}
                                            name="userName"
                                            label="Username"
                                            helperText={errors.userName || 'type your username'}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <Input
                                            sx={{width: '300px'}}
                                            error={!!errors.email && touched.email}
                                            name="email"
                                            label="Email"
                                            helperText={errors.email || 'type your email'}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <Input
                                            sx={{width: '300px'}}
                                            error={!!errors.password && touched.password}
                                            name="password"
                                            label="Password"
                                            type="password"
                                            helperText={errors.password || 'type your password'}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <Input
                                            sx={{width: '300px'}}
                                            error={!!errors.confirmPassword && touched.confirmPassword}
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            helperText={errors.confirmPassword || 'confirm your password'}
                                        />
                                    </div>
                                </div>
                                <Button
                                    variant="contained"
                                    type='submit'
                                    className="submit-button"
                                    disabled={!!errors.email || !!errors.password || !!errors.confirmPassword || !!errors.userName}
                                >
                                    Submit
                                </Button>
                                <div className='login-button-container'>
                                    <Button
                                        variant="outlined"
                                        className="register-button"
                                        onClick={() => navigate('/login')}
                                    >
                                        Already have an account? Log In here
                                    </Button>
                                </div>
                            </Form>
                        }
                    </Formik>
                </CardContent>
            </Card>
        </div>
    );
}

export default Register;
