// Server Instantiation
const express = require('express')
const app = express();

// PORT Selection
require('dotenv').config();
PORT = process.env.PORT || 3000;

// Use middleware to parse json request body
app.use(express.json());

// Import API Routes 
const blog = require('./routes/blog');

// Mount api ROutes
app.use('/api/v1',blog)

// Start Server
app.listen(PORT,()=>{
    console.log(`App is started at PORT:${PORT}`)
})

// Connect To database
const dbConnect = require('./config/database')
dbConnect();

// Default Router
app.get('/',(req,res)=>{
    res.send(`<h1>This is Homepage</h1>`)
})