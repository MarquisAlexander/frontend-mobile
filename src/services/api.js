import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.100.1.197:3333', 
});

export default api;