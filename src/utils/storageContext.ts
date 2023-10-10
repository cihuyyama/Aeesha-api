import {
    Document,
    OpenAI,
    PDFReader,
    serviceContextFromDefaults,
    storageContextFromDefaults,
    VectorStoreIndex,
} from "llamaindex";
import fs from 'fs/promises'

export async function saveContextIndex() {
    const reader = new PDFReader()

    // const document = new Document({ text: essay, id_: "essay" });
    const document = await reader.loadData("./(13pasal)PErgub DIY No 67 Tahun 2022.pdf");

    if (!document) {
        throw Error('No Document')
    }


    const storageContext = await storageContextFromDefaults(
        {
            persistDir: "./storage",
        });

    const serviceContext = serviceContextFromDefaults({
        llm: new OpenAI({ model: "gpt-3.5-turbo", temperature: 0 }),
    });

    return await VectorStoreIndex.fromDocuments(document, {
        storageContext,
        serviceContext
    });
}

export async function loadContextIndex() {

    const storageContext = await storageContextFromDefaults({
        persistDir: "./storage",
    });

    const serviceContext = serviceContextFromDefaults({
        llm: new OpenAI({ model: "gpt-3.5-turbo", temperature: 0 }),
    });

    return await VectorStoreIndex.init({
        storageContext,
        serviceContext
    });
}

export async function mergeContextIndex() {

    const essay = await fs.readFile(
        "./essay.txt",
        "utf-8",
    );

    const document = new Document({ text: essay, id_: "essay" });
    console.log("document done");

    const storageContext = await storageContextFromDefaults({
        persistDir: "./storage",
    });

    const serviceContext = serviceContextFromDefaults({
        llm: new OpenAI({ model: "gpt-3.5-turbo", temperature: 0 }),
    });

    const index = await VectorStoreIndex.init({
        storageContext,
        serviceContext
    });

    index.insert(document)
}