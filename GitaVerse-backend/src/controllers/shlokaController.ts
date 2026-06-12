import {Request, Response} from "express";
import {shloka} from "../services/shlokaService";
export const randomShlokaController = async (req:Request, res:Response) =>{
    try{
        res.send(await shloka.getRandomShloka(req, res));
    }catch(e){
        console.log(e);
    }
}