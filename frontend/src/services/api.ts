import axios from 'axios';
import {getToken} from "@/context/auth";


const AddTokenToHeaders = async (config: any) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}


const API_BASE_URL = import.meta.env.VITE_ASSETS_APP_API; 
const AssetsApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    
})
AssetsApi.interceptors.request.use(AddTokenToHeaders, (error) => {
    return Promise.reject(error);
});



const EMPLOYEES_API_BASE_URL = import.meta.env.VITE_EMPLOYEES_APP_API;
const EmployeesApi = axios.create({
    baseURL: EMPLOYEES_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },

})
EmployeesApi.interceptors.request.use(AddTokenToHeaders, (error) => {
    return Promise.reject(error);
})


export {AssetsApi, EmployeesApi };