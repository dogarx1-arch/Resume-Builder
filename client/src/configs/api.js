import axios from 'axios';

const api = axios.create({
    
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000"
});


console.log("API Base URL:", import.meta.env.VITE_BASE_URL);

export default api;