import mongoose from "mongoose";

const employeeOnboardingSchema = new mongoose.Schema({
  where_do_you_see_yourself: { type: String },
  proudest_moment: { type: String },
  first_name: { type: String },
  middle_name: { type: String },
  last_name: { type: String },
  what_inspires_you: { type: String },
  skill: { type: String },
  parent_company_views: { type: String },
  paramount_views: { type: String },
  alluvium_views: { type: String },
  srcc_views: { type: String },
  office_tour: { type: String },
  buddy_name: { type: String },
  company_policy: { type: String },
  introduction: { type: String },
  values: { type: String },
  employee_photo: { type: String },
  resume: { type: String },
  address_proof: { type: String },
  nda: { type: String },
  branch: { type: String },
  company: { type: String },
});

const employeeOnboarding = mongoose.model(
  "employeeOnboarding",
  employeeOnboardingSchema
);
export default employeeOnboarding;
