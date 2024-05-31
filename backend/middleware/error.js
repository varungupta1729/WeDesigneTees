const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err , req , res , next) =>{
    err.message = err.message || "Internal Backend Error"
    err.statusCode = err.statusCode || 500;

    if(err.name === 'CastError'){
        const message  = `Resources not found with this id.. Invalid${err.path}`;
        err = new ErrorHandler(message , 400);
    }

    if(err.code  === 11000){
        const message  = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message , 400);
    }

    if(err.name  === 'JsonWebTokenError'){
        const message  = `Url is incorrect Please Try Again later`;
        err = new ErrorHandler(message , 400);
    }

    if(err.name  === 'TokenExpiredError'){
        const message  = `Url is Expired Please Try Again later`;
        err = new ErrorHandler(message , 400);
    }
 
    res.status(err.statusCode).json({
        success:false,
        message:"Error is : " + err.message
    }) 
    


}