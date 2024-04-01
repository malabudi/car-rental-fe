'use client'

import { fetchListingsByCarId, updateBalance } from "@/hooks/listings";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';

export default function RentedCars({params}: any) {
    const [payment, setPayment] = useState(0.00);

    const router = useRouter();

    const { isLoading, data, status } = useQuery({
        queryKey: ['listings'], 
        queryFn: async () => await fetchListingsByCarId(Number(params.carId))
    });

    const useUpdateBalance = useMutation({
        mutationFn: updateBalance,
        onSuccess:(res) => {
            router.push('/listings');
            router.refresh();
        },
        onError:(err)=>{
            console.log(err)
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        useUpdateBalance.mutate({
            carId: Number(params.carId),
            payment: Number(payment)
        });
        e.preventDefault();
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='container'>
            <h1>Payment Summary:</h1>

            <div>
                <p><strong>Model:</strong> {data[0]?.Model}</p>
                <p><strong>Year:</strong> {data[0]?.CarYear}</p>
                <p><strong>Mileage:</strong> {data[0]?.Mileage}</p>
            </div>
            <br/>
            <div>
                <p><strong>Current Balance:</strong> ${data[0]?.Balance}</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="#payment">Payment Amount: </label>
                        <input
                            placeholder="Amount"
                            type={"text"}
                            id="payment"
                            name="payment"
                            onChange={(e) => setPayment(parseFloat(e.target.value))}
                            required
                        />
                    </div>
                    <button type="submit" className='button'>Save</button>
                </form>
            </div>
        </div>
    );
}
