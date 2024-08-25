import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";
import axios from "axios";
import Review from "../components/Review";


export default function BookingPlace() {

    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.filter(({ _id }) => _id === id);
                console.log(foundBooking[0]);
                if (foundBooking) {
                    setBooking(foundBooking[0]);
                }
            })
        }

    }, [id])

    if (!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl font-manrope">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <PlaceGallery place={booking.place} />
            {/* <div className="flex gap-2">
                <img className="h-12 w-12 rounded-full" src='http://localhost:4000/uploads/blank-profile-picture.png' alt="" />
                <div className="ml-3 overflow-hidden">
                    <p className="text-md font-medium text-slate-900">Hosted by {booking.place.owner.name}</p>
                    <p className="text-md text-slate-500 truncate">{booking.place.owner.email}</p>
                </div>

            </div> */}
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4 font-manrope">Your booking information:</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl font-manrope">
                    <div>Total price</div>
                    <div className="text-3xl font-manrope">${booking.price}</div>
                </div>


            </div>

            <Review />
        </div>
    )
}