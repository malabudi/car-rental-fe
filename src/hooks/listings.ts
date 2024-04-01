import { API_PATH } from '../utils/constants';

export const createListing = async (newListing: any) => {
    const response = await fetch(`${API_PATH}/listings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newListing),
    });

    if (!response.ok) {
        throw new Error('Failed to create listing');
    }

    return response.json();
};

export const updateListing = async (updatedListing: any) => {
    const response = await fetch(`${API_PATH}/listings`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedListing),
    });

    if (!response.ok) {
        throw new Error('Failed to update current listing');
    }

    return response.json();
};

// Book car with this method
export const updateBooking = async (updatedBooking: any) => {
    const response = await fetch(`${API_PATH}/listings/booking`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBooking),
    });

    if (!response.ok) {
        throw new Error('Failed to book car');
    }

    return response.json();
};

// make payment
export const updateBalance = async (updatedBooking: any) => {
    const response = await fetch(`${API_PATH}/listings/pay`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBooking),
    });

    if (!response.ok) {
        throw new Error('Failed to make payment');
    }

    return response.json();
};

export const fetchListingsByRenterId = async (renterId: Number) => {
    const response = await fetch(`${API_PATH}/listings/renter/${renterId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }

    return response.json();
};

export const fetchListingsByRenteeId = async (renteeId: Number) => {
    const response = await fetch(`${API_PATH}/listings/rentee/${renteeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }

    return response.json();
};

export const fetchListingsByCarId = async (CarId: Number) => {
    const response = await fetch(`${API_PATH}/listings/car/${CarId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }

    return response.json();
};

export const fetchAllListings = async () => {
    const response = await fetch(`${API_PATH}/listings`, {
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