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

// Local testing ke liye
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Vercel ke liye export
export default app;
