export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="mx-auto justify-center max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
                <div
                    className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:pt-16"
                >
                    <div>
                        <p className="font-medium text-gray-900">Support</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Help Centre </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Cancellation options  </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Report neighbourhood problem </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Disablitiy support  </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900">Hosting </p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Airbnb your home </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Hosting resourses </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Community forum </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Hosting responsibility </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">Airbnb</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Newsroom  </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> New features </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Careers  </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Investors </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-xs text-gray-500">&copy; 2024. Airbnb. All rights reserved.</p>
            </div>
        </footer>
    )
}