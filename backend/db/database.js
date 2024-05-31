const mongoose = require('mongoose');

require('dotenv').config();
const dbConnection = () =>{
    console.log(process.env.DB_URL);
    mongoose.connect("mongodb+srv://varunshivhare1729:IPNTCOaiRpdpEo0L@wedesignetees.un4la9h.mongodb.net/", {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then((data)=>{
        console.log(`Database is connected Successfully : ${data.connection.host}`)
    })
}

module.exports = dbConnection;