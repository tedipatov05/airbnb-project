import { useDebugValue, useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from 'axios';
import PlaceImg from "../components/PlaceImg";
import { Link, useParams } from "react-router-dom";
import Bookings from "../components/Bookings";
import Pagination from "../components/Pagination";


export default function BookingsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [placesPerPage, setPlacesPerPage] = useState(8);

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then(response => {

            setBookings([...response.data]);
        })
    }, []);

    const lastPlaceIndex = currentPage * placesPerPage;
    const firstPlaceIndex = lastPlaceIndex - placesPerPage;
    const currentBookings = bookings.slice(firstPlaceIndex, lastPlaceIndex);

    

    return (
        <div >
            <AccountNav />
            <div className="grid grid-rows-2" style={{ 'gridTemplateColumns': "repeat(4, minmax(0, 0.25fr))" }}>
                <Bookings bookings={currentBookings} />

            </div>
            <div className="pagination">
                <Pagination totalPlaces={bookings.length} placesPerPage={placesPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>
    )
}