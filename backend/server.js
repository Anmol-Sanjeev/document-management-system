const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const documentRoutes = require("./routes/documentRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
app.use("/documents", documentRoutes)

app.get("/", (req, res) => {
    res.send("Document Management API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server running")
})