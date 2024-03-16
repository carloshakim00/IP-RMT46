// eslint-disable-next-line react/prop-types
export default function Search({ search, handleSearch }) {
    return (
        <div className="container mx-auto">
            <div className="flex justify-end mb-5">
                <input
                    onChange={handleSearch}
                    value={search}
                    type="text"
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    placeholder="Search" />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Search
                </button>
            </div>
        </div>
    )
}
