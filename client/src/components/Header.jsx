import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { ToastContainer, toast } from 'react-toastify';

export default function Header() {
    const { user } = useContext(UserContext);
    return (
        <header >
            <div className='flex justify-between'>
                <Link to={'/'} className='flex items0center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 -rotate-90">
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                    <span className='font-bold text-xl'>airbnb</span>

                </Link>
                <div className='flex gap-2 border border-color-gray-300 rounded-full py-2 px-4 shadow-md shadowgray-300'>
                    <div>Anywhere</div>
                    <div className="border border-l border-gray-300"></div>
                    <div>Any week</div>
                    <div className="border border-l border-gray-300"></div>
                    <div>Add guest</div>
                    <button className='bg-primary text-white p-1 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                    </button>
                </div>
                <Link to={user ? '/account' : '/login'} className='flex items-center gap-2 border border-color-gray-300 rounded-full py-2 px-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div className='bg-gray-500 text-white rounded-full border-gray-500 overflow-hidden'>
                        {!!user && (
                            <img className="size-6 realtive top-1" src={user.profilePictureUrl} />

                        )}

                        {!user && (

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative top-1">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>

                        )}

                    </div>



                    {!!user && (
                        <>

                            <div>
                                {user.name}
                            </div>
                        </>

                    )}

                </Link>

            </div>
            <div>
                <ToastContainer />

            </div>

        </header>
    );
}