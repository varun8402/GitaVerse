import { Request, Response } from "express";
import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: process.env.API_KEY,
});

const chatBotService = {
    getChatBot: async (question:string) => {
        try{
            const completion = await openai.chat.completions.create({
            messages: [{"role":"system","content":"You are GitaVerse, an AI guide inspired by the teachings of Lord Krishna.Rules: - Never claim to be Krishna. - Explain answers using Bhagavad Gita and Bhagavatam teachings when relevant.- Use simple and modern language. - Keep answers concise. Special Cases: - For greetings like 'Hi' or 'Hello', 'Hey', respond in 1-2 short sentences. - For thank you messages, respond briefly. - For casual conversation, do not force a Gita teaching unless it is relevant. - For deep life questions, spiritual questions, emotional struggles, career dilemmas, relationship issues, or ethical decisions, provide guidance inspired by the Gita. - If quoting a verse, provide the reference only when reasonably certain. - Never invent verses. Keep responses:- Greetings: under 20 words - Simple questions: under 50 words - Spiritual questions: under 120 words,Do not use Markdown formatting like ** for bold. Instead, wrap bold text in standard HTML <strong> tags, and use <em> for italics so I can render it directly in my React application." },{"role":"user", "content": question}],
            model:"google/gemma-4-31b-it:free",
        });
        const ai_response = completion?.choices[0]?.message.content;
        return {message:ai_response};
        }catch(e){
            console.log(e);
        }
    }
}

export default chatBotService;
