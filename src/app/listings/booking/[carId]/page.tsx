'use client'

import { FormEvent, useState } from "react";
import styles from "./page.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchListingsByCarId, updateBooking } from "@/hooks/listings";
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";
import { sendBookingToBookerEmail, sendBookingToRenterEmail } from "@/hooks/emails";

export default function BookCar({ params }: any) {
    const [bookedUntil, setBookedUntil] = useState('');

    const router = useRouter();

    const { isLoading, data, status } = useQuery({
        queryKey: ['listings'], 
        queryFn: async () => await fetchListingsByCarId(Number(params.carId))
    });

    const useUpdateBooking = useMutation({
        mutationFn: updateBooking,
        onSuccess:(res) => {
            router.push('/listings');
            router.refresh();
        },
        onError:(err)=>{
            console.log(err)
        }
    });


    const useSendBookingToBookerEmail = useMutation({
        mutationFn: sendBookingToBookerEmail,
        onSuccess:(res) => {
        },
        onError:(err)=>{
            console.log(err)
        }
    });

    const useSendBookingToRenterEmail = useMutation({
        mutationFn: sendBookingToRenterEmail,
        onSuccess:(res) => {
        },
        onError:(err)=>{
            console.log(err)
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        useUpdateBooking.mutate({
            carId: Number(params.carId),
            renterId: Number(getCookie('user_id')),
            bookedUntil: bookedUntil
        });

        useSendBookingToBookerEmail.mutate({
            model: data[0]?.Model,
            year: data[0]?.CarYear
        });

        useSendBookingToRenterEmail.mutate({
            model: data[0]?.Model,
            year: data[0]?.CarYear,
            email: getCookie('user_email')
        });

        e.preventDefault();
    }

    return (
        <div className='container'>
            <h1>Book Your Car</h1>
            <form onSubmit={handleSubmit} className={styles.bookingForm}>
                <div className={styles.bookingInput}>
                    <label htmlFor="#bookedUntil">Booked Until: </label>
                    <input
                        type={"date"}
                        id="bookedUntil"
                        name="bookedUntil"
                        onChange={(e) => setBookedUntil(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className='button'>Save</button>
            </form>
        </div>
    );
}