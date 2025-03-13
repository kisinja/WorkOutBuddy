import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import Loader from "./Loader";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutsForm = () => {
    const { dispatch } = useWorkoutsContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');

    const [emptyFields, setEmptyFields] = useState([]);

    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const BASE_URL = "http://localhost:8930/api/workouts/";

    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');

        if (!user) {
            setErr("You must be logged in")
            return
        }

        setLoading(true);

        const newWorkout = {
            title,
            load,
            reps,
        };

        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newWorkout),
        });

        const data = await res.json();

        if (!res.ok) {
            setLoading(false);
            setErr(data.error);
            setEmptyFields(data.emptyFields);
            setSuccess('');
            return;
        }

        if (res.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setErr('');
            setEmptyFields([]);
            setSuccess('Workout added successfully');
            setLoading(false);
            dispatch({ type: 'CREATE_WORKOUT', payload: data })
        }
    };

    return (
        <form className="workouts-form w-[350px] fixed right-3 bg-white p-4 top-[97px] rounded shadow" id="form">
            <h3 className="text-xl font-bold tracking-wider text-center mb-3" id="">Add a new Workout</h3>

            {success && <div className="success">{success}</div>}

            <div className="form-control">
                <label htmlFor="title">Excersize Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className={Array.isArray(emptyFields) && emptyFields.includes('title') ? "error" : ""} />
            </div>
            <div className="form-control">
                <label htmlFor="load">Load (in kg):</label>
                <input type="number" min="0" id="load" name="load" value={load} className={Array.isArray(emptyFields) && emptyFields.includes('load') ? "error" : ""} onChange={(e) => setLoad(e.target.value)} />
            </div>
            <div className="form-control">
                <label htmlFor="reps">Reps:</label>
                <input type="number" min="0" id="reps" name="reps" value={reps} className={Array.isArray(emptyFields) && emptyFields.includes('reps') ? "error" : ""} onChange={(e) => setReps(e.target.value)} />
            </div>

            {err && <div className="error">{err}</div>}



            <div className="flex items-center justify-center">
                {loading ? (
                    <Loader />
                ) : (
                    <button className="btn" onClick={handleSubmit}>
                        Add Workout
                    </button>
                )}
            </div>
        </form >
    );
};

export default WorkoutsForm;