import express from "express";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API);

const router = express.Router();

router.post("/feedback", async (req, res) => {
  const { name, module, issue, image } = req.body;

  const base64Image = image.split(";base64,").pop();

  const emailContent = {
    to: ["sameery.020@gmail.com", "suraj@aluvium.in", "punit@alluvium.in"],
    from: "helpdesk@alluvium.in",
    subject: `Feedback from ${name}`,
    text: `Module: ${module}\nIssue: ${issue}`,
    attachments: [
      {
        content: base64Image,
        filename: "image.jpeg",
        type: "image/jpeg",
        disposition: "attachment",
        content_id: "myImage",
      },
    ],
  };

  try {
    await sgMail.send(emailContent);
    console.log("Email sent successfully");
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

export default router;
