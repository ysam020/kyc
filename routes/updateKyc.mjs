import express from "express";
import kycModel from "../models/kycModel.mjs";

const router = express.Router();

router.post("/api/updateKyc", async (req, res) => {
  const { employee_id, ...updateData } = req.body;

  try {
    // Check if the employee_id exists
    const existingKyc = await kycModel.findOne({ employee_id });

    if (!existingKyc) {
      return res.status(200).json({ message: "Employee ID not found" });
    }

    // Update the document with the data from req body
    await kycModel.updateOne({ employee_id }, { $set: updateData });

    // Fetch the updated document if needed
    const updatedKyc = await kycModel.findOne({ employee_id });

    res.status(200).json({ message: "KYC Details updated" }); // Send back the updated document if needed
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
