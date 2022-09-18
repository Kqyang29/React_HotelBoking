import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const saveRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push:{rooms:saveRoom._id}
      })
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveRoom)
  } catch (error) {
    next(error);
  }
}

export const updateRoom = async (req, res, next) => {

  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true });
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
}

export const updateRoomAvailability = async (req, res, next) => {

  try {
    await Room.updateOne(
      { "RoomNumbers._id": req.params.id },
      {
        $push: {
          // updating next property
          "RoomNumbers.$.unavailableDates":req.body.date
        }
      }
    )
    res.status(200).json("room status has been update");
  } catch (error) {
    next(error);
  }
}


export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull:{rooms:req.params.id}
      })
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been delete");
  } catch (error) {
    next(error);
  }
}


export const getRoom = async (req, res, next) => {
  try {
    const getRoom = await Room.findById(req.params.id);
    res.status(200).json(getRoom);
  } catch (error) {
    next(error);
  }
}


export const getAllRoom = async (req, res, next) => {
  try {
    const AllRoom = await Room.find();
    res.status(200).json(AllRoom);
  } catch (error) {
    next(error);
  }
}