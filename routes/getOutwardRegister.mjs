import express from "express";
import outwardRegister from "../models/outwardRegisterModel.mjs";

const router = express.Router();

router.get("/api/getOutwardRegister", async (req, res) => {
  try {
    const outwardRegisterData = await outwardRegister.find();
    res.status(200).json(outwardRegisterData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
