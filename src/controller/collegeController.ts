import { RetrieverQueryEngine } from "llamaindex";
import { requ } from "../model/reqSchema";
import { loadContextIndex } from "../utils/storageContext";
import { Request, Response } from "express";

export async function collegeQueryHandler(req: Request, res: Response) {
    const data: requ = req.body

    const index = await loadContextIndex()

    const retriever = index.asRetriever();
    retriever.similarityTopK = 5
    const queryEngine = new RetrieverQueryEngine(retriever)

    const response = await queryEngine.query(
        data.messages[0].content
    );

    console.log(response.toString());
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