import express from "express";
import outwardRegister from "../models/outwardRegisterModel.mjs";

const router = express.Router();

router.get("/api/getOutwardRegisterDetails/:id", async (req, res) => {
  const { id } = req.params;

  const data = await outwardRegister.findById(id);
  res.status(200).json(data);
});

export default router;
