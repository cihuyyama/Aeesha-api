"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controller/chatController");
const collegeController_1 = require("../controller/collegeController");
const router = express_1.default.Router();
router.post('/api/chat/completion', chatController_1.sendMessageHandler);
router.post('/api/chat/retrieve', chatController_1.retrieveQueryHandler);
router.post('/api/chat/load', chatController_1.loadQueryHandler);
router.post('/api/chat/college/load', collegeController_1.collegeQueryHandler);
exports.default = router;
