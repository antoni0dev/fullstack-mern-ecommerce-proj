import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 8000;

connectDB(); // connect to MongoDB

// initialize express
const app = express();

// create our first route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes); // use the productRoutes (see above)

app.use(notFound); // 404 error handler
app.use(errorHandler); // 500 error handler

// start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
