import { Link } from "react-router-dom"


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

                <nav>
                    <div>
                        <Link to="/login">
                            Login
                        </Link>
                        <Link to="/signup">
                            Sign Up
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
