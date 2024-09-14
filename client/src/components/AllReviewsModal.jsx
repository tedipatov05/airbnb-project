
import '../styles/Modal.css';
import Review from './Review';
import Stars from "./Stars";
import ReviewStats from "./ReviewStats";


export default function AllReviewsModal({ show, onClose, reviews }) {

    if (!show) {
        return "";
    }
    const sum = reviews.reduce((acc, val) => acc + val.stars, 0);
    const average = sum / reviews.length;

    const fiveStars = reviews.filter(r => r.stars == 5).length;
    const fourStars = reviews.filter(r => r.stars == 4).length;
    const threeStars = reviews.filter(r => r.stars == 3).length;
    const twoStars = reviews.filter(r => r.stars == 2).length;
    const oneStar = reviews.filter(r => r.stars == 1).length;

    return (
        <div className="modal-backdrop" onClick={onClose}>

            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </button>
                <div className='flex gap-4'>
                    <div>
                        <div className="col-span-12 md:col-span-8 flex items-center justify-centre ml-5">
                            <div className="items-center max-lg:justify-center w-full h-full">
                                <div
                                    className="mt-10 sm:pr-3 flex items-center justify-center flex-col">
                                    <h2 className="font-manrope font-bold text-5xl text-black text-center mb-4">{average > 0 ? Math.round(average * 10) / 10 : 0}</h2>
                                    <Stars count={Math.round(average)} />
                                    <p className="font-normal text-lg leading-8 text-gray-400">{reviews.length} Ratings</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-10 xl:col-span-4 flex items-center mt-10">
                            <div className="box flex flex-col gap-y-4 w-full max-xl:max-w-3xl mx-auto">
                                <ReviewStats stars={5} number={fiveStars} percent={`${fiveStars > 0 ? (fiveStars / reviews.length) * 100 : 0}%`} />
                                <ReviewStats stars={4} number={fourStars} percent={`${fourStars > 0 ? (fourStars / reviews.length) * 100 : 0}%`} />
                                <ReviewStats stars={3} number={threeStars} percent={`${threeStars > 0 ? (threeStars / reviews.length) * 100 : 0}%`} />
                                <ReviewStats stars={2} number={twoStars} percent={`${twoStars > 0 ? (twoStars / reviews.length) * 100 : 0}%`} />
                                <ReviewStats stars={1} number={oneStar} percent={`${oneStar > 0 ? (oneStar / reviews.length) * 100 : 0}%`} />


                            </div>
                        </div>

                    </div>

                    <div className='m-3 w-full'>
                        <h2 className='text-2xl text-bold mt-2 mb-2 text-center'>Customer Reviews</h2>

                        {/* Scrollable reviews section */}
                        <div className="reviews-container gap-3">
                            {reviews.map((review, index) => (
                                <Review review={review} key={index} />
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}