import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();


// Create
router.post("/:hotelid", verifyAdmin,createRoom);

// Update
router.put("/:id", verifyAdmin, updateRoom);
router.put("/available/:id", updateRoomAvailability);


// Delete
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom);
// Get
router.get("/:id", getRoom);

// Get All
router.get('/', getAllRoom);

export default router;