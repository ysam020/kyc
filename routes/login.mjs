// import express from "express";
// import bcrypt from "bcrypt";

// const router = express.Router();

// router.post("/api/login", async (req, res) => {
//   const { employeeId, password } = req.body;

//   // Generate a salt to hash the password
//   const saltRounds = 10;
//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Now you can use the hashedPassword as needed
//     console.log(hashedPassword);

//     // Respond or perform further actions with the hashedPassword
//     res.status(200).json({ hashedPassword });
//   } catch (error) {
//     // Handle error appropriately
//     console.error("Error generating hashed password:", error);
//     res.status(500).send("Error generating hashed password");
//   }
// });

// export default router;

import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.mjs";

const router = express.Router();

router.post("/api/login", async (req, res) => {
  const { employeeId, password } = req.body;

  try {
    const user = await User.findOne({ employee_id: employeeId });
    if (!user) {
      return res.json({ message: "User not registered" });
    }

    bcrypt.compare(password, user.password, (passwordErr, passwordResult) => {
      if (passwordErr) {
        console.error(passwordErr);
        return res.json({ message: "Something went wrong" });
      }

      if (passwordResult) {
        user.save();

        return res.json({
          message: "Login Successful",
          employee_id: user.employee_id,
          role: user.role,
        });
      } else {
        return res.json({ message: "Password didn't match" });
      }
    });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Something went wrong" });
  }
});

export default router;
