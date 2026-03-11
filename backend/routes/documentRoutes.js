const express = require("express")
const router = express.Router()
const Document = require("../models/Document")

// Create Document
router.post("/add", async (req, res) => {
  try {
    const doc = new Document(req.body)
    await doc.save()
    res.json(doc)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get All Documents
router.get("/", async (req, res) => {
  try {
    const docs = await Document.find()
    res.json(docs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update Document
router.put("/:id", async (req, res) => {
  try {
    const updatedDoc = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedDoc)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


// Delete Document
router.delete("/:id", async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id)
    res.json({ message: "Document deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router