const app = require('./app');
const dbConnection = require('./db/database');
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

  
const PORT = process.env.PORT ;
console.log(PORT);
process.on("uncaughtException" , (err)=>{
    console.log(`Error : ${err.message}`)
    console.log(`Shutting down server due to uncaughtException `)
})




dbConnection();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  
const server = app.listen(PORT , ()=>{
    console.log(`Server is running successfully at ${PORT}`)
})

process.on("unhandledRejection" , (err)=>{
    console.log(`Error : ${err.message}`)
    console.log(`Shutting down server due to unhandledRejection `)

    server.close(()=>{
        process.exit(1);
    })
})

