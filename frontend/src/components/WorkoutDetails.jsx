import PropTypes from 'prop-types';
import RelativeTime from './RelativeTime';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { FaRegTrashCan } from "react-icons/fa6";
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({ workout }) => {

    const timeStamp = workout.createdAt;

    const { dispatch } = useWorkoutsContext();

    const { user } = useAuthContext();

    const handleClick = async () => {

        if (!user) {
            return;
        }

        const res = await fetch(`http://localhost:8930/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const data = await res.json();

        if (res.ok) {
            alert('Workout deleted successfully!');
            dispatch({ type: 'DELETE_WORKOUT', payload: data });
        }
    };

    return (
        <div className="workout-details space-y-2">
            <h4 className='tracking-wider'>{workout.title}</h4>
            <p className='tracking-wider'><strong>Load (kg): </strong>{workout.load}</p>
            <p className='tracking-wider'><strong>Reps: </strong>{workout.reps}</p>

            {/* Date formatter to "1 Day ago" */}
            <RelativeTime timestamp={timeStamp} />

            <span onClick={handleClick} title={`Remove '${workout.title}'`}>
                <FaRegTrashCan className='text-xl text-red-600' />
            </span>
        </div>
    );
};

WorkoutDetails.propTypes = {
    workout: PropTypes.object.isRequired,
};

export default WorkoutDetails;