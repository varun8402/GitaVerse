import express, {Request, Response} from "express";

const app = express();
const port = 3000;
const routes = require("./routes/routes"); 

app.use(express.json());
app.use("",routes);

app.get("/", (req:Request, res:Response)=>{
    res.send("Hello world");
})

app.listen(port, () =>{
    console.log("Backend is running");
})
