import { useState } from "react";
import ReviewStats from "./ReviewStats";
import Stars from "./Stars";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function ReviewSection({ place, reviews, setReviews }) {

    const [stars, setStars] = useState(1);
    const [content, setContent] = useState('');
    const sortedReviews =  [...reviews].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)).slice(0, 6);

    function handleStars(ev) {
        const starsInput = Number(ev.target.value)
        setStars(starsInput);
    }

    const sum = reviews.reduce((acc, val) => acc + val.stars, 0);
    const average = sum / reviews.length;

    const fiveStars = reviews.filter(r => r.stars == 5).length;
    const fourStars = reviews.filter(r => r.stars == 4).length;
    const threeStars = reviews.filter(r => r.stars == 3).length;
    const twoStars = reviews.filter(r => r.stars == 2).length;
    const oneStar = reviews.filter(r => r.stars == 1).length;


    async function handleReviewSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/reviews', { placeId: place._id, stars, content })
            toast.success('Successfully added review', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });

            setReviews(reviews.length > 0 ?  [data, ...reviews] : [data]);
            ev.target.reset();
            setContent('');


        } catch (e) {
            toast.error('Unexpected error occured', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });
        }

    }




    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                <div className="">
                    {reviews.length > 0 && (
                        <>
                            <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-8 text-center">
                                Customer reviews &
                                rating</h2>
                            <div className="grid grid-cols-12 mb-11">

                                <div className="col-span-12 xl:col-span-4 flex items-center">
                                    <div className="box flex flex-col gap-y-4 w-full max-xl:max-w-3xl mx-auto">
                                        <ReviewStats stars={5} number={fiveStars} percent={`${fiveStars > 0 ? (fiveStars / reviews.length) * 100 : 0}%`} />
                                        <ReviewStats stars={4} number={fourStars} percent={`${fourStars > 0 ? (fourStars / reviews.length) * 100 : 0}%`} />
                                        <ReviewStats stars={3} number={threeStars} percent={`${threeStars > 0 ? (threeStars / reviews.length) * 100 : 0}%`} />
                                        <ReviewStats stars={2} number={twoStars} percent={`${twoStars > 0 ? (twoStars / reviews.length) * 100 : 0}%`} />
                                        <ReviewStats stars={1} number={oneStar} percent={`${oneStar > 0 ? (oneStar / reviews.length) * 100 : 0}%`} />

                                    </div>
                                </div>
                                <div className="col-span-12 max-xl:mt-8 xl:col-span-8 xl:pl-8 w-full min-h-[230px]">
                                    <div
                                        className="grid grid-cols-12 h-full px-8 max-lg:py-8 rounded-3xl bg-gray-100 w-full max-xl:max-w-3xl max-xl:mx-auto">
                                        <div className="col-span-12 md:col-span-8 flex items-center justify-centre">
                                            <div className="items-center max-lg:justify-center w-full h-full">
                                                <div
                                                    className="mt-10 sm:pr-3 sm:border-r border-gray-200 flex items-center justify-center flex-col">
                                                    <h2 className="font-manrope font-bold text-5xl text-black text-center mb-4">{average > 0 ? Math.round(average * 10) / 10 : 0}</h2>
                                                    <Stars count={Math.round(average)} />
                                                    <p className="font-normal text-lg leading-8 text-gray-400">{reviews.length} Ratings</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-4 max-lg:mt-8 md:pl-8">
                                            <div className="flex items-center flex-col justify-center w-full h-full ">
                                                <button
                                                    className="rounded-full px-6 py-4 bg-white font-semibold text-lg text-primary whitespace-nowrap w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-pink-200 hover:shadow-pink-200">See
                                                    All Reviews</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pb-8 border-b border-gray-200 max-xl:max-w-3xl max-xl:mx-auto">
                                <h4 className="font-manrope font-semibold text-3xl leading-10 text-black mb-6">
                                    Most helpful positive review
                                </h4>
                                <div className="grid lg:grid-cols-2 gap-4" id="reviewsContainer">

                                    {sortedReviews && sortedReviews.map((review) => (
                                        <div className="border border-gray-200 rounded-2xl p-4" key={review.createdOn}>

                                            <div className="flex items-center gap-3">
                                                <h6 className="font-semibold text-lg leading-8 text-black">{review.owner.name}</h6>
                                                <p className="font-medium text-base leading-7 text-gray-400">{new Date(review.createdOn).toLocaleDateString("en-Us", {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}</p>
                                            </div>

                                            {/* stars in review */}
                                            <div className="flex sm:items-center flex-col sm:flex-row mb-4">
                                                <Stars count={review.stars} />

                                            </div>


                                            <p className="font-normal text-lg leading-8 text-gray-500 ">
                                                {review.content}
                                            </p>
                                        </div>
                                    ))}



                                </div>
                            </div>
                        </>
                    )}

                    <div>
                        <form onSubmit={handleReviewSubmit}>
                            <h2 className="font-manrope font-bold text-2xl sm:text-2xl leading-10 text-black mb-8 text-center">Submit your review</h2>

                            <h2 className="font-manrope text-balck mb-2 text-lg">Add your rating</h2>
                            <div className="flex flex-row-reverse justify-end items-center gap-2 mb-5">
                                <input id="hs-ratings-readonly-1" type="radio" onChange={handleStars} className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="5" />
                                <label for="hs-ratings-readonly-1" className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-neutral-600">
                                    <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                </label>
                                <input id="hs-ratings-readonly-2" type="radio" onChange={handleStars} className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="4" />
                                <label for="hs-ratings-readonly-2" className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-neutral-600">
                                    <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                </label>
                                <input id="hs-ratings-readonly-3" type="radio" onChange={handleStars} className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="3" />
                                <label for="hs-ratings-readonly-3" className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-neutral-600">
                                    <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                </label>
                                <input id="hs-ratings-readonly-4" type="radio" onChange={handleStars} className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="2" />
                                <label for="hs-ratings-readonly-4" className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-neutral-600">
                                    <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                </label>
                                <input id="hs-ratings-readonly-5" type="radio" onChange={handleStars} className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="1" />
                                <label for="hs-ratings-readonly-5" className="peer-checked:text-yellow-400 text-gray-300 pointer-events-none dark:peer-checked:text-yellow-600 dark:text-neutral-600">
                                    <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                </label>
                            </div>


                            <textarea value={content} onChange={(ev) => setContent(ev.target.value)} placeholder="Write here..." />

                            <button className="primary">Submit review</button>
                        </form>
                    </div>
                </div>
            </div>
        </section >


    )
}