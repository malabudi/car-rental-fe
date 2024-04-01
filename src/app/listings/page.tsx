'use client'

import { fetchAllListings } from "@/hooks/listings";
import { useQuery } from "@tanstack/react-query";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { getCookie } from "cookies-next";

export default function Listings() {
    const [search, setSearch] = useState('');

    const renteeId = Number(getCookie('user_id'));

    const { isLoading, data, status } = useQuery({
        queryKey: ['listings'], 
        queryFn: async () => await fetchAllListings()
    });

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={styles.container}>
            <h1>Car Listings:</h1>

            <div className={styles.searchContainer}>
                <div>
                    <Link href='listings/rented' className='button'>View Currently Rented Cars</Link>
                </div>

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
                        <th>Book Car</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.filter((row: any) => {
                        return row.Model.toString().toLowerCase().includes(search.toString().toLowerCase())
                        || row.PickUpLocation.toString().toLowerCase().includes(search.toString().toLowerCase())
                        || row.AvailCalendar.toString().toLowerCase().includes(search.toString().toLowerCase())
                        || row.BookedUntil?.toString().toLowerCase().includes(search.toString().toLowerCase())
                    }).map((item: any) => 
                        <>
                            <tr>
                                <td>{item.Model}</td>
                                <td>{item.CarYear}</td>
                                <td>{item.Mileage}</td>
                                <td>{item.AvailCalendar.split('T')[0]}</td>
                                <td>{item.BookedUntil?.split('T')[0]}</td>
                                <td>{item.PickUpLocation}</td>
                                <td>${item.Price}</td>
                                <td>
                                    {
                                    item.RenteeId != renteeId &&
                                    <button 
                                    className='button' 
                                    disabled={!item.IsAvailable}
                                    >
                                        <Link 
                                        href={`listings/booking/${item.CarID}`}
                                        style={{
                                            pointerEvents: (!item.IsAvailable) ? "none" : "auto",
                                        }}
                                        aria-disabled={!item.IsAvailable} 
                                        tabIndex={!item.IsAvailable? -1 : undefined}
                                        >
                                            {item.IsAvailable ? 'Book' : 'N/A'}
                                        </Link>
                                    </button>
                                    }
                                </td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}