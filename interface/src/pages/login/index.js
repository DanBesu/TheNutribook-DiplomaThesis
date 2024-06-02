import React from 'react';

import LoginService from '../../services/login.service';

const Login = () => {
   
    const submit = () => {
       console.log('submit');
       LoginService.login({userName: 'john'}).then(rsp => {console.log(rsp)});
    }

    return (
        <div>
            Login
            <button onClick={submit}>
                LogIn
            </button>
        </div>
    );
}

export default Login;