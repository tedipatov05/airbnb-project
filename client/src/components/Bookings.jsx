import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";



export default function Bookings({ bookings }) {
    return (
        <>
            {bookings?.length > 0 && bookings.map((booking, index) => (
                <div className="block rounded-lg bg-gray-100 w-72 mt-10" key={index}>
                    <div className="relative overflow-hidden bg-cover bg-no-repeat" >
                        <PlaceImg place={booking.place} className={"rounded-lg  sm:m-h-64 md:h-64 w-full"} />
                        <Link to={`/account/bookings/${booking._id}`}>
                            <div
                                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                            </div>
                        </Link>
                    </div>

                    <div className="p-2">
                        <div className="flex justify-between">
                            <h5 className="mb-2 text-base font-bold leading-tight ">
                                {booking.place.title}
                            </h5>
                        </div>
                        <p className="mb-1 text-sm flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>

                            <span className="text-lg">{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights</span>
                        </p>

                        <h5 className="mb-2 text-lg font-bold leading-tight ">
                            Total price: ${booking.price}
                        </h5>
                    </div>
                </div>
            ))}
        </>
    )
}