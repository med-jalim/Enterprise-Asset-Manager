import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_ASSETS_APP_API; 

const AssetsApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    
})


const EMPLOYEES_API_BASE_URL = import.meta.env.VITE_EMPLOYEES_APP_API;
const EmployeesApi = axios.create({
    baseURL: EMPLOYEES_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },

})


  ;
export {AssetsApi, EmployeesApi };