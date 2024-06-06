import HTTPService from "./http.service";

const LoginService = {
    login: async (data) => {
        const path = 'http://localhost:5001/api/login';
        return HTTPService.post(path, data).then((response) => response);
    },
}

export default LoginService;
