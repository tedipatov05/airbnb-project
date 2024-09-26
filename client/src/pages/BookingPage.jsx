import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";
import axios from "axios";
import ReviewSection from "../components/ReviewSection";
import Footer from "../components/Footer";


export default function BookingPlace() {

    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showAllPhotos, setShowAllPhotos] = useState(false);



    useEffect(() => {

        const fetchData = async () => {
            if (id) {



                const response = await axios.get('/bookings')
                const foundBooking = response.data.filter(({ _id }) => _id === id);
                console.log(foundBooking[0]);
                if (foundBooking) {
                    setBooking(foundBooking[0]);
                }

                const result = await axios.get(`/reviews/${foundBooking[0].place._id}`)
                setReviews([...result.data])


            }

        }

        fetchData();

    }, [id])

    if (!booking) {
        return '';
    }

    return (
        <>
            <div className="my-8">
                <h1 className="text-3xl font-manrope">{booking.place.title}</h1>
                <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
                <PlaceGallery place={booking.place} showAllPhotos={showAllPhotos} setShowAllPhotos={setShowAllPhotos} />

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

                <ReviewSection reviews={reviews} setReviews={setReviews} placeId={booking.place._id} showAllPhotos={showAllPhotos} />
            </div>
            <Footer />
        </>
    )
}