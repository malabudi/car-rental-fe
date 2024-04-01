'use client'

import { fetchListingsByRenteeId } from "@/hooks/listings";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import styles from "./page.module.css";
import Link from "next/link";

export default function ManageListings() {
    const { data, status } = useQuery({
        queryKey: ['listings'], 
        queryFn: async () => await fetchListingsByRenteeId(Number(getCookie('user_id')))
    });

    return (
        <div className={styles.container}>
            <div>
                <h1>Your Car Listings:</h1>
                <Link href='manage/new' className='button'>Add New Listing</Link>
            </div>
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
                        <th>Is Currently Rented</th>
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
                                <td>{item.AvailCalendar.split('T')[0]}</td>
                                <td>{item.BookedUntil}</td>
                                <td>{item.PickUpLocation}</td>
                                <td>${item.Price}</td>
                                <td>{item.IsAvailable ? 'No' : 'Yes'}</td>
                                <td>{item.Balance}</td>
                                <td><Link href={`manage/${item.CarID}`} className='button'>Edit</Link></td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}