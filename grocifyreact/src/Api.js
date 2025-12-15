import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:4000"
})

//to attach jwt token

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token) config.headers.Authorization=`Bear ${token}`
    return config;
})

export default API;
