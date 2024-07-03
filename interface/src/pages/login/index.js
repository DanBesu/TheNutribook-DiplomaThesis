import React from 'react';
import { useNavigate } from 'react-router';
import { Form, Formik } from 'formik';
import { Button, Card, CardContent, Typography } from '@mui/material';

import LoginService from '../../services/login.service';
import Input from '../../components/Input';

import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const validate = (values) => {
        const errors = {};

        if (!values.email.trim()) {
            errors.email = 'required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'invalid format';
        }

        if (!values.password.trim()) {
            errors.password = 'required';
        }

        return errors;
    }

    const submit = (values) => {
        LoginService.login(values).then(response => {
            if (response.status === 'success') {
                const { data } = response;
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({
                    userName: data.user.userName,
                    email: data.user.email,
                }));
                navigate('/home');
            } else {
                console.error('Login failed:', response.message);
            }
        });
    }

    return (
        <div className="login-container">
            <Card className="login-card">
                <CardContent>
                    <Typography variant="h5" component="div" className="login-title">
                        Login
                    </Typography>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validate={validate}
                        onSubmit={submit}
                    >
                        {({ errors, touched }) =>
                            <Form>
                                <div className="inputs-container">
                                    <div className="input-container">
                                        <Input
                                            sx={{ width: '300px', margin: '10px' }}
                                            error={!!errors.email && touched.email}
                                            name="email"
                                            label="Email"
                                            helperText={errors.email || 'type your email'}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <Input
                                            sx={{ width: '300px', margin: '10px' }}
                                            error={!!errors.password && touched.password}
                                            name="password"
                                            label="Password"
                                            type="password"
                                            helperText={errors.password || 'type your password'}
                                        />
                                    </div>
                                </div>
                                <Button
                                    variant="contained"
                                    type='submit'
                                    className="submit-button"
                                    disabled={!!errors.email || !!errors.password}
                                >
                                    Submit
                                </Button>
                                <div className='register-button-container'>
                                    <Button
                                        variant="outlined"
                                        className="register-button"
                                        onClick={() => navigate('/register')}
                                    >
                                        Click to Register
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

export default Login;
