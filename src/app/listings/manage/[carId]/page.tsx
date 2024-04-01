'use client'

import { fetchListingsByCarId, updateListing } from "@/hooks/listings";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";

export default function EditListing({ params }: any) {
    const [availableDate, setAvailableDate] = useState('');
    const [price, setPrice] = useState(0.00);

    const router = useRouter();

    const { isLoading, data, status } = useQuery({
        queryKey: ['car'], 
        queryFn: async () => await fetchListingsByCarId(params.carId)
    });

    const useUpdateListing = useMutation({
        mutationFn: updateListing,
        onSuccess:(res) => {
            router.push('/listings');
            router.refresh();
        },
        onError:(err)=>{
            console.log(err)
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
        <div>
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
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        defaultValue={data[0].Price}
                        required
                    />
                </div>

                <button type="submit" className='button'>Save</button>
            </form>
        </div>
    );
}