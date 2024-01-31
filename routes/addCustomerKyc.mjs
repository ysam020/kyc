import express from "express";
import customerKyc from "../models/customerKycModel.mjs";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  "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"
);

const router = express.Router();

router.post("/api/addCustomerKyc", async (req, res) => {
  const {
    category,
    name_of_individual,
    status,
    factory_addresses,
    permanent_address_line_1,
    permanent_address_line_2,
    permanent_address_city,
    permanent_address_state,
    permanent_address_pin_code,
    permanent_address_telephone,
    permanent_address_email,
    principle_business_address_line_1,
    principle_business_address_line_2,
    principle_business_address_city,
    principle_business_address_state,
    principle_business_address_pin_code,
    principle_address_email,
    principle_business_telephone,
    principle_business_website,
    authorised_signatories,
    iec_no,
    pan_no,
    banks,
    passport_img,
    voter_card_img,
    driving_license_img,
    bank_statement_img,
    ration_card_img,
    registration_certificate_img,
    partnership_deed_img,
    power_of_attorney_partnership_img,
    partnership_valid_document,
    partnership_aadhar_card_front_photo,
    partnership_aadhar_card_back_photo,
    telephone_bill_in_the_name_of_firm_img,
    certificate_of_incorporation_img,
    memorandum_of_association_img,
    articles_of_association_img,
    power_of_attorney_company_img,
    telephone_bill_company_img,
    pan_allotment_letter_img,
    certificate_of_registration_img,
    power_of_attorney_trust_img,
    officially_valid_document_trust_img,
    resolution_of_managing_body_img,
    telephone_bill_trust_img,
    name_of_trustees,
    name_of_founder,
    address_of_founder,
    telephone_of_founder,
    email_of_founder,
  } = req.body;

  try {
    const kycData = {
      category,
      name_of_individual,
      status,
      factory_addresses,
      permanent_address_line_1,
      permanent_address_line_2,
      permanent_address_city,
      permanent_address_state,
      permanent_address_pin_code,
      permanent_address_telephone,
      permanent_address_email,
      principle_business_address_line_1,
      principle_business_address_line_2,
      principle_business_address_city,
      principle_business_address_state,
      principle_business_address_pin_code,
      principle_address_email,
      principle_business_telephone,
      principle_business_website,
      authorised_signatories,
      iec_no,
      pan_no,
      banks,
      passport_img,
      voter_card_img,
      driving_license_img,
      bank_statement_img,
      ration_card_img,
      registration_certificate_img,
      partnership_deed_img,
      power_of_attorney_partnership_img,
      partnership_valid_document,
      partnership_aadhar_card_front_photo,
      partnership_aadhar_card_back_photo,
      telephone_bill_in_the_name_of_firm_img,
      certificate_of_incorporation_img,
      memorandum_of_association_img,
      articles_of_association_img,
      power_of_attorney_company_img,
      telephone_bill_company_img,
      pan_allotment_letter_img,
      certificate_of_registration_img,
      power_of_attorney_trust_img,
      officially_valid_document_trust_img,
      resolution_of_managing_body_img,
      telephone_bill_trust_img,
      name_of_trustees,
      name_of_founder,
      address_of_founder,
      telephone_of_founder,
      email_of_founder,
      approval: "Not Approved",
    };
    const newKyc = new customerKyc(kycData);
    await newKyc.save();

    const emailContent = {
      to: ["sameery.020@gmail.com", "sameery.020@gmail.com"],
      from: "helpdesk@alluvium.in",
      subject: "KYC details added",
      text: "KYC details added",
    };

    await sgMail.send(emailContent);

    res.status(201).json({ message: "KYC details added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
