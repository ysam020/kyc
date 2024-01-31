import express from "express";
import inwardRegister from "../models/inwardRegisterModel.mjs";

const router = express.Router();

router.get("/api/getInwardRegister", async (req, res) => {
  try {
    const inwardRegisterData = await inwardRegister.find();
    res.status(200).json(inwardRegisterData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
