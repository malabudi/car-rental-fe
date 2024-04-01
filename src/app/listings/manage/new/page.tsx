'use client'

import { createListing } from "@/hooks/listings";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";

export default function ManageListings() {
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [mileage, setMileage] = useState(0);
    const [availableDate, setAvailableDate] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [price, setPrice] = useState(0.00);

    const router = useRouter();

    const useCreateListing = useMutation({
        mutationFn: createListing,
        onSuccess:(res) => {
            router.push('/listings');
            router.refresh();
        },
        onError:(err)=>{
            console.log(err)
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        useCreateListing.mutate({
            renteeId: Number(getCookie('user_id')),
            model: model,
            carYear: year,
            mileage: mileage,
            availCalendar: availableDate,
            pickUpLocation: pickupLocation,
            price: price
        });
        e.preventDefault();
    }

    return (
        <div>
            <h1>New Listing:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="#model">Enter Model:</label>
                    <input
                        placeholder="Car Model"
                        type={"text"}
                        id="model"
                        name="model"
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="#year">Enter Year:</label>
                    <input
                        placeholder="Car Year"
                        type={"text"}
                        id="year"
                        name="year"
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="#mileage">Enter Mileage:</label>
                    <input
                        placeholder="Mileage"
                        type={"number"}
                        id="mileage"
                        name="mileage"
                        onChange={(e) => setMileage(parseInt(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="#availCalendar">Rent Availability Date:</label>
                    <input
                        type={"date"}
                        id="availCalendar"
                        name="availCalendar"
                        onChange={(e) => setAvailableDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="#pickupLocatoin">Pickup Location:</label>
                    <input
                        placeholder="State, City"
                        type={"text"}
                        id="pickupLocatoin"
                        name="pickupLocatoin"
                        onChange={(e) => setPickupLocation(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="#price">Price:</label>
                    <input
                        placeholder="Car Rental Price"
                        type={"text"}
                        id="price"
                        name="price"
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        required
                    />
                </div>

                <button type="submit" className='button'>Submit</button>
            </form>
        </div>
    );
}