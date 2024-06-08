import HTTPService from "./http.service";

const MOOD_RECORD_PATH = 'http://localhost:5001/api/mood-record';

const MoodRecordService = {
    create: async (data) => {
        const response = await HTTPService.post(`${MOOD_RECORD_PATH}`, data);
        return response;
    },
    getAllByUserNameAndDate: async (data) => {
        const { userName, day, month, year } = data;
        const response = await HTTPService.get(`${MOOD_RECORD_PATH}/${userName}/${day}/${month}/${year}`);
        return response;
    },
    delete: async (id) => {
        const response = await HTTPService.delete(`${MOOD_RECORD_PATH}/${id}`);
        return response;
    },
    update: async (id, data) => {
        const response = await HTTPService.put(`${MOOD_RECORD_PATH}/${id}`, data);
        return response;
    },
};

export default MoodRecordService;
