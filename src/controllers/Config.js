import axios from "axios";


export const API_URL = 'http://localhost:8080/api';

export default function AuthHeaders() {
    const token = JSON.parse(localStorage.getItem('user'));

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}
