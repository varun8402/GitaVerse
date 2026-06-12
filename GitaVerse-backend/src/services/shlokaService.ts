import { Request, Response } from 'express';

export const shloka = {
    getRandomShloka: async(req:Request, Res:Response) => {
        try{
            const randomId = Math.floor(Math.random() * 181);
            return randomId;
        }catch(e){
            console.log(e);
        }
    }
}