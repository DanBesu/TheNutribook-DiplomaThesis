import HTTPService from "./http.service";

const FOOD_PATH = 'http://localhost:5001/api/food';

const FoodService = {
    create: async (data) => {
        const response = await HTTPService.post(`${FOOD_PATH}`, data);
        return response;
    },
    getByUserNameAndDate: async (data) => {
        const { userName, day, month, year } = data;
        const response = await HTTPService.get(`${FOOD_PATH}/${userName}/${day}/${month}/${year}`);
        return response;
    },
    delete: async (id) => {
        const response = await HTTPService.delete(`${FOOD_PATH}/${id}`);
        return response;
    },
    update: async (id, data) => {
        const response = await HTTPService.put(`${FOOD_PATH}/${id}`, data);
        return response;
    },
};

export default FoodService;
