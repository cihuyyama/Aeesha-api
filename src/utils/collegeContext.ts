import { OpenAI, VectorStoreIndex, serviceContextFromDefaults, storageContextFromDefaults } from "llamaindex";

export async function loadContextIndex() {

    const storageContext = await storageContextFromDefaults({
        persistDir: "./saved/ucp1ai",
    });

    const serviceContext = serviceContextFromDefaults({
        llm: new OpenAI({ model: "gpt-3.5-turbo", temperature: 0 }),
    });

    return await VectorStoreIndex.init({
        storageContext,
        serviceContext
    });
}