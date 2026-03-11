const mongoose = require("mongoose")

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ["Draft", "Review", "Approved", "Archived"],
    default: "Draft"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Document", documentSchema)