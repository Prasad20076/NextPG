const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.js");
const pgRoutes = require("./routes/pgRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pgs", pgRoutes);

app.get("/", (req, res) => {
  res.send("NextPG Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/api/pgs`);
});



