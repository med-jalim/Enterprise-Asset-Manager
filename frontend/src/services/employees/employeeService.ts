import { EmployeesApi } from '../api';


export const employeeService = {
    getEmployees: async () => {
        try {
            const response = await EmployeesApi.get('/employees');  
            return response.data;
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    }
};