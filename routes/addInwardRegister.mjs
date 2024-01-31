import express from "express";
import inwardRegister from "../models/inwardRegisterModel.mjs";

const router = express.Router();

router.post("/api/addInwardRegister", async (req, res) => {
  try {
    const {
      time,
      date,
      from,
      type,
      details_of_document,
      contact_person_name,
      inward_consignment_photo,
    } = req.body;

    const newInwardEntry = await inwardRegister.create({
      time,
      date,
      from,
      type,
      details_of_document,
      contact_person_name,
      inward_consignment_photo,
    });

    res.status(201).json({ message: "Inward register added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
