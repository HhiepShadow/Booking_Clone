// Authentication 
import express from 'express';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotelById, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/find/:id", getHotelById);

// GET ALL
router.get("/", getAllHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);


export default router;