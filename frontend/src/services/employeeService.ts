import axios from 'axios';

const API_URL = 'http://localhost:8080/employees';

export interface Employee {
    id: number;
    givenName: string;
    surname: string;
    email: string;
    phone: string;
    address: string;
    role: {
        id: number;
        name: string;
    };
}

export const getAllEmployees = async (): Promise<Employee[]> => {
    const response = await axios.get<Employee[]>(API_URL);
    return response.data;
}