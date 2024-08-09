import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext();

    const { dispatch: dispatchWorkouts } = useWorkoutsContext();

    const logout = () => {
        // remove the user from local storage
        localStorage.removeItem('user');

        dispatch({ type: 'LOGOUT' });

        // clear the workouts
        dispatchWorkouts({ type: 'CLEAR_WORKOUTS' });
    };

    return { logout };
};