require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(cors());

// db.js
const connectDB = require('./db');

// Dummy Data
/* const { workouts } = require('./data');
const Workout = require('./models/Workout'); */

// Routes
const workoutsRouter = require('./routes/workouts');
const authRouter = require('./routes/user');

const port = process.env.PORT || 5000;

// Middleware
app.use('/api/workouts', workoutsRouter);
app.use("/api/auth", authRouter);

// Default Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the app' });
})

// Start Server function
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
        /* await Workout.insertMany(workouts); */
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
startServer();