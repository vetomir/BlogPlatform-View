import axios from 'axios';
import AuthHeaders, {API_URL} from "./Config";

const URL = API_URL + '/users';


class UserService {
    getAll() {
        return axios.get(URL + '/list');
    }

    getCurrentUser() {
        return axios.get(URL + `/me`, { headers: AuthHeaders() });
    }

    getSingle(nickname) {
        return axios.get(URL + `/${nickname}`, { headers: AuthHeaders() });
    }

    register(body) {
        console.log(body)
        return axios.post(URL, body, null);
    }

    updateCredentials(id , source) {
        const body = source
        return axios.patch(URL + `/${id}/credentials`, body, { headers: AuthHeaders()});
    }

    updateProfile(id, source ) {
        const body = source
        return axios.patch(URL + `/${id}/profile`, body, { headers: AuthHeaders()});
    }

    updatePhoto(id, source) {
        const body = source
        return axios.patch(URL + `/${id}/photo`, body, { headers: AuthHeaders()});
    }

    updateRole(id) {
        return axios.patch(URL + `/${id}/admin`, null, { headers: AuthHeaders()});
    }

    updateBlock(id) {
        return axios.patch(URL + `/${id}/block`, null, { headers: AuthHeaders()});
    }

}

export default new UserService();
