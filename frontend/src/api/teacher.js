import axios from 'axios';
const BASE_URL = 'http://localhost:3000/';

export async function registerTeacher(teacherData) {
    try {
        const response = await axios.post(`${BASE_URL}teacher/register`, teacherData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Registration failed');
    }
}

export async function loginTeacher(credentials) {
    try {
        const response = await axios.post(`${BASE_URL}teacher/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message|| 'Login failed');
    }
}

