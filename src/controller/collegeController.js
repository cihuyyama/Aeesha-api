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
exports.collegeQueryHandler = void 0;
const llamaindex_1 = require("llamaindex");
const storageContext_1 = require("../utils/storageContext");
function collegeQueryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const index = yield (0, storageContext_1.loadContextIndex)();
        const retriever = index.asRetriever();
        retriever.similarityTopK = 5;
        const queryEngine = new llamaindex_1.RetrieverQueryEngine(retriever);
        const response = yield queryEngine.query(data.messages[0].content);
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
        });
    });
}
exports.collegeQueryHandler = collegeQueryHandler;
