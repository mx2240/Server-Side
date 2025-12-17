// index.js
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

const allowedOrigins = [
    "http://localhost:5173", // local Vite dev
    "https://clientside-mu.vercel.app/"

    // production frontend
];

// CORS middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow non-browser requests (Postman, server-side)
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = "The CORS policy for this site does not allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight OPTIONS requests
app.options("*", cors());



app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running 🚀");
});





// --- Routes ---
app.use('/api', routes(express.Router()));



// --- MongoDB connection ---
const mongoURI = 'mongodb+srv://doreenmichelle9_db_user:yeHTYvtuTx7vMX2D@school.ysk4lsy.mongodb.net/ServerSideDB'; // <-- Replace with your Atlas URI
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));











// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));







