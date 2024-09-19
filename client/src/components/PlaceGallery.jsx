import { useState } from "react";


export default function PlaceGallery({ place, showAllPhotos, setShowAllPhotos }) {


    if (showAllPhotos) {




        return (
            <div className="absolute inset-0 bg-white text-dark min-h-screen" >
                <div className="bg-white p-8 grid gap-4" id="gallery">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-2 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                        <div className="-m-1 flex flex-wrap md:-m-2">
                            {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                                <div className="flex w-1/3 flex-wrap">
                                    <div className="w-full p-1 md:p-2">
                                        <img
                                            alt="gallery"
                                            className="block h-full w-full rounded-lg object-cover object-center"
                                            src={photo.includes('http') ? photo : 'http://localhost:4000/uploads/' + photo} />
                                    </div>
                                </div>


                            ))}
                        </div>


                    </div>


                </div>
            </div>
        )
    }

    const thirdPhotoClassName = place.photos[2] != null ? '' : "aspect-square bg-gray-600";


    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                <div >
                    {place.photos?.[0] && (

                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square h-full cursor-pointer object-cover hover:brightness-75" src={place.photos?.[0].includes('http') ? place.photos[0] : 'http://localhost:4000/uploads/' + place.photos?.[0]}></img>

                    )}
                </div>
                <div className="grid gap-2">
                    {place.photos?.[1] && (

                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover hover:brightness-75" src={place.photos?.[1].includes('http') ? place.photos[1] : 'http://localhost:4000/uploads/' + place.photos?.[1]}></img>


                    )}
                    <div className={"overflow-hidden " + thirdPhotoClassName} onClick={() => setShowAllPhotos(true)}>
                        {place.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square h-full cursor-pointer object-cover relative top-2 hover:brightness-75" src={place.photos?.[2].includes('http') ? place.photos[2] : 'http://localhost:4000/uploads/' + place.photos?.[2]}></img>
                        )}
                    </div>

                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                </svg>


                Show more phtotos
            </button>

        </div>
    )
}