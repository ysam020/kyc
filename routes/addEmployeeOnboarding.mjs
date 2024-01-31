import express from "express";
import employeeOnboarding from "../models/employeeOnboardingModel.mjs";
import User from "../models/userModel.mjs";

const router = express.Router();

router.post("/api/addEmployeeOnboarding", async (req, res) => {
  const { branch, first_name, middle_name, last_name } = req.body;
  let newEmployeeId;

  if (
    ["ADI", "COC", "GDH", "BARD"].includes(branch) ||
    ["AUM", "PFP", "SRCC"].includes(branch)
  ) {
    // Find all users where branch exists in the employee_id
    const matchingUsers = await User.find({
      employee_id: { $regex: branch },
    }).sort({ employee_id: -1 });

    if (matchingUsers.length > 0) {
      const lastUser = matchingUsers[0];
      const lastNumber = parseInt(lastUser.employee_id.slice(-4));

      // Generate the new employee_id
      newEmployeeId = ["ADI", "COC", "GDH", "BARD"].includes(branch)
        ? `SFPL${branch}${lastNumber + 1}`
        : `${branch}${lastNumber + 1}`;
    } else {
      newEmployeeId = ["ADI", "COC", "GDH", "BARD"].includes(branch)
        ? `SFPL${branch}1001`
        : `${branch}1001`;
    }

    try {
      const newUser = await User.create({
        employee_id: newEmployeeId,
        name: first_name + middle_name + last_name,
        password:
          "$2b$10$/vdQX33BZpLVaK9zK9BbX.uAaIcmHZdwIR1RGWwRz1KgF0/k.Okia",
        role: "User",
      });

      // Create a new employee
      const newEmployee = await employeeOnboarding.create({
        ...req.body,
      });

      res.status(201).json({
        message: `Your employee ID is- ${newEmployeeId}. Please login and change your password.`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid branch specified",
    });
  }
});

export default router;
