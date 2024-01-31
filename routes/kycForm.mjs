import express from "express";
import kycModel from "../models/kycModel.mjs";

const router = express.Router();

router.post("/kyc", async (req, res) => {
  const { employee_id } = req.body;
  console.log(employee_id);

  try {
    // Check if the employee_id already exists
    const existingKyc = await kycModel.findOne({ employee_id });

    if (existingKyc) {
      return res.status(200).json({
        message:
          "Your KYC has already been submitted. Please contact admin to edit KYC.",
      });
    }

    // If employee_id doesn't exist, proceed to create and save the document
    const newKycData = { ...req.body, approval: "Approval Pending" }; // Set approval to false
    const newKyc = new kycModel(newKycData);
    const savedKyc = await newKyc.save();

    res.status(201).json({ message: "KYC Details added" }); // Send back the saved document if needed
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
