import HTTPService from "./http.service";

const WeightRecordService = {
    create: async (userToken, weight) => {
        const path = 'http://localhost:5001/api/weight-record';
        const response = await HTTPService.post(path, {userToken, weight});

        return response;
    },
}

export default WeightRecordService;
