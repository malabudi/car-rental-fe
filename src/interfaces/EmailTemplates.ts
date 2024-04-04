// Account creation (send to user)
export interface EmailAcntCreatedTemplateProps {
    email: string;
}

// Car listing created (send to user that created listing)
export interface EmailCarListingTemplateProps {
    model: string;
    year: string;
}

// Car listing updated (send to user that updated their own listing)
export interface EmailCarListingUpdatedTemplateProps {
    model: string;
    year: string;
    availabilityDate: string;
    price: string;
}

// Payment Made (send to user that paid their balance)
export interface EmailPaymentTemplateProps {
    amount: string;
    model: string;
    year: string;
}

// car booked (send one email to renter and one to the buyer)
export interface EmailCarBookedTemplateProps {
    model: string;
    year: string;
    bookerEmail?: string;
}
