import axios from "axios";


export const API_URL = 'http://localhost:8080/api';
/*export const API_URL = 'https://portfolio-blog-spring.herokuapp.com/api';*/

export default function AuthHeaders() {
    const token = JSON.parse(localStorage.getItem('user'));

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}
