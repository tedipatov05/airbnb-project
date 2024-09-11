
import '../styles/Modal.css';
import Review from './Review';


export default function AllReviewsModal({ show, onClose, reviews }) {

    if (!show) {
        return "";
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </button>
                <h2>Customer Reviews</h2>

                {/* Scrollable reviews section */}
                <div className="reviews-container gap-3">
                    {reviews.map((review, index) => (
                        <Review review={review} key={index}/>
                    ))}
                </div>

            </div>
        </div>
    )
}