import { Request, Response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
  });

export async function sendMessageHandler(req: Request, res: Response) {
    const referer = req.headers.referer
    const data = req.body

    const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(data);

    console.log(referer)

    return res.status(200).json(chatCompletion)
}