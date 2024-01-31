import express from "express";
import outwardRegister from "../models/outwardRegisterModel.mjs";

const router = express.Router();

router.post("/api/addOutwardRegister", async (req, res) => {
  try {
    const { bill_given_date, party, division, courier_details, party_email } =
      req.body;

    const newOutwardEntry = await outwardRegister.create({
      bill_given_date,
      party,
      division,
      courier_details,
      party_email,
    });

    res.status(201).json({
      message: "Outward register added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
