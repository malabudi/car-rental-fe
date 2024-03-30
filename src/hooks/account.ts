import { API_PATH } from '../utils/constants';

export const createUser = async (newUser: any) => {
    const response = await fetch(`${API_PATH}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
    });

    if (!response.ok) {
        throw new Error('Failed to create account');
    }

    return response.json();
};

export const addSecurityQuestion = async (securityQuestion: any) => {
    const response = await fetch(`${API_PATH}/questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(securityQuestion),
    });

    if (!response.ok) {
        throw new Error('Failed to add security questoin');
    }

    return response.json();
}

export const fetchQuestions = async () => {
    const response = await fetch(`${API_PATH}/questions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }

    return response.json();
}
