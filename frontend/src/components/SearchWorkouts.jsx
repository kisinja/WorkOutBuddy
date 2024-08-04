import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Loader from "./Loader";

const SearchWorkouts = () => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const BASE_URL = `http://localhost:8930/api/workouts/search?q=${query}`;

    const handleSearch = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErr("");
        setMessage("");
        if (!query) {
            setResults([]);
            setLoading(false);
            setMessage("");
            setErr("Please enter a search query");
            return;
        }

        try {
            const res = await fetch(BASE_URL);
            const data = await res.json();

            console.log(data);

            if (res.ok) {
                setResults(data);

                if (results.length === 0) {
                    setMessage("No results found");
                } else {
                    setMessage("");
                }
            }

            if (!res.ok) {
                setResults([]);
                setErr(data.message);
            }
        } catch (error) {
            setErr("An error occurred. Please try again");
            console.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workouts..."
                className="border border-gray-300 p-3 rounded-lg"
            />
            <button onClick={handleSearch} className="absolute right-2 top-2 bg-black w-8 h-8 flex justify-center items-center rounded-full">
                <CiSearch className="text-white text-xl" />
            </button>

            {loading && <Loader />}

            <div className="results z-20 top-[100%]">

                {!loading && err && <div className="text-sm bg-red-100 py-1 px-2 text-center tracking-wider text-gray-800 border-2 border-red-700 rounded-lg ">{err}</div>}

                {/* {message && <div className="text-sm text-gray-500 ">{message}</div>} */}

                {results.map((workout) => (
                    <div key={workout._id} className="flex flex-col gap-3 text-left">
                        <p className="text-gray-500 text-sm italic">{results.length} result{results.length === 1 ? "" : "s"} found ...</p>
                        <h3 id="title">
                            {workout.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchWorkouts;