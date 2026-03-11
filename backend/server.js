const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const documentRoutes = require("./routes/documentRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/documentDB")
app.use("/documents", documentRoutes)

app.get("/", (req, res) => {
    res.send("Document Management API Running")
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})