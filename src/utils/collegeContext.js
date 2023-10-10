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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadContextIndex = void 0;
const llamaindex_1 = require("llamaindex");
function loadContextIndex() {
    return __awaiter(this, void 0, void 0, function* () {
        const storageContext = yield (0, llamaindex_1.storageContextFromDefaults)({
            persistDir: "./saved/ucp1ai",
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
