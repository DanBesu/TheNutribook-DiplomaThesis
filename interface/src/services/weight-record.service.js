import HTTPService from "./http.service";

const WEIGHT_RECORD_PATH = 'http://localhost:5001/api/weight-record'

const WeightRecordService = {
    create: async (userToken, weight) => {
        const response = await HTTPService.post(WEIGHT_RECORD_PATH, {userToken, weight});

        return response;
    },
    getAll: async () => {
        const token = localStorage.getItem('token');
        const response = await HTTPService.get(`${WEIGHT_RECORD_PATH}/all/${token}`);

        return response;
    }
}

export default WeightRecordService;
