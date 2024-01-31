import express from "express";
import schedule from "node-schedule";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import kyc from "../models/kycModel.mjs";
dotenv.config();

const router = express.Router();

sgMail.setApiKey(
  "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"
);

schedule.scheduleJob("0 10 * * *", async () => {
  // schedule.scheduleJob("*/10 * * * * *", async () => {
  try {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);

    const tomorrowFormatted = formatDate(tomorrow);
    const kycs = await kyc.find(
      { dob: tomorrowFormatted },
      { first_name: 1, last_name: 1 }
    );

    if (kycs.length > 0) {
      let emailText = `There are ${kycs.length} employees with birthdays tomorrow.\n\n`;

      kycs.forEach((kycDoc) => {
        emailText += `Name: ${kycDoc.first_name} ${kycDoc.last_name}\n`;
      });

      const emailContent = {
        to: "sameery.020@gmail.com",
        from: "helpdesk@alluvium.in",
        subject: "KYC Alert: Birthdays Tomorrow",
        text: emailText,
      };

      await sgMail.send(emailContent);
      console.log("Email sent successfully");
    } else {
      console.log("No documents found with dob as tomorrow");
    }
  } catch (error) {
    console.error(error);
  }
});

function formatDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

export default router;
