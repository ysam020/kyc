import express from "express";
import outwardRegister from "../models/outwardRegisterModel.mjs";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API);

const router = express.Router();

router.post("/api/addOutwardRegister", async (req, res) => {
  try {
    const {
      bill_given_date,
      party,
      division,
      party_email,
      description,
      kind_attention,
    } = req.body;

    const newOutwardEntry = await outwardRegister.create({
      bill_given_date,
      party,
      division,
      party_email,
      description,
      kind_attention,
    });

    const emailContent = {
      to: [
        party_email,
        "manu@surajforwarders.com",
        "rajan@surajforwarders.com",
        "account@surajforwarders.com",
      ],
      from: "helpdesk@alluvium.in",
      subject: "Customer KYC details added",
      text: "",
    };

    await sgMail.send(emailContent);

    res.status(201).json({
      message: "Outward register added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
