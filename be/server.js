const express = require("express");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth.routes");

dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
