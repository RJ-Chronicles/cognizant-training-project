class LoginService {
    //for user login
    loginUser(token) {
        localStorage.setItem("token", token)
        return true;
    }
    //to check whether the user is login or not
    isLoggedIn() {
        let token = localStorage.getItem("token");
        if (token === undefined || token === '' || token === null) {
            return false;
        } else {
            return true;
        }
    }
    //to logout User
    logout() {
        localStorage.removeItem('token');
        window.location.href = "/"

        // return true;

    }
    getUserRole() {
        let role = localStorage.getItem('role');
        if (role === undefined || role === '' || role === null) {
            return 'public';
        } else {
            return role;
        }
    }
    getUserId() {
        let id = localStorage.getItem('id');
        if (id === undefined || id === '' || id === null) {
            return 0;
        } else {
            return id;
        }

    }
    getUserName() {
        let name = localStorage.getItem('name');
        if (name === undefined || name === '' || name === null) {
            return 'unknown';
        } else {
            return name;
        }

    }
    getUserEmail() {
        let email = localStorage.getItem('email');
        if (email === undefined || email === '' || email === null) {
            return 'Invalid Email';
        } else {
            return email;
        }

    }
    getTransactionId() {
        let transactionId = localStorage.getItem('BookingId');
        if (transactionId === undefined || transactionId === '' || transactionId === null) {
            return 'Invalid transactionId';
        } else {
            return transactionId;
        }

    }
    getTransactionAmount() {
        let transactionAmount = localStorage.getItem('transactionAmount');
        if (transactionAmount === undefined || transactionAmount === '' || transactionAmount === null) {
            return 'Invalid transactionId';
        } else {
            return transactionAmount;
        }

    }

}
export default new LoginService()