const User  = require('../models/user.model')

const getAllUsers = async(req,res)=>{
    try {
        const users  = await User.find({},{password:0 });
        if(!users || users.length ===0){
            return res.status(404).json({message:"No Users Founds"})
        }
        return res.status(200).json(users)
    } catch (error) {
         next(error)
    }
}

// *------------------------------
// *    singleUser logic by admin
// *------------------------------

const getSingleUserById = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const singleUserData = await User.findOne({ _id: id },{password:0});
      
        res.status(200).json(singleUserData);
    } catch (error) {
        next(error);  
    }
}

// *------------------------------
// *    updateUserData logic by admin
// *------------------------------
const updateUserData = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const updateUser = await User.updateOne(
            { _id: id }, 
            { $set: updateUserData }
        );
        if (updateUser.modifiedCount === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }
        return res.status(200).json({ message: "User updated successfully", data: updateUser });
    } catch (error) {
        next(error);
    }
};


// *------------------------------
// *    deleteUserById logic by admin
// *------------------------------

const deleteUserById = async (req, res, next) => {
    const id = req.params.id;
    
    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {  
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User deleted successfully", deletedUser: user });
    } catch (error) {
        next(error);
    }
};
module.exports = {getAllUsers ,deleteUserById,updateUserData,getSingleUserById}