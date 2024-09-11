import Stars from './Stars';

export default function Review({ review }) {
    return (
        <div className="border border-gray-200 rounded-2xl p-4">

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
    )
}