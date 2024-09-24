export default function PlaceHost({ showAllPhotos }) {

    const style = showAllPhotos == true ? 'hidden' : 'block';

    return (
        <>
            <h2 className="text-3xl font-bold border-t py-3 ">Meet your host</h2>
            <div className={"flex flex-row gap-28 px-8 py-3 " + style}>
                <div className="flex mt-4 shadow-2xl rounded-2xl w-fit flex-row">
                    <div className="p-3 px-12 py-6  flex justify-center flex-col">
                        <img className="h-20 w-20 rounded-full" src="../../public/blank-profile-picture.png" ></img>
                        <div className="text-xl leading text-center font-bold mt-1">
                            <p>John Doe</p>
                        </div>
                        <span className="text-center">Superhost</span>

                    </div>
                    <div className="flex pr-6 flex-col ">
                        <div className="p-3 border-b flex flex-col text-center">
                            <span className="font-bold text-xl ">55</span>
                            <span className="text-sm">Reviews</span>

                        </div>
                        <div className="p-3 border-b flex flex-col text-center">
                            <span className="font-bold text-xl">55</span>
                            <span className="text-sm">Reviews</span>
                        </div>
                        <div className="p-3 flex flex-col text-center">
                            <span className="font-bold text-xl">55</span>
                            <span className="text-sm">Reviews</span>
                        </div>
                    </div>

                </div>
                <div className="ml-6 px-8">
                    <h2 className="font-bold text-xl ">John is a Superhost</h2>
                    <div className="mt-4 text-lg font-manrope leading-2 text-black">
                        Superhosts are experienced, highly-rated hosts who are committed to providing great stays for guests.
                    </div>
                    <div className="mt-8">
                        <h3 className="font-bold text-xl">Host details</h3>
                        <div className="flex flex-col mt-2 font-manrope leading-2 text-black text-base">
                            <span>Response rate: 100%</span>
                            <span>Responds within an hour</span>

                        </div>
                        <button className="bg-black hover:bg-black-700 text-white font-bold py-2 px-4 rounded mt-5">
                            Message Host
                        </button>
                    </div>

                </div>
            </div>
            
        </>
    )
}