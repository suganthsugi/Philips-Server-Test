// controllers for user handling rather than authendication

// importing the user schema
const User = require('../models/userSchema');

exports.getUserDetail = async (req, res) => {
    try {
        const user = await User.findById(req.user.user_id);
        if(user==null) {
            res.status(403).json({
                status:"error",
                data:{
                    msg:"Access Denied for the request"
                }
            });
            return;
        }
        res.status(200).json({
            status:"success",
            data:{
                msg:"Successfully fetched user information",
                user
            }
        })
        return;

    } catch {
        res.status(500).json({
            status:"server error",
            data:{
                msg:"something went wrong"
            }
        })
    }
}