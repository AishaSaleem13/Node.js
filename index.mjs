import express from "express";
import db from './config/db.mjs'
import router from './routes/mainindex.mjs'
db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))
import cors from 'cors'

const app = express()

app.listen(5000,()=>{
    console.log(`server is running port `);
})
app.use(express.json())
// Root route for testing
app.get("/", (req, res) => {
  res.send("API is running ✅");
});
app.use(cors())
app.use('/',router)
export default app