import axios from "axios";

const API = axios.create({
    baseURL:"https://e-commerce-grocery-shop-mern-1.onrender.com"
})

//to attach jwt token

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token) config.headers.Authorization=`Bear ${token}`
    return config;
})

export default API;
