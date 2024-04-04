'use client'

import { fetchListingsByCarId, updateListing } from "@/hooks/listings";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";
import { sendCarListingUpdateEmail } from "@/hooks/emails";

export default function EditListing({ params }: any) {
    const router = useRouter();

    const { isLoading, data, status } = useQuery({
        queryKey: ['car'], 
        queryFn: async () => await fetchListingsByCarId(params.carId),
    });

    const [availableDate, setAvailableDate] = useState(data ? data[0]?.AvailCalendar : null);
    const [price, setPrice] = useState(data ? data[0]?.Price : null);

    useEffect (() => {
        if (data) {
            setAvailableDate(data[0]?.AvailCalendar);
            setPrice(data[0]?.Price);
        }
    }, [data]);

    const useUpdateListing = useMutation({
        mutationFn: updateListing,
        onSuccess:(res) => {
            router.push('/listings');
            router.refresh();
        },
        onError:(err)=>{
            console.log(err)
        }
    });

    const useSendCarListingUpdateEmail = useMutation({
        mutationFn: sendCarListingUpdateEmail,
        onSuccess:(res) => {
        },
        onError:(err)=>{
            console.log(err)
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        useSendCarListingUpdateEmail.mutate({
            model: data[0]?.Model,
            year: data[0]?.CarYear,
            availabilityDate: availableDate,
            price: price
        });

        useUpdateListing.mutate({
            renteeId: Number(getCookie('user_id')),
            availCalendar: availableDate,
            price: price
        });

        e.preventDefault();
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='container'>
            <h1>Edit Car Listing</h1>
            <h3>Car: {data[0]?.Model}</h3>
            <h3>Year: {data[0]?.CarYear}</h3>
            <h3>Mileage: {data[0]?.Mileage} Miles</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="#availCalendar">Rent Availability Date:</label>
                    <input
                        type={"date"}
                        id="availCalendar"
                        name="availCalendar"
                        onChange={(e) => setAvailableDate(e.target.value)}
                        defaultValue={data[0].AvailCalendar.split('T')[0]}
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
                        onChange={(e) => setPrice(e.target.value)}
                        defaultValue={data[0].Price}
                        required
                    />
                </div>

                <button type="submit" className='button'>Save</button>
            </form>
        </div>
    );
}