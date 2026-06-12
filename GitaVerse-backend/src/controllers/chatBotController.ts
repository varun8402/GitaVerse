import { Request, Response } from "express";
import chatBotService from "../services/chatBotService";

export const chatBotController = async(req:Request, res:Response) => {
    try{
        const question = req.body.question;
        const chatBot_response = await chatBotService.getChatBot(question)
        res.send(chatBot_response);
    }catch(e){
        console.log(e);
    }
}