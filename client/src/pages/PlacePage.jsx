import { useParams } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import '../styles/placeStyle.css';
import ReviewSection from "../components/ReviewSection";

export default function PlacePage() {

    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [extraInfo, setExtraInfo] = useState([]);
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
            setExtraInfo(response.data.extraInfo.split('*'))
        });

        axios.get(`/reviews/${id}`).then(response => {
            setReviews([...response.data].slice(0, 6));
            console.log(...response.data)
        })


    }, [id]);

    if (!place) return '';



    return (
        <div className="mt-4 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place} />

            <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="flex gap-2">
                        <img className="h-12 w-12 rounded-full" src='http://localhost:4000/uploads/blank-profile-picture.png' alt="" />
                        <div className="ml-3 overflow-hidden">
                            <p className="text-md font-medium text-slate-900">Hosted by {place.owner.name}</p>
                            <p className="text-md text-slate-500 truncate">{place.owner.email}</p>
                        </div>

                    </div>
                    <div className="my-4 border-t pt-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Things to know</h2>
                        Check-in: {place.checkIn}<br />
                        Check-out: {place.checkOut} <br />
                        Max number of guests: {place.maxGuests}

                    </div>

                </div>
                <div>
                    <BookingWidget place={place} />
                </div>

            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div >
                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                </div>
                <div className="mb-4 mt-1 text-md text-black leading-5">
                    {extraInfo.length > 0 && extraInfo.map((info, index) => (
                        <>
                            <span key={index}>{index > 0 ? '*' + info : info}</span>
                            <br />
                        </>
                    ))}
                </div>
            </div>

            <ReviewSection place={place} reviews={reviews} setReviews={setReviews}/>

        </div>
    )
}