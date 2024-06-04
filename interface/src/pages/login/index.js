import React from 'react';
import { Form, Formik } from 'formik';
import { Button, Card, CardContent, Typography } from '@mui/material';
import LoginService from '../../services/login.service';
import { Input } from '../../components/Input';
import './Login.css';

const Login = () => {
    const validate = (values) => {
        const errors = {};

        if (!values.email.trim()) {
            errors.email = '*required*';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'invalid format';
        }

        if (!values.password.trim()) {
            errors.password = 'required';
        }

        return errors;
    }

    const submit = (values) => {
        console.log(values);
        LoginService.login(values).then(response => {
            if (response.status === 'success') {
                const { data } = response;
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({
                    userName: data.user.userName,
                    email: data.user.email,
                }));
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
                        {({ errors }) =>
                            <Form>
                                <div className="input-container">
                                    <Input
                                        sx={{ width: '250px', margin: '10px' }}
                                        error={!!errors.email}
                                        name="email"
                                        label="Email"
                                        helperText={errors.email || 'type your email'}
                                    />
                                </div>
                                <div className="input-container">
                                    <Input
                                        sx={{ width: '250px', margin: '10px' }}
                                        error={!!errors.password}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        helperText={errors.password || 'type your password'}
                                    />
                                </div>
                                <Button
                                    variant="contained"
                                    type='submit'
                                    className="submit-button"
                                    disabled={!!errors.email || !!errors.password}
                                >
                                    Submit
                                </Button>
                            </Form>
                        }
                    </Formik>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
