import express from "express";
import "./models/db";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    hello: "pinterest clone server",
  });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
