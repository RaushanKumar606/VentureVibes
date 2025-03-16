const User = require('../models/user.model')
const Tour = require('../models/tour.model')
const Flight = require('../models/flight.model')
const Bus = require('../models/bus.model')
const Hotel = require('../models/hotel.model')
const Booking = require('../models/booking.model')
const Train = require('../models/train.model')
// *------------------------------
// In this page  User  Hotel flight Bus Tours  Admin controller  

// *------------------------------
// *    Get all User logic by admin
// *------------------------------
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Founds" })
        }
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}
// *------------------------------
// *    singleUser logic by admin
// *------------------------------
const getSingleUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const singleUserData = await User.findOne({ _id: id }, { password: 0 });

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

// *------------------------------
// *    All tours logic by admin
// *------------------------------
const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find({}, { password: 0 });
        if (!tours || tours.length === 0) {
            return res.status(404).json({ message: "No Users Founds" })
        }
        return res.status(200).json(tours)
    } catch (error) {
        next(error)
    }
}
// *------------------------------
// *    singleTouer logic by admin
// *------------------------------
const getSingleTourById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const singleData = await User.findOne({ _id: id }, { password: 0 });
        res.status(200).json(singleData);
    } catch (error) {
        next(error);
    }
}
// *------------------------------
// *    updatetour logic by admin
// *------------------------------
const updateTourData = async (req, res, next) => {
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
// *    delete tour logic by admin
// *------------------------------
const deleteTourById = async (req, res, next) => {
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
// *------------------------------
// *    flight logic by admin
// *------------------------------
const getFlight = async (req, res, next) => {
    try {
        const flight = await Flight.find({});
        if (!flight || flight.length === 0) {
            return res.status(404).json({ message: "No Users Founds" })
        }
        return res.status(200).json(flight)
    } catch (error) {
        next(error)
    }
}
// *------------------------------
// *    singleFlight logic by admin
// *------------------------------
const getSingleFlight = async (req, res, next) => {
    try {
        const id = req.params.id;
        const singleData = await Flight.findOne({ _id: id }, { password: 0 });
        res.status(200).json(singleData);
    } catch (error) {
        next(error);
    }
}
// *------------------------------
// *    Updateflight logic by admin
// *------------------------------
const updateFlight = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateFlightData = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const updateFlight = await Flight.updateOne(
            { _id: id },
            { $set: updateFlightData }
        );
        if (updateFlight.modifiedCount === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }
        return res.status(200).json({ message: "User updated successfully", data: updateFlight });
    } catch (error) {
        next(error);
    }
};
// *------------------------------
// *    deleteFlight logic by admin
// *------------------------------
const deleteFlight = async (req, res, next) => {
    const id = req.params.id;
    try {
        const flight = await Flight.findByIdAndDelete(id);
        if (!flight) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User deleted successfully", deletedUser: flight });
    } catch (error) {
        next(error);
    }
};
// *------------------------------
// *    getBus logic by admin
// *------------------------------
const getBus = async (req, res, next) => {
    try {
        const bus = await Bus.find({});
        if (!bus || bus.length === 0) {
            return res.status(404).json({ message: "No Users Founds" })
        }
        return res.status(200).json(bus)
    } catch (error) {
        next(error)
    }
}
// *------------------------------
// *    singlr Bus logic by admin
// *------------------------------
const getSingleBus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const singleDataBus = await Bus.findOne({ _id: id });
        res.status(200).json(singleDataBus);
    } catch (error) {
        next(error);
    }
}
// *------------------------------
// *    update bus logic by admin
// *------------------------------
const updateBus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateBusData = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const updateBus = await Bus.updateOne(
            { _id: id },
            { $set: updateBusData }
        );
        if (updateBus.modifiedCount === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }
        return res.status(200).json({ message: "User updated successfully", data: updateBus });
    } catch (error) {
        next(error);
    }
};
// *------------------------------
// *    delete bus logic by admin
// *------------------------------
const deleteBus = async (req, res, next) => {
    const id = req.params.id;
    try {
        const bus = await Bus.findByIdAndDelete(id);
        if (!bus) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User deleted successfully", deletedBus: bus });
    } catch (error) {
        next(error);
    }
};
// *------------------------------
// *    get hotel logic by admin
// *------------------------------
const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.find({});
        if (!hotel || hotel.length === 0) {
            return res.status(404).json({ message: "No Users Founds" })
        }
        return res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}
// *------------------------------
// *    single hotel logic by admin
// *------------------------------
const getSingleHotel = async (req, res, next) => {
    try {
        const id = req.params.id;
        const singleDataHotel = await Hotel.findOne({ _id: id });
        res.status(200).json(singleDataHotel);
    } catch (error) {
        next(error);
    }
}
// *------------------------------
// *    update hotel logic by admin
// *------------------------------
const updateHotel = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateHotelData = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const updateHotel = await Hotel.updateOne(
            { _id: id },
            { $set: updateHotelData }
        );
        if (updateHotel.modifiedCount === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }
        return res.status(200).json({ message: "User updated successfully", data: updateHotel });
    } catch (error) {
        next(error);
    }
};
// *------------------------------
// *    delete hotel logic by admin
// *------------------------------
const deleteHotel = async (req, res, next) => {
    const id = req.params.id;
    try {
        const hotel = await Hotel.findByIdAndDelete(id);
        if (!hotel) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User deleted successfully", deletedHotel: hotel });
    } catch (error) {
        next(error);
    }
};


// *------------------------------
// *    total user count logic by admin
// *------------------------------

const getTotelUsers = async(req,res)=>{
    try {
        const totalUser = await User.countDocuments();
        res.status(200).json({totalUser});
    } catch (error) {
        res.status(500).json({message:"Erroe fetching user count "})
    }
}


// *------------------------------
// *    total bus count logic by admin
// *------------------------------

const getTotelBus = async(req,res)=>{
    try {
        const totalBus = await Bus.countDocuments();
        res.status(200).json({totalBus});
    } catch (error) {
        res.status(500).json({message:"Erroe fetching Bus count "})
    }
}

// *------------------------------
// *    total flight count logic by admin
// *------------------------------

const getTotalFlight = async(req,res)=>{
    try {
        const totalflight = await Flight.countDocuments();
        res.status(200).json({totalflight});
    } catch (error) {
        res.status(500).json({message:"Erroe fetching filght count "})
    }
}

// *------------------------------
// *    total hotel count logic by admin
// *------------------------------

const getTotelHotel = async(req,res)=>{
    try {
        const totalHotel = await Hotel.countDocuments();
        res.status(200).json({totalHotel});
    } catch (error) {
        res.status(500).json({message:"Erroe fetching hotel count "})
    }
}

// *------------------------------
// *    total train count logic by admin
// *------------------------------

const getTotalTrein = async(req,res)=>{
    try {
        const totalTrain = await Train.countDocuments();
        res.status(200).json({totalTrain});
    } catch (error) {
        res.status(500).json({message:"Erroe fetching Train count "})
    }
}

// *------------------------------
// *    total tours count logic by admin
// *------------------------------

const getTotalTours = async(req,res)=>{
    try {
        const totalTours = await Tour.countDocuments();
        res.status(200).json({totalTours});
    } catch (error) {
        res.status(500).json({message:"Erroe fetching Tourse count "})
    }
}
// *------------------------------
// *    total booking count logic by admin
// *------------------------------

const getTotelBooking = async(req,res)=>{
    try {
        const totalBooking = await Booking.countDocuments();
        res.status(200).json({totalBooking});
    } catch (error) {
        res.status(500).json({message:"Erroe fetching totalBooking count "})
    }
}

module.exports = {
    getAllUsers, updateHotel, getSingleHotel, getHotel, deleteBus, updateBus, getSingleBus, getBus,
    deleteUserById, deleteFlight, updateFlight, getSingleFlight, getFlight,
    updateUserData, deleteTourById, updateTourData, getSingleTourById, getAllTours
    , getSingleUserById,
    deleteHotel,getTotelUsers,getTotalTrein,getTotelHotel,getTotalFlight,getTotalTours,getTotelBooking,getTotelBus
    
}