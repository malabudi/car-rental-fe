'use client'

import { fetchListingsByRenterId } from "@/hooks/listings";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Link from "next/link";
import styles from "./page.module.css";

export default function RentedCars() {

    const { isLoading, data, status } = useQuery({
        queryKey: ['listings'], 
        queryFn: async () => await fetchListingsByRenterId(Number(getCookie('user_id')))
    });

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!data) {
        return (
            <div>
                <h1>You currently Have No Cars Rented</h1>
                <Link href='listings/'>Go Back</Link>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Your Rented Cars:</h1>
            <table className={styles.styledTable}>
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Mileage</th>
                        <th>Availability</th>
                        <th>Booked Until</th>
                        <th>Pickup Location</th>
                        <th>Price</th>
                        <th>Current Balance</th>
                        <th>Edit Listing</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: any) => 
                        <>
                            <tr key={item.CarID}>
                                <td>{item.Model}</td>
                                <td>{item.CarYear}</td>
                                <td>{item.Mileage}</td>
                                <td>{item.AvailCalendar?.split('T')[0]}</td>
                                <td>{item.BookedUntil?.split('T')[0]}</td>
                                <td>{item.PickUpLocation}</td>
                                <td>${item.Price}</td>
                                <td>${item.Balance}</td>
                                <td><Link href={`rented/pay/${item.CarID}`} className='button'>Pay</Link></td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}
