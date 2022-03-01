import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    conversationId: {
      type: String,
      required: true,
    },
    message: String,
    name: String,
    timestamp: String,
  },
  { timestamps: true }
);

export default mongoose.model("messagecontents", whatsappSchema);
