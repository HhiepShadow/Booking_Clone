// Authentication 
import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom);

// DELETE
router.delete("/:hotelid/:id", verifyAdmin, deleteRoom);

// GET
router.get("/:id", getRoomById);

// GET ALL
router.get("/", getAllRooms);

export default router;