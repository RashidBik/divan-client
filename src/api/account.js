import axios from "./axios";

export function getAuthState() {
    return axios.get('/auth/auth')
}

export function getUsername(id) {
    return axios.get(`/auth/basicinfo/${id}`).then(res => res.data)
}

export function login(data) {
    return axios.post('/auth/login', data)
}

export function register(data) {
    return axios.post('/auth', data)
}

export function changePassword(oldPassword, newPassword) {
    return axios.put('/auth/changePswd', {oldPassword, newPassword})
}