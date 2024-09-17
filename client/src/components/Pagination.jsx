
export default function Pagination({ totalPlaces, placesPerPage, setCurrentPage, currentPage }) {

    const pages = Math.ceil(totalPlaces / placesPerPage);
    const pagesArr = [...Array(pages).keys()].map(i => i + 1);

    function next(next) {
        if (next > pages) {
            setCurrentPage(pages)
        } else {
            setCurrentPage(next)
        }

    }

    function pageStyle(page){
        return page==currentPage ? 'bg-gray-100' : 
        'bg-gray-300'
    }

    function prev(prev) {
        if (prev < 1) {
            setCurrentPage(1)
        } else {
            setCurrentPage(prev);
        }
    }

    return (
        <nav className="flex items-center gap-x-1 mt-8 mb-5  " aria-label="Pagination">
            <button type="button" onClick={() => prev(currentPage - 1)} className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center text-base items-center gap-x-1.5 text-sm rounded-lg text-black hover:bg-gray-200 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none " aria-label="Previous">
                <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span>Previous</span>
            </button>
            <div className="flex items-center gap-x-1">
                {pages > 0 && pagesArr.map((page, index) => (
                    
                    <button key={index} type="button" onClick={() => setCurrentPage(page)} className={"min-h-[38px] min-w-[38px] flex justify-center items-center text-base text-black hover:bg-gray-200 hover:text-gray-500 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none " + pageStyle(page)} aria-current="page">{page}</button>

                ))}

            </div>
            <button type="button" onClick={() => next(currentPage + 1)} className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center text-base items-center gap-x-1.5 text-sm rounded-lg text-black hover:bg-gray-200 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
                <span>Next</span>
                <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>
        </nav>
    )
}