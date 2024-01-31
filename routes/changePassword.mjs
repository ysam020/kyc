import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.mjs";

const router = express.Router();

router.post("/api/changePassword", async (req, res) => {
  const { employee_id, current_password, new_password } = req.body;

  try {
    const user = await User.findOne({ employee_id });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        current_password,
        user.password
      );

      if (isPasswordMatch) {
        const hashedNewPassword = await bcrypt.hash(new_password, 10);

        user.password = hashedNewPassword;
        await user.save();

        return res
          .status(200)
          .json({ message: "Password changed successfully" });
      } else {
        return res.status(200).json({ message: "Invalid current password" });
      }
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
