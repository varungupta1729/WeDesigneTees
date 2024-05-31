const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
// const { upload } = require("../multer");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { route } = require("../app");
const { isAuthenticated , isAdmin } = require("../middleware/auth");
const sendConfirmation = require('../mailTemplate/sendConfirmation')

require("dotenv").config();

router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
      return next(new ErrorHandler("Please enter all Fields" , 401))
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return next(new ErrorHandler("User is Already Exist , Please Login+", 400));
    }

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${name}&backgroundColor=000000,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `https://we-designe-tees.vercel.app/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        html: sendConfirmation(activationUrl , user.name),
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log("errrr")
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }

      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User is Already Exist", 400));
      }
      user = await User.create({ name, email, password, avatar });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


router.post('/login-user' , catchAsyncErrors(async(req, res , next) =>{
  try {
    const {email , password} = req.body;
    if(!email || !password){
      return next(new ErrorHandler("Please Provide all Fields" , 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
      return next(new ErrorHandler("User Doesn't Exist" , 400));
    }  
    
    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid ){
      return next(new ErrorHandler("Password is incorrect" , 400));
    }  

    sendToken(user, 201 , res);
  } catch (error) {
    return next(new ErrorHandler(error.message , 500));
  }
}))

router.get('/getuser' , isAuthenticated , catchAsyncErrors(async(req, res, next)=>{
  try {
       const user = await User.findById(req.user.id);
       if(!user){
        return next(new ErrorHandler("User Doesnt Exist", 500));
       }

       res.status(201).json({
        success:true,
        user,
       })

  } catch (error) {
    return next(new ErrorHandler(error.message , 400));
  }
}))


router.get('/logout' , isAuthenticated , catchAsyncErrors(async(req , res ,next)=>{
  try {

    res.cookie("token" , null  ,{
      expires: new Date(Date.now()),
      httpOnly:true,
    })

    res.status(201).json({
      success:true,
      message:"Logout Successfully"
    })
    
  } catch (error) {
    return next(new ErrorHandler(error.message , 500));
  }
}))



// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user avatar
// router.put(
//   "/update-avatar",
//   isAuthenticated,
//   upload.single("image"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const existsUser = await User.findById(req.user.id);

//       const existAvatarPath = `uploads/${existsUser.avatar}`;

//       fs.unlinkSync(existAvatarPath);

//       const fileUrl = path.join(req.file.filename);

//       const user = await User.findByIdAndUpdate(req.user.id, {
//         avatar: fileUrl,
//       });

//       res.status(200).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      console.log(addressId);

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find user infoormation with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all users --- for admin
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete users --- admin
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler("User is not available with this id", 400)
        );
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;



