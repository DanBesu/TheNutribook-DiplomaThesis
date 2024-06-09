import HTTPService from "./http.service";

const UserService = {
    create: async (data) => {
        const path = 'http://localhost:5001/api/user';
        const response = await HTTPService.post(path, data);

        return response;
    },
    getAll: async () => {
        const path = 'http://localhost:5001/api/user';
        const response = await HTTPService.get(path);

        return response;
    }
}

export default UserService;
