'use client'

import { fetchAllListings } from "@/hooks/listings";
import { useQuery } from "@tanstack/react-query";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Listings() {
    const [search, setSearch] = useState('');

    const { data, status } = useQuery({
        queryKey: ['listings'], 
        queryFn: async () => await fetchAllListings()
    });

    return (
        <div className={styles.container}>
            <h1>Car Listings:</h1>

            <div className={styles.searchContainer}>
                <div>
                    <Link href='listings/manage' className='button'>View/Manage Your Listings</Link>
                </div>
                
                <div>
                    <label htmlFor="#search">Search Listing:</label>
                    <input
                        placeholder="Enter Location/Date/Model"
                        type={"text"}
                        id="search"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        required
                    />
                </div>
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
                    </tr>
                </thead>
                <tbody>
                    {data?.filter((row: any) => {
                        return row.Model.toString().toLowerCase().includes(search.toString().toLowerCase())
                        || row.PickUpLocation.toString().toLowerCase().includes(search.toString().toLowerCase())
                        || row.AvailCalendar.toString().toLowerCase().includes(search.toString().toLowerCase())
                    }).map((item: any) => 
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
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}