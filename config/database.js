const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log("Connection with database Established Successfully"))
    .catch((err)=>{
        console.log("Error occured")
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;
