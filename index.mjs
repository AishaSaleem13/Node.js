import express from "express";
import db from './config/db.mjs'
import router from './routes/mainindex.mjs'
db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))
import cros from 'cors'

const app = express()

// app.listen(3000,()=>{
//     console.log(`server is running port `);
// })
app.use(express.json())

app.use(cros())
app.use('/',router)
export default app