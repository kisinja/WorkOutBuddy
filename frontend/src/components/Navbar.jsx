import { Link } from "react-router-dom"
import SearchWorkouts from "./SearchWorkouts"

const Navbar = () => {
    return (
        <header className="sticky top-0">
            <div className="container">
                <Link to="/">
                    <h1 className="font-semibold text-shadow-md text-3xl text-black tracking-wider" id="logo">
                        Workout
                        <span className="text-gray-800">
                            Buddy
                        </span>
                    </h1>
                </Link>

                <div>
                    <SearchWorkouts />
                </div>
            </div>
        </header>
    )
}

export default Navbar
