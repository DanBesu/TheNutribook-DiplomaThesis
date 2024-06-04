import HTTPService from "./http.service";

const UserService = {
    create: async (data) => {
        const path = 'http://localhost:5001/api/user';
        const response = await HTTPService.post(path, data);
        
        if (response.status === 'error') {
            console.error(response.message);
            return null;
        }

        console.log(response.data)

        return response.data;
    },
}

export default UserService;
