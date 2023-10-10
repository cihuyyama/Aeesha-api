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
exports.mergeContextIndex = exports.loadContextIndex = exports.saveContextIndex = void 0;
const llamaindex_1 = require("llamaindex");
const promises_1 = __importDefault(require("fs/promises"));
function saveContextIndex() {
    return __awaiter(this, void 0, void 0, function* () {
        const reader = new llamaindex_1.PDFReader();
        // const document = new Document({ text: essay, id_: "essay" });
        const document = yield reader.loadData("./(13pasal)PErgub DIY No 67 Tahun 2022.pdf");
        if (!document) {
            throw Error('No Document');
        }
        const storageContext = yield (0, llamaindex_1.storageContextFromDefaults)({
            persistDir: "./storage",
        });
        const serviceContext = (0, llamaindex_1.serviceContextFromDefaults)({
            llm: new llamaindex_1.OpenAI({ model: "gpt-3.5-turbo", temperature: 0 }),
        });
        return yield llamaindex_1.VectorStoreIndex.fromDocuments(document, {
            storageContext,
            serviceContext
        });
    });
}
exports.saveContextIndex = saveContextIndex;
function loadContextIndex() {
    return __awaiter(this, void 0, void 0, function* () {
        const storageContext = yield (0, llamaindex_1.storageContextFromDefaults)({
            persistDir: "./storage",
        });
        const serviceContext = (0, llamaindex_1.serviceContextFromDefaults)({
            llm: new llamaindex_1.OpenAI({ model: "gpt-3.5-turbo", temperature: 0 }),
        });
        return yield llamaindex_1.VectorStoreIndex.init({
            storageContext,
            serviceContext
        });
    });
}
exports.loadContextIndex = loadContextIndex;
function mergeContextIndex() {
    return __awaiter(this, void 0, void 0, function* () {
        const essay = yield promises_1.default.readFile("./essay.txt", "utf-8");
        const document = new llamaindex_1.Document({ text: essay, id_: "essay" });
        console.log("document done");
        const storageContext = yield (0, llamaindex_1.storageContextFromDefaults)({
            persistDir: "./storage",
        });
        const serviceContext = (0, llamaindex_1.serviceContextFromDefaults)({
            llm: new llamaindex_1.OpenAI({ model: "gpt-3.5-turbo", temperature: 0 }),
        });
        const index = yield llamaindex_1.VectorStoreIndex.init({
            storageContext,
            serviceContext
        });
        index.insert(document);
    });
}
exports.mergeContextIndex = mergeContextIndex;
