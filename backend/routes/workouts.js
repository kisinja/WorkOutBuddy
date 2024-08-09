const express = require("express");

const router = express.Router();

const {
    getAllWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    searchWorkouts
} = require("../controllers/workouts");

// require Auth for all workout routes
const requireAuth = require("../middleware/requireAuth");

// Apply the middleware to all routes
router.use(requireAuth);

// GET all workouts
router.get("/", getAllWorkouts);

// GET workouts by title => Search
router.get("/search", searchWorkouts);

// GET a single workout by ID
router.get("/:id", getWorkoutById);

// POST a new workout
router.post("/", createWorkout);

// PUT an updated workout
router.put("/:id", updateWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

module.exports = router;