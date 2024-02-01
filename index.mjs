import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import kyc from "./routes/kycForm.mjs";
import login from "./routes/login.mjs";
import getEmployeeDetails from "./routes/getEmployeeDetails.mjs";
import updateKyc from "./routes/updateKyc.mjs";
import getKyc from "./routes/getKyc.mjs";
import approveKyc from "./routes/approveKyc.mjs";
import birthdayMail from "./routes/birthdayMail.mjs";
import addCustomerKyc from "./routes/addCustomerKyc.mjs";
import addInwardRegister from "./routes/addInwardRegister.mjs";
import addOutwardRegister from "./routes/addOutwardRegister.mjs";
import getInwardRegister from "./routes/getInwardRegister.mjs";
import getOutwardRegister from "./routes/getOutwardRegister.mjs";
import getCustomerKyc from "./routes/getCustomerKycList.mjs";
import getCustomerKycDetails from "./routes/getCustomerKycDetails.mjs";
import approveCustomerKyc from "./routes/approveCustonerKyc.mjs";
import addEmployeeOnboarding from "./routes/addEmployeeOnboarding.mjs";
import changePassword from "./routes/changePassword.mjs";
import getContactPersonNames from "./routes/getContactPersonNames.mjs";
import getOutwardRegisterDetails from "./routes/getOutwardRegisterDetails.mjs";
import updateOutwardRegister from "./routes/updateOutwardRegister.mjs";

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb://localhost:27017/kyc",
    // "mongodb+srv://exim:qTT7e4YeE3YSSMiV@aivision.pxmpvlz.mongodb.net/exim?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.use(kyc);
    app.use(login);
    app.use(getEmployeeDetails);
    app.use(updateKyc);
    app.use(getKyc);
    app.use(approveKyc);
    app.use(birthdayMail);
    app.use(addCustomerKyc);
    app.use(addInwardRegister);
    app.use(addOutwardRegister);
    app.use(getInwardRegister);
    app.use(getOutwardRegister);
    app.use(getCustomerKyc);
    app.use(getCustomerKycDetails);
    app.use(approveCustomerKyc);
    app.use(addEmployeeOnboarding);
    app.use(changePassword);
    app.use(getContactPersonNames);
    app.use(getOutwardRegisterDetails);
    app.use(updateOutwardRegister);

    app.listen(4000, () => {
      console.log(`BE started at port 4000`);
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
