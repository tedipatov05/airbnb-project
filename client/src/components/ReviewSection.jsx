import { useState } from "react";
import ReviewStats from "./ReviewStats";
import Stars from "./Stars";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import AllReviewsModal from './AllReviewsModal.jsx';
import ReviewForm from "./ReviewFrom.jsx";

export default function ReviewSection({ placeId, reviews, setReviews, showAllPhotos = false, visibility = true }) {

    const [stars, setStars] = useState(1);
    const [content, setContent] = useState('');
    const [showModal, setShowModal] = useState(false);

    const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)).slice(0, 6);

    const style = visibility ? 'block' : 'hidden'

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
            const { data } = await axios.post('/reviews', { placeId: placeId, stars, content })
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
            console.log(data);

            setReviews(reviews.length > 0 ? [data, ...reviews] : [data]);
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


    const sectionStyle = showAllPhotos == true ? 'hidden' : 'block';


    return (
        <section className={"py-8 relative " + sectionStyle} >
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
                                                <button onClick={() => setShowModal(true)}
                                                    className="rounded-full px-6 py-4 bg-white font-semibold text-lg text-primary whitespace-nowrap w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-pink-200 hover:shadow-pink-200">See
                                                    All Reviews</button>
                                            </div>
                                        </div>
                                        <AllReviewsModal show={showModal} onClose={() => setShowModal(false)} reviews={reviews} />
                                    </div>
                                </div>
                            </div>

                            <div className="pb-8 max-xl:max-w-3xl max-xl:mx-auto">
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

                    <ReviewForm handleReviewSubmit={handleReviewSubmit} handleStars={handleStars} setContent={setContent} style={style} content={content}/>
                </div>
            </div>
        </section >


    )
}