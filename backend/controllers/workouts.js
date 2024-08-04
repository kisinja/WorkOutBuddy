const Workout = require("../models/Workout");
const mongoose = require("mongoose");

// GET all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ createdAt: -1 });
        res.json({
            message: `${workouts.length} workouts found`,
            data: workouts
        }).status(200);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// GET a single workout by ID
const getWorkoutById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid mongoose ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid workout ID" });
        };

        const workout = await Workout.findById(id);
        if (workout) {
            res.json(workout).status(200);
        } else {
            return res.status(404).json({ message: "Workout not found" });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// POST a new workout
const createWorkout = async (req, res) => {

    const { title, reps, load } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push("title");
    };

    if (!reps) {
        emptyFields.push("reps");
    };

    if (!load) {
        emptyFields.push("load");
    };

    if (emptyFields.length > 0) {
        /* return res.status(400).json({ error: `Please provide a valid ${emptyFields}` }); */

        return res.status(400).json({ error: 'Please fill in all the required fields !!', emptyFields });
    };

    try {
        const workout = await Workout.create({
            title,
            reps,
            load
        });
        if (workout) {
            res.status(201).json(workout);
        } else {
            return res.status(400).json({ message: "Workout creation failed" });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// PUT an updated workout
const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid mongoose ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid workout ID" });
        };


        const workout = await Workout.findByIdAndUpdate({ _id: id }, req.body, { new: true });

        if (workout) {
            res.json(workout).status(200);
        } else {
            return res.status(404).json({ message: "Workout not found" });
        }

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }

};

// DELETE a workout
const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid mongoose ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid workout ID" });
        };

        const workout = await Workout.findByIdAndDelete({ _id: id });

        if (workout) {
            res.json(workout).status(200);
        } else {
            return res.status(404).json({ message: "Workout not found" });
        }


    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Search workouts by title
const searchWorkouts = async (req, res) => {
    try {
        const query = req.query.q;
        const workouts = await Workout.find(
            {
                title: {
                    $regex: query,
                    $options: "i" // "i" makes it case-insensitive
                }
            }
        );

        if (workouts) {
            res.json(workouts).status(200);
        } else {
            return res.status(404).json({ message: "No workouts found" });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    searchWorkouts
};