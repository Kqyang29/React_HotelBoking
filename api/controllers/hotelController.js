import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js"

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    next(error);
  }
}


export const updateHotel = async (req, res, next) => {

  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      //更新后立即显示
      { $set: req.body },
      { new: true });
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
}


export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been delete");
  } catch (error) {
    next(error);
  }
}


export const getHotel = async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (error) {
    next(error);
  }
}


export const getAllHotel = async (req, res, next) => {
  const { max, min, ...other } = req.query;
  try {
    const AllHotel = await Hotel.find({...other,cheapestPrice:{$gt:min||1,$lt:max||999}}).limit(req.query.limit);
    res.status(200).json(AllHotel);
  } catch (error) {
    next(error);
  }
}

export const countByCity = async (req, res, next) => {
  // query => url after ?
  const cities = req.query.cities.split(",");
  try {
    //in order to find multiple items like multiple cities
    const list = await Promise.all(cities.map(city => {
      // find the length of city array
      // return Hotel.find({ city: city }).length;
      return Hotel.countDocuments({ city: city });
    }));
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
}

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({type:"apartment"});
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
}

export const getHotelRoom = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(hotel.rooms.map((room) => {
      return Room.findById(room);
    }))
    res.status(200).json(list);
  } catch (error) {
    next(error)
  }
}