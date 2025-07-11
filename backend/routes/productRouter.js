import express from "express";
import { ensureAuthentication } from "../middlewares/productAuthMiddleware.js";

const productRouter = express.Router();

productRouter.get("/", ensureAuthentication, (req, res) => {
  res.status(200).json([
    {
      name: "Product 1",
      description: "Product 1 description",
      price: 100,
    },
    {
      name: "Product 2",
      description: "Product 2 description",
      price: 200,
    },
  ]);
});

export default productRouter;
