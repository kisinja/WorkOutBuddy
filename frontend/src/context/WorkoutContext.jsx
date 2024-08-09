import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload,
            };
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts],
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload._id),
            }
        case 'CLEAR_WORKOUTS':
            return {
                workouts: [],
            }
        default:
            return state;
    }
};

export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: []
    });

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    );
};

WorkoutContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};