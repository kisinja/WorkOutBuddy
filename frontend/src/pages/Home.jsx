import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutsForm from "../components/WorkoutsForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import SearchWorkouts from "../components/SearchWorkouts";
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {

    const BASE_URL = "http://localhost:8930/api/workouts";

    const { workouts, dispatch } = useWorkoutsContext();


    const { user } = useAuthContext();

    useEffect(() => {
        document.title = "Workout Buddy | Home";
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
                dispatch({ type: 'SET_WORKOUTS', payload: data.data });
            } else {
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
                    <h2 className="text-blue-600 text-sm tracking-wider">{workouts.length} workouts found</h2>
                    <div>
                        <SearchWorkouts />
                    </div>
                </div>

                {
                    workouts && workouts.map(workout => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))
                }

                {
                    workouts.length === 0 && <div className="w-[380px] mx-auto bg-white p-3 rounded-2xl flex flex-col gap-2 items-center">
                        <h4 className='tracking-wider text-gray-900 font-semibold'>No workout Added ❗❗</h4>

                        <p className="tracking-wider text-gray-500 ">Add a new workout in the form 👉👉</p>
                    </div>
                }
            </div>
            <WorkoutsForm />
        </div>
    );
};

export default Home;