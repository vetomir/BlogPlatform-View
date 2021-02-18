

export const API_URL = 'https://blogportal-app.herokuapp.com/api';

export default function AuthHeaders() {
    const token = JSON.parse(localStorage.getItem('user'));

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}
