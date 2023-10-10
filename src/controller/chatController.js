"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadQueryHandler = exports.retrieveQueryHandler = exports.sendMessageHandler = void 0;
const llamaindex_1 = require("llamaindex");
const openai_1 = __importDefault(require("openai"));
const storageContext_1 = require("../utils/storageContext");
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
function sendMessageHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const referer = req.headers.referer;
        const data = req.body;
        const chatCompletion = yield openai.chat.completions.create(data);
        console.log(referer);
        return res.status(200).json(chatCompletion);
    });
}
exports.sendMessageHandler = sendMessageHandler;
function retrieveQueryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const index = yield (0, storageContext_1.saveContextIndex)();
        const retriever = index.asRetriever();
        retriever.similarityTopK = 5;
        const queryEngine = new llamaindex_1.RetrieverQueryEngine(retriever);
        const response = yield queryEngine.query(data.messages[0].content);
        console.log(response.toString());
        return res.status(200).json(response);
    });
}
exports.retrieveQueryHandler = retrieveQueryHandler;
function loadQueryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const index = yield (0, storageContext_1.loadContextIndex)();
        const retriever = index.asRetriever();
        retriever.similarityTopK = 5;
        const queryEngine = new llamaindex_1.RetrieverQueryEngine(retriever);
        const response = yield queryEngine.query(data.messages[0].content);
        return res.status(200).json({
            choices: [
                {
                    message: {
                        role: "assistant",
                        content: response.response
                    }
                }
            ]
        });
    });
}
exports.loadQueryHandler = loadQueryHandler;
