import express from "express";
import kyc from "../models/kycModel.mjs";

const router = express.Router();

router.get("/api/approveKyc/:employee_id", async (req, res) => {
  const { employee_id } = req.params;

  try {
    const employee = await kyc.find({ employee_id });

    if (!employee) {
      return res.status(200).json({ message: "Employee ID not found" });
    }

    await kyc.updateOne({ employee_id }, { $set: { approval: "Approved" } });
    res.status(200).json({ message: "KYC approved" });
  } catch (err) {
    console.log(err);
  }
});

export default router;
