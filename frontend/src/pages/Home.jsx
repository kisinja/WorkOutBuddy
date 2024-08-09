import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutsForm from "../components/WorkoutsForm";
import Loader from "../components/Loader";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import SearchWorkouts from "../components/SearchWorkouts";
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {

    const BASE_URL = "http://localhost:8930/api/workouts";

    const { workouts, dispatch } = useWorkoutsContext();

    const [loading, setLoading] = useState(false);

    const { user } = useAuthContext();

    useEffect(() => {
        document.title = "Workout Buddy | Home";
        setLoading("true");
        const fetchWorkouts = async () => {
            const res = await fetch(BASE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                setLoading(false);
                dispatch({ type: 'SET_WORKOUTS', payload: data.data });
            } else {
                setLoading(false);
                console.error(data.message);
            }
        };

        if (user) {
            fetchWorkouts();
        }

    }, [user, dispatch]);

    return (
        <div className="home">
            <div className="workouts">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-red-600 text-sm tracking-wider">{workouts.length} workouts found</h2>
                    <div>
                        <SearchWorkouts />
                    </div>
                </div>
                {loading && <Loader />}
                {workouts.length === 0 ? (
                    <div className="text-xl font-light tracking-wider text-red-500 text-center text-shadow-md">No workouts available</div>
                ) : (

                    workouts.map(workout => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))

                )}
            </div>
            <WorkoutsForm />
        </div>
    );
};

export default Home;