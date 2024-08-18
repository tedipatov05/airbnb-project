export default function Pagination() {
    return (
        <nav className="flex items-center gap-x-1 mt-8 mb-5  " aria-label="Pagination">
            <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center text-base items-center gap-x-1.5 text-sm rounded-lg text-black hover:bg-gray-200 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none " aria-label="Previous">
                <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span>Previous</span>
            </button>
            <div className="flex items-center gap-x-1">
                <button type="button" className="min-h-[38px] min-w-[38px] flex justify-center items-center text-base text-black hover:bg-gray-200 hover:text-gray-500 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-current="page">1</button>
                <button type="button" className="min-h-[38px] min-w-[38px] flex justify-center items-center text-base text-black hover:bg-gray-200 hover:text-gray-500 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ">2</button>
                <button type="button" className="min-h-[38px] min-w-[38px] flex justify-center items-center text-base text-black hover:bg-gray-200 hover:text-gray-500 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ">3</button>
            </div>
            <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center text-base items-center gap-x-1.5 text-sm rounded-lg text-black hover:bg-gray-200 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
                <span>Next</span>
                <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>
        </nav>
    )
}