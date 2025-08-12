import express from "express";
import db from './config/db.mjs';
import router from './routes/mainindex.mjs';
import cors from 'cors';

db.connection
  .once('open', () => console.log("connected to db"))
  .on("error", (err) => console.log("error connecting db -->", err));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

// Vercel ke liye export
export default app;
