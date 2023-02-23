const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')
exports.register = (async (req, res) => {
    try{
        // getting all the values from req
        const { email, phno, password, firstName, lastName } = req.body;
        
        // hashing the password using bcrypt lib
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating new user instance
        const user = new User({
            email,
            password:hashedPassword,
            phno,
            firstName,
            lastName
        });
        
        // saving user
        const savedUser = await user.save();
            
        // creating a jwt token for the current user
        const jwt_token = jwt.sign({userId: savedUser._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(201).json({
            status:'success',
            data:{
                msg:"successfully signedin...",
                jwt_token,
                user:savedUser
            }
        });

    } catch(err){
        res.status(400).json({
            status:'error',
            data:{
                msg:'error in registering user...',
                err: err.message
            }
        });
    }
});


exports.login = (async (req, res) => {
    try {
        const { user, password } = req.body;
        if(!user || !password) {
            res.status(400).json({
                status:"error",
                data:{
                    msg:"all fields are required",
                }
            });
        }

        // finding the user with phno or email
        const currUser = await User.findOne({
            $or: [
                {email:user}, 
                {phno: user}
            ]
        });
        

        if(currUser==null || !currUser.isActive) {
            res.status(400).json({
                status:"error",
                data:{
                    msg:"user not exsists or user is inactive",
                }
            });
        }

        const checkPassword = bcrypt.compare(password, currUser.password);
        if(!checkPassword){
            res.status(401).json({
                status:"error",
                data:{
                    msg:"password dosent match",
                }
            });
        }

        const jwt_token = jwt.sign({ user_id:currUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({
            status:"success",
            data:{
                msg:"loggedin successfully",
                jwt_token,
                user:currUser
            }
        });

    } catch (err) {
        res.status(400).json({
            status:"Error",
            data:{
                msg:"unable to login",
                err:err.message
            }
        })
    }
});