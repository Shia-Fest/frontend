import axios from 'axios';

const API_URL = 'https://backend-jq71.onrender.com/api'

const api = axios.create({
    baseURL: API_URL,
})

export default api;