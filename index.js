import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";


dotenv.config();

const app = express();


app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

/* Login/Register Routes */

app.use("/auth",authRoutes);
app.use("/blog",blogRoutes);




/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));


