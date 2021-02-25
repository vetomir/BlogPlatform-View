import axios from 'axios';
import AuthHeaders, {API_URL} from "./Config";

const URL = API_URL + '/comments';

class CommentService {
    getAll(page, sort, sortBy, number) {
        return axios.get(URL + '/list', {
            params: {
                page : page,
                sort : sort,
                sortBy : sortBy,
                number : number
            }} );
    }

    getAllByUser(id) {
        return axios.get(URL + `/user/${id}`, { headers: AuthHeaders() });
    }

    getAllByPost(id) {
        return axios.get(URL + `/post/${id}`, { headers: AuthHeaders() });
    }

    getSingle(id) {
        return axios.get(URL + `/${id}`, { headers: AuthHeaders() });
    }

    add(postId , body) {
        return axios.post(URL + `/${postId}`, body, { headers: AuthHeaders()});
    }

    update(id , content) {
        const body = content
        return axios.patch(URL + `/${id}`, body, { headers: AuthHeaders()});
    }

    delete(id) {
        return axios.delete(URL + `/${id}`, { headers: AuthHeaders() });
    }
}

export default new CommentService();
