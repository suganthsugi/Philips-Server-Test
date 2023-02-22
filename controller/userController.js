const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')
exports.register = (req, res) => {
    try{
        // getting all the values from req
        const { email, phno, password, firstName, lastName } = req.body;
        console.log(email, phno, password, firstName, lastName);
        
        // hashing the password using bcrypt lib
        bcrypt.hash(password, 20, (err, hashedPassword) => {
            if(err){
                res.status(400).json({
                    status:'error',
                    data:{
                        msg:'error while hashing password',
                        err
                    }
                });
            }
            // creating new user instance
            const newuser = new User({
                email,
                password:hashedPassword,
                phno,
                firstName,
                lastName
            });
            
            // saving user
            newuser.save((err, curruser) => {
                console.log(curruser);
                if(err){
                    res.status(400).json({
                        status:'error',
                        data:{
                            msg:'error in saving user',
                            err
                        }
                    })
                }

                const jwt_token = jwt.sign({email:curruser._id}, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES_IN });

                res.json({
                    status:'success',
                    data:{
                        msg:'user created successfully...',
                        jwt_token,
                        user:curruser
                    }
                })
            })
        });

    } catch(err){
        res.status(400).json({
            status:'error',
            data:{
                msg:'error in registering user...',
                err
            }
        });
    }

}