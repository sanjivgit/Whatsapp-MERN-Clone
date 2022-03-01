import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  localId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photoUrl: String,
});

export default mongoose.model("users", userSchema);
