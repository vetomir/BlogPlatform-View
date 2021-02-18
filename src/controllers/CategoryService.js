import axios from 'axios';
import AuthHeaders, {API_URL} from "./Config";

const URL = API_URL + '/categories';

class CategoryService {
    getAll() {

        return axios.get(URL + '/list');
    }

    getAllQuery() {

        return axios.get(URL + '/query');
    }

    getSingle(id) {
        return axios.get(URL + `/${id}`, { headers: AuthHeaders() });
    }


    add(message, parent) {
        const body = {message, parent}
        return axios.post(URL, body, { headers: AuthHeaders()});
    }

    addMethod = async (message, parent) => {
        const body = {message, parent}
        let data = await this.add(body).then(({data}) => data)

        return data;
    }

    update(message, parent) {
        const body = {message, parent}
        return axios.patch( URL , body, { headers: AuthHeaders()});
    }

    delete(id) {
        return axios.delete(URL + `/${id}`, { headers: AuthHeaders()});
    }

}

export default new CategoryService();
