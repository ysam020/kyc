import express from "express";
import User from "../models/userModel.mjs";

const router = express.Router();

router.get("/api/getContactPersonNames", async (req, res) => {
  try {
    const contactPersonNames = await User.find({}, "name");
    res.status(200).json(contactPersonNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
