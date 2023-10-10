import { Request, Response } from "express";
import { RetrieverQueryEngine } from "llamaindex";
import OpenAI from "openai";
import { loadContextIndex, saveContextIndex } from "../utils/storageContext";
import { requ } from "../model/reqSchema";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export async function sendMessageHandler(req: Request, res: Response) {
    const referer = req.headers.referer
    const data = req.body

    const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(data);

    console.log(referer)

    return res.status(200).json(chatCompletion)
}

export async function retrieveQueryHandler(req: Request, res: Response) {
    const data: requ = req.body

    const index = await saveContextIndex()

    const retriever = index.asRetriever();
    retriever.similarityTopK = 5
    const queryEngine = new RetrieverQueryEngine(retriever)

    const response = await queryEngine.query(
        data.messages[0].content,
    );

    console.log(response.toString());
    return res.status(200).json(response)

}


export async function loadQueryHandler(req: Request, res: Response) {
    const data: requ = req.body

    const index = await loadContextIndex()

    const retriever = index.asRetriever();
    retriever.similarityTopK = 5
    const queryEngine = new RetrieverQueryEngine(retriever)

    const response = await queryEngine.query(
        data.messages[0].content
    );

    return res.status(200).json({
        choices: [
            {
                message: {
                    role: "assistant",
                    content: response.response
                }
            }
        ]
    })

}


