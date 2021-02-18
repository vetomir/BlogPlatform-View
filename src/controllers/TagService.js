import axios from 'axios';
import AuthHeaders, {API_URL} from "./Config";


const URL = API_URL + '/tags';

class TagService {

    getAll() {
        return axios.get(URL + '/list');
    }

    getSingle(id) {
        return axios.get(URL + `/${id}`, { headers: AuthHeaders() });
    }

    update(id, name) {
        const body = { name }
        return axios.patch( URL + `/${id}`, body, { headers: AuthHeaders()});
    }

}

export default new TagService();
