import express from "express";
import outwardRegister from "../models/outwardRegisterModel.mjs";

const router = express.Router();

router.post("/api/updateOutwardRegister/:_id", async (req, res) => {
  const { _id } = req.params;
  const { weight, docket_no, outward_consignment_photo, courier_details } =
    req.body;

  try {
    await outwardRegister.updateOne(
      { _id },
      {
        $set: { weight, docket_no, outward_consignment_photo, courier_details },
      }
    );

    res.status(200).json({ message: "Outward register updated successfully" });
  } catch (err) {
    console.log(err);
  }
});

export default router;
