const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());

app.use("/api/leads", leadRoutes);
app.use(cors());
app.use(express.json());

app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});