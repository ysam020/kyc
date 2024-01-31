import express from "express";
import customerKyc from "../models/customerKycModel.mjs";

const router = express.Router();

router.get("/api/approveCustomerKyc/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const employee = await customerKyc.find({ _id });

    if (!employee) {
      return res.status(200).json({ message: "ID not found" });
    }

    await customerKyc.updateOne({ _id }, { $set: { approval: "Approved" } });
    res.status(200).json({ message: "KYC approved" });
  } catch (err) {
    console.log(err);
  }
});

export default router;
