import * as React from 'react';
import * as EmailTemplates from '@/interfaces/EmailTemplates';

// All emails are sent to mohamadalabudi42@gmail.com due to how the resend API works and I can not purchase a domain to fix this

// Account created (send to user)
export const EmailAccCreatedTemplate: React.FC<Readonly<EmailTemplates.EmailAcntCreatedTemplateProps>> = ({
  email,
}) => (
  <div>
    <h1>Welcome, {email} to DriveShare!</h1>
    <p>Your account has succesfully been registered and created with us.</p>
  </div>
);

// Car listing created (send to user that created listing)
export const EmailListingCreatedTemplate: React.FC<Readonly<EmailTemplates.EmailCarListingTemplateProps>> = ({
    model, year,
}) => (
    <div>
        <h1>New Listing Successfully Created!</h1>
        <p>Your {year} {model} is succesfully listed and up for rent.</p>
    </div>
);

// Car listing updated (send to user that updated their listing)
export const EmailCarListingUpdatedTemplate: React.FC<Readonly<EmailTemplates.EmailCarListingUpdatedTemplateProps>> = ({
    model, year, availabilityDate, price
}) => (
    <div>
        <h1>Your Listing Has Successfully Updated!</h1>
        <p>Your {year} {model} is updated to the new availabilty date and price listed below:</p>
        <ul>
            <li><strong>New Availability Date: </strong>{availabilityDate}</li>
            <li><strong>New Price: </strong>{price}</li>
        </ul>
    </div>
);

// Car Booked (Send a email to the user that booked a car)
export const EmailBookedCarToBookerTemplate: React.FC<Readonly<EmailTemplates.EmailCarBookedTemplateProps>> = ({
    model, year
}) => (
    <div>
        <h1>The Car is Successfully Booked!</h1>
        <p>Your {year} {model} is now booked under your name.</p>
    </div>
);

// Car Booked (Send a email to the user that has their car listed booked by someone)
export const EmailBookedCarToRenterTemplate: React.FC<Readonly<EmailTemplates.EmailCarBookedTemplateProps>> = ({
    model, year, bookerEmail
}) => (
    <div>
        <h1>{bookerEmail} has Rented Your Car!</h1>
        <p>Your {year} {model} is now currently being rented.</p>
    </div>
);

// Payment Made (Send a email to the user that made a payement towards their balance)
export const EmailPaymentToPayerTemplate: React.FC<Readonly<EmailTemplates.EmailPaymentTemplateProps>> = ({
    amount, model, year
}) => (
    <div>
        <h1>Payment for {year} {model} Successful!</h1>
        <p>You have made a payment for ${amount} towards your {year} {model}.</p>
    </div>
);

// Payment Made (Send a email to the user that made a payement towards their balance)
export const EmailPaymentToRenterTemplate: React.FC<Readonly<EmailTemplates.EmailPaymentTemplateProps>> = ({
    amount, model, year
}) => (
    <div>
        <h1>Payment Received for {year} {model}!</h1>
        <p>You have received a payment of ${amount} towards your {year} {model}.</p>
    </div>
);
