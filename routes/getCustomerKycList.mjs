import express from "express";
import customerKyc from "../models/customerKycModel.mjs";

const router = express.Router();

router.get("/api/getCustomerKyc", async (req, res) => {
  const customerKycData = await customerKyc.find(
    {},
    { name_of_individual: 1, category: 1, approval: 1 }
  );
  res.status(200).json(customerKycData);
});

export default router;
