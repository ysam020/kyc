import express from "express";
import employeeOnboarding from "../models/employeeOnboardingModel.mjs";
import User from "../models/userModel.mjs";

const router = express.Router();

router.post("/api/addEmployeeOnboarding", async (req, res) => {
  const { company, branch, first_name, middle_name, last_name } = req.body;
  let newEmployeeId;

  // Function to generate the new employee_id based on the branch and last number
  const generateEmployeeId = async (branch) => {
    const matchingUsers = await User.find({
      employee_id: { $regex: branch },
    }).sort({ employee_id: -1 });

    if (matchingUsers.length > 0) {
      const lastUser = matchingUsers[0];
      const lastNumber = parseInt(lastUser.employee_id.slice(-4));
      return `${branch}${lastNumber + 1}`;
    } else {
      return `${branch}1001`;
    }
  };

  try {
    switch (company) {
      case "Suraj Forwarders Private Limited":
        newEmployeeId = await generateEmployeeId(branch);
        break;
      case "Paramount Propack Private Limited":
        newEmployeeId = await generateEmployeeId("PFP");
        break;
      case "Alluvium IOT Solutions Private Limited":
        newEmployeeId = await generateEmployeeId("AUM");
        break;
      case "SR Container Carriers":
        newEmployeeId = await generateEmployeeId("SRCC");
        break;
      default:
        res.status(400).json({
          success: false,
          message: "Invalid company specified",
        });
        return;
    }

    const newUser = await User.create({
      employee_id: newEmployeeId,
      name: first_name + middle_name + last_name,
      password: "$2b$10$/vdQX33BZpLVaK9zK9BbX.uAaIcmHZdwIR1RGWwRz1KgF0/k.Okia",
      role: "User",
    });

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
});

export default router;
