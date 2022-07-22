import axios from 'axios';
const FEEDBACK_REST_API_URL = 'http://localhost:8080/api/v1/feedback';

class FeedbackService {
    getFeedback() {
        return axios.get(FEEDBACK_REST_API_URL + "/getAll/");
    }
    deleteFeedback(id) {
        return axios.delete(FEEDBACK_REST_API_URL + "/delete/" + id);
    }
    acceptFeedback(id) {
        return axios.put(FEEDBACK_REST_API_URL + "/accept/" + id);
    }
    submitFeedback(guestFeedback) {
        return axios.post(FEEDBACK_REST_API_URL + "/1/feedback/", guestFeedback);
    }
    getFeedbackByStatus(){
        return axios.get(FEEDBACK_REST_API_URL + "/feedback-by-status");
    }
}

export default new FeedbackService();