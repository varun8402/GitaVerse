import {Request, Response} from "express";
import {shloka} from "../services/shlokaService";

export const randomShlokaController = async (req:Request, res:Response) =>{
    try{
        const dailyShloka = shloka.getDailyShloka();
        res.send(dailyShloka);
    }catch(e){
        console.log(e);
    }
}