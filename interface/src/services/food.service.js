import HTTPService from "./http.service";

const FOOD_PATH = 'http://localhost:5001/api/food';

const FoodService = {
    create: async (data) => {
        const response = await HTTPService.post(`${FOOD_PATH}`, data);
        return response;
    },
    getByUserNameAndDate: async (data) => {
        console.log('data: ', data);
        const { userName, day, month, year } = data;
        

        const response = await HTTPService.get(`${FOOD_PATH}/${userName}/${day}/${month}/${year}`);
        return response;
    },
    delete: async (id) => {
        const response = await HTTPService.delete(`${FOOD_PATH}/${id}`);
        return response;
    },
};

export default FoodService;
