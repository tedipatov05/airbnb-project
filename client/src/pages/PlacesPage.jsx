import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import Perks from "../components/Perks";
import axios from "axios";

import PhotosUploader from "../components/PhotosUploader";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";
import Pagination from "../components/Pagination";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [placesPerPage, setPlacesPerPage] = useState(6);



    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);

        });

    }, []);


    const lastPlaceIndex = currentPage * placesPerPage;
    const firstPlaceIndex = lastPlaceIndex - placesPerPage;
    const currentPlaces = places.slice(firstPlaceIndex, lastPlaceIndex);

    return (
        <div>
            <AccountNav />

            <div className="text-center">
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    Add place
                </Link>

                <div className="mt-4">
                    {currentPlaces.length > 0 && currentPlaces.map(place => (

                        <Link to={'/account/places/' + place._id} className="bg-white border rounded-xl shadow-sm mt-2 sm:flex" key={place.title}>
                            <div className="shrink-0 relative w-full rounded-t-xl overflow-hidden sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
                                <PlaceImg place={place} className={"absolute top-0 start-0 object-cover"} />
                            </div>
                            <div className="flex flex-wrap">
                                <div className="p-4 flex flex-col h-full sm:p-7">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {place.title}
                                    </h3>
                                    <p className="mt-1 text-gray-500">
                                        {place.description}
                                    </p>
                                    {/* <div class="mt-5 sm:mt-auto">
                                        <p class="text-xs text-gray-500">
                                            Last updated 5 mins ago
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
                <div className="pagination flex justify-center">
                    {places.length > 0 && (
                        <Pagination totalPlaces={places.length} placesPerPage={placesPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />

                    )}
                </div>

            </div>


        </div>


    )
}