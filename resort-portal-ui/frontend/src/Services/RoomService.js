import axios from 'axios';
const ROOM_REST_API_URL = 'http://localhost:8080/api/v1/rooms';

class RoomService {
    getRooms() {
        return axios.get(ROOM_REST_API_URL+"/roomId");
    }

    deleteRoom(id) {
        return axios.delete(ROOM_REST_API_URL + "/delete/" + id);
    }

    createNewRoom(room) {
        return axios.post(ROOM_REST_API_URL, room);
    }
}

export default new RoomService();