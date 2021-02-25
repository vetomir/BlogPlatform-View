import axios from 'axios';
import AuthHeaders, {API_URL} from "./Config";


const URL = API_URL + '/posts';


class PostService {
    getAll(type, page, sort, sortBy, number) {
        return axios.get(URL + `/list/${type}`, {
            params: {
                page : page,
                sort : sort,
                sortBy : sortBy,
                number : number
            }} );
    }

    searchPosts(query, page, sort, sortBy, number) {
        return axios.get(URL + `/search/${query}`, {
            params: {
                page : page,
                sort : sort,
                sortBy : sortBy,
                number : number
            }} );
    }

    getSingle(id) {
        return axios.get(URL + `/${id}`);
    }

    add(body) {
        console.log("body")
        console.log(body)

        return axios.post(URL , body, { headers: AuthHeaders()});
    }

    updateTitleLeadAndContent(id, source) {
        const body = source
        return axios.patch(URL + `/${id}`, body, { headers: AuthHeaders()});
    }

    updatePhoto(id, source) {
        const body = source
        return axios.patch(URL + `/${id}/photo`, body, { headers: AuthHeaders()});
    }

    updateCategory(id, categoryId) {
        return axios.patch(URL + `/${id}/category/${categoryId}`, null, { headers: AuthHeaders()});
    }

    updateTags(id, tagList) {
        return axios.patch(URL + `/${id}/tags`, tagList, { headers: AuthHeaders()});
    }

    togglePublish(id) {
        return axios.patch(URL + `/${id}/publish`, null, { headers: AuthHeaders()});
    }

    delete(id) {
        return axios.delete(URL + `/${id}`, { headers: AuthHeaders() });
    }
}

export default new PostService();
