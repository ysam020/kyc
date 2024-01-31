import express from "express";
import customerKyc from "../models/customerKycModel.mjs";

const router = express.Router();

router.get("/api/getCustomerKycDetails/:id", async (req, res) => {
  const { id } = req.params;

  const data = await customerKyc.findById(id);
  res.status(200).json(data);
});

export default router;
