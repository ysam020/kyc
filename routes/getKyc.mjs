import express from "express";
import kyc from "../models/kycModel.mjs";

const router = express.Router();

router.get("/api/getKyc", async (req, res) => {
  try {
    const kycData = await kyc.find(
      {},
      "employee_id first_name last_name approval"
    ); // Select specific fields
    res.status(200).json(kycData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
