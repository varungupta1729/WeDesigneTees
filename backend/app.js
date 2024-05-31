const express = require('express');
const { model } = require('mongoose');
const ErrorHandler = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const path = require("path");
// const fileUpload = require('express-fileupload')
dotenv.config();

app.use(cors({
  origin : 'https://we-designe-tees.vercel.app/',
  
  
 
}));

// app.use(express.json());
app.use(express.json({ limit: '1000000000mb' }));

app.use(cookieParser());
// app.use("/", express.static(path.join(__dirname,"./uploads")));
app.use(bodyParser.json({ limit: '5000000mb' }))
app.use(bodyParser.urlencoded({ limit: '500000mb', extended: true, parameterLimit: 1000000 }))

// app.use(fileUpload({useTempFiles:true}))


app.use("/test", (req, res) => {
  res.send("Hello world!");
});


 

//routes
const user = require('./controller/user');
const shop = require('./controller/shop');
const product = require('./controller/product');
const event = require('./controller/event');
const coupons = require('./controller/coupounCode');
const conversation = require('./controller/conversation');
const message = require('./controller/message');
const withdraw = require("./controller/withdraw");
const payment = require("./controller/payment");
const order = require("./controller/order");



app.use('/api/v2/user' , user);
app.use('/api/v2/shop' , shop);
app.use('/api/v2/product' , product);
app.use('/api/v2/event' , event);
app.use('/api/v2/coupon' , coupons);
app.use('/api/v2/conversation' , conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);


app.use(ErrorHandler);
module.exports = app;