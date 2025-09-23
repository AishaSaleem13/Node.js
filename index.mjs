import express from "express";
import db from "./config/db.mjs";
import router from "./routes/mainindex.mjs";
import cors from "cors";

db.connection.once("open", () => console.log("connected to db"))
  .on("error", (err) => console.log("error connecting db -->", err));

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://shop-hub-website-mzp5.vercel.app" // ⚠️ last slash hatao
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("blah blah blah ✅");
});

// ✅ Routes
app.use("/", router);

// ✅ Local dev server
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => {
    console.log("server is running port 5000");
  });
}

export default app;
