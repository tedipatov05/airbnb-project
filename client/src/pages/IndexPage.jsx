import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";


export default function IndexPage() {

    const [places, setPlaces] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [placesPerPage, setPlacesPerPage] = useState(12);


    useEffect(() => {
        axios.get('/places')
            .then(response => {
                setPlaces([...response.data])
            })

    }, []);


    const lastPlaceIndex = currentPage * placesPerPage;
    const firstPlaceIndex = lastPlaceIndex - placesPerPage;
    const currentPlaces = places.slice(firstPlaceIndex, lastPlaceIndex);


    return (
        <>
            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {currentPlaces.length > 0 && currentPlaces.map(place => (
                    <Link to={'/place/' + place._id} key={place.title}>
                        <div className="bg-gray-500 rounded-2xl flex">
                            {place.photos?.[0] && (
                                <img className="rounded-2xl aspect-square object-cover" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt=""></img>
                            )}

                        </div>
                        <h2 className="font-bold">{place.address}</h2>
                        <h3 className="text-sm text-gray-500">{place.title}</h3>
                        <div className="mt-1">
                            <span className="font-bold">${place.price}</span> per night
                        </div>

                    </Link>
                ))}


            </div>
            <div className="pagination flex justify-center">
                {places.length > 0 && (
                    <Pagination totalPlaces={places.length} placesPerPage={placesPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />

                )}
            </div>

        </>
    );
}    