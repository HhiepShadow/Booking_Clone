// Authentication 
import express from 'express';
import User from '../models/Hotel.js';
import { createError } from '../utils/error.js';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/user.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CHECK
router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("Hello user, you are logged in");
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("Hello user, you are logged in and you can delete your account");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("Hello Admin, you are logged in and you can delete all accounts");
});

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUserById);

// GET ALL
router.get("/", verifyAdmin, getAllUsers);



export default router;