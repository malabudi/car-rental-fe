import { FE_API_PATH } from '@/utils/constants';

export const sendAccountCreationEmail = async (bodyParam: any) => {
    const response = await fetch(`${FE_API_PATH}/sendAccountCreation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParam),
    });

    if (!response.ok) {
        throw new Error('Failed to create account');
    }

    return response.json();
};

export const sendCarListingCreationEmail = async (bodyParam: any) => {
    const response = await fetch(`${FE_API_PATH}/sendCarListingCreation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParam),
    });

    if (!response.ok) {
        throw new Error('Failed to create account');
    }

    return response.json();
};

export const sendCarListingUpdateEmail = async (bodyParam: any) => {
    const response = await fetch(`${FE_API_PATH}/sendCarListingUpdated`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParam),
    });

    if (!response.ok) {
        throw new Error('Failed to create account');
    }

    return response.json();
};

export const sendBookingToBookerEmail = async (bodyParam: any) => {
    const response = await fetch(`${FE_API_PATH}/sendBookedCarToBooker`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParam),
    });

    if (!response.ok) {
        throw new Error('Failed to create account');
    }

    return response.json();
};

export const sendBookingToRenterEmail = async (bodyParam: any) => {
    const response = await fetch(`${FE_API_PATH}/sendBookedCarToRenter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParam),
    });

    if (!response.ok) {
        throw new Error('Failed to create account');
    }

    return response.json();
};

export const sendPaymentPayerEmail = async (bodyParam: any) => {
    const response = await fetch(`${FE_API_PATH}/sendPaymentPayer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParam),
    });

    if (!response.ok) {
        throw new Error('Failed to create account');
    }

    return response.json();
};

export const sendPaymentRenterEmail = async (bodyParam: any) => {
    const response = await fetch(`${FE_API_PATH}/sendPaymentRenter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParam),
    });

    if (!response.ok) {
        throw new Error('Failed to create account');
    }

    return response.json();
};