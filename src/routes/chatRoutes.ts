import express from 'express'
import { loadQueryHandler, retrieveQueryHandler, sendMessageHandler } from '../controller/chatController'
import { collegeQueryHandler } from '../controller/collegeController'

const router = express.Router()

router.post('/api/chat/completion', sendMessageHandler)
router.post('/api/chat/retrieve', retrieveQueryHandler)
router.post('/api/chat/load', loadQueryHandler)
router.post('/api/chat/college/load', collegeQueryHandler)


export default router