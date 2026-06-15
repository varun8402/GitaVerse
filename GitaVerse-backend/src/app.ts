import express, {Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const routes = require("./routes/routes"); 
const cors = require("cors");


app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions))

app.use("",routes);

app.get("/", (req:Request, res:Response)=>{
    res.send("Gita Verse Backend is Running");
})

app.listen(port, () =>{
    console.log("Backend is running");
})
