import express from 'express'
import { sendMessageHandler } from '../controller/chatController'

const router = express.Router()

router.post('/api/chat/completion', sendMessageHandler)

export default router