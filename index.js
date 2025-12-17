// index.js
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));







