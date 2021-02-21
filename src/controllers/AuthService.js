import axios from "axios";
import {API_URL} from "./Config";
import UserService from "./UserService";

const URL = API_URL + '/authenticate';

class AuthService {
    getServerStatus() {
        return axios.get(API_URL + `/status`);
    }

    login(username, password) {
        return axios
            .post(URL, {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    const token = JSON.stringify(response.data.token)
                    console.log(token)
                    localStorage.setItem("user", token);
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        window.location.reload()
    }

    register(body) {
        return UserService.register(body)
    }


    getCurrentUser() {
        return UserService.getCurrentUser();
    }
}

export default new AuthService();
