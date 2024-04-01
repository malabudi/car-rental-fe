'use client'

import { FormEvent, useState } from "react";
import styles from "./page.module.css";
import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "@/hooks/listings";
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";

export default function BookCar({ params }: any) {
    const [bookedUntil, setBookedUntil] = useState('');

    const router = useRouter();

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        useUpdateBooking.mutate({
            carId: Number(params.carId),
            renterId: Number(getCookie('user_id')),
            bookedUntil: bookedUntil
        });
        e.preventDefault();
    }

    return (
        <div className='container'>
            <h1>Book Your Car</h1>
            <form onSubmit={handleSubmit} className={styles.bookingForm}>
                <div className={styles.bookingInput}>
                    <label htmlFor="#bookedUntil">Rent Availability Date: </label>
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