import express from "express";
import kyc from "../models/kycModel.mjs";

const router = express.Router();

router.get("/api/employee_details/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Use await to wait for the query to execute and retrieve the user
    const user = await kyc.findOne({ employee_id: employeeId });

    // Send the user data as a response
    res.status(200).send(user);
  } catch (error) {
    // Handle any errors that might occur during the process
    res.status(500).send(error.message);
  }
});

export default router;
