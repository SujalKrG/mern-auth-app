import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/authRoutes.js";
import productRouter from "./routes/productRouter.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", router);
app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});
