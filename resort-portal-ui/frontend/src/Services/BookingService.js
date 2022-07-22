import axios from 'axios';
const BOOKING_REST_API_URL = 'http://localhost:8080/api/v1/booking/';

class BookingService {
    getBookings() {
        return axios.get(BOOKING_REST_API_URL + "getBookingList");
    }
    deleteBooking(id) {
        return axios.delete(BOOKING_REST_API_URL + id);
    }
    updateBooking(guestUpdateBooking, id) {
        return axios.put(BOOKING_REST_API_URL + id + "/" , guestUpdateBooking);
    }
    adminAcceptRejectBooking(id){
        return axios.put(BOOKING_REST_API_URL + id);
    }
    submitBooking(guestBooking, id) {
        return axios.post(BOOKING_REST_API_URL + id + "/booking/", guestBooking)
    }
    getBookingBasedOnGuestId(id){
        return axios.get(BOOKING_REST_API_URL + 'guest/' + id);
    }
    
}

export default new BookingService();