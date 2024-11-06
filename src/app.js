import express from 'express'
import productRouter from './routers/user'
import { connectDB } from './config/mongodb';
import dotenv from "dotenv"

dotenv.config();
const app = express();

app.use(express.json())

connectDB(process.env.DB_URI);

app.use("/api",productRouter)

export const viteNodeApp = app;
