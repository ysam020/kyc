import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("kycUser", userSchema);
export default User;
